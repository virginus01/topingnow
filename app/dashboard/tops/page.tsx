import TopsView from "./tops_view";

async function Index() {
  return (
    <>
      <div className="w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Tops
            </p>
            <div className="mt-4 sm:mt-0">
              <button className="inline-flex sm:ml-3 items-start justify-start px-3 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                <p className="text-sm font-sm leading-none text-white">
                  Add Top
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 md:px-10 pb-5">
          <div className="overflow-x-auto">
            <TopsView />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
