import { notFound } from "next/navigation";

export async function getLists(topicID: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GET_LISTS}?topicId=${topicID}`;
    const response = await fetch(url, {
      next: {
        revalidate: parseInt(process.env.NEXT_PUBLIC_RE_VALIDATE as string, 10),
      },
    });
    if (response.status === 200) {
      const posts = await response.json();
      const postsData = posts.data;
      return postsData;
    } else {
      return { error: "Failed to fetch lists" };
    }
  } catch (error) {
    return { error: "An error occurred while fetching list" };
  }
}

export async function getListById(id: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GET_LIST}?listId=${id}`;

    const response = await fetch(url, {
      next: {
        revalidate: parseInt(process.env.NEXT_PUBLIC_RE_VALIDATE as string, 10),
      },
    });

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
