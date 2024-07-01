import { ESortTypes } from "types";

export const handleSort = ({
  value,
  field,
}: {
  value: any;
  field?: string;
}) => {
  if (!!value) {
    if (value == ESortTypes.asc) {
      return {
        type: ESortTypes.desc,
        field,
      };
    } else {
      return {
        type: ESortTypes.asc,
        field,
      };
    }
  } else {
    return {
      type: ESortTypes.desc,
      field,
    };
  }
};
