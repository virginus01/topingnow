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

  Object.keys(placeholders).forEach((placeholder) => {
    output = output.replace(
      new RegExp(placeholder, "g"),
      placeholders[placeholder]
    );
  });

  return output;
}

export async function dataProcess(text: any) {
  if (Array.isArray(text)) {
    text.forEach(async (t, i) => {
      text[i].title = dProcess(text[i].title);
      text[i].description = dProcess(await tProcess(text[i].description));
    });
  } else {
    text.title = dProcess(text.title);
    text.description = dProcess(await tProcess(text.description));
  }

  return text;
}

export async function tProcess(text) {
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

  return text;
}

export function removeById(data, id) {
  return data.filter((item) => item._id !== id);
}

function getRandomDataBody(body) {
  const randIndex = Math.floor(Math.random() * body.length);
  return body[randIndex].dataBody;
}
