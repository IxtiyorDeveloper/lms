import { labelOptions } from "components";
import { useRouter } from "next/router";
import { NO_COLOR } from "../../constants";

export const useUserLabelSelect = (data?: any) => {
  const router = useRouter();

  // const isHave =
  //   router.query.user_label_type == "1000" ||
  //   router.query.user_label_type?.includes("1000");

  return {
    // user_label_type: !isHave ? router.query.user_label_type : "1000",
    user_label_type: router.query.user_label_type,
    listed_labels: (data || labelOptions)
      .map((e: any) => e.value)
      .filter((e: any) => e != null),
  };
};

export const disableLabels = (data: any[], watch: any, name: string) => {
  const selectedValues = watch(name);
  const isArray = typeof selectedValues === "object";
  const isIncludesNoLabel = isArray
    ? selectedValues.includes(NO_COLOR.toString())
    : selectedValues == NO_COLOR;
  return data?.map((e) => {
    return {
      ...e,
      disabled: (isArray ? selectedValues.length > 0 : !!selectedValues)
        ? isIncludesNoLabel
          ? e.value != NO_COLOR
          : e.value == NO_COLOR
        : false,
    };
  });
};
