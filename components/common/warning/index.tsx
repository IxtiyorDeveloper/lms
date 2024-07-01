import React from "react";
import { Wrapper, Info } from "./style";
import { PodoSvg } from "components";
import { bgColors } from "styles/theme";
import moment from "moment";
import { DATE_FORMAT_MMMM } from "constants/dates";
import { usePageDataMemo } from "hooks";

const Warning = () => {
  const currentDate = moment();
  const currentMonth = currentDate.format(DATE_FORMAT_MMMM);
  const nextMonth = currentDate.add(1, "months").format(DATE_FORMAT_MMMM);
  const selects = usePageDataMemo();
  const date = moment().date();
  if (date >= Number(selects.levelRecommendationConstant))
    return (
      <Wrapper>
        <Info>
          <PodoSvg color={bgColors.white} />
          <p className="text">
            Warning !!! In this list groups are levelled up, if you are adding
            student for <span className="next">{nextMonth}</span> you may use
            it, but if you are adding student for{" "}
            <span className="current">{currentMonth}</span>, please find groups
            by yourself and add student directly
          </p>
        </Info>
      </Wrapper>
    );
  else return null;
};

export default Warning;
