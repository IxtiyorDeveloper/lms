import React from "react";
import { ActionModal, DeleteSvg } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useDeletePotentialFailRequest } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { useRouter } from "next/router";

const DeletePotentialFailRequest = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    deletePotentialFailRequest: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "deletePotentialFailRequest",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };
  const queryClient = useQueryClient();

  const deletePotentialFailRequest = useDeletePotentialFailRequest({
    onSuccess: () => {
      toast.success("Deleted successfully");

      router.push({
        pathname: "/academic-resource/potential-fail/potential-fail-request",
      });

      queryClient.invalidateQueries([
        queryKeys.admin_academic_potential_fail_requests,
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

  const onDeleteSubmit = () => {
    deletePotentialFailRequest.mutate({
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
      buttonLoading={deletePotentialFailRequest.isLoading}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={<DeleteSvg width={50} height={50} />}
      text={
        <div>
          <p>Are you sure?</p>
          <p> This Potential fail report will be deleted for everyone</p>
        </div>
      }
      errors={errors}
    />
  );
};

export default DeletePotentialFailRequest;
