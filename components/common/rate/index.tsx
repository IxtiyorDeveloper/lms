import React, { FC, useCallback } from "react";
import { Controller } from "react-hook-form";
import { Label, Wrapper } from "./style";
import ErrorLabel from "./errorLabel";
import { Type } from "./type";
import { Rate } from "antd";
import { RateProps } from "antd/es/rate";
import type { RateRef } from "rc-rate/lib/Rate";
import debounce from "lodash/debounce";

const AntdRate: FC<
  Type &
    RateProps &
    React.RefAttributes<RateRef> & { debouncedFunction?: () => void }
> = ({
  placeholder = "",
  name,
  error = "",
  control,
  required = false,
  debouncedFunction,
  label = "",
  disabled = false,
  style,
  defaultValue,
  ...args
}) => {
  const debouncedSubmit = useCallback(
    debounce(() => {
      debouncedFunction?.();
    }, 500),
    [debouncedFunction],
  );

  return (
    <Wrapper required={label ? false : required} error={!!error}>
      {label && (
        <Label required={required} htmlFor={name}>
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          const handleChange = (e: number) => {
            field.onChange(e);
            debouncedFunction && debouncedSubmit();
            // if (debouncedFunction) {
            //   if (debouncedSubmit) {
            //     debouncedSubmit.cancel();
            //   }
            //   const newDebouncedSubmit = debounce(() => {
            //     debouncedFunction && debouncedFunction();
            //   }, 1500);
            //   setDebouncedSubmit(() => newDebouncedSubmit);
            //   newDebouncedSubmit();
            // }
          };

          return <Rate {...field} onChange={handleChange} {...args} />;
        }}
      />
      <ErrorLabel error={error} />
    </Wrapper>
  );
};

export default AntdRate;
