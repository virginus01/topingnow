"use server";
import { customSlugify } from "@/app/utils/custom_slugify";
import {
  NEXT_PUBLIC_DELETE_TOPICS_BY_IMPORTS,
  NEXT_PUBLIC_DELETE_TOPICS_WITH_LISTS,
  NEXT_PUBLIC_GET_POPULAR_TOPICS,
  NEXT_PUBLIC_GET_TOPIC,
  NEXT_PUBLIC_GET_TOPICS,
  NEXT_PUBLIC_GET_TOPIC_WITH_ESSENTIALS,
  NEXT_PUBLIC_POST_TOPIC,
  NEXT_PUBLIC_POST_TOPICS,
  NEXT_PUBLIC_UPDATE_TOPIC,
} from "@/constants";

export async function getTopics(topId: any | "", page: any, perPage: any | "") {
  try {
    const url = `${NEXT_PUBLIC_GET_TOPICS}?topId=${topId}&page=${page}&perPage=${perPage}`;

    console.log(url);
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

export async function getPopularTopics() {
  try {
    const url = `${NEXT_PUBLIC_GET_POPULAR_TOPICS}`;
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
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${NEXT_PUBLIC_GET_TOPIC}?topicId=${topicId}`;

    console.log(url);
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
    const url = `${NEXT_PUBLIC_GET_TOPIC_WITH_ESSENTIALS}?topicId=${topicId}&page=${page}`;

    console.log(url);
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

export async function postTopics(tData: any) {
  try {
    const slugs = tData.map((t) => customSlugify(t.slug));

    // Fetch existing topics by slug
    const topics = await Promise.all(slugs.map(getTopicById));

    // Assign isDuplicate and id
    tData.forEach((t, i) => {
      tData[i].isUpdated = true;
      tData[i]._id = topics[i]._id ? topics[i]._id : null;

      if (topics[i] === "not_found" || topics[i] === "undefined") {
        tData[i].isDuplicate = false;
        tData[i]._id = topics[i]._id ? topics[i]._id : null;
        tData[i].isUpdated = false;
      }
    });
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${NEXT_PUBLIC_POST_TOPICS}`;

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

export async function deleteTopicsWithLists(_id: string) {
  try {
    const url = `${NEXT_PUBLIC_DELETE_TOPICS_WITH_LISTS}`;

    console.log(url);

    const formData = new FormData();
    formData.append("deleteData", JSON.stringify({ _id }));

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
