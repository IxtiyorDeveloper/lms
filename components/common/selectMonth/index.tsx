import React, { useCallback, useState } from "react";

import { SelectMonthInput, SelectMonthWrapper } from "./style";
import { ArrowSelect180Svg, ArrowSelectSvg } from "components";
import { TSelectMonth } from "./type";
import moment from "moment";
import { textColors } from "styles/theme";
import { DATE_FORMAT_MMMM_YYYY } from "constants/dates";

const getCurrentValue = (initValue?: string) =>
  moment(initValue).format(DATE_FORMAT_MMMM_YYYY);

function SelectMonth(props: TSelectMonth) {
  const { initValue, onChange } = props;
  const currentDate = getCurrentValue();
  const [value, setValue] = useState<string>(initValue || currentDate);
  const [disabled, setDisabled] = useState<boolean>(false);

  const changeDate = useCallback(
    (type: string) => {
      const newDate = moment(value, DATE_FORMAT_MMMM_YYYY).add(
        type === "+" ? 1 : -1,
        "month"
      );
      if (moment(currentDate, DATE_FORMAT_MMMM_YYYY) >= newDate) {
        const newDateToString = newDate.format(DATE_FORMAT_MMMM_YYYY);
        setValue(newDateToString);
        onChange && onChange(newDateToString);
        disabled && setDisabled(false);
      } else {
        !disabled && setDisabled(true);
      }
    },
    [value, currentDate, onChange, disabled]
  );
  return (
    <SelectMonthWrapper mx={props.mx}>
      <ArrowSelectSvg onClick={() => changeDate("-")} />
      <SelectMonthInput>{value}</SelectMonthInput>
      <ArrowSelect180Svg
        color={disabled ? textColors.brotherBlue : undefined}
        onClick={() => changeDate("+")}
      />
    </SelectMonthWrapper>
  );
}

export default SelectMonth;
