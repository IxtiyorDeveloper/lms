import { IUnit } from "../types/ars/teacher";

export const mergeUnits = (data?: IUnit[] | undefined) => {
  let formattedString = "";
  if (data?.length) {
    const sorted = data.sort((x, y) => x?.order - y?.order);
    for (let i = 0; i < sorted.length; i++) {
      const unit = sorted[i];
      formattedString += `${unit?.parent_unit?.order}.${unit?.order}`;
      if (i < sorted.length - 1) {
        formattedString += " - ";
      }
    }
  } else {
    formattedString = "-";
  }

  return formattedString;
};
