import React, { Fragment } from "react";
import { TGender } from "./type";
import { CustomRadio, Wrapper } from "./style";
import { Controller } from "react-hook-form";
import { ErrorLabel } from "../index";

const GenderSelect = ({
  label,
  error,
  icon,
  control,
  name,
  value,
  checkedColor,
}: TGender) => {
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const checked = field.value === value;
          return (
            <Wrapper checked={checked} checkedColor={checkedColor}>
              <div onClick={() => field.onChange(value)} className="container">
                <div className="wrap">
                  <div className="center">{icon(checked)}</div>
                  <div>
                    <p className="label">{label}</p>
                  </div>
                </div>
                <CustomRadio
                  type="radio"
                  checked={checked}
                  onClick={(e) => {
                    e.stopPropagation();
                    field.onChange(value);
                  }}
                  name={name}
                />
              </div>
            </Wrapper>
          );
        }}
      />
      <ErrorLabel error={error} />
    </Fragment>
  );
};

export default GenderSelect;
