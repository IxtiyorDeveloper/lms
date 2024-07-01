import React, { FC, useEffect } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useController,
} from "react-hook-form";
import { Wrapper, Content, Inner, Title, Row } from "./style";
import { Type } from "./type";
import { CheckOutlined } from "@ant-design/icons";

const LabelControl: FC<Type> = ({ name, control, data, defaultValue }) => {
  const handleChange = ({
    field,
    id,
  }: {
    field: ControllerRenderProps<FieldValues, string>;
    id: number;
  }) => {
    const isExist = field?.value?.includes(id);
    if (isExist) {
      const filtered = field.value?.filter((f: number) => f != id);
      field.onChange(filtered);
    } else {
      const add = [...(field?.value || []), id];
      field.onChange(add);
    }
  };

  const { field } = useController({ control, name });

  // useEffect(() => {
  //   field.onChange(defaultValue);
  // }, [defaultValue, name]);

  return (
    <Wrapper>
      <Inner>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <Content>
                {data?.map((item, k) => {
                  const active = field?.value?.includes(item.value);
                  return (
                    <Row
                      key={k}
                      onClick={() => handleChange({ field, id: item.value })}
                      active={active}
                    >
                      <Title>{item?.label}</Title>
                      <CheckOutlined className="check-icon" />
                    </Row>
                  );
                })}
              </Content>
            );
          }}
        />
      </Inner>
    </Wrapper>
  );
};

export default LabelControl;
