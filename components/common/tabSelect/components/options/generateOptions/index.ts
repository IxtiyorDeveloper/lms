import { IGenerateOptions } from "./type";

export const generateOptions = ({ data }: IGenerateOptions) => {
  const menu = data?.map((item) => ({
    label: item.label,
    value: item.value?.toString(),
  }));
  return { menu };
};
