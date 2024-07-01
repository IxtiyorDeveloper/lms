import { ActionModal } from "components";
import React from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { IStore, toggleModal } from "store";
import { useSelector } from "react-redux";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useCancelRepositionStaff } from "hooks";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { TransferBackSvg } from "@jasurbekyuldashov/lms-web-icons";

const StaffCancelReposition = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm();
  const {
    cancelReposition: { open, data },
  } = useSelector((state: IStore) => state.modals);

  const cancelReposition = useCancelRepositionStaff({
    onSuccess: () => {
      handleClose();
      queryClient
        .invalidateQueries({
          queryKey: [queryKeys.assignment_list],
        })
        .then();
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
        key: "cancelReposition",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const onCancelReposition = () => {
    cancelReposition.mutate({
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
      onSubmit={onCancelReposition}
      blurColor={bgColors.primary}
      buttonStyles={{
        boxShadow: "none",
        color: textColors.blueGray,
        backgroundColor: bgColors.primary,
      }}
      submitButtonText="Yes"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={<TransferBackSvg width={50} height={50} color={bgColors.pumpkin} />}
      text={
        <div>
          <p>Are you sure, to cancel this reposition action?</p>
        </div>
      }
      buttonLoading={cancelReposition?.isLoading}
    />
  );
};

export default StaffCancelReposition;
