import React, { ChangeEvent, useState } from "react";
import { Controller } from "react-hook-form";
import { Type } from "../input/type";
import { InputProps } from "antd";
import { modules, formats } from "./config";
import { Wrapper, ReactQuillWrapper } from "./style";

import "react-quill/dist/quill.snow.css";
import { Label } from "../input/style";
import debounce from "lodash/debounce";

const Quill = ({
  placeholder = "",
  name,
  type = "input",
  debouncedFunction,
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
}: Type & InputProps & { debouncedFunction?: () => void }) => {
  const [debouncedSubmit, setDebouncedSubmit] = useState<any>(null);

  return (
    <Wrapper>
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
            } else {
              field.onChange(e);
            }
          };

          const handleChange = (e: string) => {
            field.onChange(e);
            if (debouncedFunction) {
              if (debouncedSubmit) {
                debouncedSubmit.cancel();
              }
              const newDebouncedSubmit = debounce(() => {
                debouncedFunction && debouncedFunction();
              }, 1500);
              setDebouncedSubmit(() => newDebouncedSubmit);
              newDebouncedSubmit();
            }
          };
          return (
            <ReactQuillWrapper
              theme="snow"
              value={field.value}
              onChange={handleChange}
              placeholder={placeholder}
              modules={modules}
              formats={formats}
              style={style}
            />
          );
        }}
      />
    </Wrapper>
  );
};

export default Quill;
