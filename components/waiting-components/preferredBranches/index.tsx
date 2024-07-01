import React from "react";
import { Popover } from "antd";
import Content from "./components/content";
import { IType } from "./type";
import { EStudentMatchType } from "types/student/waitingList";
import Router from "next/router";

const PreferredBranches = ({ branches, group }: IType) => {
  const recommended_status =
    (Router.query?.recommended_status as unknown as EStudentMatchType) ??
    EStudentMatchType.FULL;

  if (recommended_status == EStudentMatchType.FULL) {
    return <Popover>{Content({ branches, group, colored: false })}</Popover>;
  } else {
    return <Popover>{Content({ branches, group, colored: true })}</Popover>;
  }
};
export default PreferredBranches;
