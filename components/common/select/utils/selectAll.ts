import { ESelectAll } from "types";
import { IOption } from "../type";

export const selectAll = ({
  selectAllType,
  options,
  onChange,
}: {
  selectAllType: ESelectAll;
  options: IOption[] | undefined | null;
  onChange: (...event: any[]) => void;
}) => {
  if (selectAllType == ESelectAll.regular) {
    onChange(options?.map((m) => m.value));
  }
  if (selectAllType == ESelectAll.no_value) {
    onChange(options?.filter((v) => v.value != -1)?.map((m) => m.value));
  }
};
