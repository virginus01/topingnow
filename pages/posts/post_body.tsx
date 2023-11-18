export default function PostBody({ post }) {
  if (post == null) {
    return <div>Loading post...</div>;
  }
  const { id, title, description } = post;
  return (
    <div className="post">
      <h2>{title}</h2>
      <br />
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}
