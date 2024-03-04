import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { getS3Url } from "../lib/repo/files_repo";
import { TOPIC_IMAGE } from "@/constants";
import { base_url, isNull } from "../utils/custom_helpers";

export default function PostBody({ post }) {
  const {
    _id,
    title,
    description,
    featuredImagePath,
    generatedImagePath,
    slug,
    extraClass,
    external_image,
  } = post;

  return (
    <div className={` bg-white px-2 py-2 my-5 rounded-sm`}>
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
        <Image
          src={base_url(`api/images/topic/${slug}.png`)}
          alt={title}
          style={{ width: "100%" }}
          width={1920}
          height={1080}
          className="w-full rounded-sm object-cover"
          priority
        />
      )}
      <div className="mb-8">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        />
      </div>
    </div>
  );
}
