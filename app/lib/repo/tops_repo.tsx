import { customSlugify } from "@/app/utils/custom_slugify";
import {
  NEXT_PUBLIC_DELETE_TOP,
  NEXT_PUBLIC_GET_TOP,
  NEXT_PUBLIC_GET_TOPS,
  NEXT_PUBLIC_POST_TOPICS,
  NEXT_PUBLIC_POST_TOPS,
} from "@/constants";

export async function getTops() {
  try {
    const url = `${NEXT_PUBLIC_GET_TOPS}`;

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

    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Failed to fetch data",
    };
  }
}

export async function getTop(id: string) {
  try {
    const url = `${NEXT_PUBLIC_GET_TOP}?id=${id}`;

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
      error: error.message || "Failed to fetch data",
    };
  }
}

export async function postTops(tData: any) {
  try {
    const slugs = tData.map((t) => customSlugify(t.slug, "-", "no"));

    // Fetch existing topics by slug
    const topics = await Promise.all(slugs.map(getTop));

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
    const url = `${NEXT_PUBLIC_POST_TOPS}`;

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

export async function deleteTop(_id: string) {
  try {
    const url = `${NEXT_PUBLIC_DELETE_TOP}`;

    const formData = new FormData();
    formData.append("deleteData", JSON.stringify({ _id }));

    const response = await fetch(url, {
      method: "DELETE",
      body: formData,
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      return { error: "Failed to delete top" };
    }
  } catch (error) {
    return { error: "An error occurred while deleting top" };
  }
}
