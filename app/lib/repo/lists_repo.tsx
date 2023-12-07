import { customSlugify } from "@/app/utils/custom_slugify";

export async function getLists(
  topicId: any | "",
  page: number,
  perPage: any | ""
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GET_LISTS}?topicId=${topicId}&page=${page}&perPage=${perPage}`;

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
      return { error: "Failed to fetch lists" };
    }
  } catch (error) {
    return { error: "An error occurred while fetching list" };
  }
}

export async function getListById(id: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GET_LIST}?listId=${id}`;

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

export async function postLists(lData: any) {
  try {
    const slugs = lData.map((t) => customSlugify(t.slug));

    const lists = await Promise.all(slugs.map(getListById));

    // Assign isDuplicate and id
    lData.forEach((t, i) => {
      lData[i].isUpdated = false;
      if (lists[i] != "not_found") {
        lData[i].isDuplicate = true;
        lData[i]._id = lists[i]._id ? lists[i]._id : null;
        lData[i].isUpdated = true;
      }
    });

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_POST_LISTS}`;

    let formData = new FormData();
    formData.append("postData", JSON.stringify(lData));

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      return { error: "Failed to fetch lists" };
    }
  } catch (error) {
    return { error: "An error occurred while fetching lists" };
  }
}
