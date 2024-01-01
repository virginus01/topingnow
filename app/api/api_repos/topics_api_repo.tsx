import generateImportId from "@/app/lib/repo/import_repo";
import { TopicModel } from "@/app/models/topic_model";
import { customSlugify } from "@/app/utils/custom_slugify";
import { NEXT_PUBLIC_GET_TOPIC, NEXT_PUBLIC_UPDATE_TOPIC } from "@/constants";
import { addTopics } from "../mongodb/query";

export async function postTopics(formData: any) {
  const postData = JSON.parse(formData.get("postData"));
  const data: TopicModel[] = new Array();

  try {
    if (postData.length === 1) {
      let slug = customSlugify(postData[0].slug);
      const url = `${NEXT_PUBLIC_GET_TOPIC}?topicId=${slug}`;
      const res = await fetch(url, {
        next: {
          revalidate: parseInt(
            process.env.NEXT_PUBLIC_RE_VALIDATE as string,
            10
          ),
        },
      });

      const result = await res.json();
      if (result.data !== "not_found") {
        return {
          success: false,
          msg: "post already exist",
          data: postData[0],
          ids: [],
        };
      }
    }

    postData.map(async (post, i) => {
      let postSlug = customSlugify(post.slug);
      const tData: TopicModel = {
        title: post.title,
        _id: post._id,
        description: post.description,
        body: post.body,
        createdAt: new Date(),
        updatedAt: post.updatedAt,
        topId: post.topId,
        status: post.status,
        subTitle: post.subTitle,
        slug: postSlug,
        catId: post.catId,
        image: post.image,
        metaTitle: post.metaTitle,
        metaDesc: post.metaDesc,
        importId: post.importId,
        featuredImagePath: post.featuredImagePath,
        rankingScore: post.rankingScore,
        ratingScore: post.ratingScore,
        views: post.views,
        selectedImage: post.selectedImage,
      };

      const url = `${NEXT_PUBLIC_GET_TOPIC}?topicId=${postSlug}`;
      const res = await fetch(url, {
        next: {
          revalidate: parseInt(
            process.env.NEXT_PUBLIC_RE_VALIDATE as string,
            10
          ),
        },
      });

      const result = await res.json();
      if (result.data !== "not_found") {
        const formData = new FormData();
        tData._id = post._id;
        formData.append("updateData", JSON.stringify(tData));
        const url = `${NEXT_PUBLIC_UPDATE_TOPIC}`;

        const response = await fetch(url, {
          cache: "no-store",
          method: "POST",
          body: formData,
        });
        const result = await response.json();
      } else {
        data.push(tData);
      }
    });

    let res = {};

    if (Array.isArray(data) && data !== null && data.length > 0) {
      if (postData[0].isImport === "yes") {
        const importId = await generateImportId("test", data);
        data.map((im, i) => {
          data[i].importId = importId;
        });
      }
      res = await addTopics(data);
    }

    return { success: true, ids: [], msg: `${data.length} added`, data: data };
  } catch (e) {
    console.log(e);
    return { success: false, ids: [], msg: `no data added`, data: data };
  }
}
