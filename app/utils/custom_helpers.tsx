import { toast } from "sonner";
import { getTemplate } from "../lib/repo/templates_repo";
import { placeholders } from "./templates";

const textToHtml = (text: any) => {
  const elem = document.createElement("div");
  return text
    .split(/\n\n+/)
    .map((paragraph) => {
      return (
        "<p>" +
        paragraph
          .split(/\n+/)
          .map((line) => {
            elem.textContent = line;
            return elem.innerHTML;
          })
          .join("<br/>") +
        "</p>"
      );
    })
    .join("");
};
export default textToHtml;

export function isNull(text: any) {
  if (
    text === undefined ||
    text === null ||
    text === "" ||
    !text ||
    text === "not_found" ||
    text === "[]" ||
    text === "{}" ||
    text.length === 0 ||
    Object.keys(text).length === 0
  ) {
    return true;
  }
  return false;
}

export function dProcess(text, type = "none") {
  let output;
  try {
    output = text;
    if (!isNull(text)) {
      Object.keys(placeholders).forEach((placeholder) => {
        try {
          output = output.replace(
            new RegExp(placeholder, "g"),
            placeholders[placeholder]
          );
        } catch (error) {
          console.log(error);
        }
      });
    }
  } catch (error) {
    console.log(error);
    output = text;
  }

  return output;
}

export async function dataProcess(text, type = "none") {
  try {
    if (!isNull(text)) {
      if (Array.isArray(text)) {
        for (let t of text) {
          try {
            t.title = await tProcess(t.title, type);
          } catch (error) {
            console.log(error);
          }
          try {
            t.description = await tProcess(t.description, type);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        try {
          text.title = await tProcess(text.title, type);
        } catch (error) {
          console.log(error);
        }
        try {
          text.description = await tProcess(text.description, type);
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }

  return text;
}

export async function tProcess(text, type = "none") {
  if (!isNull(text)) {
    text = await dProcess(text, type);

    const regex = /\{([^}]*)\}/g; // Match words within curly braces

    const matches = text.matchAll(regex);

    const extractedWords: string[] = []; // Explicitly declare extractedWords as a string array

    if (matches) {
      for (const match of matches) {
        const matchStr: string = match[1]; // Explicitly type matchStr as string
        extractedWords.push(`{${matchStr}}`);
      }
    }

    const temps = await Promise.all(extractedWords.map(getTemplate));

    let description = text;

    for (let i = 0; i < extractedWords.length; i++) {
      if (temps[i] != "not_found") {
        const { title, body } = temps[i];
        const bodyD = JSON.parse(body);
        description = description.replace(
          title,
          await getRandomDataBody(bodyD)
        );
      } else {
        description = description.replace(extractedWords[i], "...");
      }
    }

    text = description;
  }

  return text;
}

export function removeById(data, id) {
  return data.filter((item) => item._id !== id);
}

async function getRandomDataBody(body) {
  const randIndex = Math.floor(Math.random() * body.length);
  return body[randIndex].dataBody;
}

export function getViewUrl(slug, type = "") {
  const path = slug ? "/" + slug : "";

  return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
}
export function stripHtmlTags(html) {
  if (typeof html !== "string") {
    throw new Error("Expected a string");
  }

  return html.replace(/<[^>]*>?/gm, "");
}

export function countWords(textContent) {
  const words = textContent.trim().split(/\s+/);
  return words.length;
}

export function cleanFileName(filename) {
  // Create temp file name
  let cleanName = filename;

  if (filename) {
    // Remove file extension
    cleanName = cleanName.split(".").slice(0, -1).join(".");

    // Replace dashes and underscores with spaces
    cleanName = cleanName.replace(/[-_]/g, " ");

    // Remove non-alphanumeric characters
    cleanName = cleanName.replace(/[^A-Za-z0-9]/g, " ");

    // Replace double spaces with single spaces
    cleanName = cleanName.replace(/\s\s+/g, " ");
  }
  // Return cleaned file name
  return cleanName.trim();
}

export function beforeImport(data, requiredFields) {
  const missingFields = requiredFields.filter((field) => !data[0][field]);

  if (missingFields.length > 0) {
    return missingFields.map((field) => {
      return `${field} field is required`;
    });
  }

  return true;
}

export function beforePost(data) {
  const requiredFields = Object.keys(data);

  let errors: string[] = [];

  requiredFields.forEach((field) => {
    if (!data[field]) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length) {
    errors.forEach((err) => toast.error(err));
    return false;
  }

  return true;
}

export function beforeUpdate(updateData, uData) {
  if (!isNull(updateData.title)) {
    uData.title = updateData.title;
  }

  if (!isNull(updateData.description)) {
    uData.description = updateData.description;
  }

  if (!isNull(updateData.desc)) {
    uData.desc = updateData.desc;
  }

  if (!isNull(updateData.body)) {
    uData.body = updateData.body;
  }

  if (!isNull(updateData.featuredImagePath)) {
    uData.featuredImagePath = updateData.featuredImagePath;
  }

  if (!isNull(updateData.createdAt)) {
    uData.createdAt = updateData.createdAt;
  }

  if (!isNull(updateData.updatedAt)) {
    uData.updatedAt = updateData.updatedAt;
  }

  if (!isNull(updateData.topicId)) {
    uData.topicId = updateData.topicId;
  }

  if (!isNull(updateData.status)) {
    uData.status = updateData.status;
  }

  if (!isNull(updateData.subTitle)) {
    uData.subTitle = updateData.subTitle;
  }

  if (!isNull(updateData.slug)) {
    uData.slug = updateData.slug;
  }

  if (!isNull(updateData.catId)) {
    uData.catId = updateData.catId;
  }

  if (!isNull(updateData.image)) {
    uData.image = updateData.image;
  }

  if (!isNull(updateData.metaTitle)) {
    uData.metaTitle = updateData.metaTitle;
  }

  if (!isNull(updateData.metaDesc)) {
    uData.metaDesc = updateData.metaDesc;
  }

  if (!isNull(updateData.importId)) {
    uData.importId = updateData.importId;
  }

  if (!isNull(updateData.rankingScore)) {
    uData.rankingScore = updateData.rankingScore;
  }

  if (!isNull(updateData.ratingScore)) {
    uData.ratingScore = updateData.ratingScore;
  }

  if (!isNull(updateData.views)) {
    uData.views = updateData.views;
  }

  if (!isNull(updateData.selectedImage)) {
    uData.selectedImage = updateData.selectedImage;
  }

  if (!isNull(updateData.topId)) {
    uData.topId = updateData.topId;
  }

  uData.updatedAt = new Date();

  return uData;
}
