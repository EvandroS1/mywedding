import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await fetch("https://6823ff4b65ba058033988478.mockapi.io/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });
    
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
    
    } catch (err) {
      console.error("Erro ao enviar para MockAPI:", err);
      res.status(500).json({ error: 'Erro ao enviar para o banco' });
    }
    try {
      const paymentId = req.body.data?.id;
      console.log('paymentId', paymentId)

      if (!paymentId) {
        return res.status(400).json({ error: 'ID do pagamento não fornecido.' });
      }

      // Obter detalhes do pagamento
      const token = process.env.MP_TOKEN;
      const paymentDetails = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { payer, transaction_amount, status } = paymentDetails.data;
      const metadata = paymentDetails.data.metadata;
      console.log('metadata-----------', metadata)

      console.log('payer, transaction_amount, status', payer, transaction_amount, status)

      if (status === 'approved') {
        // Enviar e-mail de agradecimento
        const transporter = nodemailer.createTransport({
          service: 'gmail',
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
        <body style="margin:0;padding:0;font-family: 'Georgia', serif;background-color: #f8f2f0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-image: url('https://i.pinimg.com/736x/21/9b/e2/219be2d87cbf9a64526124109b6f8d62.jpg'); background-size: cover; background-repeat: no-repeat; background-position: center top; min-height: 100vh;">
            <tr>
              <td align="center" style="padding: 60px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: rgba(255,255,255,0.9); border-radius: 12px; padding: 40px;">
                  <tr>
                    <td align="center">
                      <h1 style="font-size: 28px; color: #8B0000;">Muito obrigado pelo presente!</h1>
                      <p style="font-size: 18px; color: #333;">${payer.first_name}, recebemos sua contribuição de <strong>R$${transaction_amount}</strong>.</p>
                      <p style="font-size: 16px; color: #555;">Ficamos imensamente felizes com seu carinho e participação nesse momento tão especial.</p>
                      <p style="font-size: 16px; color: #555;">Com amor,<br/>Os noivos 💍</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>`;

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: metadata.user_email,
          subject: '🎁 Presente Recebido - Agradecimento dos Noivos',
          html,
        });
      }

      res.status(200).json({ received: true });
    } catch (err) {
      console.error("Erro ao processar webhook:", err);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

