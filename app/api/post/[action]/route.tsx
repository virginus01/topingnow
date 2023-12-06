import {
  addTopic,
  addTopics,
  updateATopic,
  addLists,
  updateAList,
  addImport,
} from "@/app/api/mongodb/query";
import { getTopicById } from "@/app/lib/repo/topics_repo";
import { TopicModel } from "@/app/models/topic_model";
import { ListsModel } from "@/app/models/lists_model";
import { customSlugify } from "@/app/utils/custom_slugify";

export async function POST(
  request: Request,
  { params }: { params: { action: string } }
) {
  let action = params.action;
  const formData = await request.formData();

  //creating topic
  if (action == "post_topic") {
    //   const response = await postTopic(formData);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  }

  //creating topics
  if (action == "post_topics") {
    const response = await postTopics(formData);
    return new Response(JSON.stringify({ response }), {
      status: 200,
    });
  }

  //creating topics
  if (action == "update_topic") {
    const response = await updateTopic(formData);
    return new Response(JSON.stringify({ response }), {
      status: 200,
    });
  }

  //creating list
  if (action == "post_lists") {
    const response = await postLists(formData);
    return new Response(JSON.stringify({ response }), {
      status: 200,
    });
  }

  //updating list
  if (action == "update_list") {
    const response = await updateList(formData);
    return new Response(JSON.stringify({ response }), {
      status: 200,
    });
  }

  //updating list
  if (action == "create_import") {
    const response = await createImport(formData);
    return new Response(JSON.stringify({ response }), {
      status: 200,
    });
  }

  // Default response for invalid actions
  return new Response(JSON.stringify({ data: "Invalid action" }), {
    status: 400,
  });
}

async function postTopic(formData: any) {
  const title = formData.get("title");

  const data = {
    title: title,
    created_at: new Date(),
  };

  try {
    return await addTopic(data);
  } catch {
    return "8484774 error";
  }
}

async function updateTopic(formData: any) {
  const updateData = JSON.parse(formData.get("updateData"));
  const _id = formData.get("_id");

  const uData: TopicModel = {
    title: updateData.title,
    description: updateData.description,
    updatedAt: new Date(),
    topId: updateData.topId,
    body: "",
    status: "",
    subTitle: "",
    catId: "",
    image: "",
    metaDescriptio: "",
    metaTitle: "",
  };

  try {
    await updateATopic(_id, uData);
    return { seccess: true };
  } catch {
    return "47747 error";
  }
}

async function updateList(formData: any) {
  const updateData = JSON.parse(formData.get("updateData"));
  const _id = formData.get("_id");

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
    await updateAList(_id, uData);
    return { seccess: true };
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
  "use server";
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

      if (post.isDuplicate) {
        const formData = new FormData();
        formData.append("_id", post._id);
        formData.append("updateData", JSON.stringify(tData));
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_UPDATE_TOPIC}`;
        const response = await fetch(url, {
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
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_CREATE_IMPORT}`;

      let formData = new FormData();
      formData.append("title", "topic:");

      const response = await fetch(url, {
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
  console.log(postData);

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
      };

      if (post.isDuplicate) {
        const formData = new FormData();
        formData.append("_id", post._id);
        formData.append("updateData", JSON.stringify(tData));
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_UPDATE_LIST}`;
        const response = await fetch(url, {
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
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_CREATE_IMPORT}`;

      let formData = new FormData();
      formData.append("title", "list:");

      const response = await fetch(url, {
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
