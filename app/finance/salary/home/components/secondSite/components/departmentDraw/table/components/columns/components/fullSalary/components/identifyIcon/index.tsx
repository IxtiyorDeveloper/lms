import { Type } from "./type";
import {
  DecreaseSvg,
  EqualSvg,
  IncreaseSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import React from "react";

export const identifyIcon = ({ record }: Type) => {
  if (record.difference_last_month_salary == 0) {
    return <EqualSvg />;
  }
  if (record.difference_last_month_salary > 0) {
    return <IncreaseSvg />;
  }
  if (record.difference_last_month_salary < 0) {
    return <DecreaseSvg />;
  }
};
