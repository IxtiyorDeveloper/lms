import React, { FC } from "react";
import { Wrapper } from "./style";
import { Controller } from "react-hook-form";
import DatePicker, { DatePickerProps } from "react-date-picker";
import "react-date-picker/src/DatePicker.css";
interface IProps {
  name: string;
  control: any;
}
const ReactDatePicker: FC<IProps & DatePickerProps> = ({
  name,
  control,
  ...args
}) => {
  return (
    <Wrapper>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => {
          return (
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              calendarAriaLabel="Toggle calendar"
              clearAriaLabel="Clear value"
              dayAriaLabel="Day"
              monthAriaLabel="Month"
              nativeInputAriaLabel="Date"
              {...args}
            />
          );
        }}
      />
    </Wrapper>
  );
};

export default ReactDatePicker;
