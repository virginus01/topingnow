export default function PostListItem({ post }) {
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="ml-1 inline-block w-full">
        <div className="py-2">
          <div className="flex items-center">
            <div className="bg-red-500 w-1 h-1 mr-2 text-sm"></div>
            <div className="align-middle line-clamp-1 text-transform: lowercase">
              {post.title}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
