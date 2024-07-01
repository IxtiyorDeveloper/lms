import { Controller } from "react-hook-form";
import { StyledPhoneInput, Wrapper } from "./style";
import { Label } from "../input/style";
import ErrorLabel from "../errorLabel";
import { useEffect, useRef } from "react";
import { IMuskInputProps } from "./type";

const PhoneInput2 = ({
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
              specialLabel=""
              error={error}
              value={field.value ?? "+998"}
              onChange={(e) => {
                field.onChange(e ?? "+998");
                if (onComplete && e?.length === 12 && e !== defaultValue) {
                  onComplete(e);
                }
              }}
              placeholder={placeholder}
              {...args}
              onlyCountries={[]}
              dropdownStyle={{ width: 0 }}
              country="UZ"
              countryCodeEditable={false}
              showDropdown={false}
              disabled={disabled}
              defaultMask="+998 __ ___ __ __"
              onBlur={onBlur}
            />
          );
        }}
      />
      <ErrorLabel error={error} />
    </Wrapper>
  );
};

export default PhoneInput2;
