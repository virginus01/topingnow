import { getS3Url } from "../lib/repo/files_repo";
import { base_url, isNull } from "./custom_helpers";

export function listImage(
  featuredImagePath: string,
  generatedImagePath: string,
  external_image: string,
  title = "yes",
  from_all_image_1: string
): string {
  if (!isNull(featuredImagePath)) {
    return getS3Url(featuredImagePath);
  } else if (!isNull(generatedImagePath)) {
    return getS3Url(generatedImagePath);
  } else if (!isNull(external_image)) {
    return external_image;
  } else if (!isNull(from_all_image_1)) {
    return from_all_image_1;
  } else {
    return String(base_url(`api/images/og?title=${title}`));
  }
}
