export const encodeText = (salt: string, text: any) => {
  const textToChars = (text: string) =>
    text.split("").map((c: string) => c.charCodeAt(0));
  const byteHex = (n: string) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a: number, b: number) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

export const decodeText = (salt: string, encoded: any) => {
  try {
    const textToChars = (text: string) =>
      text.split("").map((c: string) => c.charCodeAt(0));
    const applySaltToChar = (code: any) =>
      textToChars(salt).reduce((a: number, b: number) => a ^ b, code);
    return encoded
      .match(/.{1,2}/g)
      .map((hex: any) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode: any) => String.fromCharCode(charCode))
      .join("");
  } catch (e) {
    return null;
  }
};
