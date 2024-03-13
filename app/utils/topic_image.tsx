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
    try {
      const imageUrl = base_url(`api/images/topic/${slug}.png`);
      fetch(base_url(`/api/actions?tag=${data._id}`));
      return base_images_url("placeholder.png");
    } catch (e) {
      console.error("Error uploading topic image to S3:", e);
      return base_images_url("placeholder.png");
    }
  }
}
