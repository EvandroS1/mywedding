import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Aqui você pode tratar os eventos, como:
    // if (req.body.type === "payment" && req.body.action === "payment.created") { ... }
    try {
      fetch(
        "https://6823ff4b65ba058033988478.mockapi.io/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );
    } catch {
      console.error("Error fetching");
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
