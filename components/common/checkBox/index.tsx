import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { Label, Wrapper } from "./style";
import ErrorLabel from "./errorLabel";
import { Type } from "./type";
import { Checkbox, ConfigProvider, InputProps } from "antd";
import { bgColors } from "styles/theme";

const CheckBoxComponent: FC<Type & InputProps> = ({
  placeholder = "",
  name,
  error = "",
  control,
  required = false,
  label = "",
  disabled = false,
  style,
  defaultValue,
  checked,
  hidden,
  children,
  wrapperStyle,
  promisedValue = null,
  colorPrimary,
  ...args
}) => {
  return (
    <Wrapper
      required={label ? false : required}
      error={!!error}
      style={wrapperStyle}
      className="checkbox-wrapper"
    >
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }: any) => {
          return (
            <div>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: colorPrimary ?? bgColors.primary,
                  },
                }}
              >
                <Checkbox
                  // @ts-ignore
                  onChange={(e) =>
                    onChange(
                      !!promisedValue
                        ? e.target?.checked
                          ? promisedValue
                          : null
                        : e.target?.checked
                    )
                  }
                  disabled={disabled}
                  id={name}
                  checked={!!promisedValue ? promisedValue === value : !!value}
                  {...args}
                >
                  {children}
                </Checkbox>
              </ConfigProvider>
            </div>
          );
        }}
      />
      {label && (
        <Label required={required} htmlFor={name}>
          {label}
        </Label>
      )}
      <ErrorLabel error={error} />
    </Wrapper>
  );
};

export default CheckBoxComponent;
