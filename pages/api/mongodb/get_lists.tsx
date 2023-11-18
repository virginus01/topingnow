import { WithId, Document } from "mongodb";
import { getLists } from "./query";

export default async function handler(
  req: { method: any; query: { topicId: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: { error?: string; data?: WithId<Document>[] }): void;
        new (): any;
      };
      end: { (): void; new (): any };
    };
  }
) {
  switch (req.method) {
    case "GET":
      const { topicId } = req.query;

      const data = await getLists({ topicId });

      if (!data) {
        res.status(500).json({ error: "Failed to fetch lists" });
      } else {
        res.status(200).json({ data });
      }
      break;

    default:
      res.status(405).end();
  }
}
