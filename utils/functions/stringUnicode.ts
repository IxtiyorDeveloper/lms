export function convertToUnicodeEscape(str: string = "") {
  return str.replace(/[^\x00-\x7F]/g, function (character) {
    return "\\u" + character.charCodeAt(0).toString(16);
  });
}
