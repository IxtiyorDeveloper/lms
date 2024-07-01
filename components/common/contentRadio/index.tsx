import React from "react";
import { TGender } from "./type";
import { Container, ParentWrapper, Wrapper } from "./style";
import { Controller } from "react-hook-form";
import { Label } from "../colorSelect/style";
import ErrorLabel from "../colorSelect/errorLabel";

const ContentRadio = ({
  label,
  error,
  control,
  name,
  contents,
  required = false,
}: TGender) => {
  return (
    <ParentWrapper>
      {label && (
        <Label required={required} htmlFor={name}>
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Wrapper>
              {contents?.map((item, index) => {
                return (
                  <Container
                    onClick={() => field.onChange(item?.value)}
                    className="container"
                    key={index}
                  >
                    {item?.content}
                    <div className="abs">
                      <input
                        type="radio"
                        checked={field.value === item?.value}
                        onClick={(e) => {
                          e.stopPropagation();
                          field.onChange(item?.value);
                        }}
                        name={name}
                      />
                    </div>
                  </Container>
                );
              })}
            </Wrapper>
          );
        }}
      />
      <ErrorLabel error={error} />
    </ParentWrapper>
  );
};

export default ContentRadio;
