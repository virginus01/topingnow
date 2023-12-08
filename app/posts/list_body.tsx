import DOMPurify from "isomorphic-dompurify";

export default function ListBody({ post }) {
  if (!post) {
    return <>loading..</>;
  }

  const { title, description } = post;

  return (
    <div className="w-full p-1 mt-0">
      <div className="bg-white px-2 py-2 my-5 rounded-sm">
        <div>
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
    </div>
  );
}
