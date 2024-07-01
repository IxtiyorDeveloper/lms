import React from "react";
import { ActionModal, UnbanSvg } from "components";
import { useForm } from "react-hook-form";
import { useUnban } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { bgColors } from "styles/theme";
import { validationErrorHandler } from "utils";
const UnbanModal = () => {
  const dispatch = useDispatch();
  const {
    unban: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const queryKeys = data?.queryKeys;
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "unban",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const queryClient = useQueryClient();
  const addAction = useUnban({
    onSuccess: () => {
      toast.success("Student action is changed");
      queryClient.invalidateQueries({
        queryKey: queryKeys,
      });
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    addAction.mutate({
      query_params: {
        user_id: data?.id,
      },
    });
  };

  return (
    <ActionModal
      control={control}
      handleSubmit={handleSubmit}
      handleClose={() => handleClose()}
      open={open}
      onSubmit={onSubmit}
      blurColor={bgColors.pop}
      label="Reason *"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={<UnbanSvg width={50} height={54} />}
      student={data?.student}
      text={
        <div>
          <p>Are you sure?</p>
          <p>This student is unbanned</p>
        </div>
      }
      submitButtonText="Unban"
      errors={errors}
      buttonLoading={addAction.isLoading}
    />
  );
};

export default UnbanModal;
