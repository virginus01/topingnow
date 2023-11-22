import { apiClient } from "../../pages/api/api_client";
import { notFound } from "next/navigation";

export async function getTopics(topID: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GET_TOPICS}?top_id=${topID}`;

    const response = await apiClient(url);

    if (response.status === 200) {
      const posts = await response.json();
      const postsData = posts.data;
      return postsData;
    } else {
      return { error: "Failed to fetch topics" };
    }
  } catch (error) {
    return { error: "An error occurred while fetching topics" };
  }
}

export async function getPopularTopics() {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GET_POPULAR_TOPICS}`;
    const response = await apiClient(url);
    if (response.status === 200) {
      const posts = await response.json();
      const postsData = posts.data;
      return postsData;
    } else {
      return { error: "Failed to fetch topics" };
    }
  } catch (error) {
    return { error: "An error occurred while fetching topics" };
  }
}

export async function getTopicById(id: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GET_TOPIC}?id=${id}`;

    const response = await apiClient(url);

    if (response.status === 200) {
      const post = await response.json();

      if (!post.data) {
        return { error: "not-found" };
      } else {
        const postsData = post.data;
        return postsData;
      }
    } else {
      return { error: "not-found" };
    }
  } catch (error) {
    return { error: "An error occurred while fetching the post" };
  }
}
