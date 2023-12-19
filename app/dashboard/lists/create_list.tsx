"use client";
import React, { useEffect, useState } from "react";
import { notFound, redirect, useRouter } from "next/navigation";
import TinyMCEEditor from "@/app/utils/tinymce";
import { UpdateTopic, postTopic } from "@/app/lib/repo/topics_repo";
import { toast } from "sonner";
import { postList } from "@/app/lib/repo/lists_repo";

export default function AddList({ topicData }) {
  const router = useRouter();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");

  const data = topicData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      description: description,
      title: title,
      topicId: data._id,
    };

    try {
      const response = await postList(submitData);

      if (response.data) {
        toast.success("list created");
        router.push("/dashboard/lists");
      } else {
        toast.error("error creating topic");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <p className="my-10">Add a new Topic</p>

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
              defaultValue={""}
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
              initialValue={""}
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
