import { EAttendanceStatuses, EStudentAttendance } from "types";
import { IReason } from "../../type";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";

export interface IIdentifyAttendance {
  value: EStudentAttendance;
  handleAttend: (
    status: EAttendanceStatuses,
    innerValue: EStudentAttendance,
  ) => void;
  reason: boolean;
  handleReasonChange: (newOpen: boolean) => void;
  control: Control<IReason, any>;
  errors: FieldErrors<IReason>;
  handleClose: () => void;
  handleSubmit: UseFormHandleSubmit<IReason, IReason>;
  onSubmit: (data: IReason) => void;
}

export interface IAbsPopoverContent {
  control: Control<IReason, any>;
  errors: FieldErrors<IReason>;
  handleClose: () => void;
  handleSubmit: UseFormHandleSubmit<IReason, IReason>;
  onSubmit: (data: IReason) => void;
}
