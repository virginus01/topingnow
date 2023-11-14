export default function PostBody({ post }) {
  if (!post) {
    return <div>Loading...</div>;
  }
  const { title } = post;
  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{title}</p>
    </div>
  );
}
