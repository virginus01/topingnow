"use client";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { usePaginatedSWR } from "../utils/fetcher";
import Shimmer from "../components/shimmer";
import { useState } from "react";
import usePagination from "../utils/pagination";

export default function Lists({ topicData }) {
  const perPage = 5;
  const page = 1;
  let [data, setData] = useState(Shimmer(perPage));

  if (topicData.lists !== undefined && Array.isArray(topicData.lists.result)) {
    data = topicData.lists.result;
  }

  const paginatedData = usePagination(data, page, perPage);

  const topicSlug = topicData.slug;

  return (
    <ul>
      {paginatedData.map(
        ({ _id, title, description, slug, extraClass }: any, index: number) => (
          <li key={_id} id={slug}>
            <article className="relative bg-white pb-3 w-full shadow-xl ring-1 ring-gray-900/5 mb-10 rounded">
              <div
                className={`${extraClass} bg-gray-500 flex items-left justify-left gap-x-4 px-2 py-2 text-xs font-bold text-left text-white`}
              >
                #{index + 1}: {title}
              </div>
              <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
                <section
                  className={`${extraClass} mt-5 line-clamp-3 text-sm leading-6 text-gray-600`}
                >
                  <span>
                    <Link
                      prefetch={true}
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
                </section>
              </div>
            </article>
          </li>
        )
      )}
    </ul>
  );
}
