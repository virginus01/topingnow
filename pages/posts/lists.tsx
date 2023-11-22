import { useEffect, useState } from "react";
import PostListItem from "./post_lists_items";
import { getLists } from "../../lib/repo/lists_repo";
import Link from "next/link";

export default function Lists({ topicData, lists }) {
  if (!topicData || !lists) {
    return <>loading...</>;
  }

  const { id, slug, title } = topicData;

  const topicSlug = slug;

  return (
    <ul>
      {lists.map(({ _id, id, name, details, slug }: any, index: number) => (
        <li key={_id} id={slug}>
          <div className="relative bg-white pb-3 w-full shadow-xl ring-1 ring-gray-900/5 mb-10">
            <div className="bg-gray-500 flex items-left justify-left gap-x-4 px-2 py-2 text-xs font-bold text-left text-white">
              #{index + 1}: {name}
            </div>
            <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
              <div className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                <span>
                  <Link
                    href={`${topicSlug}/${slug}`}
                    className="text-red-500 font-medium"
                  >
                    {name}
                  </Link>{" "}
                  is {index + 1} in the list of {title}.
                  <div dangerouslySetInnerHTML={{ __html: details }} />
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
