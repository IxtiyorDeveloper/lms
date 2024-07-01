import React from "react";
import { ActionModal } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { validationErrorHandler } from "utils";
import { useRestrictAccess } from "hooks";

const RestrictAccessModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    restrictAccess: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    reset();
    dispatch(
      toggleModal({
        key: "restrictAccess",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const restrict_access = data?.restrict_access;

  const restrictAccess = useRestrictAccess({
    onSuccess: () => {
      queryClient.invalidateQueries(data.queryKeys);
      toast.success("Success");
      handleClose();
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const { control, handleSubmit, reset } = useForm();

  const onDeleteSubmit = () => {
    restrictAccess.mutate({
      body: {
        restrict_access,
      },
    });
  };
  const text = restrict_access ? (
    <div>
      <p>Are you sure?</p>
      <p>Restrict access for all users</p>
    </div>
  ) : (
    <div>
      <p>Are you sure?</p>
      <p>UnRestrict access for all users</p>
    </div>
  );
  return (
    <ActionModal
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      open={open}
      onSubmit={onDeleteSubmit}
      blurColor={bgColors.pop}
      label="Reason *"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={
        <img
          src="/settings/companySettings/restrict.png"
          alt="restrict-access"
        />
      }
      text={text}
      control={control}
      buttonLoading={restrictAccess?.isLoading}
      submitButtonText="Restrict"
    />
  );
};

export default RestrictAccessModal;
