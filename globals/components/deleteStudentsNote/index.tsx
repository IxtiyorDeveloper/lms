import React from "react";
import { ActionModal} from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import {  useDeleteStudentsNote } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";
import { NoteDeleteSvg } from "@jasurbekyuldashov/lms-web-icons";

const DeleteStudentsNote = () => {
  const dispatch = useDispatch();
  const {
    deleteStudentsNote: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const id = data?.id;

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "deleteStudentsNote",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const queryClient = useQueryClient();

  const deleteNote = useDeleteStudentsNote({
    onSuccess: () => {
      toast.success("Notes are deleted");
      queryClient.invalidateQueries([queryKeys.admin_group_view]);
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
    deleteNote.mutate({
      query_params: {
        id,
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
      icon={<NoteDeleteSvg width={50} height={50} />}
      text={
        <div>
          <p>Do you want to clear student’s note?</p>
          <p> This property will be deleted for everyone</p>
        </div>
      }
      errors={errors}
      buttonLoading={deleteNote.isLoading}
    />
  );
};

export default DeleteStudentsNote;
