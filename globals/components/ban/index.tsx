import React from "react";
import { ActionModal, BanUserSvg, Input } from "components";
import { useForm } from "react-hook-form";
import { useBanStudent } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { bgColors } from "styles/theme";
import { validationErrorHandler } from "utils";
import { NoteWrapperLead } from "../deleteLead/style";
const BanModal = () => {
  const dispatch = useDispatch();
  const {
    ban: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const queryKeys = data?.queryKeys;
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "ban",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const user_id = data?.id;
  const queryClient = useQueryClient();
  const banStudent = useBanStudent({
    onSuccess: async (data) => {
      toast.success("Student updated!");
      await queryClient.invalidateQueries({
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

  const onSubmit = (body: any) => {
    banStudent.mutate({
      query_params: {
        user_id,
      },
      body,
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
      icon={<BanUserSvg width={50} height={54} />}
      student={data?.student}
      component={(control1) => {
        return (
          <NoteWrapperLead>
            <Input
              name="note"
              rows={5}
              label="Reason"
              placeholder="Note"
              control={control1}
              type="textarea"
            />
          </NoteWrapperLead>
        );
      }}
      text={
        <div>
          <p>Are you sure ?</p>
          <p>This student is banned</p>
        </div>
      }
      submitButtonText="Ban"
      errors={errors}
      buttonLoading={banStudent.isLoading}
    />
  );
};

export default BanModal;
