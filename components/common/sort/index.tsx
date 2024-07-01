import React from "react";
import { Container, Icon, Text, Wrapper } from "./style";
import { Controller } from "react-hook-form";
import { FilterSvg, SortSvg } from "@jasurbekyuldashov/lms-web-icons";
import { handleSort } from "./handleSort";
import { Type } from "./type";
import { ESortTypes } from "types";
import { bgColors } from "styles/theme";

const SortControl = ({
  name,
  control,
  defaultValue,
  label,
  className,
  field,
  innerContainerClassname,
}: Type) => {
  return (
    <Wrapper className={className}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          const current = value?.field == field ? value?.type : ESortTypes.none;
          return (
            <Container
              onClick={() => onChange(handleSort({ value: current, field }))}
              className={innerContainerClassname}
            >
              <Icon type={current}>
                {current === ESortTypes.none || !current ? (
                  <FilterSvg color={bgColors.paleSky} />
                ) : (
                  <SortSvg />
                )}
              </Icon>
              <Text className="label">{label}</Text>
            </Container>
          );
        }}
      />
    </Wrapper>
  );
};

export default SortControl;
