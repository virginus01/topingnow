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
    text.length === 0
  ) {
    return true;
  }
  return false;
}

export function dProcess(text: any) {
  let output = text;

  if (!isNull(text)) {
    Object.keys(placeholders).forEach((placeholder) => {
      output = output.replace(
        new RegExp(placeholder, "g"),
        placeholders[placeholder]
      );
    });
  }
  return output;
}

export async function dataProcess(text: any) {
  if (!isNull(text)) {
    if (Array.isArray(text)) {
      text.forEach(async (t, i) => {
        text[i].title = dProcess(text[i].title);
        text[i].description = dProcess(await tProcess(text[i].description));
      });
    } else {
      text.title = dProcess(text.title);
      text.description = await tProcess(dProcess(text.description));
    }
  }

  return text;
}

export async function tProcess(text) {
  if (!isNull(text)) {
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
        description = description.replace(title, getRandomDataBody(bodyD));
      } else {
        description = description.replace(extractedWords[i], "");
      }
    }

    text = description;
  }

  return text;
}

export function removeById(data, id) {
  return data.filter((item) => item._id !== id);
}

function getRandomDataBody(body) {
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
