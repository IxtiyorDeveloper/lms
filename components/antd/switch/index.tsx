import { FC, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Label, Wrapper } from "./style";
import ErrorLabel from "../inputNumber/errorLabel";
import { Type } from "./type";
import { Switch, SwitchProps } from "antd";
import { useController } from "react-hook-form";
const AntdSwitch: FC<
  Type & SwitchProps & { defaultValue?: boolean; watchDefaultValue?: boolean }
> = ({
  placeholder = "",
  name,
  type = "input",
  htmlType = "text",
  error = "",
  control,
  required = false,
  label = "",
  disabled = false,
  watchDefaultValue = false,
  style,
  defaultValue,
  rows,
  isEmptySpace = false,
  widthSwitch,
  labelStyle,
  ...args
}) => {
  const { field } = useController({ control, name });

  useEffect(() => {
    if (watchDefaultValue) {
      field.onChange(defaultValue);
    }
  }, [watchDefaultValue, defaultValue]);

  return (
    <Wrapper
      required={label ? false : required}
      error={!!error}
      style={style}
      className="switch-wrapper"
    >
      {label && (
        <Label required={required} htmlFor={name} style={labelStyle}>
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <Switch
              size={args.size}
              onChange={(value, event) => {
                field.onChange(value);
                args?.onChange?.(value, event);
              }}
              checked={field.value}
              disabled={disabled}
              defaultChecked={defaultValue}
            />
          );
        }}
      />
      <ErrorLabel error={error} />
    </Wrapper>
  );
};

export default AntdSwitch;
