export default function PostBody({ post }) {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
