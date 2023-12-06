import { PaperClipIcon } from "@heroicons/react/24/outline";
import ProgressBar from "@/app/components/progress_bar";
import { JsonToCsvDownload } from "@/app/utils/json_to_csv_download";

export default function CsvImportSCR({
  handleFileChange,
  values,
  handleImport,
  csv,
  progress,
  columnArray,
}) {
  function downloadReport() {
    JsonToCsvDownload(csv);
  }

  return (
    <>
      <form>
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Topics CSV File test
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5">
            <div className="text-center">
              <PaperClipIcon
                className="mx-auto h-8 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none"
                >
                  <span>Upload a csv file</span>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">CSV to 10MB</p>
            </div>
          </div>
        </div>
      </form>

      <div className="overflow-x-auto py-11">
        <div className="flex justify-between py-5">
          <div className="mr-4">Number of Topics {values.length}</div>

          {csv !== "" ? (
            <button
              onClick={downloadReport}
              disabled={false}
              className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-700 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition"
            >
              download report
            </button>
          ) : (
            <></>
          )}

          <button
            onClick={handleImport}
            disabled={false}
            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-700 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition"
          >
            import
          </button>
        </div>

        <ProgressBar progress={progress} values={values} />

        <table className="min-w-full divide-y divide-dotted border border-gray-300 sm:table-fixed">
          <thead>
            <tr className="bg-gray-50">
              {columnArray.map((col, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {values.map((row, i) => (
              <tr key={i}>
                {row.map((cell, i) => (
                  <td className="px-6 py-4" key={i}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
