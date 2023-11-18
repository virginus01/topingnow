export default function PostListItem({ post }) {
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex items-center">
      <div className="bg-red-500 w-1 h-1 mr-2"></div>
      <div className="align-middle">{post.title}</div>
    </div>
  );
}
