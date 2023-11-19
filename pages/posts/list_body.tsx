import { useState } from "react";

export default function ListBody({ post }) {
  const [error, setError] = useState(null);

  if (error) {
    return <>loading..</>;
  }

  if (!post) {
    return <>loading..</>;
  }

  const { name, details } = post;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-center">{name}</h1>

      <div className="mt-5 prose">
        <div dangerouslySetInnerHTML={{ __html: details }} />
      </div>
    </div>
  );
}
