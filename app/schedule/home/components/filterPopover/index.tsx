import React, { useEffect } from "react";
import { Buttons, CheckBoxes, FilterPopover, FRow, SRow } from "./style";
import { Button, CheckBox, InputNumber, MySelect } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useExclude } from "utils/useExclude";
import { usePageDataMemo } from "hooks";
import { resetQuery } from "utils/resetQuery";
import { filterQuery } from "utils";
import DatePicker from "../../../../../components/antd/datePicker";
import _ from "lodash";

const FilterPopoverComponent = () => {
  const router = useRouter();
  const selects = usePageDataMemo();
  const {
    freePlace,
    groupType,
    groupStatus,
    subLevel,
    freePlaceCalculation,
    level,
    ...rest
  } = router.query;

  const { control, handleSubmit, watch, setValue, reset } = useForm();

  useExclude({
    watch,
    setValue,
    array: ["defaultTabMenu", "branch_id", "freePlaceType", "day_id"],
    isClearChange: [
      {
        watchField: "level",
        clearField: "subLevel",
      },
    ],
  });

  const onReset = (e: any) => {
    e.stopPropagation();
    resetQuery(["defaultTabMenu", "branch_id", "freePlaceType", "day_id"]);
    setValue("freePlace", undefined);
    setValue("freePlaceCalculation", undefined);
    setValue("groupStatus", undefined);
    setValue("groupType", undefined);
    setValue("level", undefined);
    setValue("subLevel", undefined);
    setValue("exclude_new_opening_group", undefined);
    setValue("exclude_new_opened_group", undefined);
    setValue("exclude_closing_group", undefined);
    setValue("exclude_next_month_free_place", undefined);
    setValue("free_place_with_active_students", undefined);
    setValue("active_students_date", undefined);
  };
  const onSubmit = (data: any) => {
    const { freePlace, ...rest } = data;
    filterQuery({
      freePlace: freePlace?.toString(),
      ...rest,
    });
  };
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        name === "free_place_with_active_students" &&
        type === "change" &&
        !value?.free_place_with_active_students
      ) {
        setValue("active_students_date", undefined);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, router.query]);

  const isNextMonthDisabled = !!router.query?.free_place_with_active_students;
  return (
    <FilterPopover>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FRow>
          <MySelect
            control={control}
            name="groupType"
            placeholder="Group type"
            options={selects.groupType}
            mode="multiple"
            maxTagCount={1}
          />
          <MySelect
            control={control}
            name="groupStatus"
            placeholder="Type"
            options={[
              {
                label: "New group",
                value: "100",
              },
              {
                label: "Regular",
                value: "200",
              },
            ]}
          />
          <MySelect
            control={control}
            name="subLevel"
            placeholder="Sub level"
            options={selects?.flatLevels}
            mode="multiple"
            maxTagCount={1}
          />
          <MySelect
            control={control}
            name="freePlaceCalculation"
            placeholder="="
            defaultValue="0"
            options={[
              {
                label: "free place =",
                value: "0",
              },
              {
                label: "free place =<",
                value: "1",
              },
              {
                label: "free place <",
                value: "2",
              },
              {
                label: "free place >=",
                value: "3",
              },
              {
                label: "free place >",
                value: "4",
              },
            ]}
          />
          <InputNumber
            name="freePlace"
            control={control}
            placeholder="Free place"
          />
          {watch("free_place_with_active_students") && (
            <DatePicker
              name="active_students_date"
              control={control}
              placeholder="Stop date"
            />
          )}
        </FRow>
        <CheckBoxes>
          <div>
            <CheckBox
              name="exclude_new_opening_group"
              control={control}
              label="Exclude new opening group "
            />
          </div>
          <div>
            <CheckBox
              name="exclude_new_opened_group"
              control={control}
              label="Exclude new opened group"
            />
          </div>
          <div>
            <CheckBox
              name="exclude_closing_group"
              control={control}
              label="Exclude closing group"
            />
          </div>
          <div>
            <CheckBox
              name="exclude_next_month_free_place"
              control={control}
              label="Exclude next month students"
              disabled={isNextMonthDisabled}
            />
          </div>
          <div>
            <CheckBox
              name="free_place_with_active_students"
              control={control}
              label="Exclude active students"
            />
          </div>
        </CheckBoxes>
        <SRow>
          <Buttons>
            <Button
              style={{
                backgroundColor: bgColors.wildSand,
                width: "fit-content",
              }}
              className="cancel"
              onClick={(e: any) => onReset(e)}
            >
              Reset
            </Button>
            <Button
              style={{
                backgroundColor: bgColors.primary,
                width: "fit-content",
              }}
              className="save"
              type="submit"
            >
              Save
            </Button>
          </Buttons>
        </SRow>
      </form>
    </FilterPopover>
  );
};

export default FilterPopoverComponent;
