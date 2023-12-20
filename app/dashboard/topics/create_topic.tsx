"use client";
import React, { useEffect, useState } from "react";
import { notFound, redirect, useRouter } from "next/navigation";
import TinyMCEEditor from "@/app/utils/tinymce";
import { UpdateTopic, postTopic } from "@/app/lib/repo/topics_repo";
import { toast } from "sonner";
import TopicsDataSearch from "@/app/components/widgets/topics_data_search";

export default function AddTopic({ topData }) {
  const dd = {
    data: {
      result: [
        {
          _id: "65570f96fd5ef324149f2355",
          id: "1",
          top_slug: "top-5",
          created_at: "2021-08-27 19:21:41",
          updated_at: "2021-05-31 00:43:04",
          title: "5",
          topTopics: {
            result: [
              {
                _id: "6582fef0a6ad7a30510b613c",
                title: "Top 5 Best Flutter Developers in Lagos as of 2023",
                description: "<p>This is the list of dev</p>",
                topId: "65570f96fd5ef324149f2355",
                slug: "5-best-flutter-developers-lagos-{year}",
                created_at: "2023-12-20T14:49:20.690Z",
              },
            ],
            metadata: {
              total: 1,
              page: 1,
              perPage: 10,
              hasNextPage: false,
              hasPrevPage: false,
            },
          },
        },
        {
          _id: "65570f96fd5ef324149f2356",
          id: "2",
          top_slug: "top-10",
          created_at: "2021-06-05 13:30:54",
          updated_at: "2021-05-31 00:43:04",
          title: "10",
          topTopics: {
            result: [],
            metadata: {
              total: 1,
              page: 1,
              perPage: 10,
              hasNextPage: false,
              hasPrevPage: false,
            },
          },
        },
        {
          _id: "65570f96fd5ef324149f2357",
          id: "3",
          top_slug: "top-20",
          created_at: "2021-06-05 13:30:59",
          updated_at: "2021-05-31 00:43:04",
          title: "20",
          topTopics: {
            result: [],
            metadata: {
              total: 1,
              page: 1,
              perPage: 10,
              hasNextPage: false,
              hasPrevPage: false,
            },
          },
        },
        {
          _id: "65570f96fd5ef324149f2358",
          id: "4",
          top_slug: "top-50",
          created_at: "2021-06-05 13:31:11",
          updated_at: "2021-05-31 00:43:04",
          title: "50",
          topTopics: {
            result: [],
            metadata: {
              total: 1,
              page: 1,
              perPage: 10,
              hasNextPage: false,
              hasPrevPage: false,
            },
          },
        },
        {
          _id: "65570f96fd5ef324149f2359",
          id: "5",
          top_slug: "top-100",
          created_at: "2021-06-05 13:31:17",
          updated_at: "2021-05-31 00:43:04",
          title: "100",
          topTopics: {
            result: [],
            metadata: {
              total: 1,
              page: 1,
              perPage: 10,
              hasNextPage: false,
              hasPrevPage: false,
            },
          },
        },
      ],
      metadata: {
        total: 5,
        page: null,
        perPage: null,
        hasNextPage: false,
        hasPrevPage: false,
      },
    },
  };

  const router = useRouter();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");

  const data = topData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      description: description,
      title: title,
      topId: topData._id,
    };

    try {
      const response = await postTopic(submitData);

      if (response.data) {
        toast.success("topic created");
        router.push("/dashboard/topics");
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
              htmlFor="title"
            >
              Top
            </label>

            <TopicsDataSearch people={dd.data.result} />
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
