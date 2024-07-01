import React from "react";
import { ActionModal, DeleteSvg, MySelect } from "components";
import { bgColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { IStore, toggleModal } from "store";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useDeleteStoppingStudent,
  useDeleteWaitingListStudent,
  usePageDataMemo,
} from "hooks";
import { toast } from "react-toastify";
import * as yup from "yup";
import { studentDeleteType } from "types";
import { useRouter } from "next/router";
import { validationErrorHandler } from "utils";

const DeleteModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteStudent = useDeleteWaitingListStudent({
    onSuccess: () => {
      reset();
      toast.info("Student deleted");
      queryClient.invalidateQueries({ queryKey: data?.queryKeys });
      handleClose();
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const deleteStoppingStudent = useDeleteStoppingStudent({
    onSuccess: () => {
      reset();
      toast.info("Student deleted");
      queryClient.invalidateQueries({ queryKey: data?.queryKeys });
      handleClose();
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const {
    deleteModal: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const fields = data?.fields ?? {
    mySelect: true,
    textarea: true,
  };
  const type = data.type;
  const isFromStudentProfile = data.isFromStudentProfile;
  const AddReason = yup.object().shape({
    comment: yup
      .string()
      .nullable()
      .when({
        is: (type: any) => !!fields?.textarea,
        then: yup.string().required("Comment is a required field"),
        otherwise: yup.string().nullable(),
      }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(AddReason),
  });

  const handleClose = () => {
    reset({});
    if (isFromStudentProfile) router.push("/student/archived-students");
    dispatch(
      toggleModal({
        key: "deleteModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const onDeleteSubmit = (formData: {
    comment: string;
    leaving_category_id: any;
  }) => {
    if (type === studentDeleteType.regular)
      deleteStudent.mutate({
        id: data?.id,
        note: formData?.comment,
        leaving_category_id: formData.leaving_category_id,
      });
    else {
      deleteStoppingStudent.mutate({
        contact_id: data?.groupContactId ?? data?.id,
      });
    }
  };
  const selects = usePageDataMemo();
  return (
    <ActionModal
      control={control}
      handleSubmit={handleSubmit}
      handleClose={() => handleClose()}
      open={open}
      onSubmit={onDeleteSubmit}
      blurColor={bgColors.pop}
      type={!!fields?.textarea ? "textarea" : undefined}
      label="Reason *"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={<DeleteSvg width={50} height={50} />}
      student={data?.student}
      component={(control, errors) => {
        if (!!fields?.mySelect)
          return (
            <div style={{ marginBottom: "8px", marginTop: "8px" }}>
              <MySelect
                name="leaving_category_id"
                control={control}
                options={selects.stoppingCategories}
                label="Select"
                error={errors?.stopping_category_id?.message}
              />
            </div>
          );
      }}
      text={
        data?.fields?.content || (
          <div>
            <p>Are you sure?</p>
            <p>This property will be deleted for everyone</p>
          </div>
        )
      }
      errors={errors}
      buttonLoading={
        deleteStudent?.isLoading || deleteStoppingStudent.isLoading
      }
    />
  );
};

export default DeleteModal;
