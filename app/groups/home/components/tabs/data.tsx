import { bgColors, textColors } from "styles/theme";
import {
  ArchivedTabSvg,
  CalendarHateSvg,
  ClosedCalendarSvg,
  ClosingCalendarSvg,
  RunningCalendarSvg,
  StartDateSvg,
} from "components";
import React from "react";
import { EGroupTabs } from "constants/groupStatus";

export const tabContent = [
  {
    tabId: EGroupTabs.Opening,
    title: "Opening",
    bgColor: bgColors.primary,
    textColor: textColors.dark,
    svg: <StartDateSvg color={bgColors.vermin} height={20} width={20} />,
  },
  {
    tabId: EGroupTabs.Opened,
    title: "Opened",
    bgColor: bgColors.kitten,
    textColor: textColors.white,
    svg: <CalendarHateSvg color={bgColors.sinter} height={20} width={20} />,
  },
  {
    tabId: EGroupTabs.Running,
    title: "Running",
    bgColor: bgColors.serengeti,
    textColor: textColors.white,
    svg: (
      <RunningCalendarSvg
        color={bgColors.transparentGreen}
        height={20}
        width={20}
      />
    ),
  },
  {
    tabId: EGroupTabs.Closing,
    title: "Closing",
    bgColor: bgColors.pepper,
    textColor: textColors.white,
    svg: <ClosingCalendarSvg color={bgColors.pale} height={20} width={20} />,
  },
  {
    tabId: EGroupTabs.Closed,
    title: "Closed",
    bgColor: bgColors.slate,
    textColor: textColors.white,
    svg: <ClosedCalendarSvg color={textColors.sadet} height={20} width={20} />,
  },
  {
    tabId: EGroupTabs.Archived,
    title: "Archived",
    bgColor: bgColors.purpleCrystal,
    textColor: textColors.yourShadow,
    svg: (
      <ArchivedTabSvg color={textColors.yourShadow} height={20} width={20} />
    ),
  },
];
