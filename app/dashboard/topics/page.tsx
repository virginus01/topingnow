import { getTops } from "@/app/lib/repo/tops_repo";
import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/outline";

async function Index() {
  const tops = await getTops();

  if (!tops || tops == undefined || !Array.isArray(tops)) {
    return <div>loading...</div>;
  }
  return (
    <>
      <div className=" w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Topics
            </p>
            <div className="mt-4 sm:mt-0">
              <button className="inline-flex sm:ml-3 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                <p className="text-sm font-medium leading-none text-white">
                  Download All
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 md:px-10 pb-5">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <tbody>
                {tops.map(({ id, name, _id }) => (
                  <tr
                    key={_id}
                    className="text-sm leading-none text-gray-600 h-16"
                  >
                    <td className="w-1/2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-sm flex items-center justify-center">
                          <p className="text-xs font-bold leading-3 text-white">
                            {id}
                          </p>
                        </div>
                        <div className="pl-2">
                          <p className="text-sm font-medium leading-none text-gray-800">
                            Top {name}
                          </p>
                          <p className="text-xs leading-3 text-gray-600 mt-2">
                            added by admin
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-16">
                      <p>#designer</p>
                    </td>

                    <td>
                      <p className="pl-16">
                        <Buttons />
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;

function Buttons() {
  return (
    <div>
      <button className="bg-red-500 hover:bg-red-600 text-white p-1 rounded mx-1">
        <TrashIcon className="w-4 h-4" />
      </button>

      <button className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded mx-1">
        <PencilIcon className="w-4 h-4" />
      </button>

      <button className="bg-green-500 hover:bg-green-600 text-white p-1 rounded mx-1">
        <EyeIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
