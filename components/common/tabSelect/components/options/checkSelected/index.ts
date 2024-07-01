import { Type } from "./type";

export const checkSelected = ({ item, value, mode }: Type) => {
  if (mode == "multiple") {
    return (value || [])?.includes(item.value) ? "selected" : "";
  } else {
    return value?.toString() == item.value?.toString() ? "selected" : "";
  }
};
