import { WithId, Document } from "mongodb";
import { getTopic } from "./query";

export default async function handler(
  req: { method: any; query: { id: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: { error?: string; data?: WithId<Document> }): void;
        new (): any;
      };
      end: { (): void; new (): any };
    };
  }
) {
  switch (req.method) {
    case "GET":
      const { id } = req.query;
      const data = await getTopic({ id });

      if (!data) {
        res.status(500).json({ error: "Failed to fetch post topic" });
      } else {
        res.status(200).json({ data });
      }
      break;

    default:
      res.status(405).end();
  }
}
