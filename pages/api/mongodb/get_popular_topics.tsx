import { getPopularTopics } from "./query";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: { method: any },
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const data = await getPopularTopics();

      if (!data) {
        return res.status(500).json({ error: "Failed to fetch popular lists" });
      }

      res.status(200).json({ data });
      break;

    default:
      res.status(405).end();
  }
}
