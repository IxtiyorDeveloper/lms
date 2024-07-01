export const strToJson = async (text: string) => {
  const pairs = (text || "").split(";");
  const obj: any = {};
  try {
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split("=");
      const key = pair[0].trim();
      obj[key] = pair[1].trim();
    }
  } catch (e) {}
  return obj;
};
