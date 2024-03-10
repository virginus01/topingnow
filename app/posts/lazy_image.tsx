import Image from "next/image";
import { base_images_url } from "../utils/custom_helpers";

export default function image({ post, title, topicData }) {
  return (
    <>
      {post.processedImage && (
        <Image
          src={post.processedImage}
          alt={`${title}: ${topicData.title}`}
          style={{ width: "100%", height: "100%" }}
          width={500}
          height={200}
          className="h-48 w-full rounded-sm object-cover"
          blurDataURL={base_images_url("beams-with.png")}
          placeholder="blur"
          loading="lazy"
        />
      )}
    </>
  );
}
