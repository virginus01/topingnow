"use client";
import React, { useEffect, useState } from "react";
import { notFound, redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { postLists } from "@/app/lib/repo/lists_repo";
import { NEXT_PUBLIC_GET_TOPICS } from "@/constants";
import PostBasic from "@/app/components/forms/post_basic";
import { FileModel } from "@/app/models/file_model";
import { TopicModel } from "@/app/models/topic_model";
import { ListsModel } from "@/app/models/lists_model";

export default function CreateList({ topicData }) {
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
    `${NEXT_PUBLIC_GET_TOPICS}?page=${"1"}&perPage=${"10"}`
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

  console.log(slug);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const basicData: ListsModel = {
      title,
      metaTitle,
      metaDesc,
      rankingScore,
      ratingScore,
      views,
      slug,
      description,
      featuredImagePath,
    };
    const submitData = {
      topicId: data._id,
      ...basicData,
    };

    try {
      const { data } = await postLists([submitData], "no");
      console.log(data);
      if (data.success) {
        toast.success("list created");
        router.push("/dashboard/lists");
      } else {
        toast.error("error creating list");
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
    label: "Select Topic",
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
        </form>
      </div>
    </div>
  );
}
