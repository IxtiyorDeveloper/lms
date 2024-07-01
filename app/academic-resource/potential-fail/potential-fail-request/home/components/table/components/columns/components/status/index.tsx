import { bgColors, textColors } from "styles/theme";
import { DeadlineTimeSvg, TimerTopSvg } from "@jasurbekyuldashov/lms-web-icons";
import React from "react";
import { Tag } from "antd";
import { Wrapper } from "./style";
import { IStatus } from "./type";
import moment from "moment";
import { EPotentialFailRequestStatus } from "types/potentialFail/potentialFailRequest";

const rowStatus = {
  [EPotentialFailRequestStatus.PENDING]: {
    bgColor: bgColors.primary,
    color: textColors.black,
    icon: <DeadlineTimeSvg color={textColors.black} />,
    text: "Pending...",
  },
  [EPotentialFailRequestStatus.PROCESSING]: {
    bgColor: bgColors.midori,
    color: textColors.white,
    icon: <TimerTopSvg color={textColors.white} />,
    text: "",
  },
  [EPotentialFailRequestStatus.FINISHED]: {
    bgColor: bgColors.pop,
    color: textColors.white,
    icon: undefined,
    text: "Request finished",
  },
};
export const myStatus = ({ record }: IStatus) => {
  const status = rowStatus[record?.status as keyof typeof rowStatus];
  const date = moment(record?.deadline).format("DD MMM HH:mm");
  return (
    <Wrapper textColor={status.color}>
      <Tag color={status.bgColor} icon={status?.icon}>
        {record?.status == EPotentialFailRequestStatus.PROCESSING
          ? date
          : status?.text}
      </Tag>
    </Wrapper>
  );
};
