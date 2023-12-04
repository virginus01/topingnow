"use client";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import ProgressBar from "@/app/components/progress_bar";
import { da } from "date-fns/locale";
import { postTopics } from "@/app/lib/repo/topics_repo";
import { TopicModel } from "@/app/models/topic_model";
import { toast } from "sonner";
import { customSlugify } from "@/app/utils/custom_slugify";
import { postLists } from "@/app/lib/repo/lists_repo";

const ListsImport = (topicId) => {

    const [data, setData] = useState([]);
    const [columnArray, setColumn] = useState([]);
    const [values, setValues] = useState([]);
    const [valuesEmpty, setValuesEmpty] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [lists, setLists] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data) return;
        setUploading(true);

        setUploading(false);
    };


    const handleImport = async (e) => {
        e.preventDefault();

        // Check criteria

        if (!data[0].title || data[0].title == undefined) {
            return toast.error("'name' field is not present")
        }

        if (!data[0].description || data[0].description == undefined) {
            return toast.error("'description' field is not present")
        }

        if (!data) return;
        setUploading(true);

        let lists = new Array();

        data.map(async (t, i) => {
            let isDuplicate = false;

            const listsD = {
                title: t.title,
                description: t.description,
                topicId: topicId.topic_id,
                slug: t.title,
                isDuplicate: isDuplicate,
                _id: ""
            };


            if (listsD.title && listsD.description) {
                lists.push(listsD);
            }

            setTimeout(() => {
                setProgress(i);
            }, i * 10);
        });

        if (!Array.isArray(lists)) {
            toast.error('Lists must be an array');
            return;
        }

        if (lists.length === 0) {
            toast.error('No list to insert');
            return;
        }



        const result = await postLists(lists);

        setValuesEmpty(true)

        setUploading(false);

        toast.success(`${lists.length} lists imported`);
    };

    const handleFileChange = (e) => {
        Papa.parse(e.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (result) {
                const columnArray = [];
                const valuesArray = [];

                result.data.map((d) => {
                    columnArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                });
                setData(result.data);
                setColumn(columnArray[0]);
                setValues(valuesArray);

                if (valuesArray.length > 0) {
                    setValuesEmpty(false)
                }
            },
        });
    };



    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="col-span-full">
                    <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Lists CSV File
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

                    <div className="mr-4">
                        Number of Lists {values.length}
                    </div>

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
};

export default ListsImport;


