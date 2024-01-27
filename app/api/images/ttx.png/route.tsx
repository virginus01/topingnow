import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(request: any) {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
  let res = NextResponse.next();

  const newHeaders = new Headers(request.headers);

  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

  await page.goto("http://localhost:3000/ttx", { waitUntil: "networkidle0" });

  await page.evaluate(() => {
    const style = document.createElement("style");
    style.innerHTML = `* { transition: none !important; animation: none !important; }`;
    document.head.appendChild(style);
  });

  const buffer = await page.screenshot({
    fullPage: true,
  });

  await browser.close();
  newHeaders.set("Content-Type", "image/png");
  return new Response(buffer);
}
