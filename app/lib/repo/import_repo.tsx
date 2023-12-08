import {
  NEXT_PUBLIC_DELETE_TOPICS_BY_IMPORTS,
  NEXT_PUBLIC_GET_IMPORTS,
} from "@/constants";

export async function getImports(page: number, perPage: any | "") {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${NEXT_PUBLIC_GET_IMPORTS}?page=${page}&perPage=${perPage}`;

    console.log(url);
    const response = await fetch(url, {
      next: {
        revalidate: parseInt(process.env.NEXT_PUBLIC_RE_VALIDATE as string, 10),
      },
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      return { error: "Failed to fetch topics" };
    }
  } catch (error) {
    return { error: "An error occurred while fetching topic" };
  }
}

export async function deleteTopicsByImports(_id: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${NEXT_PUBLIC_DELETE_TOPICS_BY_IMPORTS}`;

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
      return { error: "Failed to fetch topics" };
    }
  } catch (error) {
    return { error: "An error occurred while fetching topic" };
  }
}
