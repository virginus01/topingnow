import { ImageResponse } from "next/og";

//export const runtime = "edge";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);

  const hasUrl = searchParams.has("url");

  let url: any = hasUrl ? String(searchParams.get("url")) : "";

  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            boxSizing: "border-box",
            borderWidth: 0,
            borderStyle: "solid",
            borderColor: "#e5e7eb",
            WebkitTextSizeAdjust: "100%",
            MozTabSize: 4,
            OTabSize: 4,
            tabSize: 4,
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontFeatureSettings: "normal",
            fontVariationSettings: "normal",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          <div
            style={{
              height: "100vh", // Use 100vh for full viewport height
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url("${process.env.NEXT_PUBLIC_BASE_URL}/images/beams.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div tw="flex h-screen flex-col">
              <div tw="flex justify-center text-center font-extrabold text-6xl text-blue-900 m-5">
                Top 10 Best Flutter Developers in Lagos, Nigeria in 2024 now
              </div>
              <div tw="flex border-t-4 border-red-500"></div>
              No 5: Test
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ success: false, msg: "error" }), {
      status: 200,
    });
  }
}
