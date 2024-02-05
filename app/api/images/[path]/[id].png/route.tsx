export async function GET(
  request: any,
  { params }: { params: { path: string; id: string } }
) {
  let imgUrl = `${process.env.NEXT_PUBLIC_SCREENSHOT_URL}/?url=${process.env.NEXT_PUBLIC_BASE_URL}/gimages/${params.path}/${params.id}`;

  //imgUrl = "https://topingnow.com/gimages/topic/best-fullstack-developers-lagos-nigeria";

  const response: any = await fetch(imgUrl);

  const newHeaders = new Headers(response.headers);
  newHeaders.set("Content-Type", response.headers.get("Content-Type"));

  return new Response(response.body, {
    headers: newHeaders,
    status: response.status,
    statusText: response.statusText,
  });
}
