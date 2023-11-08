import { apiClient } from "../../pages/api/api_client";
import { notFound } from "next/navigation";

export async function getLatestPosts() {
  try {
    const url = `${process.env.BASE_URL}${process.env.GET_POSTS}`;
    const response = await apiClient(url);

    if (response.status === 200) {
      const posts = await response.json();
      const postsData = posts.data;
      return postsData;
    } else {
      return { error: "Failed to fetch latest posts" };
    }
  } catch (error) {
    return { error: "An error occurred while fetching latest posts" };
  }
}

export async function getPostById(id: string) {
  try {
    const url = `${process.env.BASE_URL}${process.env.GET_POST}?id=${id}`;
    const response = await apiClient(url);

    if (response.status === 200) {
      const post = await response.json();
      if (!post.data) {
        notFound();
      } else {
        const postsData = post.data;
        return postsData;
      }
    } else {
      notFound();
    }
  } catch (error) {
    return { error: "An error occurred while fetching the post" };
  }
}
