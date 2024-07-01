import {
  DecreaseSvg,
  EqualSvg,
  IncreaseSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import React from "react";

export const identifyIcon = ({ difference }: { difference: number }) => {
  if (difference == 0) {
    return <EqualSvg />;
  }
  if (difference > 0) {
    return <IncreaseSvg />;
  }
  if (difference < 0) {
    return <DecreaseSvg />;
  }
};
