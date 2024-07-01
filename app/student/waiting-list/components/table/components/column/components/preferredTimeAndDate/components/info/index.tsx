import React from "react";
import { OneStudent } from "types/student";
import { IGroup } from "types";
import { Wrapper } from "./style";
import { Row } from "./style";
import moment from "moment";
import { DATE_FORMAT_HH_mm, DATE_FORMAT_HH_mm_ss } from "constants/dates";

const Info = ({ record }: { record: OneStudent }) => {
  const preferDays = record?.preferDays;
  const preferTimes = record?.preferTimes;

  return (
    <Wrapper>
      <Row>
        {preferDays.map((item) => {
          return <p>{item?.day?.name}</p>;
        })}
      </Row>
      <Row>
        {preferTimes?.map((item) => {
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
};

export default Info;
