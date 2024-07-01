export const strOnlyNumbers = (text: any): any => {
  if (
    text?.phone_number === "+998" ||
    text === "+998" ||
    text?.phone_number === "998" ||
    text === "998"
  ) {
    return "";
  } else {
    if (text?.phone_number as any) {
      return text?.phone_number?.replace(/\D/g, "");
    } else {
      return text?.replace(/\D/g, "");
    }
  }
};

export const asUserNames = (name?: string) => {
  if (name) {
    let text = name.slice(0, 1).toLocaleUpperCase();
    return text + name.slice(1, name.length).toLocaleLowerCase();
  }
};

export const textAddBreakTag = (text?: string) => {
  return text?.replace(/\n/g, "<br />");
};
