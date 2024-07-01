import React, { FC } from "react";
import { Item, Wrapper } from "./style";
import {
  AntdBadge,
  AntdSwitch,
  CircleQuestionMarkSvg,
  ErrorLabel,
  RedBadgeTitle,
} from "components";
import { bgColors } from "styles/theme";
import { usePageDataMemo } from "hooks";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { Checkbox } from "antd";
import Image from "next/image";

interface IProps {
  control: any;
  errors: any;
  watch: any;
}

const DaySelect: FC<IProps> = ({ control, errors, watch }) => {
  const { days } = usePageDataMemo();

  const isStrict = watch("root.strict_by_day");
  const len = watch("root.lesson_day_id")?.length || 0;

  const onChangeBranch = (
    field: ControllerRenderProps<FieldValues, "root.lesson_day_id">,
    id: any,
  ) => {
    const isHave = (field.value || []).includes(id);
    if (!isHave) {
      field.onChange(
        (field.value || []).length > 0 ? [...field.value, id] : [id],
      );
    } else {
      field.onChange((field.value || []).filter((e: any) => e != id));
    }
  };

  return (
    <Wrapper isStrict={isStrict}>
      <div className="flex">
        <div className="title">
          <RedBadgeTitle count={len} title="Days" />
        </div>
        <div className="flex gap-4">
          <CircleQuestionMarkSvg
            width={16}
            height={16}
            color={bgColors.sadet}
          />
          <div className="strict">Strict</div>
          <div className="ml-4">
            <AntdSwitch
              size="small"
              control={control}
              name="root.strict_by_day"
            />
          </div>
        </div>
      </div>
      <Controller
        name="root.lesson_day_id"
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          return (
            <div className="container">
              {days?.map((e) => {
                const isSelected = (field.value || []).includes(e.value);
                return (
                  <Item
                    className="item"
                    onClick={() => onChangeBranch(field, e.value)}
                    isActive={isSelected}
                  >
                    <div className="branch-name">{e.label}</div>
                    <div>
                      <Checkbox checked={isSelected} />
                    </div>
                  </Item>
                );
              })}
            </div>
          );
        }}
      />
      <ErrorLabel error={errors?.branch_id?.message} />
    </Wrapper>
  );
};

export default DaySelect;
