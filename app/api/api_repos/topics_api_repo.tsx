import generateImportId from "@/app/lib/repo/import_repo";
import { TopicModel } from "@/app/models/topic_model";
import { customSlugify } from "@/app/utils/custom_slugify";
import { NEXT_PUBLIC_GET_TOPIC, NEXT_PUBLIC_UPDATE_TOPIC } from "@/constants";
import { addTopics } from "../mongodb/query";
import { isNull, preFetch } from "@/app/utils/custom_helpers";
import { checkSinglePost } from "./check_single_post";
import { PostData } from "./post_data";
import { getTops } from "@/app/lib/repo/tops_repo";
import { ListsModel } from "@/app/models/lists_model";
import { ObjectId } from "mongodb";
import { postListsApi } from "./lists_api_repo";

export async function postTopics(formData: any) {
  let postData: any, isImport: any, update: any, source: any;

  try {
    const parsedData = JSON.parse(formData.get("postData"));
    postData = parsedData.postData;
    isImport = parsedData.isImport;
    update = parsedData.update;
  } catch (error) {
    const parsedData = formData; //already a json
    postData = parsedData.postData;
    isImport = parsedData.isImport;
    update = parsedData.update;
    source = parsedData.source;
  }

  try {
    const data: any[] = [];
    const updatedData: any[] = [];

    if (source && source == "gmap") {
      const check = await processGMapData(postData, update);
      if (check.success == false) {
        return check;
      } else {
        postData = check.gData;
      }
    } else if (postData.length === 1) {
      const url = `${NEXT_PUBLIC_GET_TOPIC}?topicId=${customSlugify(
        postData[0].slug
      )}`;
      const check = await checkSinglePost(postData, url, update);
      if (check.success == false) {
        return check;
      }
    }

    const promises = await postData.map(async (post, i) => {
      let postSlug = customSlugify(post.slug);

      let id = post._id ? post._id : postSlug;

      if (source == "gmap") {
        id = postSlug;
      }

      const tData: TopicModel = {
        _id: post._id ? post._id : "",
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
        metaDescription: post.metaDescription,
        importId: post.importId,
        featuredImagePath: post.featuredImagePath,
        rankingScore: post.rankingScore,
        ratingScore: post.ratingScore,
        views: post.views,
        selectedImage: post.selectedImage,
      };

      const url = await preFetch(`${NEXT_PUBLIC_GET_TOPIC}?topicId=${id}`);
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

      if (isNull(postSlug) == false) {
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
          ).json();

          response;
          tData.isUpdated = true;
          tData.msg = "success";
          updatedData.push(tData);
        } else {
          tData.isUpdated = false;
          tData.msg = "success";
          data.push(tData);
          updatedData.push(tData);
        }
      } else {
        tData.isUpdated = false;
        tData.msg = "no slug found";
        updatedData.push(tData);
      }
    });

    let res = {};

    try {
      await Promise.all(promises);

      res = await PostData(data, updatedData, () => addTopics(data), isImport);

      for (let i = 0; i < postData.length; i++) {
        if (postData[i].lists && Array.isArray(postData[i].lists)) {
          let lData = {
            postData: postData[i].lists,
            source: source,
            update: update,
            isImport: isImport,
          };

          await postListsApi(lData);
        }
      }
    } catch (e) {
      console.error("Error:", e);
      return { success: false, ids: [], msg: `${e}`, data: "", dataBody: "" };
    }

    return res;
  } catch (e) {
    console.log(e);
    return { success: false, ids: [], msg: `${e}`, data: "", dataBody: "" };
  }
}

export async function processGMapData(postData, update) {
  try {
    const data: any = [];
    for (let i = 0; i < postData.length; i++) {
      const gData = postData[i];
      const nearestTop: any = await findNearestTop(gData.lists.length);
      const _id = new ObjectId();
      const listsData: any = [];

      for (let i = 0; i < gData.lists.length; i++) {
        const gList = gData.lists[i];

        const pattern = /([^>:|-]+)\s*(?:>|\:|\-|\||\,|$)/;

        // Use the exec method to match the pattern in the input string
        const match = pattern.exec(gList.name);

        // Extract the matched words (if any)
        const gTitle = match ? match[1] : "";

        const mRate = parseInt(gList.rating) * 10;
        const lData: ListsModel = {
          title: String(gTitle),
          subTitle: gList.name,
          description: `${gList.name} has been ranked on the business list of ${gData.title}`,
          body: gList.about,
          ini_topic_id: String(_id),
          slug: gList.name,
          rankingScore: String(mRate + parseInt(gList.reviews)),
          ratingScore: gList.rating,
          type: "gmap_business",
          category: gList.main_category,
          tags: "",
          phone: gList.phone,
          website: gList.website,
          place_id: gList.place_id,
          location_country: "",
          location_city: "",
          external_image: gList.image,
        };

        if (lData.title && lData.description) {
          listsData.push(lData);
        }
      }

      const basicData: TopicModel = {
        _id: _id,
        title: `Top {top} ${gData.title}`,
        metaTitle: `Top {top} ${gData.title}`,
        metaDescription: `This is top {top} ${gData.title}`,
        rankingScore: "",
        ratingScore: "",
        views: "",
        slug: gData.title,
        description: `This is bussiness the list of the top {top} ${gData.title}`,
        featuredImagePath: "",
        topId: nearestTop._id ?? "",
        lists: listsData,
      };

      data.push(basicData);
    }
    return { success: true, gData: data };
  } catch (error) {
    return { success: false, gData: {} };
  }
}

async function findNearestTop(length) {
  if (length < 5) {
    length = 5;
  }
  const tops = await getTops();

  const nearestItem = tops.result.reduce((closest, current) => {
    const closestDiff = Math.abs(parseInt(closest.top) - length);
    const currentDiff = Math.abs(parseInt(current.top) - length);

    return currentDiff < closestDiff ? current : closest;
  });

  return nearestItem;
}
