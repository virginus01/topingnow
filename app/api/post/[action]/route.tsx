import {
  addTopic,
  addTopics,
  updateATopic,
  addLists,
  updateAList,
  addImport,
  updateATemplate,
  addList,
  addTemplate,
  addQandAs,
  updateAQandA,
  addTops,
  updateATop,
  addFiles,
} from "@/app/api/mongodb/query";
import { getTopicById } from "@/app/lib/repo/topics_repo";
import { TopicModel } from "@/app/models/topic_model";
import { ListsModel } from "@/app/models/lists_model";
import { customSlugify } from "@/app/utils/custom_slugify";
import {
  NEXT_PUBLIC_CREATE_IMPORT,
  NEXT_PUBLIC_POST_UPDATE_QANDA,
  NEXT_PUBLIC_POST_UPDATE_TEMPLATE,
  NEXT_PUBLIC_UPDATE_LIST,
  NEXT_PUBLIC_UPDATE_TOP,
  NEXT_PUBLIC_UPDATE_TOPIC,
} from "@/constants";
import { beforeUpdate, isNull } from "@/app/utils/custom_helpers";
import { TempModel } from "@/app/models/templates_model";
import { QandAModel } from "@/app/models/qanda_model";
import { TopModel } from "@/app/models/top_model";
import generateImportId from "@/app/lib/repo/import_repo";
import { FileModel } from "@/app/models/file_model";

