import React from "react";
import { Row, Wrapper } from "./style";
import moment from "moment";
import { DATE_FORMAT_HH_mm, DATE_FORMAT_HH_mm_ss } from "constants/dates";
import { IType } from "./type";

const Content = ({ record }: IType) => {
  const preferDays = record?.preferDays;
  const preferTimes = record?.preferTimes;

  const timesL = preferTimes?.length;
  const isTimeMoreThanTwo = timesL > 1;

  if (isTimeMoreThanTwo) {
    return (
      <Wrapper>
        <Row>
          {preferDays.map((item) => {
            return <p>{item?.day?.name}</p>;
          })}
        </Row>
        <Row>
          {preferTimes?.slice(0, 1)?.map((item) => {
            return (
              <p>
                {item.time?.time &&
                  moment(item.time.time, DATE_FORMAT_HH_mm_ss).format(
                    DATE_FORMAT_HH_mm,
                  )}
                , +{timesL - 1}
              </p>
            );
          })}
        </Row>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Row>
          {preferDays.map((item) => {
            return <p>{item?.day?.name}</p>;
          })}
        </Row>
        <Row>
          {preferTimes.map((item) => {
            return (
              <p>
                {item.time?.time &&
                  moment(item.time.time, DATE_FORMAT_HH_mm_ss).format(
                    DATE_FORMAT_HH_mm,
                  )}
              </p>
            );
          })}
        </Row>
      </Wrapper>
    );
  }
};

export default Content;
