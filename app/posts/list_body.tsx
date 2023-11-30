export default function ListBody({ post }) {
  if (!post) {
    return <>loading..</>;
  }

  const { name, details } = post;

  return (
    <div className="w-full p-1 mt-0">
      <div className="bg-white px-2 py-2 my-5 rounded-sm">
        <div dangerouslySetInnerHTML={{ __html: details }} />
      </div>
    </div>
  );
}
