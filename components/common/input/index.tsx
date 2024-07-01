import { ChangeEvent, FC } from "react";
import { Controller } from "react-hook-form";
import { Label, Wrapper, AsInput, AsTextarea, AsPassword } from "./style";
import ErrorLabel from "./errorLabel";
import { Type } from "./type";
import { ConfigProvider, InputProps } from "antd";
import { bgColors } from "styles/theme";

const Input: FC<Type & InputProps> = ({
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
  rows,
  shadow = true,
  suffix,
  prefix,
  autoComplete,
  onFocus,
  hasThreeDots,
  colorText,
  onlyText = false,
  onlyNumber = false,
  colorBgContainer = bgColors.yukon,
  ...args
}) => {
  return (
    <Wrapper required={label ? false : required} error={!!error}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: bgColors.primary,
          },
          components: {
            Input: {
              colorBgContainer,
              controlHeight: 36,
              colorText: colorText,
            },
          },
        }}>
        {label && (
          <Label required={required} htmlFor={name}>
            {label}
          </Label>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field, formState: { errors } }) => {
            const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
              if (onlyText) {
                const inputValue = e.target.value;
                const lettersOnly = inputValue.replace(/[^A-Za-z]/g, "");
                field.onChange(lettersOnly);
              }
              if (onlyNumber) {
                const inputValue = e.target.value;
                const lettersOnly = inputValue.replace(/[^0-9+]/g, "");
                field.onChange(lettersOnly);
              } else {
                field.onChange(e);
              }
              // Do something with the filtered input value
              //
            };

            return type === "input" ? (
              <AsInput
                prefix={prefix}
                shadow={shadow ? 1 : 0}
                disabled={disabled}
                id={name}
                onChange={(e) => handleInputChange(e)}
                value={field.value}
                suffix={suffix}
                type={htmlType}
                placeholder={placeholder}
                style={{ ...style, minHeight: "36px" }}
                hidden={htmlType === "file"}
                autoComplete={autoComplete}
                onFocus={onFocus}
                {...args}
              />
            ) : type === "textarea" ? (
              <AsTextarea
                disabled={disabled}
                id={name}
                onChange={field.onChange}
                value={field.value}
                placeholder={placeholder}
                {...args}
                hidden={htmlType === "file"}
                rows={rows}
                autoComplete={autoComplete}
                style={style}
              />
            ) : (
              <AsPassword
                prefix={prefix}
                value={field.value}
                disabled={disabled}
                style={{ ...style, minHeight: "36px" }}
                onChange={field.onChange}
                placeholder={placeholder}
                {...args}
                // autoComplete="new-password"
                autoComplete={autoComplete}
                onFocus={onFocus}
              />
            );
          }}
        />
        <ErrorLabel error={error} hasThreeDots={hasThreeDots} />
      </ConfigProvider>
    </Wrapper>
  );
};

export default Input;
