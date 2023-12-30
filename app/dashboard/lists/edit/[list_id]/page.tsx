"use client";
import React, { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Loading from "@/app/dashboard/loading";
import { NEXT_PUBLIC_GET_LIST, NEXT_PUBLIC_GET_TOPICS } from "@/constants";
import { useSingleSWRAdmin } from "@/app/utils/fetcher";
import TinyMCEEditor from "@/app/utils/tinymce";
import { UpdateTopic } from "@/app/lib/repo/topics_repo";
import { toast } from "sonner";
import { UpdateList } from "@/app/lib/repo/lists_repo";
import { getS3Url } from "@/app/lib/repo/files_repo";
import Image from "next/image";
import { FileModel } from "@/app/models/file_model";
import MediaModal from "@/app/dashboard/media/media_modal";
import FeaturedImage from "@/app/components/widgets/featuredImage";
import PostBasic from "@/app/components/forms/post_basic";
import { ListsModel } from "@/app/models/lists_model";
import { SingleShimmer } from "@/app/components/shimmer";

export default function EditList({ params }: { params: { list_id: string } }) {
  const router = useRouter();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [metaTitle, setMetaTitle] = useState("");
  let [metaDesc, setMetaDesc] = useState("");
  let [rankingScore, setRankingScore] = useState("");
  let [ratingScore, setRatingScore] = useState("");
  let [views, setViews] = useState("");
  let [slug, setSlug] = useState("");
  let [featuredImagePath, setFeaturedImagePath] = useState("/");
  let [selectedImage, setSelectedImage] = useState<FileModel>({});
  let [isUpdating, setIsUpdating] = useState(false);
  const [selectedParent, setSelectedParent] = useState({} ?? SingleShimmer(1));

  let [selectSearchUrl, setselectSearchUrl] = useState(
    `${NEXT_PUBLIC_GET_TOPICS}?page=${"1"}&perPage=${"10"}`
  );

  const url = `${NEXT_PUBLIC_GET_LIST}?listId=${params.list_id}`;

  // Slice topics array for current page
  const { result, loading } = useSingleSWRAdmin(url);

  if (loading) {
    return <Loading />;
  }

  if (!result || result == "not_found") {
    notFound();
  }
  const data = result;

  //featured image

  if (selectedImage.path) {
    data.featuredImagePath = `${selectedImage.path}/${selectedImage.slug}`;
    data.selectedImage = selectedImage;
  }
  featuredImagePath = data.featuredImagePath;

  const search = {
    selectSearchUrl,
    showParentSearch: true,
    selectedParent: data.topicData,
    isDisabled: true,
    label: "Select Topic",
  };

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
      _id: data._id,
      ...basicData,
    };

    try {
      const response = await UpdateList(submitData);

      if (response.data) {
        toast.success(`${title} updated`);
      } else {
        toast.error(`${title} not updated`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <p className="my-10">Topic: {data.title}</p>

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
