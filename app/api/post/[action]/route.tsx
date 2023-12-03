import { addTopic, addTopics, updateATopic } from "@/app/api/mongodb/query";
import { getTopicById } from "@/app/lib/repo/topics_repo";
import { TopicModel } from "@/app/models/topic_model";
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
    return "error";
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
    return "error";
  }
}

async function postTopics(formData: any) {
  const postData = JSON.parse(formData.get("postData"));

  const data: TopicModel[] = new Array();
  console.log(postData);

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
    return await addTopics(data);
  } catch {
    return "error";
  }
}
