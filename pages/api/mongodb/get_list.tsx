import { getList } from "./query";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: { method: any; query: { listId: any } },
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { listId } = req.query;

      if (listId === undefined) {
        res.status(200).json({ error: "Id needed" });
      }

      const data = await getList({ listId });

      if (!data) {
        return res.status(500).json({ error: "Failed to fetch list" });
      }

      res.status(200).json({ data });
      break;

    default:
      res.status(405).end();
  }
}
