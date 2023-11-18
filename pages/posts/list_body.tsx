export default function ListBody({ post }) {
  if (post == null) {
    return <div>Loading post...</div>;
  }
  const { id, name, details } = post;
  return (
    <div className="post">
      <h2>{name}</h2>
      <br />
      <div dangerouslySetInnerHTML={{ __html: details }} />
    </div>
  );
}
