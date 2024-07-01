import React from "react";
import { ActionModal, AttendSvg } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { IStore, toggleModal } from "store";
import { useDispatch, useSelector } from "react-redux";
import { useNotAttendedToAttended, useRemoveAttend } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Router, { useRouter } from "next/router";
import { validationErrorHandler } from "utils";
import moment from "moment/moment";
import { DATE_FORMAT_SHOW_MMM } from "../../../constants/dates";

const AttendModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm();
  const {
    attend: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "attend",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const notAttendedToAttended =
    data.type === "remove"
      ? useRemoveAttend({
          onSuccess: () => {
            toast.success("Student changed");
            queryClient.invalidateQueries({
              queryKey: data?.queryKeys,
            });
            handleClose();
          },
          onError: (err) => {
            validationErrorHandler({ err });
          },
        })
      : useNotAttendedToAttended({
          onSuccess: () => {
            toast.success("Student changed");
            queryClient.invalidateQueries({
              queryKey: data.queryKeys,
            });
            router.replace({
              pathname: Router.pathname,
              query: {
                ...router.query,
                studentId: data?.student?.user?.id,
                firstLesson: "true",
              },
            });
            handleClose();
          },
          onError: (err) => {
            validationErrorHandler({ err });
          },
        });

  const onSubmitAttendModal = () => {
    notAttendedToAttended.mutate({ id: data?.id });
  };

  return (
    <ActionModal
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866"
      onSubmit={onSubmitAttendModal}
      handleClose={handleClose}
      control={control}
      blurColor={bgColors.primary}
      student={data.student}
      text={
        <div>
          <p>
            Are you sure to change status to the{" "}
            {data.type === "remove" ? "Not Attended" : "Attended"}?
            <br />
            Start date:{" "}
            {moment(data?.student?.actualPayment?.start_date).format(
              DATE_FORMAT_SHOW_MMM
            )}
          </p>
        </div>
      }
      icon={<AttendSvg color={bgColors.primary} width="52px" height="52px" />}
      open={open}
      handleSubmit={handleSubmit}
      cancelButtonText="No"
      submitButtonText="Yes"
      buttonLoading={notAttendedToAttended.isLoading}
    />
  );
};

export default AttendModal;
