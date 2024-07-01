import React, { useRef, useState } from "react";
import { StyledDatePicker, Wrapper } from "./style";
import { Label } from "../../common/input/style";
import { Controller } from "react-hook-form";
import { ErrorLabel } from "components";
import { TDatePicker } from "./type";
import { Box } from "@mui/material";
import { bgColors } from "styles/theme";
import dayjs from "dayjs";
import { ConfigProvider, DatePickerProps as AntDatePickerProps } from "antd";
import { DATE_FORMAT_STANDARD, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import en_GB from "antd/locale/en_GB";
import IMask from "imask";
import moment from "moment";
import "dayjs/locale/en-gb.js";
import "moment/locale/en-gb";
import debounce from "lodash/debounce"; // important!

// date picker uchun maska
const MASKED = IMask.createMask({
  blocks: {
    DD: { from: 1, mask: IMask.MaskedRange, to: 31 },
    MM: { from: 1, mask: IMask.MaskedRange, to: 12 },
    YYYY: { from: 1900, mask: IMask.MaskedRange, to: 2050 },
  },
  format: (date: Date) => moment(date).format(DATE_FORMAT_STANDARD),
  parse: (date: string) => moment(date, DATE_FORMAT_STANDARD),
  pattern: DATE_FORMAT_STANDARD,
  mask: Date,
});

export type DatePickerProps = Omit<
  AntDatePickerProps,
  "format" | "picker" | "onKeyDown"
>;

moment.locale("en-gb");

interface IProps {
  disableSundays?: boolean;
  disableOddDays?: boolean;
  disableEvenDays?: boolean;
  weekDaysIndexes?: number[];
  disableOldDays?: boolean;
  enabledDates?: string[];
  enabledDatesWithoutTodayValidation?: string[];
  stepBySelect?: boolean;
  disableOnBlur?: boolean;
}

const DatePickerAnt = ({
  name,
  control,
  isFlex = false,
  label,
  picker,
  defaultValue,
  disabled,
  error,
  format = DATE_FORMAT_STANDARD,
  valueFormat = DATE_FORMAT_YYYY_MM_DD,
  placeholder,
  showTime,
  allowClear,
  disableSundays = false,
  disableEvenDays = false,
  disableOddDays = false,
  disableOldDays = false,
  weekDaysIndexes = [],
  enabledDates = [],
  enabledDatesWithoutTodayValidation = [],
  stepBySelect = false,
  showToday = true,
  onChange,
  disableOnBlur = false,
  ...args
}: TDatePicker & DatePickerProps & IProps) => {
  const ref = useRef<any>();
  //calendar disbale date larni student ga qarab moslanadigan datelarni qaytaradigan funksiya
  const disabledDate = (current: dayjs.Dayjs) => {
    const day = dayjs();
    if (enabledDatesWithoutTodayValidation?.length > 0) {
      const date = enabledDatesWithoutTodayValidation?.find(
        (e) => e === current.format("YYYY-MM-DD"),
      );
      return !date;
    }
    if (enabledDates?.length > 0) {
      const date = enabledDates?.find(
        (e) => e === current.format("YYYY-MM-DD"),
      );
      return !(
        dayjs(date, "YYYY-MM-DD").isAfter(day) ||
        day.format("YYYY-MM-DD") === date
      );
    }
    if (disableOldDays) {
      return (
        current &&
        day.isAfter(current) &&
        day.format("YYYY-MM-DD") !== current.format("YYYY-MM-DD")
      );
    }
    if (disableSundays) {
      return current && current.format("ddd") === "Sun";
    }
    if (disableEvenDays || disableOddDays) {
      return current && current.date() % 2 === (disableEvenDays ? 0 : 1);
    }
    if (weekDaysIndexes?.length > 0) {
      const day = current.day();
      return current && !weekDaysIndexes?.includes(day === 0 ? 7 : day);
    }
    return false;
  };

  const [mode, setMode] = useState("year");

  const steps = (field: any) => ({
    onOpenChange: (open: boolean) => {
      open && setMode("year");
    },
    onPanelChange: (e: dayjs.Dayjs, type: string) => {
      if (!!e) field.onChange(dayjs(e).format(valueFormat));
      setMode(type);
    },
    mode,
  });
  return (
    <Wrapper>
      <Controller
        control={control}
        defaultValue={defaultValue}
        rules={{
          pattern: /[0-9]{2}/,
        }}
        render={({ field }) => {
          const change = debounce((date: any) => {
            field.onChange(date);
          }, 10);
          return (
            <Box
              alignItems="flex-start"
              flexDirection={isFlex ? "column" : "unset"}
              display={isFlex ? "flex" : "grid"}
            >
              {label && <Label required={false}>{label}</Label>}
              <ConfigProvider locale={en_GB}>
                {/*@ts-ignore*/}
                <StyledDatePicker
                  style={{
                    width: "100% !important",
                    paddingTop: "5.5px",
                    paddingBottom: "5.5px",
                    borderColor: error ? bgColors.red : bgColors.purpleCrystal,
                  }}
                  ref={ref}
                  onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
                    const input = event.target as HTMLInputElement;
                    input.value = MASKED.resolve(input.value ?? "");
                  }}
                  // onBlur={
                  //   !disableOnBlur
                  //     ? (((event: React.KeyboardEvent<HTMLInputElement>) => {
                  //         const input = event.target as HTMLInputElement;
                  //         input.value = MASKED.resolve(input.value ?? "");
                  //         if (input.value?.length >= 10) {
                  //           ref.current?.blur();
                  //           change(
                  //             dayjs(input.value, format).format(valueFormat),
                  //           );
                  //         }
                  //       }) as any)
                  //     : null
                  // }
                  onChange={(e: any) => {
                    if (!!e) change(dayjs(e).format(valueFormat));
                    else change(null);
                    ref.current?.blur();
                  }}
                  picker={picker as any}
                  disabled={disabled}
                  value={field.value && dayjs(field.value)}
                  format={format}
                  placeholder={placeholder}
                  showTime={showTime}
                  allowClear={true}
                  disabledDate={disabledDate}
                  showToday={showToday}
                  {...args}
                  {...(stepBySelect ? steps(field) : {})}
                />
              </ConfigProvider>
            </Box>
          );
        }}
        name={name}
      />
      {error && <ErrorLabel error={error} />}
    </Wrapper>
  );
};

export default DatePickerAnt;
