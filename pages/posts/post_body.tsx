export default function PostBody({ post }) {
  if (post == null) {
    return <div>Loading post...</div>;
  }
  const { id, title, description } = post;
  return (
    <div className="post">
      <div
        className="pt-10"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
