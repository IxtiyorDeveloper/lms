import { Controller } from "react-hook-form";
import { StyledPhoneInput, Wrapper } from "./style";
import { Label } from "../input/style";
import ErrorLabel from "../errorLabel";
import { useEffect, useRef } from "react";
import { IMuskInputProps } from "./type";

const PhoneInput = ({
  placeholder = "",
  name,
  error = "",
  control,
  required = false,
  label = "",
  disabled = false,
  defaultValue,
  onComplete,
  className,
  autoFocus,
  autoComplete,
  style,
  onBlur,
  ...args
}: IMuskInputProps) => {
  const ref = useRef<any>();

  useEffect(() => {
    if (autoFocus) {
      ref.current?.focus?.();
    }
  }, [autoFocus]);

  return (
    <Wrapper required={label ? false : required} error={!!error}>
      <Label required={required} htmlFor={name}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <StyledPhoneInput
              ref={ref}
              error={error}
              international
              value={field.value}
              onChange={(e) => {
                field.onChange(e ?? "+998");
                if (onComplete && e?.length === 13 && e !== defaultValue) {
                  onComplete(e);
                }
              }}
              limitMaxLength
              withCountryCallingCode
              placeholder={placeholder}
              {...args}
              // onFocus={(e) => {
              //   // handleFocus();
              //   e.stopPropagation();
              //   args.onFocus && args.onFocus();
              // }}
              focusInputOnCountrySelection={false}
              disabled={disabled}
              defaultCountry="UZ"
              countryCallingCodeEditable={false}
              maxLength={
                field.value?.toString()?.length === 13
                  ? ref?.current?.defaultValue?.length
                  : 30
              }
              className={className}
              autoComplete={autoComplete}
              onBlur={onBlur}
            />
          );
        }}
      />
      <ErrorLabel error={error} />
    </Wrapper>
  );
};

export default PhoneInput;
