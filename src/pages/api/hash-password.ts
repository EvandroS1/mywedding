import bcrypt from "bcrypt";
import { VercelRequest, VercelResponse } from "@vercel/node";

const saltRounds = 10;

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "POST") {
    const { password } = req.body;

    if (!password) {
      return res
        .status(400)
        .json({ error: "Missing password in request body" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return res.status(200).json({ hashedPassword });
    } catch (error) {
      console.error("Error hashing password:", error);
      return res.status(500).json({ error: "Failed to hash password" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed. Use POST." });
  }
};
