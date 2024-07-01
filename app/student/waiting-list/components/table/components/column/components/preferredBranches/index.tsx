import React from "react";
import { Popover } from "antd";
import Content from "./components/content";
import { IType } from "./type";

const PreferredBranches = ({ branches }: IType) => {
  return <Popover>{Content({ branches })}</Popover>;
};
export default PreferredBranches;
