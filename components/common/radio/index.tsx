import { ConfigProvider, Radio } from "antd";
import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { Wrapper, Label } from "./style";
import { IRadiosProps } from "./type";
import { ErrorLabel } from "../index";
import { bgColors } from "styles/theme";

const Radios: FC<IRadiosProps> = ({
  options,
  control,
  name,
  label = "",
  error = "",
  style,
  disabled = false,
  left = true,
}) => {
  return (
    <Wrapper left={left}>
      {label && <Label>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <ConfigProvider theme={{ token: { colorPrimary: bgColors.primary } }}>
            <Radio.Group
              disabled={disabled}
              onChange={(e) => onChange(e.target.value)}
              value={value}
              className="radioGroup"
            >
              {options?.map((option) => (
                <Radio
                  style={
                    !left ? { flexDirection: "row-reverse", ...style } : {}
                  }
                  className={!left ? "radioStyled" : ""}
                  // @ts-ignore
                  key={option.label}
                  value={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          </ConfigProvider>
        )}
      />
      <ErrorLabel error={error} />
    </Wrapper>
  );
};

export default Radios;
