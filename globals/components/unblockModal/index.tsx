import React from "react";
import { ActionModal, UnBlockSvg } from "components";
import { bgColors, textColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { IStore, toggleModal } from "store";
import { useUnblockStudent } from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";

const unblockModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const unblockStudent = useUnblockStudent({
    onSuccess: () => {
      reset();
      toast.info("Student is unblocked");
      queryClient.invalidateQueries({ queryKey: data?.queryKeys });
      handleClose();
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    unblock: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "unblock",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const onDeleteSubmit = () => {
    unblockStudent.mutate({ contact_id: data?.id });
  };

  return (
    <ActionModal
      control={control}
      handleSubmit={handleSubmit}
      handleClose={() => handleClose()}
      open={open}
      onSubmit={onDeleteSubmit}
      blurColor={bgColors.primary}
      label="Reason *"
      iconBlur={bgColors.dark}
      student={data?.student}
      buttonStyles={{ color: textColors.blueGray }}
      buttonLoading={unblockStudent?.isLoading}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866"
      icon={<UnBlockSvg width={50} height={50} color={bgColors.yourShadow} />}
      text={
        <div>
          <p>
            Are you sure to Unblock Account for this <br /> student ?
          </p>
        </div>
      }
      cancelButtonText="No"
      submitButtonText="Yes"
      errors={errors}
    />
  );
};

export default unblockModal;