export async function POST(
  request: Request,
  { params }: { params: { action: string } }
) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  let action = params.action;
  const formData = await request.formData();

  //creating topics
  if (action == "post_tops") {
    const data = await postTops(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //creating topics
  if (action == "update_top") {
    const data = await updateTop(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //creating topic
  if (action == "create_topic") {
    const data = await postTopic(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //creating topics
  if (action == "post_topics") {
    const data = await postTopics(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //creating topics
  if (action == "update_topic") {
    const data = await updateTopic(formData);

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //creating list
  if (action == "post_lists") {
    const data = await postLists(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //creating list
  if (action == "post_list") {
    const data = await postList(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //updating list
  if (action == "update_list") {
    const data = await updateList(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //updating list
  if (action == "create_import") {
    const response = await createImport(formData);
    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: headers,
    });
  }

  //updating template
  if (action == "update_template") {
    const data = await updateTemplate(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //creating topics
  if (action == "post_templates") {
    const data = await postTemplates(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  if (action == "post_qandas") {
    const data = await postQandAs(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  if (action == "update_qanda") {
    const data = await updateQanda(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  if (action == "post_files") {
    const data = await postFiles(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  // Default response for invalid actions
  return new Response(JSON.stringify({ data: "Invalid action" }), {
    status: 400,
    headers: headers,
  });
}

async function postTopic(formData: any) {
  const postData = JSON.parse(formData.get("postData"));

  const data = {
    title: postData.title,
    description: postData.description,
    topId: postData.topId,
    slug: postData.slug,
    created_at: new Date(),
  };

  try {
    return await addTopic(data);
  } catch {
    return "8484774 error";
  }
}

export async function updateTopic(formData: any) {
  const updateData = JSON.parse(formData.get("updateData"));

  let uData: TopicModel = {};

  uData = beforeUpdate(updateData, uData);

  try {
    return await updateATopic(updateData._id, uData);
  } catch {
    return "47747 error";
  }
}

export async function updateTemplate(formData: any) {
  const updateData = JSON.parse(formData.get("updateData"));

  const uData: TempModel = {};

  if (!isNull(updateData.title)) {
    uData.title = updateData.title;
  }

  if (updateData.body) {
    uData.body = JSON.stringify(updateData.body);
  }

  uData.updatedAt = new Date();

  try {
    return await updateATemplate(updateData._id, uData);
  } catch {
    return "47747 error";
  }
}

export async function updateQanda(formData: any) {
  const updateData = JSON.parse(formData.get("updateData"));

  const uData: QandAModel = {};

  if (!isNull(updateData.title)) {
    uData.title = updateData.title;
  }

  if (updateData.body) {
    uData.body = JSON.stringify(updateData.body);
  }

  if (updateData.steps) {
    uData.steps = JSON.stringify(updateData.steps);
  }

  uData.updatedAt = new Date();

  try {
    return await updateAQandA(updateData._id, uData);
  } catch {
    return "47747 error";
  }
}

async function postList(formData: any) {
  const updateData = JSON.parse(formData.get("postData"));

  const uData: ListsModel = {
    title: updateData.title,
    description: updateData.description,
    updatedAt: new Date(),
    topicId: updateData.topicId,
    slug: updateData.slug,
    body: "",
    status: "",
    subTitle: "",
    catId: "",
    image: "",
    metaDesc: "",
    metaTitle: "",
  };

  try {
    return await addList(uData);
  } catch {
    return "489747 error";
  }
}

async function updateList(formData: any) {
  const updateData = JSON.parse(formData.get("updateData"));

  let uData: ListsModel = {};
  uData = beforeUpdate(updateData, uData);

  try {
    return await updateAList(updateData._id, uData);
  } catch {
    console.log("error 746464");
    return { success: false };
  }
}

async function updateTop(formData: any) {
  const updateData = JSON.parse(formData.get("updateData"));

  const uData: TopModel = {};

  if (!isNull(updateData.title)) {
    uData.title = updateData.title;
  }

  if (!isNull(updateData.body)) {
    uData.body = updateData.body;
  }

  if (!isNull(updateData.top)) {
    uData.top = updateData.top;
  }

  uData.updatedAt = new Date();

  try {
    await updateATop(updateData._id, uData);
    return { success: true };
  } catch {
    return "474646 error";
  }
}

async function createImport(formData: any) {
  const postData = JSON.parse(formData.get("postData"));

  const data = {
    title: `${postData.title} (${postData.length})`,
    length: postData.length,
    createdAt: new Date(),
  };
  try {
    return await addImport(data);
  } catch {
    return "8764664 error";
  }
}

async function postTopics(formData: any) {
  const postData = JSON.parse(formData.get("postData"));
  const data: TopicModel[] = new Array();

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

    if (post.isDuplicate === true) {
      const formData = new FormData();
      tData._id = post._id;
      formData.append("updateData", JSON.stringify(tData));
      const url = `${NEXT_PUBLIC_UPDATE_TOPIC}`;
      try {
        const response = await fetch(url, {
          cache: "no-store",
          method: "POST",
          body: formData,
        });
        const result = await response.json();
      } catch (error) {
        console.log("error 7464664");
      }
    } else {
      data.push(tData);
    }
  });

  try {
    if (Array.isArray(data) && data !== null && data.length > 0) {
      if (postData[0].isImport === "yes") {
        const importId = await generateImportId("test", data);
        data.map((im, i) => {
          data[i].importId = importId;
        });
      }
      return await addTopics(data);
    }
    return { success: false, ids: [] };
  } catch {
    return "474646 error";
  }
}

async function postTemplates(formData: any) {
  const postData = JSON.parse(formData.get("postData"));

  const data: TempModel[] = new Array();

  postData.map(
    async (post: {
      title: string;
      body: any | null;
      topId: any | null;
      slug: string;
      isDuplicate: boolean | null;
      _id: any;
    }) => {
      let postSlug = customSlugify(post.slug);

      const tData: TempModel = {
        title: post.title,

        body: post.body,
        createdAt: new Date(),
        slug: postSlug,
      };

      if (post.isDuplicate === true) {
        const formData = new FormData();
        tData._id = post._id;
        formData.append("updateData", JSON.stringify(tData));
        const url = `${NEXT_PUBLIC_POST_UPDATE_TEMPLATE}`;
        try {
          const response = await fetch(url, {
            cache: "no-store",
            method: "POST",
            body: formData,
          });
          const result = await response.json();
        } catch (error) {
          console.log("error 7464664");
        }
      } else {
        data.push(tData);
      }
    }
  );

  try {
    if (Array.isArray(data) && data !== null && data.length > 0) {
      const importId = await generateImportId("test", data);
      data.map((im, i) => {
        data[i].importId = importId;
      });

      await addTemplate(data);
    }
    return postData;
  } catch {
    return "474646 error";
  }
}

async function postQandAs(formData: any) {
  const postData = JSON.parse(formData.get("postData"));

  const data: QandAModel[] = new Array();

  postData.map(async (post) => {
    let postSlug = customSlugify(post.slug);

    const tData: QandAModel = {
      title: post.title,
      body: post.body,
      listId: post.listId,
      createdAt: new Date(),
      slug: postSlug,
    };

    if (post.isDuplicate === true) {
      const formData = new FormData();
      tData._id = post._id;
      formData.append("updateData", JSON.stringify(tData));
      const url = `${NEXT_PUBLIC_POST_UPDATE_QANDA}`;
      try {
        const response = await fetch(url, {
          cache: "no-store",
          method: "POST",
          body: formData,
        });
        const result = await response.json();
      } catch (error) {
        console.log("error 7464664");
      }
    } else {
      data.push(tData);
    }
  });

  try {
    if (Array.isArray(data) && data !== null && data.length > 0) {
      const importId = await generateImportId("test", data);
      data.map((im, i) => {
        data[i].importId = importId;
      });

      return await addQandAs(data);
    }
    return { success: true };
  } catch (e) {
    console.log(`error 774764 ${e}`);
    return { success: false };
  }
}

async function postFiles(formData: any) {
  const postData = JSON.parse(formData.get("postData"));

  const data: FileModel[] = new Array();

  postData.map(async (post) => {
    const tData: FileModel = {
      title: post.title,
      size: post.size,
      path: post.path,
      provider: post.provider,
      type: post.type,
      createdAt: new Date(),
      slug: post.slug,
    };

    data.push(tData);
  });

  try {
    if (Array.isArray(data) && data !== null && data.length > 0) {
      await addFiles(data);
    }
    return postData;
  } catch {
    return "4773646 error";
  }
}

async function postTops(formData: any) {
  const postData = JSON.parse(formData.get("postData"));

  const data: TopModel[] = new Array();

  postData.map(
    async (post: {
      title: string;
      body: any | null;
      slug: string;
      isDuplicate: boolean | null;
      _id: any;
    }) => {
      let postSlug = customSlugify(post.slug);

      const tData: TempModel = {
        title: post.title,
        body: post.body,
        createdAt: new Date(),
        slug: postSlug,
      };

      if (post.isDuplicate === true) {
        const formData = new FormData();
        tData._id = post._id;
        formData.append("updateData", JSON.stringify(tData));
        const url = `${NEXT_PUBLIC_UPDATE_TOP}`;
        try {
          const response = await fetch(url, {
            cache: "no-store",
            method: "POST",
            body: formData,
          });
          const result = await response.json();
        } catch (error) {
          console.log("error 7464664");
        }
      } else {
        data.push(tData);
      }
    }
  );

  try {
    if (Array.isArray(data) && data !== null && data.length > 0) {
      const importId = await generateImportId("test", data);
      data.map((im, i) => {
        data[i].importId = importId;
      });

      return await addTops(data);
    }

    return { success: false, ids: [] };
  } catch {
    return "474646 error";
  }
}

async function postLists(formData: any) {
  const postData = JSON.parse(formData.get("postData"));

  const data: ListsModel[] = new Array();

  postData.map(async (post, i) => {
    let postSlug = customSlugify(post.slug);

    const tData: ListsModel = {
      title: post.title,
      _id: post._id,
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
      metaDesc: post.metaDesc,
      importId: post.importId,
      featuredImagePath: post.featuredImagePath,
      rankingScore: post.rankingScore,
      ratingScore: post.ratingScore,
      views: post.views,
      selectedImage: post.selectedImage,
    };

    if (post.isDuplicate) {
      const formData = new FormData();
      formData.append("_id", post._id);
      formData.append("updateData", JSON.stringify(tData));
      const url = `${NEXT_PUBLIC_UPDATE_LIST}`;
      const response = await fetch(url, {
        cache: "no-store",
        method: "POST",
        body: formData,
      });
    } else {
      data.push(tData);
    }
  });

  try {
    if (Array.isArray(data) && data !== null && data.length > 0) {
      if (postData[0].isImport === "yes") {
        const importId = await generateImportId("test", data);
        data.map((im, i) => {
          data[i].importId = importId;
        });
      }

      return await addLists(data);
    }

    return { success: true, ids: [] };
  } catch (e) {
    console.log(`error 983744664 ${e}`);
    return { success: false, ids: [] };
  }
}
