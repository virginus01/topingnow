export async function getTopics(topID: string, page = null) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GET_TOPICS}?top_id=${topID}`;

    const response = await fetch(url, {
      cache: "force-cache",

      next: {
        revalidate: parseInt(process.env.NEXT_PUBLIC_RE_VALIDATE as string, 10),
      },
    });

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
    const res = await fetch(url, {
      cache: "force-cache",
      next: {
        revalidate: parseInt(process.env.NEXT_PUBLIC_RE_VALIDATE as string, 10),
      },
    });

    if (!res.ok) {
      throw new Error("Fetch failed");
    }
    const result = await res.json();

    return result.data;
  } catch (error) {
    return {
      error: error.message || "Failed to fetch data",
    };
  }
}

export async function getTopicById(id: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GET_TOPIC}?id=${id}`;

    const res = await fetch(url, {
      cache: "force-cache",
      next: {
        revalidate: parseInt(process.env.NEXT_PUBLIC_RE_VALIDATE as string, 10),
      },
    });

    if (!res.ok) {
      throw new Error("Fetch failed");
    }

    const result = await res.json();
    const { data } = result;

    return data;
  } catch (error) {
    console.error(error);

    return {
      error: error.message || "Failed to fetch data",
    };
  }
}
