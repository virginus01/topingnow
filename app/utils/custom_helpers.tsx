import { toast } from "sonner";
import { getTemplate } from "../lib/repo/templates_repo";
import { placeholders } from "./templates";
import { customSlugify } from "./custom_slugify";

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

export function byDemo() {
  const isDemo = true;

  const words = [
    "apple",
    "banana",
    "chocolate",
    "dragon",
    "elephant",
    "flamingo",
    "guitar",
    "happiness",
    "internet",
    "jazz",
    // Add more words as needed
  ];

  const randomWordsList = Array.from({ length: 3 }, () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const newWord = words[randomIndex];
    return newWord;
  });

  const result = randomWordsList.join(" ");

  const res = isDemo ? result : "";

  return res;
}

export function defaultProcess(text, type = "none") {
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
    let data: any = {};

    if (text && text.steps && Array.isArray(JSON.parse(text.steps))) {
      data.steps =
        JSON.parse(text.steps).length > 0 ? JSON.parse(text.steps).length : 1;
    }
    if (text.topData && text.topData.top) {
      data.top = text.topData.top;
    }

    console.log(text);
    if (text.topicData) {
      console.log(text.topicData);
      data.topic = text.topicData.title;
    }

    //for title
    if (!isNull(text.title)) {
      text.title = await tProcess(text.title, type, data);
    }

    if (!isNull(text.description)) {
      text.description = await tProcess(text.description, type, data);
    }

    //for question and answer
  } catch (error) {
    console.log(error);
  }

  return text;
}

export async function tProcess(text, type = "none", data) {
  if (!isNull(text)) {
    text = await defaultProcess(text, type);

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
      if (extractedWords[i] === "{top}" && data.top) {
        description = description.replace(extractedWords[i], data.top);
      }

      if (extractedWords[i] === "{topic}" && data.topic) {
        description = description.replace(extractedWords[i], data.topic);
      }

      if (extractedWords[i] === "{steps}" && data.steps) {
        description = description.replace(
          extractedWords[i],
          data.steps === 1 ? `${data.steps} Step` : `${data.steps} Steps`
        );
      }

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

export function dataToast(success, msg) {
  if (success == true) {
    return toast.success(`${msg}`);
  } else {
    return toast.error(`${msg}`);
  }
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

  if (!isNull(updateData.metaDescription)) {
    uData.metaDescription = updateData.metaDescription;
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
