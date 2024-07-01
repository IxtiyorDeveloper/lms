import React from "react";
import { ActionModal, DeleteSvg } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useDeleteExpense } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const DeleteExpense = () => {
  const dispatch = useDispatch();
  const {
    deleteExpense: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "deleteExpense",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const queryClient = useQueryClient();
  const deleteExpense = useDeleteExpense({
    onSuccess: () => {
      toast.info("Expense deleted");
      queryClient.invalidateQueries([queryKeys.admin_finance_expense_index]);
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
    deleteExpense.mutate({
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
      buttonLoading={deleteExpense.isLoading}
    />
  );
};

export default DeleteExpense;
