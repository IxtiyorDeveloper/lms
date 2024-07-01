import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { Wrapper } from "./style";
import { Type } from "./type";
import { Calendar as AntdCalendar, ConfigProvider } from "antd";
import { bgColors } from "styles/theme";
import { ErrorLabel } from "../index";

const Calendar: FC<Type> = ({ name, control, error }) => {
  return (
    <Wrapper>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: bgColors.primary,
          },
          components: {
            DatePicker: {
              colorBgContainer: bgColors.yukon,
            },
          },
        }}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <AntdCalendar fullscreen={false} onPanelChange={field.onChange} />
            );
          }}
        />
        <ErrorLabel error={error} />
      </ConfigProvider>
    </Wrapper>
  );
};

export default Calendar;
