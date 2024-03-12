import { getS3Url, uploadToS3FromUrl } from "../lib/repo/files_repo";
import { UpdateList, postLists } from "../lib/repo/lists_repo";
import {
  base_images_url,
  base_url,
  checkImageValidity,
  isNull,
} from "./custom_helpers";

export function listImage(data: any): string {
  const featuredImagePath = data.featuredImagePath;
  const generatedImagePath = data.generatedImagePath;
  const slug = data.slug;

  if (!isNull(featuredImagePath)) {
    return getS3Url(featuredImagePath);
  } else if (!isNull(generatedImagePath)) {
    return getS3Url(generatedImagePath);
  } else {
    try {
      const imageUrl = base_url(`/api/images/list/${slug}`);
      sProcessImage(imageUrl, slug, data._id);
      fetch(base_url(`/api/actions?tag=${data._id}`));
      return base_images_url("placeholder.png");
    } catch (e) {
      console.error("Error uploading image to S3:", e);
      return base_images_url("placeholder.png");
    }
  }
}

async function sProcessImage(imageUrl, slug, id) {
  try {
    const response = await fetch(imageUrl, { cache: "no-cache" });

    if (response.ok) {
      const uploadedUrl: any = await uploadToS3FromUrl(
        imageUrl,
        `gimages/list/${slug}`
      );

      if (uploadedUrl.success) {
        const submitData = {
          _id: id,
          slug: slug,
          newly_updated: "no",
          generatedImagePath: uploadedUrl.path,
        };
        await UpdateList(submitData);
      }
    }
  } catch (e) {
    console.log(e);
  }
}
