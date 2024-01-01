"use client";
import React, { useEffect, useState } from "react";
import { notFound, redirect, useRouter } from "next/navigation";
import TinyMCEEditor from "@/app/utils/tinymce";
import {
  UpdateTopic,
  getTopicById,
  postTopic,
  postTopics,
} from "@/app/lib/repo/topics_repo";
import { toast } from "sonner";
import SelectSearch from "@/app/components/widgets/select_search";
import { NEXT_PUBLIC_GET_TOPS } from "@/constants";
import { usePaginatedSWR, usePaginatedSWRAdmin } from "@/app/utils/fetcher";
import { beforeImport, beforePost, isNull } from "@/app/utils/custom_helpers";
import { SingleShimmer } from "@/app/components/shimmer";
import FeaturedImage from "@/app/components/widgets/featuredImage";
import { FileModel } from "@/app/models/file_model";
import { TopicModel } from "@/app/models/topic_model";
import PostBasic from "@/app/components/forms/post_basic";
import { customSlugify } from "@/app/utils/custom_slugify";

export default function CreateTopic({ topData }) {
  const router = useRouter();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [metaTitle, setMetaTitle] = useState("");
  let [metaDesc, setMetaDesc] = useState("");
  let [rankingScore, setRankingScore] = useState("");
  let [ratingScore, setRatingScore] = useState("");
  let [views, setViews] = useState("");
  let [slug, setSlug] = useState("");
  let [featuredImagePath, setFeaturedImagePath] = useState("");
  let [selectedImage, setSelectedImage] = useState<FileModel>({});
  let [isUpdating, setIsUpdating] = useState(false);
  let [selectedParent, setSelectedParent] = useState<TopicModel>({});
  const [page, setPage] = useState(1);
  const perPage = 5;

  let [selectSearchUrl, setselectSearchUrl] = useState(
    `${NEXT_PUBLIC_GET_TOPS}?page=${"1"}&perPage=${"10"}`
  );

  const data: any = {};

  if (selectedImage.path) {
    data.featuredImagePath = `${selectedImage.path}/${selectedImage.slug}`;
    data.selectedImage = selectedImage;
    featuredImagePath = data.featuredImagePath;
  }

  if (selectedParent.title) {
    data.selectedParent = selectedParent;
    selectedParent = data.selectedParent;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const topId = selectedParent._id;
    const basicData: TopicModel = {
      title,
      metaTitle,
      metaDesc,
      rankingScore,
      ratingScore,
      views,
      slug,
      description,
      featuredImagePath,
      topId,
    };

    const requiredFields = { title, slug, metaTitle, topId, metaDesc };

    const errors = beforePost(requiredFields);

    if (errors !== true) {
      return errors;
    }

    const submitData = {
      _id: "",
      ...basicData,
    };

    try {
      const { data } = await postTopics([submitData], "no");

      if (data.success) {
        toast.success("topic created");
        router.push("/dashboard/topics");
      } else if (data.msg) {
        toast.error(data.msg);
      } else {
        toast.error("error creating topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const search = {
    selectSearchUrl,
    showParentSearch: true,
    selectedParent,
    isDisabled: false,
    label: "Select Top",
  };

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <p className="my-10">Topic: {title}</p>
        <form method="POST" className=" px-1" onSubmit={handleSubmit}>
          <PostBasic
            search={search}
            data={data}
            setTitle={setTitle}
            setMetaTitle={setMetaTitle}
            setMetaDesc={setMetaDesc}
            setRankingScore={setRankingScore}
            setRatingScore={setRatingScore}
            setViews={setViews}
            setSlug={setSlug}
            setDescription={setDescription}
            setSelectedImage={setSelectedImage}
            setSelectedParent={setSelectedParent}
          />

          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-2 py-2 rounded"
              type="submit"
            >
              Create Topic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
