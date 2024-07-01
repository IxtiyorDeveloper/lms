import React from "react";
import { ActionModal, DeleteSvg } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useDeleteCourse } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";

const DeleteCourse = () => {
  const dispatch = useDispatch();
  const {
    deleteCourse: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "deleteCourse",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const queryClient = useQueryClient();
  const deleteCourse = useDeleteCourse({
    onSuccess: () => {
      toast.success("Item is deleted");
      queryClient.invalidateQueries([queryKeys.admin_course_index]);
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
    deleteCourse.mutate({
      query_params: {
        id: data?.courseId,
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
    />
  );
};

export default DeleteCourse;
