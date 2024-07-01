import {
  DecreaseSvg,
  EqualSvg,
  IncreaseSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import React from "react";
import { ESalaryProgress } from "types/finance/salary";
import { generateMonth } from "utils/generateMonth";

export const generateType = ({ difference }: { difference: number }) => {
  const month = generateMonth();
  if (difference > 0) {
    return {
      type: ESalaryProgress.up,
      text: `More than ${month}`,
      icon: <IncreaseSvg />,
    };
  }
  if (difference < 0) {
    return {
      type: ESalaryProgress.down,
      text: `Less than ${month}`,
      icon: <DecreaseSvg />,
    };
  }
  if (difference == 0) {
    return {
      type: ESalaryProgress.same,
      text: `Same with ${month}`,
      icon: <EqualSvg />,
    };
  }
  return {
    type: ESalaryProgress.same,
    text: `Same with ${month}`,
    icon: <EqualSvg />,
  };
};
