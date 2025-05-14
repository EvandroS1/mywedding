// pages/api/pay.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = process.env.MP_TOKEN;
  console.log('----------------token', token)

  if (!token) {
    return res.status(500).json({ error: 'Token não encontrado' });
  }

  try {
    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      {
        items: [{ title: 'Produto', quantity: 1, currency_id: 'BRL', unit_price: 100 }],
        back_urls: {
          success: "https://wedding-beige-psi.vercel.app/presentes",
          failure: "https://wedding-beige-psi.vercel.app/presentes",
          pending: "https://wedding-beige-psi.vercel.app/presentes"
        },
        auto_return: "approved"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({ init_point: response.data.init_point });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({ error: 'Erro ao criar preferência de pagamento' });
  }
}
