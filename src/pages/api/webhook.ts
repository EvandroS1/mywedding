// pages/api/webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import axios from "axios";
import { CartItemPedido } from "../../../types/cart";

export interface Pedido {
  id: string;
  external_reference?: string;
  payer?: {
    id: string;
    email?: string | null;
    entity_type?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    identification?: {
      number?: string | null;
      type?: string | null;
    };
    operator_id?: string | null;
    phone?: {
      number?: string | null;
      extension?: string | null;
      area_code?: string | null;
    };
    type?: string | null;
  };
  transaction_amount: number;
  status: string;
  cart?: CartItemPedido[];  // só existe em alguns pedidos
}

interface ShopProfile {
  id: string;
  pedidos: Pedido[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  try {
    // 1) Armazena o payload bruto no seu MockAPI (caso queira auditar)
    await fetch("https://6823ff4b65ba058033988478.mockapi.io/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    // 2) Extrai o ID do pagamento do webhook Mercado Pago
    const paymentId = req.body.data?.id;
    if (!paymentId) {
      return res.status(400).json({ error: "ID do pagamento não fornecido." });
    }

    // 3) Puxa detalhes completos do pagamento para obter external_reference e metadata
    const token = process.env.MP_TOKEN;
    const mpResponse = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const {
      payer,
      transaction_amount,
      status,
      external_reference,
      metadata,
    } = mpResponse.data;

    // Espera que metadata contenha user_id, user_email e user_name
    const userId = metadata.user_id;
    const cartNoImage = metadata.items
    const images = metadata.images
    console.log('metadata', metadata)
    const cart = cartNoImage.map((item: CartItemPedido, index: number) => ({
      ...item,
      image: images[index]
    }));
    if (!userId) {
      return res
        .status(400)
        .json({ error: "metadata.user_id não encontrado no pagamento." });
    }

    // 4) Busca perfil atual do lojista no MockAPI
    const profileUrl = `https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/shopProfile/${userId}`;
    const recebidosUrl = `https://6823ff4b65ba058033988478.mockapi.io/Recebidos`;
    
    const perfilResp = await fetch(profileUrl);
    if (!perfilResp.ok) {
      throw new Error(`Erro ao buscar perfil: ${perfilResp.status}`);
    }
    const perfil: ShopProfile = await perfilResp.json();
    const pedidosAtual: Pedido[] = perfil.pedidos ?? [];

    // 5) Mescla o pedido recebido (add ou update)
    const novoPedido: Pedido = {
      id: paymentId,
      external_reference,
      payer,
      transaction_amount,
      status,
      cart
    };

    const idx = pedidosAtual.findIndex(
      (p) => p.external_reference === external_reference
    );
    if (idx >= 0) {
      // Atualiza pedido existente
      pedidosAtual[idx] = { ...pedidosAtual[idx], ...novoPedido };
    } else {
      // Adiciona novo pedido
      pedidosAtual.push(novoPedido);
    }

    // 6) Envia o array mesclado de volta ao MockAPI
    const updateResp = await fetch(profileUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pedidos: pedidosAtual }),
    });
    if (!updateResp.ok) {
      throw new Error(`Erro ao atualizar pedidos: ${updateResp.status}`);
    }

    // 7) Se o pagamento foi aprovado, envia e‑mail de agradecimento
    if (status === "approved") {
      await fetch(recebidosUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: metadata.user_name ?? metadata.user_email, items: cart}),
      });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const html = `
        <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Presente Recebido</title>
</head>
<body style="margin:0;padding:0;font-family:Georgia, serif;background:#f8f2f0">
  <table width="100%" style="background:url('https://i.pinimg.com/736x/d2/c1/72/d2c172a1d59f320cf23fc18fadeb060e.jpg') center top/cover no-repeat;min-height:100vh">
    <tr>
      <td align="center" style="padding:60px 20px">
        <table width="100%" style="background:rgba(255,255,255,0.8);backdrop-filter:blur(10px);border-radius:12px;padding:40px;box-shadow:0 4px 30px rgba(0,0,0,0.1);border:1px solid rgba(255,255,255,0.3)">
          <tr>
            <td align="center">
              <h1 style="font-size:28px;color:#000000">Muito obrigado pelo presente!</h1>
              <p style="font-size:18px;color:#000000">${metadata.user_name ?? "Amigo(a)"}, recebemos sua contribuição de <strong>R$${transaction_amount}</strong>.</p>
              <p style="font-size:16px;color:#000000">Ficamos imensamente felizes com seu carinho e participação nesse momento tão especial.</p>
              <p style="font-size:16px;color:#000000">Com amor,<br/>Melissa & Evandro 💍</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: metadata.user_email,
        subject: "🎁 Presente Recebido - Agradecimento dos Noivos",
        html,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erro no webhook:", err);
    return res.status(500).json({ err });
  }
}
