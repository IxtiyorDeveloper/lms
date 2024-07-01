import { FC } from "react";
import { Controller } from "react-hook-form";
import { Label, Wrapper, AsInput } from "./style";
import ErrorLabel from "./errorLabel";
import { Type } from "./type";
import { ConfigProvider, InputNumberProps } from "antd";
import { bgColors } from "styles/theme";

const InputNumber: FC<Type & InputNumberProps> = ({
  placeholder = "",
  name,
  type = "input",
  htmlType = "text",
  error = "",
  control,
  required = false,
  label = "",
  disabled = false,
  style,
  defaultValue,
  width,
  rows,
  isEmptySpace = false,
  suffix,
  min = 0,
  colorBgContainer = bgColors.yukon,
  lineHeight = 11 / 6,
  className,
  ...args
}) => {
  const formatter = (value: any) =>
    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const parser = (value: any) =>
    `${value}`.replace(/\s/g, "").replace(/,/g, ".").trim();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: bgColors.primary,
        },
        components: {
          InputNumber: {
            colorBgContainer,
            lineHeight,
            paddingBlock: 6,
          },
        },
      }}
    >
      <Wrapper
        style={{ width: width || "100%" }}
        required={label ? false : required}
        error={!!error}
        className={className}
      >
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
            return (
              <AsInput
                onKeyPress={(event: any) => {
                  const charCode = event.which ? event.which : event.keyCode;
                  // allow numbers (0-9), decimal point (.), and minus sign (-) to be typed
                  if (
                    charCode !== 45 && // minus sign
                    charCode !== 46 && // decimal point
                    charCode > 31 &&
                    (charCode < 48 || charCode > 57)
                  ) {
                    event.preventDefault();
                  }
                }}
                onChange={field.onChange}
                className={`grotesk ${!!error ? "er" : ""}`}
                disabled={disabled}
                id={name}
                min={min}
                value={field.value}
                type={htmlType}
                placeholder={placeholder}
                style={style}
                addonAfter={suffix}
                formatter={formatter}
                parser={parser}
                controls={{ downIcon: null, upIcon: null }}
                step={0}
                {...args}
              />
            );
          }}
        />
        <ErrorLabel error={error} />
      </Wrapper>
    </ConfigProvider>
  );
};

export default InputNumber;
