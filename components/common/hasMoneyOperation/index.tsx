import { FC } from "react";
import { Controller } from "react-hook-form";
import { Label, Wrapper, Inner } from "./style";
import ErrorLabel from "./errorLabel";
import { Type } from "./type";
import { DollarSvg } from "components";
import { bgColors } from "styles/theme";
import * as React from "react";

const HasMoneyOperation: FC<Type> = ({
  name,
  error = "",
  control,
  required = false,
  label = "",
}) => {
  return (
    <Wrapper>
      {label && (
        <Label required={required} htmlFor={name}>
          {label}
        </Label>
      )}
      <Inner required={label ? false : required} error={!!error}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <div
                className={`icon ${field.value ? "active" : "inactive"}`}
                onClick={() => field.onChange(!field.value)}
              >
                <DollarSvg color={bgColors.white} />
              </div>
            );
          }}
        />
      </Inner>
      <ErrorLabel error={error} />
    </Wrapper>
  );
};

export default HasMoneyOperation;
