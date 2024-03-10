import { getS3Url, uploadToS3FromUrl } from "../lib/repo/files_repo";
import { postTopics } from "../roadmap/topics_roadmap";
import {
  base_images_url,
  base_url,
  checkImageValidity,
  isNull,
} from "./custom_helpers";

export function topicImage(data: any): string {
  const slug = data.slug;

  if (!isNull(data.featuredImagePath)) {
    return getS3Url(data.featuredImagePath);
  } else if (!isNull(data.generatedImagePath)) {
    return getS3Url(data.generatedImagePath);
  } else {
    const imageUrl = base_url(`api/images/topic/${slug}.png`);

    try {
      spProcessImage(imageUrl, slug, data._id);
      fetch(base_url(`/api/actions?tag=${data._id}`));
      return base_images_url("placeholder.png");
    } catch (e) {
      console.error("Error uploading topic image to S3:", e);
      return imageUrl;
    }
  }
}

async function spProcessImage(imageUrl, slug, id) {
  const check: any = await checkImageValidity(imageUrl);
  if (check.success !== false) {
    const uploadedUrl = await uploadToS3FromUrl(
      imageUrl,
      `gimages/topic/${slug}`
    );

    if (uploadedUrl.success) {
      const submitData = {
        _id: id,
        slug: slug,
        newly_updated: "no",
        generatedImagePath: uploadedUrl.path,
      };

      await postTopics([submitData], "no", true);
    }
  }
}
