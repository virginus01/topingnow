import DOMPurify from "isomorphic-dompurify";

export default function PostBody({ post }) {
  const { _id, title, description, extraClass } = post;
  return (
    <div className={`${post.extraClass} bg-white px-2 py-2 my-5 rounded-sm`}>
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
