import { getS3Url, uploadToS3FromUrl } from "../lib/repo/files_repo";
import { UpdateList, postLists } from "../lib/repo/lists_repo";
import { base_url, isNull } from "./custom_helpers";

export function listImage(data: any): string {
  const featuredImagePath = data.featuredImagePath;
  const generatedImagePath = data.generatedImagePath;
  const slug = data.slug;

  if (!isNull(featuredImagePath)) {
    return getS3Url(featuredImagePath);
  } else if (!isNull(generatedImagePath)) {
    return getS3Url(generatedImagePath);
  } else {
    const imageUrl = base_url(`/api/images/list/${slug}`);

    try {
      sProcessImage(imageUrl, slug, data._id);
      return imageUrl;
    } catch (e) {
      console.error("Error uploading image to S3:", e);
      return imageUrl;
    }
  }
}

async function sProcessImage(imageUrl, slug, id) {
  const uploadedUrl = await uploadToS3FromUrl(imageUrl, `gimages/list/${slug}`);

  const submitData = {
    _id: id,
    slug: slug,
    newly_updated: "no",
    generatedImagePath: uploadedUrl,
  };
  await UpdateList(submitData);
}
