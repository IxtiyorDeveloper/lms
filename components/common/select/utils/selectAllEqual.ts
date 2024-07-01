import _ from "lodash";
import { ESelectAll } from "types";
import { IOption } from "../type";

export const selectAllEqual = ({
  selectAllType,
  options,
  value,
}: {
  selectAllType: ESelectAll;
  options: IOption[] | undefined | null;
  value: any[];
}) => {
  if (selectAllType == ESelectAll.regular) {
    return _.isEqual(
      value?.filter((f) => f !== "all"),
      options?.map((m) => m.value),
    );
  }
  if (selectAllType == ESelectAll.no_value) {
    return _.isEqual(
      value?.filter((f: string) => f !== "all" || f?.toString() != "-1"),
      options?.filter((v) => v.value != -1)?.map((m) => m.value),
    );
  }
};
