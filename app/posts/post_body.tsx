import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { getS3Url } from "../lib/repo/files_repo";
import { TOPIC_IMAGE } from "@/constants";
import {
  base_images_url,
  base_url,
  checkImageValidity,
  isNull,
} from "../utils/custom_helpers";
import { topicImage } from "../utils/topic_image";

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

  let imageValid = true;

  return (
    <div className={` bg-white px-2 py-2 my-5 rounded-sm`}>
      {post.proccessedImage && (
        <Image
          className="w-full rounded-sm object-cover"
          src={post.proccessedImage}
          alt={title}
          style={{ width: "100%" }}
          width={1920}
          height={1080}
          blurDataURL={base_images_url("beams-with.png")}
          placeholder="blur"
          loading="lazy"
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
