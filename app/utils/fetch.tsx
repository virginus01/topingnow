"use server";
const fetcher = async (url: RequestInfo) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export default fetcher;
