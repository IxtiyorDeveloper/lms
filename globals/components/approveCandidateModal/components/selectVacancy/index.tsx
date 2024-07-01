import React, { useMemo } from "react";
import { LoadingSvg, MySelect, TreeSelect } from "components";
import { SelectWrapper } from "./style";
import { IDepartListVacancy } from "types";
import { Options } from "./options";

const SelectVacancy = ({
  data,
  control,
  name,
  defaultValue,
}: {
  data: IDepartListVacancy[] | undefined;
  control: any;
  name: string;
  defaultValue?: string;
}) => {
  return (
    <SelectWrapper id="select-vacancy">
      <TreeSelect
        control={control}
        name={name}
        options={Options({
          data,
        })}
        icon={<LoadingSvg />}
        placeholder={defaultValue ?? "Select"}
        getPopupContainer={() =>
          document.getElementById("select-vacancy") as any
        }
      />
    </SelectWrapper>
  );
};

export default SelectVacancy;
