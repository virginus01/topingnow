import { Key } from "react";

import { UrlObject } from "url";
import { getLists } from "@/app/lib/repo/lists_repo";

export default async function ListTable({ topicData }) {
  if (!topicData) {
    console.log(topicData);
    return <>loading...</>;
  }

  const result = await getLists(topicData._id, 1, 10);
  const lists = result.data;

  if (!lists || !Array.isArray(lists)) {
    console.log(lists);
    return <>loading...</>;
  }

  return (
    <div className="relative flex sm:py-7">
      <div className="relative  px-1 pb-2 pt-2 sm:mx-auto w-full">
        <div className="relative bg-white pb-3 shadow-xl ring-1 ring-gray-900/5 mb-10 rounded-md">
          <div className="bg-gray-500 flex items-left justify-left gap-x-4 px-4 py-2 text-xs font-bold text-left text-white">
            List of {topicData.title}
          </div>
          <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
            <div className="line-clamp-1 text-sm leading-6 text-gray-600">
              {lists.map(
                (post: {
                  title: any;
                  _id: Key | null | undefined;
                  slug: string | UrlObject;
                }) => (
                  <a key={post._id} href={`#${post.slug}`}>
                    <div className="flex items-center pt-3">
                      <div className="bg-red-900 w-1 h-1 mr-2 text-sm"></div>
                      <div className="align-middle line-clamp-1 text-transform: lowercase">
                        {post.title}
                      </div>
                    </div>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
