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
  if (text === undefined || text === null || text === "" || !text) {
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

export function dataProcess(text: any) {
  if (Array.isArray(text)) {
    text.forEach((t, i) => {
      text[i].title = dProcess(text[i].title);
      text[i].description = dProcess(text[i].description);
    });
  } else {
    text.title = dProcess(text.title);
    text.description = dProcess(text.description);
  }
  return text;
}
