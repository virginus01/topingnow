import { NEXT_PUBLIC_GET_TOP, NEXT_PUBLIC_GET_TOPS } from "@/constants";

export async function getTops() {
  try {
    const url = `${NEXT_PUBLIC_GET_TOPS}`;
    console.log(url);
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
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${NEXT_PUBLIC_GET_TOP}?id=${id}`;

    console.log(url);
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
