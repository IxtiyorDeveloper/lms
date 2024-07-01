import React from "react";
import { ActionModal, DeleteSvg } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useDeleteDetailedCoverTeacher } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const DeleteCoverTeacher = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    deleteCoverTeacher: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const deleteCoverTeacher = useDeleteDetailedCoverTeacher({
    onSuccess: () => {
      toast.info("Cover Teacher is deleted");
      queryClient.invalidateQueries([
        queryKeys.admin_v1_finance_salary_detailed_cover_index,
      ]);
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

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "deleteCoverTeacher",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const onDeleteSubmit = () => {
    deleteCoverTeacher.mutate({
      body: {
        assignment_id: data?.id,
        date: data?.date,
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
      buttonLoading={deleteCoverTeacher.isLoading}
      text={
        <div>
          <p>Are you sure?</p>
          <p>This property will be deleted for everyone</p>
        </div>
      }
      errors={errors}
    />
  );
};

export default DeleteCoverTeacher;
