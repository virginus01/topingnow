import { TopicModel } from "@/app/models/topic_model";
import { customSlugify } from "@/app/utils/custom_slugify";
import {
  NEXT_PUBLIC_GET_BUSINESS,
  NEXT_PUBLIC_GET_LIST,
  NEXT_PUBLIC_UPDATE_LIST,
} from "@/constants";
import { addLists, updateAList } from "@/app/api/mongodb/query";
import { beforeUpdate, isNull, preFetch } from "@/app/utils/custom_helpers";
import { checkSinglePost } from "./check_single_post";
import { PostData } from "./post_data";
import { ListsModel } from "@/app/models/lists_model";
import { generateListPositions } from "./topics_api_repo";
import { postBusinessApi } from "./business_api_repo";

export async function postListsApi(formData: any) {
  try {
    let postData: any,
      isImport: any,
      update: any,
      source: any,
      importTitle: any;

    try {
      const parsedData = JSON.parse(formData.get("postData"));
      postData = parsedData.postData;
      isImport = parsedData.isImport;
      update = parsedData.update;
      importTitle = parsedData.importTitle;
    } catch (error) {
      postData = formData.postData;
      isImport = formData.isImport;
      update = formData.update;
      source = formData.source;
      importTitle = formData.importTitle;
    }

    const data: any[] = [];
    const updatedData: any[] = [];

    if (source && source == "gmap") {
      const check = await processGMapListData(postData, update);

      if (check.success == false) {
        return check;
      } else {
        postData = check.gData;
      }
    } else if (postData.length === 1) {
      const url = `${NEXT_PUBLIC_GET_LIST}?listId=${customSlugify(
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

      const tData: ListsModel = {
        title: post.title,
        description: post.description,
        body: post.body,
        createdAt: new Date(),
        updatedAt: post.updatedAt,
        topicId: post.topicId,
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
        category: post.category,
        type: post.type,
        phone: post.phone,
        website: post.website,
        place_id: post.place_id,
        tags: post.tags,
        location_city: post.location_city,
        location_country: post.location_country,
        location_state: post.location_state,
        external_image: post.image,
        all_images: post.all_images,
        asso_bus_id: post.asso_bus_id,
      };

      const url = await preFetch(`${NEXT_PUBLIC_GET_LIST}?listId=${id}`);

      const result = await (await fetch(url)).json();

      if (isNull(postSlug) == false) {
        if (result.data !== "not_found") {
          const formData = new FormData();
          tData._id = result.data._id;
          formData.append("updateData", JSON.stringify(tData));
          const url = `${NEXT_PUBLIC_UPDATE_LIST}`;
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

      res = await PostData(
        data,
        updatedData,
        () => addLists(data),
        isImport,
        importTitle,
        "list"
      );

      for (let i = 0; i < postData.length; i++) {
        await generateListPositions(postData[i].topicId);
      }
    } catch (e) {
      console.error("Error:", e);
      return { success: false, ids: [], msg: `${e}`, data: "", dataBody: "" };
    }

    return res;
  } catch (e) {
    console.error(e);
    return { success: false, ids: [], msg: `${e}`, data: "", dataBody: "" };
  }
}

async function processGMapListData(formData, update) {
  let lists = formData;

  await postBusinessApi({
    postData: lists,
    update,
    source: "gmap",
    importTitle: "gmap import",
  });

  for (let i = 0; i < lists.length; i++) {
    lists[i].body = await reWriteList(lists[i].body);
    lists[i].description = await reWriteList(lists[i].description);

    const slug = customSlugify(lists[i].slug);
    const url = await preFetch(`${NEXT_PUBLIC_GET_BUSINESS}?id=${slug}`);
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

    if (!isNull(result)) {
      lists[i].asso_bus_id = result.data._id;
    }
  }
  // console.log(lists);
  try {
    return { success: true, gData: lists };
  } catch (error) {
    console.error(`error jdh4765: ${error}`);
    return { success: false, gData: {}, error: error };
  }
}

async function reWriteList(data) {
  let lists = data;

  lists = lists.replace(/\bOur\b/g, "Their");
  lists = lists.replace(/\bour\b/g, "their");
  lists = lists.replace(/\bWe are\b/g, "They are");
  lists = lists.replace(/\bwe are\b/g, "they are");
  lists = lists.replace(/\bI\b/g, "He/She");
  lists = lists.replace(/\bWe\b/g, "They");
  lists = lists.replace(/\bwe\b/g, "they");

  return lists;
}

export async function updateList(formData: any) {
  const updateData = JSON.parse(formData.get("updateData"));

  let uData: ListsModel = {};
  uData = beforeUpdate(updateData, uData);

  try {
    return await updateAList(updateData._id, uData);
  } catch {
    console.error("error 746464");
    return { success: false };
  }
}
