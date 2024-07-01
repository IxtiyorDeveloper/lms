import React from "react";
import { ActionModal, TransferBackSvg } from "components";
import { bgColors } from "styles/theme";
import { useBackTransfer } from "hooks";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { IStore, toggleModal } from "store";
import { validationErrorHandler } from "utils";

const TransferModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm();
  const {
    transferBack: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "transferBack",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const backTransfer = useBackTransfer({
    onSuccess: () => {
      toast.success("Student action changed");
      queryClient.invalidateQueries({
        queryKey: data?.queryKeys,
      });
      handleClose();
    },
    onError: (err) => {
      handleClose();
      validationErrorHandler({ err });
    },
  });

  const onSubmitBackTransfer = () => {
    backTransfer.mutate({ id: data.id });
  };
  const group_name =
    data?.student?.actualTransfers?.[data?.student?.actualTransfers?.length - 1]
      ?.group?.name;
  return (
    <ActionModal
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866"
      onSubmit={onSubmitBackTransfer}
      handleClose={handleClose}
      control={control}
      blurColor={bgColors.primary}
      student={data?.student}
      text={
        <div>
          <p> Are you sure to back to old ({group_name}) group?</p>
        </div>
      }
      icon={
        <TransferBackSvg color={bgColors.primary} width="52px" height="52px" />
      }
      open={open}
      handleSubmit={handleSubmit}
      cancelButtonText="No"
      submitButtonText="Yes"
      buttonLoading={backTransfer.isLoading}
    />
  );
};

export default TransferModal;
