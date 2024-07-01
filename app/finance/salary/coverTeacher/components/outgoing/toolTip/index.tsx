import React from "react";
import { ICoverTeacherComponent } from "types/finance/salary";
import { Wrapper } from "./style";
import moment from "moment";
import { DATE_FORMAT_MMM_DD_YYYY } from "constants/dates";
import { removeDuplicatesByDate } from "./utils";

const ToolTipForDates = (covers: ICoverTeacherComponent[]) => {
  return (
    <Wrapper>
      {removeDuplicatesByDate(covers)?.map((item, index) => {
        return (
          <p className="text" key={index}>
            {moment(item?.data?.date).format(DATE_FORMAT_MMM_DD_YYYY)}
          </p>
        );
      })}
    </Wrapper>
  );
};

export default ToolTipForDates;
