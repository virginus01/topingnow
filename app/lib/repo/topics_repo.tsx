"use server";
import { countWords, stripHtmlTags } from "@/app/utils/custom_helpers";
import { customSlugify } from "@/app/utils/custom_slugify";
import {
  NEXT_PUBLIC_DELETE_TOPICS,
  NEXT_PUBLIC_GET_POPULAR_TOPICS,
  NEXT_PUBLIC_GET_TOPIC,
  NEXT_PUBLIC_GET_TOPICS,
  NEXT_PUBLIC_POST_TOPIC,
  NEXT_PUBLIC_POST_TOPICS,
  NEXT_PUBLIC_UPDATE_TOPIC,
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

export async function postTopics(tData: any, isImport = "no") {
  try {
    const slugs = tData.map((t) => customSlugify(t.slug));

    // Fetch existing topics by slug
    const topics = await Promise.all(slugs.map(getTopicById));

    // Assign isDuplicate and id
    tData.forEach((t, i) => {
      tData[i].isUpdated = true;
      tData[i].isImport = isImport;
      tData[i]._id = topics[i]._id ? topics[i]._id : null;

      if (topics[i] === "not_found" || topics[i] === "undefined") {
        tData[i].isDuplicate = false;
        tData[i]._id = topics[i]._id ? topics[i]._id : null;
        tData[i].isUpdated = false;
      }
    });
    const url = `${NEXT_PUBLIC_POST_TOPICS}`;

    let formData = new FormData();
    formData.append("postData", JSON.stringify(tData));

    const result = await fetch(url, {
      cache: "no-store",
      method: "POST",
      body: formData,
    });

    if (result.status === 200) {
      return await result.json();
    } else {
      return { error: "Failed to fetch topic" };
    }
  } catch (error) {
    console.log(error);
    return { error: "An error occurred while posting topics" };
  }
}

export async function postTopic(tData: any) {
  try {
    const slug = customSlugify(tData.title);

    const url = `${NEXT_PUBLIC_POST_TOPIC}`;
    tData.slug = slug;

    let formData = new FormData();
    formData.append("postData", JSON.stringify(tData));

    const result = await fetch(url, {
      cache: "no-store",
      method: "POST",
      body: formData,
    });

    if (result.status === 200) {
      return await result.json();
    } else {
      return { error: "Failed to post topic" };
    }
  } catch (error) {
    console.log(error);
    return { error: "An error occurred while posting topic" };
  }
}

export async function UpdateTopic(tData: any) {
  try {
    const url = `${NEXT_PUBLIC_UPDATE_TOPIC}`;

    let formData = new FormData();
    formData.append("updateData", JSON.stringify(tData));

    const result = await fetch(url, {
      cache: "no-store",
      method: "POST",
      body: formData,
    });

    if (result.status === 200) {
      return await result.json();
    } else {
      return { error: "Failed to update a topic" };
    }
  } catch (error) {
    console.log(error);
    return { error: "An error occurred while updating topic" };
  }
}

export async function deleteTopics(_id) {
  try {
    const url = `${NEXT_PUBLIC_DELETE_TOPICS}`;

    const formData = new FormData();
    formData.append("deleteData", JSON.stringify(_id));

    const response = await fetch(url, {
      method: "DELETE",
      body: formData,
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      return { error: "Failed to delete topic" };
    }
  } catch (error) {
    return { error: "An error occurred while deleting topic" };
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
