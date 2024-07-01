import React, { useEffect } from "react";
import { AntdModal, Button, Input } from "components";
import { useForm } from "react-hook-form";
import { useChangeGroupNote } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { bgColors } from "styles/theme";
import { Buttons } from "./style";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export enum Enum {
  create = "create",
  update = "update",
}
interface Interface {
  note: string;
}
const GroupNoteModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    groupNote: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const type = data?.type;
  const group = data?.group;

  const changeComment = useChangeGroupNote({
    onSuccess: () => {
      toast.info("Successfully updated");
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
    reset,
    setValue,
  } = useForm<Interface>();
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "groupNote",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const onSubmit = (data: Interface) => {
    const { note } = data;
    changeComment.mutate({ id: group?.id, comment: note });
  };
  useEffect(() => {
    if (type === Enum.update) {
      setValue("note", group?.note);
    }
  }, [open, type]);
  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={340}
      title={type === Enum.create ? "Create note" : "Update note"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="note"
          control={control}
          placeholder="Note"
          type="textarea"
          rows={8}
          error={errors?.note?.message}
        />
        <Buttons>
          <Button
            className="cancel"
            onClick={handleClose}
            style={{
              backgroundColor: bgColors.wildSand,
              width: "100%",
            }}
          >
            Cancel
          </Button>
          <Button
            className="save"
            type="submit"
            buttonLoading={changeComment?.isLoading}
            style={{
              width: "100%",
            }}
          >
            Save
          </Button>
        </Buttons>
      </form>
    </AntdModal>
  );
};

export default GroupNoteModal;
