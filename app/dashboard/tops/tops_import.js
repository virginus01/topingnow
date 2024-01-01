"use client";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Papa from "papaparse";
import ProgressBar from "@/app/components/progress_bar";
import { getTopicById, postTopics } from "@/app/lib/repo/topics_repo";
import { toast } from "sonner";
import { JsonToCsvDownload } from "@/app/utils/json_to_csv_download";
import CsvImportSCR from "@/app/dashboard/src/csv_import_src";
import { postTemplates } from "@/app/lib/repo/templates_repo";
import { postTops } from "@/app/lib/repo/tops_repo";
import { beforePost } from "@/app/utils/custom_helpers";

export const dynamic = "force-dynamic";

const TopsImport = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [columnArray, setColumn] = useState([]);
    const [values, setValues] = useState([]);
    const [valuesEmpty, setValuesEmpty] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [topics, setTopics] = useState([]);
    const [csv, setCSV] = useState([]);

    const handleImport = async (e) => {
        e.preventDefault();

        // Check criteria

        const title = data[0].title;
        const slug = data[0].slug;
        const metaTitle = data[0].metaTitle;

        const requiredFields = { title, slug, metaTitle };
        const errors = beforePost(requiredFields);



        if (errors[0] !== true) {
            if (Array.isArray(errors)) {
                return errors.map((error) => {
                    if (error !== true) {
                        return error;
                    }
                });
            }
        }

        if (!data) return;
        setUploading(true);

        let topics = new Array();

        data.map(async (t, i) => {

            const topicsD = {
                title: t.title,
                top: t.top,
                body: t.desc,
                slug: t.slug,
                isDuplicate: true,
                _id: "",
            };


            if (topicsD.title && topicsD.body) {
                topics.push(topicsD);
            }

            setTimeout(() => {
                setProgress(i - 1);
            }, i * 10);
        });

        if (!Array.isArray(topics)) {
            toast.error("Topics must be an array");
            return;
        }

        if (topics.length === 0) {
            toast.error("No topics to insert");
            return;
        }

        const result = await postTops(topics);

        // Set progress
        setProgress(values.length - 1);

        setCSV(result.data.data);

        setValuesEmpty(true);

        setUploading(false);

        toast.success(`${topics.length} topics imported`);
    };

    const handleFileChange = (e) => {
        e.preventDefault();

        setData([]);
        setColumn([]);
        setValues([]);

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
                    setValuesEmpty(false);
                }
            },
        });
    };

    return (
        <CsvImportSCR
            handleFileChange={handleFileChange}
            values={values}
            handleImport={handleImport}
            csv={csv}
            progress={progress}
            columnArray={columnArray}
            compulsory="title|string, top|string, desc|string, slug|string"
            importType="Top"
        />
    );
};

export default TopsImport;
