import { useQueryClient } from "@tanstack/react-query";
import { ActionModal, DeleteSvg } from "components";
import { queryKeys } from "constants/queryKeys";
import { useDeleteVacation } from "hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toggleModal, useAppSelector } from "store";
import { bgColors } from "styles/theme";
import { validationErrorHandler } from "utils";

const DeleteVacation = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { handleSubmit, control } = useForm();

  const {
    deleteVacation: { data, open },
  } = useAppSelector((state) => state.modals);

  const deleteMutation = useDeleteVacation({
    onSuccess: () => {
      queryClient
        .invalidateQueries([queryKeys.get_user_vacation_details])
        .then();
      queryClient.invalidateQueries([queryKeys.get_main_schedule_data]).then();
      queryClient.invalidateQueries([queryKeys.get_active_vacations]).then();
      queryClient.invalidateQueries([queryKeys.get_vacation_slots]).then();
      toast.success("Vacation deleted!");
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "deleteVacation",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const onDeleteSubmit = () => {
    deleteMutation.mutate({
      query_params: {
        vacation_id: data?.id,
      },
    });
  };

  return (
    <ActionModal
      open={open}
      control={control}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      onSubmit={onDeleteSubmit}
      blurColor={bgColors.pop}
      icon={<DeleteSvg width={50} height={50} />}
      buttonLoading={deleteMutation?.isLoading}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      text={
        <div>
          <p>Are you sure?</p>
          <p>This Vacation will be deleted for everyone</p>
        </div>
      }
    />
  );
};

export default DeleteVacation;
