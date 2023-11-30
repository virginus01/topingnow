///import { S3 } from "aws-sdk";

export default async (req, res) => {
  if (req.method === "POST") {
    const csvData = req.body;

    if (!csvData) {
      return res.status(400).json({ error: "No file data received" });
    }

    const currentTimestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 7);
    const name = `test_file_${currentTimestamp}_${randomString}.csv`;

    const params = {
      Bucket: "topingnow",
      Key: "uploads/" + name,
      Body: csvData,
    };
  }

  res.status(405).json({ error: "Method not allowed" });
};
