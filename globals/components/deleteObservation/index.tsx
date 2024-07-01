import React from "react";
import { ActionModal, DeleteSvg } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useDeleteObservation } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";
import { useRouter } from "next/router";

const DeleteObservation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    deleteObservation: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "deleteObservation",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };
  const deleteObservation = useDeleteObservation({
    onSuccess: () => {
      toast.success("Item is deleted");
      queryClient.invalidateQueries([
        queryKeys.admin_ranking_observation_index,
      ]);
      router.back();
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
  } = useForm();

  const onDeleteSubmit = () => {
    deleteObservation.mutate({
      query_params: {
        id: data?.id,
      },
    });
  };
  return (
    <ActionModal
      control={control}
      handleSubmit={handleSubmit}
      handleClose={() => handleClose()}
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
      errors={errors}
      buttonLoading={deleteObservation.isLoading}
    />
  );
};

export default DeleteObservation;
