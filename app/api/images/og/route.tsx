import { ImageResponse } from "next/og";

//export const runtime = "edge";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);

  const hasLists = searchParams.has("lists");
  let lists: any = hasLists
    ? JSON.parse(String(searchParams.get("lists")))
    : [
        { title: "Virginus Alajekwu C" },
        { title: "Alajekwu Paschal O" },
        { title: "Chijioke Onwuachu M" },
      ];

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
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  // backgroundImage: "url(http://localhost:3000/images/grid.svg)",
                  backgroundPosition: "center",
                  maskImage:
                    "linear-gradient(180deg, white, rgba(255,255,255,0))",
                }}
              ></div>

              <div tw="flex h-screen flex-col">
                <div tw="flex justify-center text-center font-extrabold text-6xl text-blue-900 m-5">
                  Top 10 Best Flutter Developers in Lagos, Nigeria in 2024 now
                </div>
                <div tw="flex border-t-4 border-red-500"></div>

                <div tw="flex justify-center text-center items-center font-extrabold text-3xl text-blue-900 m-1">
                  {lists[0].title} is the Overral Best
                  <img
                    src={`http://localhost:3000/images/top_1.png`}
                    alt={""}
                    width={100}
                    height={100}
                    tw=" rounded-sm object-cover"
                  />
                </div>
                <div tw="flex justify-center text-center items-center m-1">
                  <img
                    src={`http://localhost:3000/images/arrow_point.png`}
                    alt={""}
                    width={60}
                    height={60}
                    tw=" rounded-sm object-cover"
                  />
                </div>
                <div tw="flex items-end flex-grow">
                  {lists.map((post, i) => {
                    const height = heights[i];
                    let rate = height.replace("h-", "");
                    if (rate === "96") {
                      rate = "100";
                    }

                    const d = 400 / lists.length;
                    let w = heights.length - lists.length + d;

                    if (heights.length > i) {
                      return (
                        <div tw="flex flex-col" key={i}>
                          <div
                            tw={`m-2 rounded p-2 flex text-black font-bold items-end w-[${w}px] overflow-hidden`}
                          >
                            <div tw="overflow-hidden flex text-sm">{rate}%</div>
                          </div>
                          <div
                            tw={`${height} bg-blue-600 m-2 rounded p-2 shadow-xl  flex text-white font-bold items-end w-[${w}px] overflow-hidden`}
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
