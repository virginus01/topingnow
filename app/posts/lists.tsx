"use client";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { usePaginatedSWR } from "../utils/fetcher";
import Shimmer from "../components/shimmer";
import { useState } from "react";
import usePagination from "../utils/pagination";
import Image from "next/image";
import { getS3Url } from "../lib/repo/files_repo";
import { LIST_IMAGE } from "@/constants";
import { isNull } from "../utils/custom_helpers";

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
        (
          {
            _id,
            title,
            description,
            slug,
            extraClass,
            featuredImagePath,
            generatedImagePath,
            position,
            external_image,
          }: any,
          index: number
        ) => {
          const imgUrl = `${LIST_IMAGE}/${slug}`;

          return (
            <li key={_id} id={slug}>
              <article className="relative bg-white pb-3 w-full shadow-xl ring-1 ring-gray-900/5 mb-10 rounded">
                <div
                  className={`${extraClass} bg-gray-500 flex items-left justify-left gap-x-4 px-2 py-2 text-xs font-bold text-left text-white`}
                >
                  #{index + 1}: {title}
                </div>

                {!isNull(featuredImagePath) ? (
                  <div className="h-200">
                    <Image
                      src={getS3Url(featuredImagePath)}
                      alt={title}
                      style={{ width: "100%" }}
                      width={500}
                      height={200}
                      className="w-full rounded-sm object-cover"
                      priority
                    />
                  </div>
                ) : !isNull(generatedImagePath) ? (
                  <Image
                    src={getS3Url(generatedImagePath)}
                    alt={title}
                    style={{ width: "100%" }}
                    width={1920}
                    height={1080}
                    className="w-full rounded-sm object-cover"
                    priority
                  />
                ) : !isNull(external_image) ? (
                  <Image
                    src={external_image}
                    alt={title}
                    style={{ width: "100%" }}
                    width={1920}
                    height={1080}
                    className="w-full rounded-sm object-cover"
                    priority
                  />
                ) : (
                  <></>
                )}
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
                      is {position} in the list of {title}.
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
          );
        }
      )}
    </ul>
  );
}
