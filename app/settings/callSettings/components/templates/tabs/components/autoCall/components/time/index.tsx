import React from "react";
import { Wrapper, Row, Left, Right, Label, DaysWrapper, Title } from "./style";
import { DATE_FORMAT_HH_mm } from "constants/dates";
import { Switch, TimePicker } from "components";
import { weekdays } from "constants/weekdays";
import { IType } from "./type";

const Time = ({ control }: IType) => {
  return (
    <Wrapper>
      <Title>Time schedule</Title>
      <DaysWrapper>
        {weekdays.map((item, index) => {
          return (
            <Row key={index}>
              <Left>
                <Switch
                  name={`days.status_${index + 1}`}
                  control={control}
                  checked
                  size="small"
                />
                <Label>{item.title}</Label>
              </Left>
              <Right>
                <TimePicker
                  name={`days.time_from_${index + 1}`}
                  control={control}
                  format={DATE_FORMAT_HH_mm}
                />
                <TimePicker
                  name={`days.time_to_${index + 1}`}
                  control={control}
                  format={DATE_FORMAT_HH_mm}
                />
              </Right>
            </Row>
          );
        })}
      </DaysWrapper>
    </Wrapper>
  );
};

export default Time;
