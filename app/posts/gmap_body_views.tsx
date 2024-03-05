import {
  ClockIcon,
  GlobeAltIcon,
  HomeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import RatingStars from "../components/widgets/rating_stars";
import {
  base_images_url,
  base_url,
  checkImageValidity,
  extractDomain,
  isNull,
} from "../utils/custom_helpers";
import { getS3Url } from "../lib/repo/files_repo";
import { LIST_IMAGE, PPC } from "@/constants";
import { listImage } from "../utils/list_image";

export default function GmapBodyView({ post, topicData, isFull = false }) {
  if (isNull(post) || isNull(topicData)) {
    return <div>loading..</div>;
  }

  let {
    _id,
    title,
    description,
    slug,
    extraClass,
    featuredImagePath,
    generatedImagePath,
    position,
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
    is_english,
    from_all_image_1,
  } = post;

  const imgUrl = `${LIST_IMAGE}/${slug}`;

  let schedule: any = [];
  if (workday_timing) {
    schedule = JSON.parse(workday_timing);
  }

  let core_tags: any = [];
  if (tags) {
    core_tags = JSON.parse(tags);
  }

  const listSlug = topicData.slug + "/" + slug;

  return (
    <article className="relative bg-white w-full shadow-xl ring-1 ring-gray-900/5 mb-10 rounded">
      <div
        className={`${extraClass} bg-gray-100 text-black border-b border-gray-300`}
      >
        <div className="flex justify-between h-14">
          {isFull ? (
            <Link
              rel="follow"
              className="text-red-600"
              href={String(base_url(`${topicData.slug}#${slug}`))}
            >
              <div className="flex flex-col w-[100%]">
                <div className="flex pl-3 font-bold">
                  <div className="flex">
                    No. {position} in {topicData.title}
                  </div>
                </div>
                {!isNull(ratingScore) ? (
                  <div className="flex pl-3 ml-10">
                    <RatingStars ratingScore={ratingScore} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Link>
          ) : (
            <div className="flex flex-col w-[100%]">
              <div className="flex pl-3 font-bold">
                <div className="flex">
                  Top {position}: {title}
                </div>
              </div>
              {!isNull(ratingScore) ? (
                <div className="flex pl-3 ml-10">
                  <RatingStars ratingScore={ratingScore} />
                </div>
              ) : (
                <></>
              )}
            </div>
          )}

          {!isFull && (
            <div className="flex flex-col bg-red-600 text-white w-44 rounded-tr">
              <a
                rel="nofollow"
                target="_blank"
                href={`${PPC}?url=${
                  website ? website : base_url(`${topicData.slug}/${slug}`)
                }&utm_campaign=${topicData.slug}`}
              >
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
          )}
        </div>
      </div>
      <div className="lg:flex lg:justify-between border-b border-gray-300">
        <div className="lg:flex lg:flex-col bg-red-200 w-full lg:w-[50%]">
          <div className="flex">
            <Image
              src={listImage(featuredImagePath, generatedImagePath, slug)}
              alt={`${title}: ${topicData.title}`}
              style={{ width: "100%" }}
              width={500}
              height={200}
              className="h-48 w-full rounded-sm object-cover"
              blurDataURL={base_images_url("beams-with.png")}
              placeholder="blur"
              loading="lazy"
            />
          </div>
        </div>
        <div className="lg:flex lg:flex-col p-3 w-full lg:w-[50%]">
          {isFull ? (
            <iframe
              className="h-[100%] w-full"
              src={post.gmap_link}
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          ) : (
            <>
              <Link href={listSlug}>
                <h2 className="flex font-bold pb-2">{subTitle}</h2>{" "}
              </Link>

              <div className="flex">
                {title} is the number {position} in the list of{" "}
                {topicData.title}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="lg:flex lg:flex-grow lg:justify-between border-b border-gray-300">
        <div className="flex flex-col lg:flex-grow w-full lg:w-[40%] lg:border-r border-gray-300 p-2">
          {!isNull(post.phone) && (
            <div className="flex items-center border-b border-gray-100 text-sm p-1">
              <PhoneIcon className="h-4 w-4 mr-2" /> {phone}
            </div>
          )}
          {!isNull(address) && (
            <div className="flex items-center border-b border-gray-100 text-xs p-1">
              <HomeIcon className="h-5 w-5 mr-2" /> {address}
            </div>
          )}
          {!isNull(post.website) && (
            <div className="flex items-center border-b border-gray-100 text-xs p-1">
              <GlobeAltIcon className="h-5 w-5 mr-2" />{" "}
              {extractDomain(post.website)}
            </div>
          )}

          {!isNull(post.time_zone) && (
            <div className="flex items-center border-b border-gray-100 text-xs p-1">
              <ClockIcon className="h-5 w-5 mr-2" /> {post.time_zone}
            </div>
          )}
        </div>

        <div className="lg:flex lg:flex-grow lg:flex-col w-full lg:w-[60%]">
          <div className="flex justify-between">
            <div className="flex flex-col w-[50%] border-r p-2">
              <div className="text-md">
                <u>Core Services & Tags:</u>

                {core_tags &&
                  core_tags.map((c, index) => (
                    <div className="flex items-center" key={index}>
                      <div className="bg-red-500 w-1 h-1 mr-2 text-sm"></div>
                      <div className="text-sm">{c}</div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-grow w-[50%]  p-2">
              <div className="text-md justify-center items-center">
                <u>Services Hours:</u>
                {schedule &&
                  Array.isArray(schedule) &&
                  schedule.map((entry, index) => (
                    <div className="flex items-center" key={index}>
                      <div className="bg-red-500 w-1 h-1 mr-2 text-sm"></div>
                      <div className="text-[12px]" key={index}>
                        <strong> {entry[0]}</strong>:
                        {entry[3] &&
                          entry[3].map((timing, timingIndex) => (
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

      {is_english == "en" ? <div className="p-2">{description}</div> : <></>}

      {!isFull ? (
        <div className="flex justify-end items-end">
          <Link rel="nofollow" className="text-red-500" href={listSlug}>
            <div className="pt-2 items-end mr-3 h-10">see details</div>
          </Link>
        </div>
      ) : (
        <div className="flex justify-end items-end  border-t border-gray-300">
          <div className="flex flex-col bg-red-600 text-white w-44 rounded-br">
            <a
              rel="nofollow"
              target="_blank"
              href={`${PPC}?url=${
                website ? website : base_url(`${topicData.slug}/${slug}`)
              }&utm_campaign=${topicData.slug}`}
            >
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
      )}
    </article>
  );
}
