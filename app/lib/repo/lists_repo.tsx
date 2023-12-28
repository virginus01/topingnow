"use server";
import {
  countWords,
  getViewUrl,
  stripHtmlTags,
} from "@/app/utils/custom_helpers";
import { customSlugify } from "@/app/utils/custom_slugify";
import {
  NEXT_PUBLIC_DELETE_LIST,
  NEXT_PUBLIC_GET_LIST,
  NEXT_PUBLIC_GET_LISTS,
  NEXT_PUBLIC_POST_LIST,
  NEXT_PUBLIC_POST_LISTS,
  NEXT_PUBLIC_UPDATE_LIST,
} from "@/constants";

export async function getLists(
  topicId: any | "",
  page: number,
  perPage: any | ""
) {
  try {
    const url = `${NEXT_PUBLIC_GET_LISTS}?topicId=${topicId}&page=${page}&perPage=${perPage}`;

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
    const url = `${NEXT_PUBLIC_GET_LIST}?listId=${id}`;

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
      error: error.message || `Failed to fetch list ${id} 874664`,
    };
  }
}

export async function postLists(lData: any) {
  try {
    const slugs = lData.map((t) => customSlugify(t.slug));

    const lists = await Promise.all(slugs.map(getListById));

    lData.forEach((t, i) => {
      lData[i].isUpdated = true;
      lData[i]._id = lists[i]._id ? lists[i]._id : null;
      if (lists[i] === "not_found" || lists[i] === "undefined") {
        lData[i].isDuplicate = false;
        lData[i]._id = lists[i]._id ? lists[i]._id : null;
        lData[i].isUpdated = false;
      }
    });

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${NEXT_PUBLIC_POST_LISTS}`;

    let formData = new FormData();
    formData.append("postData", JSON.stringify(lData));

    const response = await fetch(url, {
      cache: "no-store",
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

export async function postList(lData: any) {
  try {
    const slug = customSlugify(lData.title);
    lData.slug = slug;

    const url = `${NEXT_PUBLIC_POST_LIST}`;

    const formData = new FormData();
    formData.append("postData", JSON.stringify(lData));

    console.log(formData);
    const response = await fetch(url, {
      cache: "no-store",
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

export async function UpdateList(tData: any) {
  try {
    const url = `${NEXT_PUBLIC_UPDATE_LIST}`;

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
      return { error: "Failed to update a list" };
    }
  } catch (error) {
    console.log(error);
    return { error: "An error occurred while updating list" };
  }
}

export async function deleteList(_id: string) {
  try {
    const url = `${NEXT_PUBLIC_DELETE_LIST}`;

    const formData = new FormData();
    formData.append("deleteData", JSON.stringify({ _id }));

    const response = await fetch(url, {
      method: "DELETE",
      body: formData,
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      return { error: "Failed to delete list" };
    }
  } catch (error) {
    return { error: "An error occurred while deleting list" };
  }
}

export async function listMetaTags(metadata, data) {
  const length = stripHtmlTags(data.description);

  metadata.title = data.title;
  metadata.description = `This is ${data.title}`;
  metadata.alternates
    ? (metadata.alternates.canonical = getViewUrl(
        `${data.topicData.slug}/${data.slug}`
      ))
    : "";
  if (metadata.robots) {
    metadata.robots = {
      index: countWords(length) >= 300 ? true : false,
      follow: true,
    };
  }
  return true;
}
