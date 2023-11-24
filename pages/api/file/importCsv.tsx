import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // Create the uploads directory if it doesn't exist
    const uploadsDirectory = path.join(process.cwd(), "/public/uploads");
    if (!fs.existsSync(uploadsDirectory)) {
      fs.mkdirSync(uploadsDirectory);
    }

    // Define the path where you want to save the file
    const currentTimestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 7);
    const filePath = path.join(
      uploadsDirectory,
      `test_file_${currentTimestamp}_${randomString}.csv`
    );

    // Write the data to the file
    fs.writeFileSync(filePath, data);

    res.status(200).json({ message: "File uploaded successfully" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
