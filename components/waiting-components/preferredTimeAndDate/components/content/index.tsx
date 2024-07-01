import React from "react";
import { Row, Wrapper } from "./style";
import moment from "moment";
import { DATE_FORMAT_HH_mm, DATE_FORMAT_HH_mm_ss } from "constants/dates";
import { IType } from "./type";

const Content = ({ group, record, colored }: IType) => {
  const preferDays = record?.preferDays;
  const preferTimes = record?.preferTimes;

  const lessonTime = group?.lessonTime;
  const lessonDay = group?.lessonDay;

  const timesL = preferTimes?.length;
  const isTimeMoreThanTwo = timesL > 1;

  if (isTimeMoreThanTwo) {
    return (
      <Wrapper>
        <Row>
          {preferDays.map((item) => {
            const isFit = lessonDay?.id == item?.day?.id;
            return (
              <p
                className={`infoCell ${colored ? (isFit ? "fit" : "unfit") : ""}`}
              >
                {item?.day?.name}
              </p>
            );
          })}
        </Row>
        <Row>
          {preferTimes?.slice(0, 1)?.map((item) => {
            const isFit = lessonTime?.id == item?.time?.id;
            return (
              <p
                className={`infoCell ${colored ? (isFit ? "fit" : "unfit") : ""}`}
              >
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
            const isFit = lessonDay?.id == item?.day?.id;
            return (
              <p
                className={`infoCell ${colored ? (isFit ? "fit" : "unfit") : ""}`}
              >
                {item?.day?.name}
              </p>
            );
          })}
        </Row>
        <Row>
          {preferTimes.map((item) => {
            const isFit = lessonTime?.id == item?.time?.id;
            return (
              <p
                className={`infoCell ${colored ? (isFit ? "fit" : "unfit") : ""}`}
              >
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
