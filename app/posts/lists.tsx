"use client";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { NEXT_PUBLIC_GET_LISTS } from "@/constants";
import { usePaginatedSWR } from "../utils/fetcher";
import Shimmer from "../components/shimmer";
import { useState } from "react";

export default function Lists({ topicData }) {
  const perPage = 3;
  const page = 1;
  let [data, setData] = useState(Shimmer(perPage));

  const url = `${NEXT_PUBLIC_GET_LISTS}?topicId=${topicData._id}&page=${page}&perPage=${perPage}`;

  // Slice topics array for current page
  const { paginatedData, loading } = usePaginatedSWR(url, page, perPage);

  if (!loading) {
    data = paginatedData;
  }
  if (data.length == 0) {
    data = Shimmer(perPage);
  }

  const topicSlug = topicData.slug;

  return (
    <ul>
      {data.map(
        ({ _id, title, description, slug, extraClass }: any, index: number) => (
          <li key={_id} id={slug}>
            <div className="relative bg-white pb-3 w-full shadow-xl ring-1 ring-gray-900/5 mb-10 rounded">
              <div
                className={`${extraClass} bg-gray-500 flex items-left justify-left gap-x-4 px-2 py-2 text-xs font-bold text-left text-white`}
              >
                #{index + 1}: {title}
              </div>
              <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
                <div
                  className={`${extraClass} mt-5 line-clamp-3 text-sm leading-6 text-gray-600`}
                >
                  <span>
                    <Link
                      href={`${topicSlug}/${slug}`}
                      className="text-red-900 font-medium"
                    >
                      {title}
                    </Link>{" "}
                    is {index + 1} in the list of {title}.
                    <div>
                      {description ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(description),
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
