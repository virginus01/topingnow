import { getTopics } from "@/app/lib/repo/topics_repo";
import Link from "next/link";

export default async function Topics({ topId }) {
  const topics = await getTopics(topId);

  if (!topics || !Array.isArray(topics)) {
    console.log(topics);
    return <p>Loading...</p>;
  }

  return (
    <ul className="ml-1 inline-block w-[500px]">
      {topics.map(({ _id, id, title, slug }) => (
        <li key={_id} className="py-2">
          <Link href={`/${slug}`}>
            <div className="flex items-center">
              <div className="bg-red-500 w-1 h-1 mr-2 text-sm"></div>
              <div className="align-middle line-clamp-1 text-transform: lowercase">
                {title}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
