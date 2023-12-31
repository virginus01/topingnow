import Link from "next/link";
import { useRouter } from "next/navigation";

export default function dataListItem({ data }) {
  return (
    <>
      <li key={data._id} className="py-2">
        <Link prefetch={true} href={`/${data.slug}`} key={`a${data._id}`}>
          <div className={`flex items-center ${data.extraClass}`}>
            <div className="bg-red-500 w-1 h-1 mr-2 text-sm"></div>
            <div className="align-middle line-clamp-1 text-transform: lowercase">
              {data.title}
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}
