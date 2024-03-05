import { getS3Url } from "../lib/repo/files_repo";
import { base_url, isNull } from "./custom_helpers";

export function topicImage(
  featuredImagePath: string,
  generatedImagePath: string,
  external_image: string,
  slug: string
): string {
  if (!isNull(featuredImagePath)) {
    return getS3Url(featuredImagePath);
  } else if (!isNull(generatedImagePath)) {
    return getS3Url(generatedImagePath);
  } else if (!isNull(external_image)) {
    return external_image;
  } else {
    return String(base_url(`api/images/topic/${slug}.png`));
  }
}