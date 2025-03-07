import type { NextApiRequest, NextApiResponse } from "next";
import { register } from "../../../../backend/src/controllers/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await register(req, res);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: error.message || "Greška pri registraciji" });
      } else {
        res.status(500).json({ message: "Nepoznata greška pri registraciji" });
      }
    }
  } else {
    res.status(405).json({ message: "Metoda nije dozvoljena" });
  }
}
