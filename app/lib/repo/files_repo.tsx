import { s3Client } from "@/app/utils/aws";
import { isNull } from "@/app/utils/custom_helpers";
import { NEXT_PUBLIC_GET_FILES, NEXT_PUBLIC_POST_FILES } from "@/constants";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export async function postFiles(tData: any) {
  try {
    const url = `${NEXT_PUBLIC_POST_FILES}`;

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

export const getS3Url = (path: any) => {
  if (isNull(path) || path == "undefined/undefined" || path == "/") {
    const s3FileUrl = `/images/placeholder.png`;
    return s3FileUrl;
  }
  const s3FileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${path}`;
  return s3FileUrl;
};

export async function getFiles(page: string, perPage: string) {
  try {
    const url = `${NEXT_PUBLIC_GET_FILES}?page=${page}&perPage=${perPage}`;

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
      error: error.message || "Failed to fetch files",
    };
  }
}
