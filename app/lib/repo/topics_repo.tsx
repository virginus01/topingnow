import { customSlugify } from "@/app/utils/custom_slugify";

export async function getTopics(
  topId: any | "",
  page: number,
  perPage: any | ""
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GET_TOPICS}?topId=${topId}&page=${page}&perPage=${perPage}`;

    console.log(url);
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

export async function postTopics(tData: any) {
  try {
    const slugs = tData.map((t) => customSlugify(t.slug));

    const topics = await Promise.all(slugs.map(getTopicById));

    tData.forEach((t, i) => {
      const exists = Boolean(topics[i]);
      t.isDuplicate = exists;
      t._id = exists ? topics[i]._id : null;
    });

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_POST_TOPICS}`;

    let formData = new FormData();
    formData.append("postData", JSON.stringify(tData));

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      return { error: "Failed to fetch topics" };
    }
  } catch (error) {
    return { error: "An error occurred while fetching topics" };
  }
}
