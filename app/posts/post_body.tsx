import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { getS3Url } from "../lib/repo/files_repo";

export default function PostBody({ post }) {
  const { _id, title, description, featuredImagePath, extraClass } = post;

  return (
    <div className={` bg-white px-2 py-2 my-5 rounded-sm`}>
      {featuredImagePath && (
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
