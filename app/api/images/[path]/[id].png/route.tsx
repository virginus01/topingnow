import { ImageResponse } from "next/og";
import { base_images_url, base_url, isNull } from "@/app/utils/custom_helpers";
import { getTopic } from "@/app/roadmap/topics_roadmap";

export const runtime = "edge";

export async function GET(
  request: any,
  { params }: { params: { path: string; id: string } }
) {
  try {
    const topicSlug = params.id.replace(".png", "");
    const page = 1;
    let result = await getTopic(topicSlug, page);

    let data: any = {};
    if (result) {
      data = result;
    }

    if (isNull(result)) {
      return { success: false, msg: "not found" };
    }

    let lists: any[] = [];

    if (data.lists && data.lists.result) {
      lists = data.lists.result.map((l: any) => ({ title: l.title }));
    }

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

    return new ImageResponse(
      (
        <div
          tw="w-full"
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${base_images_url("beams-with.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div tw="flex h-screen flex-col">
            <div tw="flex justify-center text-center font-extrabold text-6xl text-blue-900 m-5">
              {data.title ?? ""}
            </div>
            <div tw="flex border-t-4 border-red-500"></div>

            <div tw="flex justify-center text-center items-center font-extrabold text-3xl text-blue-900 m-1">
              <div tw="flex">
                {lists[0]?.title
                  ? `${lists[0].title} is the Overall Best`
                  : "no list yet"}
              </div>
              <img
                src={base_images_url("top_1.png")}
                alt=""
                width={100}
                height={100}
                tw="flex rounded-sm object-cover"
              />
            </div>
            <div tw="flex justify-center text-center items-center m-1">
              <img
                src={base_images_url("arrow_point.png")}
                alt=""
                width={60}
                height={60}
                tw="flex rounded-sm object-cover"
              />
            </div>
            <div tw="flex items-end flex-grow">
              {lists.map((post, i) => {
                if (i <= 24) {
                  const height = heights[i];
                  let rate = height.replace("h-", "");
                  if (rate === "96") {
                    rate = "100";
                  }

                  let w = 60;

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
      ),
      {
        width: 1920,
        height: 1080,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return { success: false, msg: "Internal Server Error" };
  }
}
