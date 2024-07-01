import React, { FC, useEffect } from "react";
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
  useController,
} from "react-hook-form";
import { Checkbox } from "antd";
import StrictConfirmationModal from "../strictConfirmationModal";

interface IProps {
  control: any;
  errors: any;
  watch: any;
  setValue: any;
}

const BranchSelect: FC<IProps> = ({ control, errors, watch, setValue }) => {
  const { branch } = usePageDataMemo();

  const branches = watch("root.branch_id");
  const isStrict = watch("root.strict_by_branch");
  const len = branches?.length || 0;

  const { field } = useController({ control, name: "root.branch_id" });

  useEffect(() => {
    field.onChange(branches);
  }, [branches]);

  const onChangeBranch = (
    field: ControllerRenderProps<FieldValues, "root.branch_id">,
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
          <RedBadgeTitle count={len} title="Branches" />
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
              name="root.strict_by_branch"
            />
          </div>
        </div>
      </div>
      <Controller
        name="root.branch_id"
        control={control}
        render={({ field }) => {
          return (
            <div className="container">
              {branch?.map((e) => {
                const isSelected = (field.value || [])?.includes(
                  e.value.toString(),
                );
                return (
                  <Item
                    className="item"
                    onClick={() => onChangeBranch(field, e.value)}
                    isActive={isSelected}
                  >
                    <div className="flex w-100">
                      <p className="branch-name">{e.label}</p>
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
      <StrictConfirmationModal watch={watch} name="adasd" setValue={setValue} />
    </Wrapper>
  );
};

export default BranchSelect;
