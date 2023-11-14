export default function PostListItem({ post }) {
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div className="post-list-item">
      <h4>{post.title}</h4>
    </div>
  );
}
