import { bgColors, textColors } from "styles/theme";
import {
  ArchivedTabSvg,
  CalendarHateSvg,
  ClosedCalendarSvg,
  ClosingCalendarSvg,
  RunningCalendarSvg,
} from "components";
import React from "react";
import { TStatuses } from "types";
import {
  STATE_CLOSED,
  STATE_CLOSING,
  STATE_OPENED,
  STATE_OPENING,
  STATE_RUNNING,
} from "constants/groupStatus";

export const transferCapability: {
  [key in TStatuses]?: number[];
} = {
  [STATE_OPENED]: [STATE_RUNNING, STATE_OPENING],
  [STATE_RUNNING]: [STATE_CLOSING],
  [STATE_CLOSING]: [STATE_CLOSED, STATE_RUNNING],
};

export const data = [
  {
    tabId: 200,
    title: "Opened",
    color: bgColors.deep,
    bottom: true,
    svg: <CalendarHateSvg color={bgColors.deep} height={34} width={34} />,
  },
  {
    tabId: 300,
    title: "Running",
    color: bgColors.serengeti,
    bottom: true,

    svg: (
      <RunningCalendarSvg color={bgColors.serengeti} height={34} width={34} />
    ),
  },
  {
    tabId: 400,
    title: "Closing",
    color: bgColors.pepper,
    bottom: true,

    svg: <ClosingCalendarSvg color={bgColors.pepper} height={34} width={34} />,
  },
  {
    tabId: 500,
    title: "Closed",
    color: bgColors.slate,
    bottom: true,

    svg: <ClosedCalendarSvg color={textColors.slate} height={34} width={34} />,
  },
  {
    tabId: 600,
    title: "Archived",
    color: bgColors.brotherBlue,
    bottom: true,

    svg: (
      <ArchivedTabSvg color={textColors.brotherBlue} height={34} width={34} />
    ),
  },
];
