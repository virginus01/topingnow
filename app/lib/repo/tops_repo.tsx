export async function getTops() {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GET_TOPS}`;
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

    const data = result.data;
    return data;
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Failed to fetch data",
    };
  }
}