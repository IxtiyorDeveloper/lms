import React, { FC, useEffect } from "react";
import { Item, Wrapper } from "./style";
import {
  AntdBadge,
  AntdSwitch,
  ErrorLabel,
  StrictInfoPopover,
} from "components";
import { usePageDataMemo } from "hooks";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useController,
} from "react-hook-form";
import { Checkbox } from "antd";
import Image from "next/image";
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
          Branches
          <AntdBadge
            content={len}
            showZero
            size="small"
            style={{ marginLeft: "8px" }}
          />
        </div>
        <div className="flex gap-4">
          <StrictInfoPopover />
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
      <div className="divider" />
      <Controller
        name="root.branch_id"
        control={control}
        render={({ field }) => {
          return (
            <div className="container">
              {branch?.map((e) => {
                const isSelected = (field.value || []).includes(
                  e.value.toString(),
                );
                return (
                  <Item
                    className="item"
                    onClick={() => onChangeBranch(field, e.value)}
                    isActive={isSelected}
                  >
                    <div className="flex w-100">
                      <div>
                        <Image
                          className={!isSelected ? "disable-color" : ""}
                          src="/create-student/branch.png"
                          width={24}
                          height={24}
                          alt=""
                        />
                      </div>
                      <div>
                        <Checkbox checked={isSelected} />
                      </div>
                    </div>
                    <div className="branch-name">{e.label}</div>
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
