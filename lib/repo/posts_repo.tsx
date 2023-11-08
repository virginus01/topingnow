import { apiClient } from "../../pages/api/api_client";

export async function getLatestPosts() {
  try {
    const url = `${process.env.BASE_URL}${process.env.GET_POSTS}`;
    const response = await apiClient(url);

    if (response.status === 200) {
      const { data } = await response.json();
      return { data };
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
      const { data } = await response.json();
      return { data };
    } else {
      return { error: "Post not found" };
    }
  } catch (error) {
    return { error: "An error occurred while fetching the post" };
  }
}
