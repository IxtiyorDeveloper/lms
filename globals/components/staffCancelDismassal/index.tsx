import { ActionModal, ActivateUserSvg } from "components";
import React from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { IStore, toggleModal } from "store";
import { useSelector } from "react-redux";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useCancelDismissStaff } from "hooks";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const StaffCancelDismassal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm();
  const {
    cancelDismassal: { open, data },
  } = useSelector((state: IStore) => state.modals);

  const cancelDismassal = useCancelDismissStaff({
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: [queryKeys.assignment_list],
      });
    },
    onError: (err: any) => {
      validationErrorHandler({
        err,
        showToast: true,
      });
    },
  });

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "cancelDismassal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const onCancelDismassal = () => {
    cancelDismassal.mutate({
      query_params: {
        id: data?.user_id,
      },
    });
  };

  return (
    <ActionModal
      open={open}
      control={control}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      onSubmit={onCancelDismassal}
      blurColor={bgColors.primary}
      buttonStyles={{
        boxShadow: "none",
        color: textColors.blueGray,
        backgroundColor: bgColors.primary,
      }}
      submitButtonText="Yes"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={<ActivateUserSvg width={50} height={50} color={bgColors.primary} />}
      text={
        <div>
          <p>Are you sure ?</p>
          <p>This staff will be returned to active</p>
        </div>
      }
      buttonLoading={cancelDismassal?.isLoading}
    />
  );
};

export default StaffCancelDismassal;
