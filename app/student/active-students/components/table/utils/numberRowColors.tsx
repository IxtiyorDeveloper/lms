import { TList } from "types";
import { LABEL_COLOR_CHANGE } from "constants/labels";
import Router from "next/router";

export const numberRowColors = ({ data }: { data: any }) => {
  return Router.query?.roundedTabIndex == "2"
    ? (data?.list ?? []).map((e: TList, index: number) => ({
        id: index + 2,
        color: e?.user?.userLabels?.find(
          (label) => label.type?.toString() === LABEL_COLOR_CHANGE?.toString()
        )?.color,
      }))
    : [];
};
