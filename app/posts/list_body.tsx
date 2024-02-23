import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { getS3Url } from "../lib/repo/files_repo";
import { extractDomain, isNull } from "../utils/custom_helpers";
import Lists from "./lists";
import Link from "next/link";
import {
  GlobeAltIcon,
  PhoneIcon,
  HomeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import RatingStars from "../components/widgets/rating_stars";

export default function ListBody({ post, reviews }) {
  if (!post) {
    return <>loading..</>;
  }

  const {
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
  } = post;

  let from_all_image: any = [];

  if (all_images) {
    from_all_image = all_images
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "'" && item !== "," && item !== "''");
  }

  const schedule = JSON.parse(workday_timing);
  const core_tags = JSON.parse(tags);

  const listSlug = "/" + slug;

  post.gmap_link = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBDBEybiy_vVEEIOZy5IuuhantILmGIhg0&center=${post.latitude},${post.longitude}&zoom=15&q=${post.latitude}%2C${post.longitude}`;

  return (
    <div className="relative flex sm:py-7">
      <div className="relative px-1 pb-2 pt-2 sm:mx-auto w-full sm:px-2">
        <article className="relative bg-white pb-3 w-full shadow-xl ring-1 ring-gray-900/5 mb-10 rounded">
          {!isNull(featuredImagePath) && (
            <div className="h-200">
              <Image
                src={getS3Url(featuredImagePath)}
                alt={title}
                style={{ width: "100%" }}
                width={200}
                height={200}
                className="w-full rounded-sm object-cover"
                priority
              />
            </div>
          )}

          <div
            className={`${extraClass} bg-gray-100 text-black border-b border-red-600`}
          >
            <div className="flex justify-between h-14">
              <div className="flex flex-col w-[100%]">
                <div className="flex pl-3 font-bold">
                  <div className="flex">
                    <h2>
                      <Link href={"/" + post.topicData.slug}>
                        Top {position} in {post.topicData.title}
                      </Link>
                    </h2>
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
                    src={process.env.NEXT_PUBLIC_BASE_URL + "/api/images/og"}
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
            <div className="flex flex-col w-[100%]">
              {post.gmap_link ? (
                <iframe
                  className="h-[100%]"
                  src={post.gmap_link}
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                ></iframe>
              ) : (
                <></>
              )}
            </div>
          </div>

          {type === "gmap_business" ? (
            <div className="flex justify-between">
              <div className="flex flex-col w-[40%] border-r border-b border-red-500 p-2">
                <div className="flex items-center border-b border-gray-300 text-sm p-1">
                  <PhoneIcon className="h-4 w-4 mr-2" /> {phone}
                </div>

                <div className="flex items-center border-b border-gray-300 text-xs p-1">
                  <HomeIcon className="h-5 w-5 mr-2" /> {address}
                </div>

                <div className="flex items-center border-b border-gray-300 text-xs p-1">
                  <GlobeAltIcon className="h-5 w-5 mr-2" />{" "}
                  {extractDomain(post.website)}
                </div>

                <div className="flex items-center border-b border-gray-300 text-xs p-1">
                  <ClockIcon className="h-5 w-5 mr-2" /> {post.time_zone}
                </div>
              </div>

              <div className="flex flex-col w-[60%]">
                <div className="flex justify-between">
                  <div className="flex flex-col w-[50%] border-r border-b border-red-500 p-2">
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

                  <div className="flex flex-col w-[50%] border-b border-red-500 p-2">
                    <div className="text-md justify-center items-center">
                      <u>Services Hours:</u>
                      {schedule &&
                        Array.isArray(schedule) &&
                        schedule.map((entry, index) => (
                          <div className="flex items-center" key={index}>
                            <div className="bg-red-500 w-1 h-1 mr-2 text-sm"></div>
                            <div className="text-sm" key={index}>
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
          ) : (
            <></>
          )}

          {is_english == "en" ? (
            <div className="p-2">{description}</div>
          ) : (
            <></>
          )}
        </article>

        <article>
          <div className="container mx-auto px-4 py-8">
            <h3 id={`drop_reviews`} className="flex justify-start font-bold">
              Leave a review on {post.title} as {post.topicData.title}
            </h3>
            <div className="italic mb-5">
              this review and rating will have great impart on how we rank{" "}
              {post.title} on this platform
            </div>
            <form className="max-w-lg">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input mt-1 block w-full border border-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="rating" className="block text-gray-700">
                  Rating:
                </label>
                <select
                  id="rating"
                  name="rating"
                  className="form-select mt-1 block w-full border border-red-500"
                >
                  <option value="5">⭐⭐⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="1">⭐</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="review" className="block text-gray-700">
                  Review:
                </label>
                <textarea
                  id="review"
                  name="review"
                  className="form-textarea mt-1 block w-full border border-red-500"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
          <h3 id={`reviews`} className="flex justify-center m-5 p-5 font-bold">
            {post.title} Reviews as {post.topicData.title}
          </h3>
          {reviews.result && Array.isArray(reviews.result) ? (
            reviews.result.map((r, i) => {
              return (
                <div className="relative flex" key={i}>
                  <div className="relative w-full">
                    <div className="relative bg-white shadow-xl ring-1 ring-gray-900/5 mb-3 rounded">
                      <div className="bg-gray-200 flex justify-between items-center gap-x-3 px-2 py-1 text-xs font-bold text-left text-white rounded-tr rounded-tl">
                        <div className="flex flex-col text-black">
                          Popular Lists
                        </div>
                        <div className="flex flex-col justify-end items-end">
                          <RatingStars
                            ratingScore={parseFloat(r.rating).toFixed(1)}
                          />
                        </div>
                      </div>
                      <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
                        <div className="text-sm leading-6 text-gray-600">
                          {r.review_text ? r.review_text : "no review"}
                        </div>
                      </div>
                      <div className="flex justify-end items-end text-xs italic p-1 border-t border-gray-200">
                        published at:{" "}
                        {r.published_at_date
                          ? new Date(r.published_at_date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long", // Full day of the week (e.g., Monday)
                                year: "numeric", // Full year (e.g., 2022)
                                month: "long", // Full month name (e.g., January)
                                day: "numeric", // Day of the month (e.g., 1)
                              }
                            )
                          : "Invalid Date"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center"> no review yet </div>
          )}
        </article>
      </div>
    </div>
  );
}
