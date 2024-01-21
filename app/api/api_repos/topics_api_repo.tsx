import generateImportId from "@/app/lib/repo/import_repo";
import { TopicModel } from "@/app/models/topic_model";
import { customSlugify } from "@/app/utils/custom_slugify";
import { NEXT_PUBLIC_GET_TOPIC, NEXT_PUBLIC_UPDATE_TOPIC } from "@/constants";
import { addTopics } from "../mongodb/query";

export async function postTopics(formData: any) {
  try {
    const postData = JSON.parse(formData.get("postData"));
    const data: TopicModel[] = [];
    const updatedData: TopicModel[] = [];

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
          msg: "post already exist, trying updating post instead",
          data: postData[0],
          ids: [],
        };
      }
    }

    const promises = await postData.map(async (post, i) => {
      let postSlug = customSlugify(post.slug);
      const tData: TopicModel = {
        title: post.title,
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
      const result = await (
        await fetch(url, {
          next: {
            revalidate: parseInt(
              process.env.NEXT_PUBLIC_RE_VALIDATE as string,
              10
            ),
          },
        })
      ).json();

      if (result.data !== "not_found") {
        const formData = new FormData();
        tData._id = result.data._id;
        formData.append("updateData", JSON.stringify(tData));
        const url = `${NEXT_PUBLIC_UPDATE_TOPIC}`;
        const response = await (
          await fetch(url, {
            cache: "no-store",
            method: "POST",
            body: formData,
          })
        )
          .json()
          .then(() => {
            tData.isUpdated = true;
            updatedData.push(tData);
          });
      } else {
        tData.isUpdated = false;
        data.push(tData);
      }
    });

    let res = {};

    try {
      await Promise.all(promises);
      if (Array.isArray(data) && data !== null && data.length > 0) {
        if (postData[0].isImport === "yes") {
          const importId = await generateImportId("test", data);
          data.forEach((im, i) => {
            data[i].importId = importId;
          });
        }
        const result = await addTopics(data);
        res = {
          success: result.success,
          ids: result.ids,
          msg: `${result.msg}`,
          data: data,
        };
      } else {
        res = {
          success: false,
          ids: [],
          msg: `data updated`,
          data: updatedData,
        };
      }
    } catch (e) {
      console.error("Error:", e);
      return { success: false, ids: [], msg: `${e}`, data: "" };
    }

    return res;
  } catch (e) {
    console.log(e);
    return { success: false, ids: [], msg: `${e}`, data: "" };
  }
}
