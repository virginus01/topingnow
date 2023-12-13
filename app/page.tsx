import { getTops } from "@/app/lib/repo/tops_repo";
import Topics from "@/app/posts/topics";
import Layout from "./[slug]/layout";

export default async function Page() {
  const tops = await getTops();

  if (!tops || tops == undefined || !Array.isArray(tops)) {
    console.log(tops);
    return <div>loading...</div>;
  }

  return (
    <Layout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The Best Lists
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tops.map(({ name, _id }) => (
              <article
                key={_id}
                className="flex max-w-xl flex-col items-start justify-between "
              >
                <div className="relative bg-white pb-3 w-full shadow-xl ring-1 ring-gray-900/5 ">
                  <div className="bg-gray-500 flex items-center justify-center gap-x-4 px-4 py-2 text-xs font-bold text-center text-white">
                    Top {name} Best all over the world
                  </div>
                  <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
                    <div className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      <Topics topId={_id} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
