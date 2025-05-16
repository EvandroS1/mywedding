// pages/api/pay.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = process.env.MP_TOKEN;

  const { items, userName } = req.body;
  if (!token) {
    return res.status(500).json({ error: "Token não encontrado" });
  }

  try {
    const response = await axios.post(
      "https://api.mercadopago.com/checkout/preferences",
      {
        items: items,
        payer: {
          first_name: userName ?? "convidado",
          last_name: ""
        },
        back_urls: {
          success: "https://wedding-beige-psi.vercel.app/presentes",
          failure: "https://wedding-beige-psi.vercel.app/presentes",
          pending: "https://wedding-beige-psi.vercel.app/presentes",
        },
        auto_return: "approved",
        external_reference: `order-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ init_point: response.data.init_point });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    res.status(500).json({ error: "Erro ao criar preferência de pagamento" });
  }
}
