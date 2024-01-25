import { ImageResponse } from "next/og";

//export const runtime = "edge";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);

  const hasLists = searchParams.has("lists");
  let lists: any = hasLists
    ? JSON.parse(String(searchParams.get("lists")))
    : [];

  const heights = [
    "h-96",
    "h-80",
    "h-72",
    "h-64",
    "h-60",
    "h-56",
    "h-52",
    "h-48",
    "h-44",
    "h-40",
    "h-36",
    "h-32",
    "h-28",
    "h-24",
    "h-20",
    "h-16",
    "h-14",
    "h-12",
    "h-11",
    "h-10",
    "h-9",
    "h-8",
    "h-7",
    "h-6",
    "h-5",
    "h-4",
    "h-3.5",
    "h-3",
    "h-2.5",
    "h-2",
    "h-1.5",
    "h-1",
  ];

  if (Array.isArray(lists) && lists.length > 0) {
    try {
      return new ImageResponse(
        (
          <div
            style={{
              height: "100vh", // Use 100vh for full viewport height
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: "url('http://localhost:3000/images/beams.jpg')", // Adjust the path as needed
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div tw="absolute inset-0 bg-[url(http://localhost:3000/images/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div tw="flex">
              <div tw="flex flex-col flex-col-reverse">
                <div tw="flex h-screen w-screen items-end">
                  {lists.map((post, i) => {
                    const height = heights[i];
                    let rate = height.replace("h-", "");
                    if (rate == "96") {
                      rate = "100";
                    }

                    const d = 800 / lists.length;
                    let w = heights.length - lists.length + d;

                    if (heights.length > i) {
                      return (
                        <div tw="flex flex-col" key={i}>
                          <div
                            tw={`m-2 rounded p-2 flex text-black font-bold items-end inline-block w-[${w}px] overflow-hidden`}
                          >
                            <div tw="overflow-hidden flex text-sm">{rate}%</div>
                          </div>
                          <div
                            tw={`${height} bg-blue-600 m-2 rounded p-2 shadow-xl  flex text-white font-bold items-end inline-block w-[${w}px] overflow-hidden`}
                          >
                            <div tw="overflow-hidden flex text-sm">
                              {post.title}
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
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
  } else {
    return new Response(JSON.stringify({ success: false, msg: "no list" }), {
      status: 200,
    });
  }
}
