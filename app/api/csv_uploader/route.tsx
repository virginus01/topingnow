import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ msg: "file is required" }, { status: 400 });
    }

    console.log(file);

    return NextResponse.json({ success: true, fileName: file.name });
  } catch (error) {
    return NextResponse.json({ msg: "error uploading file" });
  }
}
