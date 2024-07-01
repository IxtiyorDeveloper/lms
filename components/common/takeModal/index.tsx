import { FC } from "react";
import { Controller } from "react-hook-form";
import { Label, Wrapper, Content, Inner, Box } from "./style";
import ErrorLabel from "./errorLabel";
import { Type } from "./type";
import { bgColors } from "styles/theme";
import { NextLink } from "../index";

const TakeModal: FC<Type> = ({
  name,
  error = "",
  control,
  required = false,
  label = "",
  data,
}) => {
  return (
    <Wrapper>
      {label && (
        <Label required={required} htmlFor={name}>
          {label}
        </Label>
      )}
      <Inner required={label ? false : required} error={!!error}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <Content>
                {data?.map((item, k) => {
                  const active = item?.tabId === field?.value;
                  return (
                    <NextLink href={item?.href} disabled={!item?.href}>
                      <Box
                        key={k}
                        onClick={() => {
                          field.onChange(item?.tabId);
                        }}
                        style={
                          active
                            ? {
                                borderColor: bgColors.primary,
                                ...item?.styles,
                                ...item?.activeStyles,
                              }
                            : {
                                ...item?.styles,
                                borderColor: bgColors.transparent,
                              }
                        }
                      >
                        {item?.svg}
                        <div className="title">{item?.title}</div>
                        {item?.bottom && (
                          <div
                            className="abs"
                            style={{ backgroundColor: item?.color }}
                          />
                        )}
                      </Box>
                    </NextLink>
                  );
                })}
              </Content>
            );
          }}
        />
      </Inner>
      <ErrorLabel error={error} />
    </Wrapper>
  );
};

export default TakeModal;
