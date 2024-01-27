import { NextResponse } from "next/server";
//import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export async function GET(
  request: any,
  { params }: { params: { path: string; id: string } }
) {
  let browser: any = null;

  // if (process.env.NEXT_PUBLIC_BASE_URL) {
  browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  //}

  const page = await browser.newPage();
  let res = NextResponse.next();

  const newHeaders = new Headers(request.headers);

  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

  await page.goto(
    `${process.env.NEXT_PUBLIC_BASE_URL}/gimages/${params.path}/${params.id}`,
    {
      waitUntil: "networkidle0",
    }
  );

  await page.evaluate(() => {
    const style = document.createElement("style");
    style.innerHTML = `* { transition: none !important; animation: none !important; }`;
    document.head.appendChild(style);
  });

  const buffer = await page.screenshot({
    omitBackground: true,
    fullPage: true,
  });

  await browser.close();
  newHeaders.set("Content-Type", "image/png");
  return new Response(buffer);
}
