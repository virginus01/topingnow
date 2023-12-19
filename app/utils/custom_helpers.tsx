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
  if (text === undefined || text === null || text === "") {
    return true;
  }
  return false;
}
