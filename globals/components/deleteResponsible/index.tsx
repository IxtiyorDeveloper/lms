import React from "react";
import { ActionModal, DeleteSvg } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useChangeGroupResponsible, useDeleteCourse } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { validationErrorHandler } from "utils";

const DeleteResponsible = () => {
  const dispatch = useDispatch();
  const {
    deleteResponsible: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const id = data?.id;
  const queryKeys = data?.queryKeys;
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "deleteResponsible",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };
  const queryClient = useQueryClient();

  const addAction = useChangeGroupResponsible({
    onSuccess: () => {
      toast.success("Student action changed");
      if (Array.isArray(queryKeys)) {
        for (let i = 0; i < queryKeys.length; i++) {
          queryClient.invalidateQueries({
            queryKey: queryKeys[i],
          });
        }
      } else {
        queryClient.invalidateQueries({
          queryKey: queryKeys,
        });
      }
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
  } = useForm();

  const onDeleteSubmit = () => {
    addAction.mutate({
      query_params: {
        id,
      },
      body: {
        responsible_id: null,
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
          <p>This responsible will be deleted for this group</p>
        </div>
      }
      errors={errors}
      buttonLoading={addAction.isLoading}
    />
  );
};

export default DeleteResponsible;
