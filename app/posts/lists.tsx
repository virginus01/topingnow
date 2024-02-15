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
import { GlobeAltIcon, PhoneIcon, HomeIcon } from "@heroicons/react/24/outline";
import RatingStars from "../components/widgets/rating_stars";

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
            ranking_position,
            external_image,
            phone,
            website,
            all_images,
            subTitle,
            ratingScore,
            address,
            workday_timing,
            category,
            tags,
            type,
          }: any,
          index: number
        ) => {
          const imgUrl = `${LIST_IMAGE}/${slug}`;

          let from_all_image: any = [];

          if (all_images) {
            from_all_image = all_images
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item !== "'" && item !== "," && item !== "''");
          }

          const schedule = JSON.parse(workday_timing);
          const core_tags = JSON.parse(tags);

          const listSlug = topicData.slug + "/" + slug;

          return (
            <li key={_id} id={slug}>
              <article className="relative bg-white pb-3 w-full shadow-xl ring-1 ring-gray-900/5 mb-10 rounded">
                <div
                  className={`${extraClass} bg-gray-100 text-black border-b border-red-600`}
                >
                  <div className="flex justify-between h-14">
                    <div className="flex flex-col w-[100%]">
                      <div className="flex pl-3 font-bold">
                        <div className="flex">
                          Top {ranking_position}: {title}
                        </div>
                      </div>
                      {!isNull(ratingScore) ? (
                        <div className="flex pl-3 ml-10">
                          {ratingScore}
                          <RatingStars ratingScore={ratingScore} />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="flex flex-col bg-red-600 text-white w-44 rounded-tr">
                      <a rel="nofollow" href="https://ppc.localhost:3000">
                        <div className="flex items-center justify-between h-12 p-1">
                          <div className="flex items-center">
                            <span className="mr-0">visit website</span>
                          </div>
                          <div className="flex items-center">
                            <GlobeAltIcon className="h-5 w-5" />
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between h-48 border-b border-red-600">
                  <div className="flex flex-col bg-red-500 w-[100%]">
                    <div className="flex">
                      {!isNull(featuredImagePath) ? (
                        <div className="m-0">
                          <Image
                            src={getS3Url(featuredImagePath)}
                            alt={title}
                            style={{ width: "100%" }}
                            width={500}
                            height={200}
                            className="h-48 w-full rounded-sm object-cover"
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
                          className="h-48 w-full rounded-sm object-cover"
                          priority
                        />
                      ) : !isNull(external_image) ? (
                        <Image
                          src={external_image}
                          alt={title}
                          style={{ width: "100%" }}
                          width={1920}
                          height={1080}
                          className="h-48 w-full rounded-sm object-cover"
                          priority
                        />
                      ) : !isNull(from_all_image[0]) ? (
                        <Image
                          src={from_all_image[0]}
                          alt={title}
                          style={{ width: "100%" }}
                          width={1920}
                          height={1080}
                          className="h-48 w-full rounded-sm object-cover"
                          priority
                        />
                      ) : !isNull(
                          process.env.NEXT_PUBLIC_BASE_URL + "/api/images/og"
                        ) ? (
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_BASE_URL + "/api/images/og"
                          }
                          alt={title}
                          style={{ width: "100%" }}
                          width={1920}
                          height={1080}
                          className="h-48 w-full rounded-sm object-cover"
                          priority
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col p-3 w-[100%]">
                    <Link href={listSlug}>
                      <h2 className="flex font-bold pb-2">{subTitle}</h2>{" "}
                    </Link>

                    <div className="flex">
                      {title} is the number {ranking_position} in the list of{" "}
                      {topicData.title}
                    </div>
                  </div>
                </div>

                {type === "gmap_business" ? (
                  <div className="flex justify-between">
                    <div className="flex flex-col w-[40%] border-r border-b border-red-500 p-2">
                      <div className="flex items-center border-b border-gray-300 text-sm p-1">
                        <PhoneIcon className="h-4 w-4 mr-2" /> {phone}
                      </div>

                      <div className="flex items-center border-b border-gray-300 text-sm p-1">
                        <HomeIcon className="h-5 w-5 mr-2" /> {address}
                      </div>
                    </div>

                    <div className="flex flex-col w-[60%]">
                      <div className="flex justify-between">
                        <div className="flex flex-col w-[50%] border-r border-b border-red-500 p-2">
                          <div className="text-md">
                            <u>Core Services & Tags:</u>

                            {core_tags.map((c, index) => (
                              <div className="flex items-center" key={index}>
                                <div className="bg-red-500 w-1 h-1 mr-2 text-sm"></div>
                                <div className="text-sm">{c}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col w-[50%] border-b border-red-500 p-2">
                          <div className="text-md justify-center items-center">
                            <u>Services Hours:</u>
                            {schedule.map((entry, index) => (
                              <div className="flex items-center">
                                <div className="bg-red-500 w-1 h-1 mr-2 text-sm"></div>
                                <div className="text-sm" key={index}>
                                  <strong> {entry[0]}</strong>:
                                  {entry[3].map((timing, timingIndex) => (
                                    <span className="pl-3" key={timingIndex}>
                                      {timing[0]}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="p-2">{description}</div>

                <div className="flex justify-end items-end">
                  <Link className="text-red-400" href={listSlug}>
                    <div className="pt-2 items-end mr-3 h-10">see details</div>
                  </Link>
                </div>
              </article>
            </li>
          );
        }
      )}
    </ul>
  );
}
