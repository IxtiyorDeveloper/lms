import React, { useState } from "react";
import { AntdModal, Button, Input } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useQueryClient } from "@tanstack/react-query";
import { useChangeStatus } from "hooks";
import { queryKeys } from "constants/queryKeys";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { ButtonsWrapper } from "./style";
import { useForm } from "react-hook-form";
import { Rate } from "antd";

const RateModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [value, setValue] = useState(0);

  const { control, handleSubmit, reset } = useForm();

  const {
    rateTaskModal: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "rateTaskModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const changeStatus = useChangeStatus({
    onSuccess: () => {
      reset();
      setValue(0);
      queryClient.invalidateQueries({ queryKey: ["opened_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["done_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["checked_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["rejected_tasks"] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.task_view] });
      handleClose();
      toast.success("Status changed!");
      if (!!data?.fromView) {
        dispatch(
          toggleModal({
            key: "taskView",
            data: {
              data: {},
              open: false,
            },
          })
        );
      }
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmit = (res: any) => {
    changeStatus.mutate({
      body: {
        task_id: data?.task_id,
        state: data?.state,
        description: res.description,
        point: value,
      },
    });
  };

  return (
    <AntdModal open={open} width={420} onCancel={handleClose}>
      <h2 style={{ marginBottom: "20px" }}>Rate this task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>How was the task completed?</p>
        <Rate
          style={{ marginBottom: "16px" }}
          onChange={setValue}
          value={value}
        />
        <Input
          name="description"
          control={control}
          type="textarea"
          rows={5}
          placeholder="Type here..."
          label="Your feedback"
        />
        <ButtonsWrapper>
          <Button onClick={handleClose} className="btn-cancel">
            Cancel
          </Button>
          <Button buttonLoading={changeStatus.isLoading} type="submit">
            Submit
          </Button>
        </ButtonsWrapper>
      </form>
    </AntdModal>
  );
};

export default RateModal;
