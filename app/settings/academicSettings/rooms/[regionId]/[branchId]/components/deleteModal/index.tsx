import React, { FC } from "react";
import { ActionModal, DeleteSvg } from "components";
import { bgColors } from "styles/theme";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDeleteRoom } from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "../../../../../../../../utils";

interface IProps {
  data: any;
  open: boolean;
  setOpen: (data: any) => void;
}
const DeleteModal: FC<IProps> = ({ open, data, setOpen }) => {
  const queryClient = useQueryClient();
  const deleteRoom = useDeleteRoom({
    onSuccess: () => {
      reset();
      toast.info("Room deleted");
      queryClient.invalidateQueries({ queryKey: data?.queryKeys });
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
    reset,
  } = useForm();

  const handleClose = () => {
    setOpen({
      open: false,
      data: null,
    });
  };
  const onDeleteSubmit = () => {
    deleteRoom.mutate({ query_params: { id: data?.id } });
  };

  return (
    <ActionModal
      control={control}
      handleSubmit={handleSubmit}
      handleClose={() => handleClose()}
      open={open}
      onSubmit={onDeleteSubmit}
      blurColor={bgColors.pop}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={<DeleteSvg width={50} height={50} />}
      text={
        <div>
          <p>Are you sure ?</p>
          <p>This property will be deleted for everyone</p>
        </div>
      }
      errors={errors}
    />
  );
};

export default DeleteModal;
