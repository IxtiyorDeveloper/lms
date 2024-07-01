import React from "react";
import { ActionModal, DeleteSvg, Input, MySelect } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useDeleteLead, usePageDataMemo } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { NoteWrapperLead } from "./style";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";

const DeleteLead = () => {
  const dispatch = useDispatch();

  const selects = usePageDataMemo();

  const {
    deleteLead: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const { control, handleSubmit, reset } = useForm();

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "deleteLead",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const queryClient = useQueryClient();

  const id = data?.id;

  const deleteLead = useDeleteLead({
    onSuccess: () => {
      handleClose();
      toast.success("Lead deleted");
      queryClient.invalidateQueries({ queryKey: [queryKeys.lead_list] });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onDeleteSubmit = (data: any) => {
    deleteLead.mutate({ id, ...data });
  };
  return (
    <ActionModal
      handleSubmit={handleSubmit}
      control={control}
      handleClose={() => handleClose()}
      open={open}
      onSubmit={onDeleteSubmit}
      component={(control1) => {
        return (
          <NoteWrapperLead>
            <Input
              name="comment"
              rows={5}
              placeholder="Note"
              control={control1}
              type="textarea"
            />
            <MySelect
              name="leaving_category_id"
              control={control1}
              options={selects.leadLeavingCategories}
              label="Deleting category"
              placeholder="Select"
            />
          </NoteWrapperLead>
        );
      }}
      blurColor={bgColors.pop}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={<DeleteSvg width={50} height={50} />}
      // errors={errors}
      nameKey="name"
      text={
        <div>
          <p>Are you sure ?</p>
          <p>This property will be deleted for yourself</p>
        </div>
      }
      buttonLoading={deleteLead.isLoading}
    />
  );
};

export default DeleteLead;
