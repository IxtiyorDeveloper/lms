import React, { useEffect } from "react";
import { Space } from "antd";
import { IClickablaTagProps } from "./type";
import { StyledCheckableTag, Wrapper } from "./style";
import { Controller, useController } from "react-hook-form";

const ClickableTagComponent: React.FC<IClickablaTagProps> = ({
  data,
  name,
  control,
  defaultValue,
  oneChoice = false,
  alwaysSelected = false,
}) => {
  const { field } = useController({ control, name });

  useEffect(() => {
    field.onChange(defaultValue);
  }, [defaultValue, name]);

  const handleChange = (
    tag: number | string,
    checked: boolean,
    onChange: any,
    value: number[],
  ) => {
    let nextSelectedTags;
    if (!oneChoice) {
      nextSelectedTags = checked
        ? [...(value || []), tag]
        : value.filter((t: number) => t !== tag);
    } else {
      if (!alwaysSelected) {
        nextSelectedTags = checked
          ? [tag]
          : value.filter((t: number) => t !== tag);
      } else {
        nextSelectedTags = [tag];
      }
    }
    onChange(nextSelectedTags);
  };

  return (
    <Wrapper>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }: any) => {
          return (
            <Space size={[0, 8]} wrap>
              {data?.map((tag) => (
                <StyledCheckableTag
                  key={tag?.id}
                  checked={value?.includes(tag?.id)}
                  onChange={(checked) =>
                    handleChange(tag?.id, checked, onChange, value)
                  }
                >
                  {tag?.name}
                </StyledCheckableTag>
              ))}
            </Space>
          );
        }}
      />
    </Wrapper>
  );
};

export default ClickableTagComponent;
