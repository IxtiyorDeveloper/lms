import React, { FC } from "react";
import Switch from "components/antd/switch";
import { TimePicker } from "components";
import { Control, UseFormGetValues, UseFormRegister } from "react-hook-form";
import { DATE_FORMAT_HH_mm } from "constants/dates";

export const week_days = {
  "1": "Monday",
  "2": "Tuesday",
  "3": "Wednesday",
  "4": "Thursday",
  "5": "Friday",
  "6": "Saturday",
  "7": "Sunday",
};
const Trow: FC<{
  control: Control;
  getValues: UseFormGetValues<any>;
  day: "1" | "2" | "3" | "4" | "5" | "6" | "7";
}> = ({ control, day, getValues }) => {
  return (
    <tr>
      <td style={{ padding: "5px 0 5px 10px" }}>
        <div style={{ width: "30px", marginRight: "20px" }}>
          <Switch name={`${day}.week_day`} control={control} size="small" />
        </div>
      </td>
      <td style={{ padding: "5px" }}>{week_days?.[day]}</td>
      <td style={{ padding: "5px 2px" }}>
        <TimePicker
          name={`${day}.time_from`}
          control={control}
          format={DATE_FORMAT_HH_mm}
          defaultValue={getValues(`${day}.time_from`) || ""}
        />
      </td>
      <td style={{ padding: "5px 2px" }}>
        <TimePicker
          name={`${day}.time_to`}
          control={control}
          format={DATE_FORMAT_HH_mm}
          defaultValue={getValues(`${day}.time_from`)}
        />
      </td>
    </tr>
  );
};

export default Trow;
