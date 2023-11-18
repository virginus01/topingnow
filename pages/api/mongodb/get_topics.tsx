import { WithId, Document } from "mongodb";
import { getTopics } from "./query";
import { NextApiResponse } from "next";

export default async function handler(
  req: { method: any; query: { top_id: any } },
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { top_id } = req.query;

      const data = await getTopics({ top_id });

      if (!data) {
        res.status(500).json({ error: "Failed to fetch topics" });
      } else {
        res.status(200).json({ data });
      }
      break;

    default:
      res.status(405).end();
  }
}
