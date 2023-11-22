export default function PostBody({ post }) {
  if (post == null) {
    return <div>Loading post...</div>;
  }
  const { id, title, description } = post;
  return (
    <div className="mb-8" dangerouslySetInnerHTML={{ __html: description }} />
  );
}
