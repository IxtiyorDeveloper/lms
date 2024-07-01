import * as React from "react";
import { Controller } from "react-hook-form";
import { Wrapper, Label } from "./style";
import ErrorLabel from "../input/errorLabel";
import { ConfigProvider, DatePicker } from "antd";
import { bgColors } from "styles/theme";
import { DATE_FORMAT_STANDARD } from "constants/dates";
import { TDatePicker } from "./type";

export default function MyDateRangePicker({
  control,
  name,
  label,
  required,
  error,
  format = DATE_FORMAT_STANDARD,
  defaultValue,
  className,
  ...args
}: TDatePicker & Partial<any>) {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: bgColors.primary },
      }}
    >
      <Wrapper required={label ? false : !!required} error={error!}>
        {label && <Label required={!!required}>{label}</Label>}
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => {
            return (
              <DatePicker.RangePicker
                style={{ minHeight: "37px" }}
                value={field.value}
                onChange={field.onChange}
                format={format}
                defaultValue={defaultValue}
                className={className}
                {...args}
              />
            );
          }}
        />
        <ErrorLabel error={error!} />
      </Wrapper>
    </ConfigProvider>
  );
}
