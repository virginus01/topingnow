import { getS3Url, uploadToS3FromUrl } from "../lib/repo/files_repo";
import { UpdateList, postLists } from "../lib/repo/lists_repo";
import { base_url, isNull } from "./custom_helpers";

export async function listImage(
  featuredImagePath: string,
  generatedImagePath: string,
  slug: string
): Promise<string> {
  if (!isNull(featuredImagePath)) {
    return getS3Url(featuredImagePath);
  } else if (!isNull(generatedImagePath)) {
    return getS3Url(generatedImagePath);
  } else {
    const imageUrl = base_url(`/api/images/list/${slug}`);

    try {
      const uploadedUrl = await uploadToS3FromUrl(
        imageUrl,
        `gimages/list/${slug}`
      );

      const submitData = {
        _id: slug,
        generatedImagePath: uploadedUrl,
      };
      const { success, msg } = await UpdateList(submitData);

      return getS3Url(uploadedUrl);
    } catch (e) {
      console.error("Error uploading image to S3:", e);
      return imageUrl;
    }
  }
}
