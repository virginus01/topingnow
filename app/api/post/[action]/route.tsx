import {
  addTopic,
  addTopics,
  updateATopic,
  addLists,
  updateAList,
  addImport,
  addList,
} from "@/app/api/mongodb/query";
import { getTopicById } from "@/app/lib/repo/topics_repo";
import { TopicModel } from "@/app/models/topic_model";
import { ListsModel } from "@/app/models/lists_model";
import { customSlugify } from "@/app/utils/custom_slugify";
import {
  NEXT_PUBLIC_CREATE_IMPORT,
  NEXT_PUBLIC_UPDATE_LIST,
  NEXT_PUBLIC_UPDATE_TOPIC,
} from "@/constants";
import { isNull } from "@/app/utils/custom_helpers";

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
    const response = await postTopics(formData);
    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: headers,
    });
  }

  //creating topics
  if (action == "update_topic") {
    const response = await updateTopic(formData);
    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: headers,
    });
  }

  //creating list
  if (action == "post_lists") {
    const response = await postLists(formData);
    return new Response(JSON.stringify({ response }), {
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

  const uData: TopicModel = {};

  if (!isNull(updateData.title)) {
    uData.title = updateData.title;
  }
  if (!isNull(updateData.description)) {
    uData.description = updateData.description;
  }
  if (!isNull(updateData.topId)) {
    uData.topId = updateData.topId;
  }

  uData.updatedAt = new Date();

  try {
    await updateATopic(updateData._id, uData);
    return { success: true };
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
    body: "",
    status: "",
    subTitle: "",
    catId: "",
    image: "",
    metaDescriptio: "",
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

  const uData: ListsModel = {};

  if (!isNull(updateData.title)) {
    uData.title = updateData.title;
  }

  if (!isNull(updateData.description)) {
    uData.description = updateData.description;
  }

  if (!isNull(updateData.topicId)) {
    uData.topicId = updateData.topicId;
  }

  uData.updatedAt = new Date();

  try {
    await updateAList(updateData._id, uData);
    return { success: true };
  } catch {
    return "489747 error";
  }
}

async function createImport(formData: any) {
  const title = formData.get("title");

  const data = {
    title: title,
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

  postData.map(
    async (post: {
      title: string;
      description: any | null;
      topId: any | null;
      slug: string;
      isDuplicate: boolean | null;
      _id: any;
    }) => {
      let postSlug = customSlugify(post.slug);

      const tData: TopicModel = {
        title: post.title,
        description: post.description,
        createdAt: new Date(),
        topId: post.topId,
        slug: postSlug,
        body: "",
        status: "",
        subTitle: "",
        catId: "",
        image: "",
        metaDescriptio: "",
        metaTitle: "",
        importId: "",
      };

      if (post.isDuplicate === true) {
        const formData = new FormData();
        tData._id = post._id;
        formData.append("updateData", JSON.stringify(tData));
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}${NEXT_PUBLIC_UPDATE_TOPIC}`;
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
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}${NEXT_PUBLIC_CREATE_IMPORT}`;

      let formData = new FormData();
      formData.append("title", `topic: ${postData.title}`);

      const response = await fetch(url, {
        cache: "no-store",
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      data.map((d, i) => {
        data[i].importId = result.response;
      });

      await addTopics(data);
    }
    return postData;
  } catch {
    return "474646 error";
  }
}

async function postLists(formData: any) {
  const postData = JSON.parse(formData.get("postData"));

  const data: ListsModel[] = new Array();

  postData.map(
    async (post: {
      title: string;
      description: any | null;
      topicId: any | null;
      slug: string;
      isDuplicate: boolean | null;
      _id: any;
    }) => {
      let postSlug = customSlugify(post.slug);

      const tData: ListsModel = {
        title: post.title,
        description: post.description,
        updatedAt: new Date(),
        topicId: post.topicId,
        slug: postSlug,
        body: "",
        status: "",
        subTitle: "",
        catId: "",
        image: "",
        metaDescriptio: "",
        metaTitle: "",
        importId: "",
      };

      if (post.isDuplicate) {
        const formData = new FormData();
        formData.append("_id", post._id);
        formData.append("updateData", JSON.stringify(tData));
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}${NEXT_PUBLIC_UPDATE_LIST}`;
        const response = await fetch(url, {
          cache: "no-store",
          method: "POST",
          body: formData,
        });
      } else {
        data.push(tData);
      }
    }
  );

  try {
    if (Array.isArray(data) && data !== null && data.length > 0) {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}${NEXT_PUBLIC_CREATE_IMPORT}`;

      let formData = new FormData();
      formData.append("title", `list: ${postData.topicId}`);

      const response = await fetch(url, {
        cache: "no-store",
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      data.map((d, i) => {
        data[i].importId = result.response;
      });

      await addLists(data);
    }

    return postData;
  } catch {
    return "484646 error";
  }
}
