import React, { FC, useEffect, useState } from "react";
import { AttendanceWrapper, ATWrapper } from "./style";
import { EAttendanceStatuses, EStudentAttendance } from "types";
import { PersonComment } from "components";
import { Popover, Tooltip } from "antd";
import { useCreateAttendance, useUpdateAttendance } from "hooks";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReasonSchema } from "validation/attendance";
import moment from "moment";
import { DATE_FORMAT_MMMM_DD_YYYY_HH_mm } from "constants/dates";
import { Interface, IReason } from "./type";
import { icons } from "./data";
import { IdentifyAttendance } from "./components/identifyAttendance";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const AttendanceCell: FC<Interface> = ({
  value,
  id,
  attendance,
  day,
  disabledActions,
}) => {
  const [open, setOpen] = useState(false);
  const [textToolTipOpen, setTextToolTipOpen] = useState(false);
  const queryClient = useQueryClient();
  const [reason, setReason] = useState(false);
  const [innerValue, setInnerValue] = useState(value);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IReason>({
    resolver: yupResolver(ReasonSchema),
  });
  const createAttendance = useCreateAttendance({
    onSuccess: () => {
      // toast.success("Success");
      queryClient.invalidateQueries([queryKeys.admin_group_get_attendance]);
      queryClient.invalidateQueries([queryKeys.admin_group_view]);
    },
    onError: (err) => {
      setInnerValue(value);
      setReason(false);
      validationErrorHandler({ err });
    },
  });
  const update = useUpdateAttendance({
    onSuccess: () => {
      // toast.success("Success");
      queryClient.invalidateQueries([queryKeys.admin_group_get_attendance]);
      queryClient.invalidateQueries([queryKeys.admin_group_view]);
    },
    onError: (err) => {
      setInnerValue(value);
      setReason(false);
      validationErrorHandler({ err });
    },
  });
  const handleOpenChange = (newOpen: boolean) => {
    setReason(false);
    setTextToolTipOpen(false);
    if (!reason) setOpen(newOpen);
  };
  const handleTextToolTipChange = (newOpen: boolean) => {
    if (value === EStudentAttendance.ABS && !open) setTextToolTipOpen(newOpen);
  };
  const handleReasonChange = (newOpen: boolean) => {
    setReason(newOpen);
  };
  const handleAttend = (
    status: EAttendanceStatuses,
    innerValue: EStudentAttendance
  ) => {
    if (
      value === EStudentAttendance.CAME ||
      value === EStudentAttendance.NOT_CAME ||
      value === EStudentAttendance.ABS
    ) {
      if (status !== EAttendanceStatuses.ABS) {
        setInnerValue(innerValue);
        setOpen(false);
        update.mutate({
          query_params: {
            id: attendance?.id,
          },
          body: {
            date: day,
            status: status,
          },
        });
      }
    } else {
      if (status !== EAttendanceStatuses.ABS) {
        setInnerValue(innerValue);
        setOpen(false);
        createAttendance.mutate({
          query_params: {
            contact_id: id,
          },
          body: {
            status: status,
            date: day,
          },
        });
      }
    }
  };
  const onSubmit = (data: IReason) => {
    if (
      value === EStudentAttendance.CAME ||
      value === EStudentAttendance.NOT_CAME ||
      value === EStudentAttendance.ABS
    ) {
      update.mutate({
        query_params: {
          id: attendance?.id,
        },
        body: {
          reason: data?.reason,
          date: day,
          status: EAttendanceStatuses.ABS,
        },
      });
    } else {
      setInnerValue(innerValue);
      createAttendance.mutate({
        query_params: {
          contact_id: id,
        },
        body: {
          reason: data?.reason,
          date: day,
          status: EAttendanceStatuses.ABS,
        },
      });
    }
    setInnerValue(EStudentAttendance.ABS);
    setReason(false);
  };
  const handleClose = () => {
    setReason(false);
  };

  useEffect(() => {
    if (!reason) setOpen(false);
  }, [reason]);

  useEffect(() => {
    if (value !== innerValue) {
      setInnerValue(value);
    }
  }, [value]);

  const person = attendance?.updatedBy
    ? attendance?.updatedBy?.userProfile?.firstname +
      " " +
      attendance?.updatedBy?.userProfile?.lastname
    : undefined;

  return (
    <AttendanceWrapper>
      <ATWrapper>
        <div className="full">
          <Tooltip
            destroyTooltipOnHide
            trigger="hover"
            placement="top"
            overlayStyle={{ maxWidth: "unset" }}
            title={() =>
              PersonComment({
                person,
                time: moment(
                  attendance?.updated_at || attendance?.created_at
                ).format(DATE_FORMAT_MMMM_DD_YYYY_HH_mm),
                text: attendance?.reason,
              })
            }
            onOpenChange={handleTextToolTipChange}
            open={
              value !== EStudentAttendance.UNAVAILABLE &&
              value !== EStudentAttendance.WHITE &&
              !disabledActions
                ? textToolTipOpen
                : false
            }>
            <Popover
              destroyTooltipOnHide
              onOpenChange={handleOpenChange}
              open={
                value !== EStudentAttendance.UNAVAILABLE &&
                value !== EStudentAttendance.WHITE &&
                !disabledActions
                  ? open
                  : false
              }
              title=""
              trigger="click"
              placement="bottomRight"
              content={
                <IdentifyAttendance
                  handleAttend={handleAttend}
                  handleReasonChange={handleReasonChange}
                  reason={reason}
                  value={value}
                  control={control}
                  errors={errors}
                  handleClose={handleClose}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                />
              }>
              {icons[innerValue]}
            </Popover>
          </Tooltip>
        </div>
      </ATWrapper>
    </AttendanceWrapper>
  );
};

export default AttendanceCell;
