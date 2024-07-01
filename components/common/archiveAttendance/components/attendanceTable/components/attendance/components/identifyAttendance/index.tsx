import { InsideAr } from "../../style";
import { EAttendanceStatuses, EStudentAttendance } from "types";
import { Popover } from "antd";
import { ComeSvg, NotComeSvg } from "components/index";
import { bgColors } from "styles/theme";
import React from "react";
import { AbsPopoverContent } from "./absPopoverContent";
import { IIdentifyAttendance } from "./type";

export const IdentifyAttendance = ({
  value,
  handleAttend,
  reason,
  handleReasonChange,
  control,
  errors,
  handleClose,
  handleSubmit,
  onSubmit,
}: IIdentifyAttendance) => {
  return (
    <InsideAr>
      {value !== EStudentAttendance.ABS && (
        <div
          className="icon"
          onClick={() =>
            handleAttend(EAttendanceStatuses.ABS, EStudentAttendance.ABS)
          }
        >
          <Popover
            destroyTooltipOnHide
            title=""
            trigger="click"
            placement="top"
            content={
              <AbsPopoverContent
                control={control}
                errors={errors}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
              />
            }
            open={reason}
            onOpenChange={handleReasonChange}
          >
            <div>
              <NotComeSvg bgColor={bgColors.primary} width={30} height={30} />
            </div>
          </Popover>
        </div>
      )}
      {value !== EStudentAttendance.NOT_CAME && (
        <div className="icon">
          <NotComeSvg
            width={30}
            height={30}
            onClick={() =>
              handleAttend(
                EAttendanceStatuses.NOT_CAME,
                EStudentAttendance.NOT_CAME
              )
            }
          />
        </div>
      )}
      {value !== EStudentAttendance.CAME && (
        <div className="icon">
          <ComeSvg
            width={30}
            height={30}
            onClick={() =>
              handleAttend(EAttendanceStatuses.CAME, EStudentAttendance.CAME)
            }
          />
        </div>
      )}
    </InsideAr>
  );
};
