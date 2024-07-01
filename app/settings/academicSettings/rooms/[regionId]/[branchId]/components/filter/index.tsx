import React from "react";
import { FilterWrapper } from "./style";
import { Button, InputWithIcon, MySelect, SearchSvg } from "components";
import { useForm } from "react-hook-form";
import { bgColors, textColors } from "styles/theme";
import { filterQuery } from "utils/filterQuery";
import { resetQuery } from "utils/resetQuery";
import { RoomTypesSelect } from "constants/room";
import { useExclude } from "utils/excludeObjectFields";

const Filter = () => {
  const { control, handleSubmit, reset, watch, setValue } = useForm();

  const onSubmit = (data: any) => {
    filterQuery(data);
  };

  const onReset = () => {
    resetQuery(["page", "pageSize", "regionId", "branchId"]);
    reset({});
  };

  useExclude(
    watch,
    [],
    setValue,
    ["page", "pageSize", "regionId", "branchId"],
    false,
    {
      setFieldsName: "start_date",
      firstDateFieldName: "start_date",
      secondDateFieldName: "end_date",
    }
  );

  return (
    <FilterWrapper onSubmit={handleSubmit(onSubmit)}>
      <div className="input-side">
        <div>
          <InputWithIcon
            name="name"
            icon={SearchSvg}
            control={control}
            placeholder="Search"
          />
        </div>
        <div>
          <MySelect
            name="type"
            control={control}
            label="Room type"
            placeholder="-"
            options={RoomTypesSelect}
          />
        </div>
      </div>
      <div className="button-side">
        <Button
          onClick={onReset}
          bgColor={bgColors.wildSand}
          textColor={textColors.yourShadow}
        >
          Reset
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </FilterWrapper>
  );
};

export default Filter;
