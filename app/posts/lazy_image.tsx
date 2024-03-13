import Image from "next/image";
import { base_images_url, modifyImageUrl } from "../utils/custom_helpers";

export default function image({ post, title, topicData, h = 500, w = 200 }) {
  const image = modifyImageUrl(post.processedImage);
  return (
    <>
      {post.processedImage && (
        <Image
          src={image}
          alt={`${title}: ${topicData.title}`}
          title={`${title}: ${topicData.title}`}
          //style={{ width: "100%", height: "100%" }}
          width={h}
          height={w}
          className="h-48 w-full rounded-sm object-cover"
          blurDataURL={base_images_url("beams-with.png")}
          placeholder="blur"
          loading="lazy"
        />
      )}
    </>
  );
}
