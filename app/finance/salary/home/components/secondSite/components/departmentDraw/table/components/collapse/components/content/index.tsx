import { SalaryEnums, SalarySubTypeEnums, TParams } from "types";
import { Buttons, PopoverContainer } from "../../style";
import { Button, Input, InputNumber } from "components";
import React from "react";
import { Control, FieldValues } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";

export const Content = ({
  type,
  sub_type,
  handleSubmit,
  onSubmit,
  control,
  title,
  setOpen,
  createSalaryComponent,
}: {
  type: SalaryEnums;
  sub_type: SalarySubTypeEnums;
  handleSubmit: any;
  onSubmit: any;
  control: Control<FieldValues, any>;
  title: { 500: string; 600: string; 400: string };
  setOpen: React.Dispatch<React.SetStateAction<string | undefined>>;
  createSalaryComponent: UseMutationResult<any, Error, TParams, unknown>;
}) => {
  const limitZero = type === SalaryEnums.PENALTY || type === SalaryEnums.TAX;
  return (
    <PopoverContainer>
      <form
        onSubmit={handleSubmit((data: any) =>
          onSubmit({ data, type, sub_type })
        )}
      >
        <div className="title">{title[type as keyof typeof title]}</div>
        <div className="inputs">
          <InputNumber
            label="Amount"
            name="amount"
            control={control}
            suffix={<div>UZS</div>}
            min={limitZero ? 0 : -100000000000}
          />
          <Input
            label="Description"
            name="description"
            control={control}
            type="textarea"
            rows={3}
          />
        </div>
        <Buttons>
          <Button
            className="cancel"
            style={{ width: "100%" }}
            onClick={() => setOpen(undefined)}
          >
            Cancel
          </Button>
          <Button
            className="save"
            style={{ width: "100%" }}
            type="submit"
            buttonLoading={createSalaryComponent?.isLoading}
          >
            Save
          </Button>
        </Buttons>
      </form>
    </PopoverContainer>
  );
};
