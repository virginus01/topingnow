import { Key, useEffect, useState } from "react";
import PostListItem from "./post_lists_items";
import { getTopics } from "../../lib/repo/topics_repo";
import Link from "next/link";

export default function Topics({ topId }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const topics = await getTopics(topId);
      setTopics(topics);
      setLoading(false);
    }
    fetchData();
  }, [topId]);

  if (loading) {
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
