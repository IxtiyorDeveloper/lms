import React from "react";
import { ActionModal } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useChangeObservationStatus } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";
import { EObservationStatus } from "../../../types/observation";
import { ShinedEyeSvg } from "@jasurbekyuldashov/lms-web-icons";

const ChangeObservation = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    changeObservation: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const id = data?.id;
  const status = data?.status;

  const sentStatus =
    status == EObservationStatus.Draft
      ? EObservationStatus.Published
      : EObservationStatus.Draft;

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "changeObservation",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };
  const changeObservationStatus = useChangeObservationStatus({
    onSuccess: () => {
      toast.success("Observation is published");
      queryClient.invalidateQueries([
        queryKeys.client_ranking_mentor_rank_view,
      ]);
      queryClient.invalidateQueries([
       queryKeys.admin_ranking_observation_index,
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
    changeObservationStatus.mutate({
      query_params: {
        id,
      },
      body: {
        status: sentStatus,
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
      blurColor={bgColors.primary}
      label="Reason *"
      boxShadow="0px 4px 12px 0px rgba(0, 0, 0, 0.10), 0px 4px 6px 0px #FFE866 inset"
      icon={<ShinedEyeSvg width={50} height={50} />}
      submitButtonText="Yes"
      text={
        <div>
          <p>
            Are you sure to{" "}
            {sentStatus == EObservationStatus.Published
              ? "Publish"
              : "Unpublish"}{" "}
            this observation!
          </p>
        </div>
      }
      errors={errors}
      buttonLoading={changeObservationStatus.isLoading}
    />
  );
};

export default ChangeObservation;
