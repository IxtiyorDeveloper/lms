import React from "react";
import { ActionModal, DeleteSvg } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useDeleteSalaryComponent } from "hooks";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IStore, setSalary, toggleModal } from "store";
import { removeSalaryComponent } from "utils/updateSalaryInfo";
import { validationErrorHandler } from "utils";
import { TAssignment } from "../../../types";
import { expand } from "constants/finance/salary";

const DeleteCorrection = () => {
  const dispatch = useDispatch();
  const { data: mainSalary } = useSelector((state: IStore) => state.salary);

  const {
    correction: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "correction",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const deleteCorrection = useDeleteSalaryComponent({
    onSuccess: () => {},
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

  const onDeleteSubmit = () => {
    deleteCorrection.mutate(
      {
        query_params: {
          id: data?.correctionId,
          expand,
        },
      },
      {
        onSuccess: (result: TAssignment) => {
          toast.info("Item is deleted");
          handleClose();
          dispatch(
            setSalary(
              removeSalaryComponent({
                assignmentId: data?.assignmentId,
                mainSalary,
                result_assignment: result,
              }),
            ),
          );
        },
      },
    );
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
      buttonLoading={deleteCorrection.isLoading}
    />
  );
};

export default DeleteCorrection;
