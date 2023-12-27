"use client";
import React, { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Loading from "@/app/dashboard/loading";
import { NEXT_PUBLIC_GET_TOPIC } from "@/constants";
import { useSingleSWRAdmin } from "@/app/utils/fetcher";
import TinyMCEEditor from "@/app/utils/tinymce";
import { UpdateTopic } from "@/app/lib/repo/topics_repo";
import { toast } from "sonner";
import { TopicModel } from "@/app/models/topic_model";
import MediaModal from "@/app/dashboard/media/media_modal";
import { FileModel } from "@/app/models/file_model";
import { getS3Url } from "@/app/lib/repo/files_repo";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function FromTopic({
  params,
}: {
  params: { topic_id: string };
}) {
  const router = useRouter();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [selected, setSelected] = useState<FileModel>({});

  const url = `${NEXT_PUBLIC_GET_TOPIC}?topicId=${params.topic_id}&process=no`;

  // Slice topics array for current page
  const { result, loading } = useSingleSWRAdmin(url);

  if (loading) {
    return <Loading />;
  }

  if (!result || result == "not_found") {
    notFound();
  }

  const data = result;
  const iniTitle = data.title;
  const iniDescription = data.description;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData: TopicModel = {
      _id: data._id,
      description: description,
      title: title,
      featuredImage: `${selected.path}/${selected.slug}`,
    };

    try {
      const { response } = await UpdateTopic(submitData);

      if (response.success) {
        toast.success(`${title} updated`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <p className="my-10">Topic: {data.title}</p>

        <form method="POST" className="mx-auto px-10" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              className="block mb-2 uppercase font-bold text-xs text-gray-700"
              htmlFor="title"
            >
              Title
            </label>

            <input
              className="border border-gray-400 p-2 w-full rounded"
              type="text"
              id="title"
              name="title"
              defaultValue={iniTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              className="block mb-2 uppercase font-bold text-xs text-gray-700"
              htmlFor="body"
            >
              Body
            </label>

            <TinyMCEEditor
              onChange={(newValue) => setDescription(newValue)}
              initialValue={iniDescription}
            />
          </div>

          <div className="col-span-full">
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Photo
            </label>
            <div className="mt-2 flex items-center gap-x-3 border border-dashed border-gray-900/25 rounded-lg">
              <div>
                <Image
                  src={getS3Url(`${selected.path}/${selected.slug}`)}
                  alt={String(selected.title)}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                  priority={true}
                />
              </div>
              <button
                onClick={() => setShowImageModal(true)}
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-5"
              >
                Change
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      {showImageModal && <MediaModal setSelected={setSelected} />}
    </div>
  );
}
