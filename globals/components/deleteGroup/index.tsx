import React from "react";
import { ActionModal, DeleteSvg } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useDeleteGroup } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { validationErrorHandler } from "utils";

const DeleteGroup = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    deleteGroup: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    reset();
    dispatch(
      toggleModal({
        key: "deleteGroup",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const groupId = data?.id;
  const deleteMutation = useDeleteGroup({
    onSuccess: () => {
      queryClient.invalidateQueries(data.queryKeys);
      toast.success("Group deleted");
      handleClose();
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const { control, handleSubmit, reset } = useForm();

  const onDeleteSubmit = () => {
    deleteMutation.mutate({
      id: groupId,
    });
  };
  return (
    <ActionModal
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      open={open}
      onSubmit={onDeleteSubmit}
      blurColor={bgColors.pop}
      label="Reason *"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={<DeleteSvg width={50} height={50} />}
      text={
        <div>
          <p>Are you sure?</p>
          <p>This property will be deleted for everyone</p>
        </div>
      }
      control={control}
      buttonLoading={deleteMutation?.isLoading}
    />
  );
};

export default DeleteGroup;
