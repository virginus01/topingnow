import { getS3Url } from "../lib/repo/files_repo";
import { base_url, isNull } from "./custom_helpers";

export function listImage(
  featuredImagePath: string,
  generatedImagePath: string,
  slug: string
): string {
  if (!isNull(featuredImagePath)) {
    return getS3Url(featuredImagePath);
  } else if (!isNull(generatedImagePath)) {
    return getS3Url(generatedImagePath);
  } else {
    return String(base_url(`/api/images/list/${slug}`));
  }
}
