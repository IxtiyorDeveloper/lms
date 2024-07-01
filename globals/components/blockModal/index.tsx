import React from "react";
import { ActionModal, BlockSvg } from "components";
import { bgColors, textColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { IStore, toggleModal } from "store";
import { useBlockStudent } from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";

const BlockModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const blockStudent = useBlockStudent({
    onSuccess: () => {
      reset();
      toast.info("Student blocked");
      queryClient.invalidateQueries({ queryKey: data?.queryKeys });
      handleClose();
    },
    onError: (err) => {
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
    block: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "block",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const onDeleteSubmit = () => {
    blockStudent.mutate({ contact_id: data?.id });
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
      buttonStyles={{ color: textColors.blueGray }}
      buttonLoading={blockStudent?.isLoading}
      boxShadow={`0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px ${bgColors.friedEgg}`}
      icon={<BlockSvg width={50} height={50} color={bgColors.slate} />}
      student={data?.student}
      text={
        <div>
          <p>
            Are you sure to Block Account for this <br /> student ?
          </p>
        </div>
      }
      cancelButtonText="No"
      submitButtonText="Yes"
      errors={errors}
    />
  );
};

export default BlockModal;
