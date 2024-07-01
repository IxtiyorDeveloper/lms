import React from "react";
import { Container } from "./style";
import { EStudentMatchType } from "types/student/waitingList";
import { Popover } from "antd";
import Info from "./components/info";
import { bgColors } from "styles/theme";
import { IType } from "./type";
import Content from "./components/content";
import Router from "next/router";

const PreferredTimeAndDate = ({ record, group }: IType) => {
  const preferDays = record?.preferDays;
  const preferTimes = record?.preferTimes;

  const recommended_status =
    (Router.query?.recommended_status as unknown as EStudentMatchType) ??
    EStudentMatchType.FULL;

  if (recommended_status == EStudentMatchType.FULL) {
    if (preferTimes?.length || preferDays?.length)
      return (
        <Container>
          <Popover
            content={Info({ record, group, colored: false })}
            color={bgColors.dark}
            destroyTooltipOnHide
          >
            {Content({ record, group, colored: false })}
          </Popover>
        </Container>
      );
    else return null;
  } else {
    if (preferTimes?.length || preferDays?.length)
      return (
        <Container>
          <Popover
            content={Info({ record, group, colored: true })}
            color={bgColors.dark}
            destroyTooltipOnHide
          >
            {Content({ record, group, colored: true })}
          </Popover>
        </Container>
      );
    else return null;
  }
};

export default PreferredTimeAndDate;
