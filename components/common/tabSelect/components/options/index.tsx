import React, { useState } from "react";
import { Wrapper, Tabs, Container, Row, RowLabel, RowValue } from "./style";
import { Segmented } from "components";
import { generateOptions } from "./generateOptions";
import { stopPropagation } from "utils/stopPropagation";
import { ITabOptions } from "./type";
import { checkSelected } from "./checkSelected";
import { handleSelect } from "./handleSelect";

export const generateTabOptions = ({
  data,
  onChange,
  value,
  mode,
  listHeight,
  reset,
  setOpen,
}: ITabOptions) => {
  const { menu } = generateOptions({ data });

  const initValue = menu?.[0]?.value;
  const [current, setCurrent] = useState(initValue);

  const options = data?.find((d) => d.value == current)?.options;

  const handleTabChange = (e: any) => {
    setCurrent(e);
    reset();
  };

  const handleStop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mode == "multiple") {
      stopPropagation(e);
    }
  };

  return (
    <Wrapper onClick={handleStop}>
      <Tabs>
        <Segmented
          options={menu as any}
          initValue={initValue}
          onChange={(e: any) => handleTabChange(e)}
          block
        />
      </Tabs>
      <Container listHeight={listHeight}>
        {options?.map((item, index) => {
          const className = checkSelected({ item, value, mode });
          return (
            <Row
              key={index}
              className={className}
              onClick={(event) =>
                handleSelect({
                  mode,
                  onChange,
                  value,
                  setOpen,
                  currentValue: item.value,
                })
              }
            >
              <RowLabel className={className}>{item.label}</RowLabel>
              <RowValue className={className}>{item.value}</RowValue>
            </Row>
          );
        })}
      </Container>
    </Wrapper>
  );
};
