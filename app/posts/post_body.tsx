import DOMPurify from "isomorphic-dompurify";

export default function PostBody({ post }) {
  if (post == null) {
    return <div>Loading post...</div>;
  }
  const { id, title, description } = post;
  return (
    <div className="bg-white px-2 py-2 my-5 rounded-sm">
      <div className="mb-8">
        {description ? (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
}
