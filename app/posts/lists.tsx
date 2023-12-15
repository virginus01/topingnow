"use client";
import Link from "next/link";
import { getLists } from "@/app/lib/repo/lists_repo";
import DOMPurify from "isomorphic-dompurify";
import { NEXT_PUBLIC_GET_LISTS } from "@/constants";
import Loading from "../dashboard/loading";
import { usePaginatedSWR } from "../utils/fetcher";
import Shimmer from "../components/shimmer";

export default function Lists({ topicData }) {
  const perPage = 10;
  const page = 1;
  const url = `${NEXT_PUBLIC_GET_LISTS}?topicId=${topicData._id}&page=${page}&perPage=${perPage}`;

  // Slice topics array for current page
  const { paginatedData, loading } = usePaginatedSWR(url, page, perPage);

  if (loading || !Array.isArray(paginatedData)) {
    return <Shimmer />;
  }

  if (!paginatedData) {
    return <div>No Topic found</div>;
  }

  const lists = paginatedData;
  const { slug } = topicData;

  const topicSlug = slug;

  return (
    <ul>
      {lists.map(({ _id, title, description, slug }: any, index: number) => (
        <li key={_id} id={slug}>
          <div className="relative bg-white pb-3 w-full shadow-xl ring-1 ring-gray-900/5 mb-10 rounded">
            <div className="bg-gray-500 flex items-left justify-left gap-x-4 px-2 py-2 text-xs font-bold text-left text-white">
              #{index + 1}: {title}
            </div>
            <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
              <div className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
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
                      "loading"
                    )}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
