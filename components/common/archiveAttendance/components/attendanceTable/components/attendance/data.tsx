import { EStudentAttendance } from "types";
import {
  AddNewForNewDaySvg,
  ComeSvg,
  FilledStarSvg,
  NotComeSvg,
} from "components/index";
import { bgColors } from "styles/theme";
import { Unavailable } from "./style";
import React from "react";

export const icons = {
  [EStudentAttendance.CAME]: <ComeSvg width={30} height={30} />,
  [EStudentAttendance.NOT_CAME]: <NotComeSvg width={30} height={30} />,
  [EStudentAttendance.STAR]: <FilledStarSvg width={30} height={30} />,
  [EStudentAttendance.ADD]: <AddNewForNewDaySvg width={30} height={30} />,
  [EStudentAttendance.ABS]: (
    <NotComeSvg bgColor={bgColors.primary} width={30} height={30} />
  ),
  [EStudentAttendance.UNAVAILABLE]: (
    <Unavailable>
      <div className="inner"></div>
    </Unavailable>
  ),
  [EStudentAttendance.WHITE]: <div></div>,
};
