import React from "react";
import { OneStudent } from "types/student";
import { IGroup } from "types";
import { Wrapper } from "./style";
import { Row } from "./style";
import moment from "moment";
import { DATE_FORMAT_HH_mm, DATE_FORMAT_HH_mm_ss } from "constants/dates";

const Info = ({
  record,
  group,
  colored,
}: {
  record: OneStudent;
  group: IGroup | undefined;
  colored: boolean;
}) => {
  const preferDays = record?.preferDays;
  const preferTimes = record?.preferTimes;

  const lessonTime = group?.lessonTime;
  const lessonDay = group?.lessonDay;
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
        {preferTimes?.map((item) => {
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
};

export default Info;
