import Link from "next/link";
import { useRouter } from "next/navigation";

export default function dataListItem({ data }) {
  if (typeof window !== "undefined") {
    const router = useRouter();
    router.prefetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${data.slug}`);
  }
  return (
    <>
      <li key={data._id} className="py-2">
        <Link as={`/${data.slug}`} href={`/${data.slug}`} key={`a${data._id}`}>
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
