"use server";
import { countWords, stripHtmlTags } from "@/app/utils/custom_helpers";
import { customSlugify } from "@/app/utils/custom_slugify";
import {
  NEXT_PUBLIC_DELETE_TOPICS,
  NEXT_PUBLIC_GET_POPULAR_TOPICS,
  NEXT_PUBLIC_GET_TOPIC,
  NEXT_PUBLIC_GET_TOPICS,
  NEXT_PUBLIC_POST_TOPICS,
} from "@/constants";

export async function getTopics(topId: any | "", page: any, perPage: any | "") {
  try {
    const url = `${NEXT_PUBLIC_GET_TOPICS}?topId=${topId}&page=${page}&perPage=${perPage}`;

    const response = await fetch(url, {
      next: {
        revalidate: parseInt(process.env.NEXT_PUBLIC_RE_VALIDATE as string, 10),
      },
    });

    if (response.status === 200) {
      const posts = await response.json();
      return posts;
    } else {
      return { error: "Failed to fetch topics" };
    }
  } catch (error) {
    return { error: "An error occurred while fetching topic" };
  }
}

export async function getPopularTopics(_id, page, perPage) {
  try {
    const url = `${NEXT_PUBLIC_GET_POPULAR_TOPICS}?_id=${_id}&page=${page}&perPage=${perPage}`;

    const res = await fetch(url, {
      next: {
        revalidate: parseInt(process.env.NEXT_PUBLIC_RE_VALIDATE as string, 10),
      },
    });

    if (!res.ok) {
      console.log("Fetch failed");
      return { error: res.statusText };
    }
    const result = await res.json();

    return result.data;
  } catch (error) {
    return {
      error: error.message || "Failed to fetch data",
    };
  }
}

export async function getTopicById(topicId: string) {
  try {
    const url = `${NEXT_PUBLIC_GET_TOPIC}?topicId=${topicId}`;

    const res = await fetch(url, {
      next: {
        revalidate: parseInt(process.env.NEXT_PUBLIC_RE_VALIDATE as string, 10),
      },
    });

    if (!res.ok) {
      console.log("Fetch failed");
      return { error: res.statusText };
    }

    const result = await res.json();
    const { data } = result;

    return data;
  } catch (error) {
    console.error(error);

    return {
      error: error.message || "Failed to fetch topic",
    };
  }
}

export async function justGetTopicWithEssentials(topicId: string, page = 1) {
  try {
    const url = `${NEXT_PUBLIC_GET_TOPIC}?topicId=${topicId}&page=${page}&essentials=${"yes"}&process=${"yes"}`;
    // console.log(url);
    const res = await fetch(url, {
      next: {
        revalidate: parseInt(process.env.NEXT_PUBLIC_RE_VALIDATE as string, 10),
      },
    });

    if (!res.ok) {
      console.log("Fetch failed");
      return { error: res.statusText };
    }

    const result = await res.json();
    const { data } = result;

    return data;
  } catch (error) {
    console.error(error);

    return {
      error: error.message || "Failed to fetch topic",
    };
  }
}

export async function postTopics(
  postData: any,
  isImport = "no",
  update = false,
  importTitle = ""
) {
  try {
    const url = `${NEXT_PUBLIC_POST_TOPICS}`;

    let formData = new FormData();
    formData.append(
      "postData",
      JSON.stringify({ postData, isImport, update, importTitle })
    );

    const result = await fetch(url, {
      cache: "no-store",
      method: "POST",
      body: formData,
    });

    return await result.json();
  } catch (error) {
    console.log(error);
    return { success: false, msg: "An error occurred while posting topics" };
  }
}

export async function deleteTopics(_id: any) {
  try {
    const url = `${NEXT_PUBLIC_DELETE_TOPICS}?id=${_id}`;

    const formData = new FormData();
    formData.append("deleteData", JSON.stringify(_id));

    const response = await (
      await fetch(url, {
        method: "DELETE",
        body: formData,
      })
    ).json();

    if (response.data) {
      return response;
    } else {
      return { success: false, msg: "Failed to delete topic" };
    }
  } catch (error) {
    return { success: false, msg: `Failed to delete topic: ${error}` };
  }
}

export async function metaTags(metadata, data) {
  const length = stripHtmlTags(
    data.description + " " + data.lists.result[0]?.description ?? ""
  );

  metadata.title = data.title;
  metadata.description = `This is ${data.title}`;
  metadata.alternates
    ? (metadata.alternates.canonical = `${process.env.NEXT_PUBLIC_BASE_URL}/${data.slug}`)
    : "";
  if (metadata.robots) {
    metadata.robots = {
      index:
        countWords(length) >= 300 && data.lists.result.length >= 1
          ? true
          : false,
      follow: true,
    };
  }
  return true;
}
