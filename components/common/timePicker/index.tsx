import React, { FC, useEffect } from "react";
import { Controller, useController } from "react-hook-form";
import { Label, Wrapper } from "./style";
import { Type } from "./type";
import { TimePicker, TimePickerProps } from "antd";
import { ErrorLabel } from "../index";
import dayjs from "dayjs";

const TimePickerComponent: FC<Type & TimePickerProps> = ({
  name,
  control,
  showSecond = false,
  disabled = false,
  format,
  error,
  label,
  watchDefaultValue,
  defaultValue,
  ...props
}) => {
  const { field } = useController({ name, control });

  useEffect(() => {
    if (watchDefaultValue && defaultValue) {
      field.onChange(defaultValue);
    }
  }, [watchDefaultValue, defaultValue]);

  return (
    <Wrapper error={!!error}>
      {label && <Label required={false}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <TimePicker
              onKeyDown={(e) => {
                const value = (e.target as any)?.value;
                if (value.length >= 4) {
                  const date = dayjs(value, "HH:mm");
                  const date1 = dayjs(value, "HHmm");
                  if (date.isValid()) {
                    field.onChange(date);
                  } else if (date1.isValid()) {
                    field.onChange(date1);
                  }
                }
              }}
              disabled={disabled}
              //@ts-ignore
              onSelect={(e: any) => {
                field.onChange(e);
              }}
              format={format}
              {...field}
              {...props}
            />
          );
        }}
      />
      <ErrorLabel error={error} />
    </Wrapper>
  );
};

export default TimePickerComponent;
