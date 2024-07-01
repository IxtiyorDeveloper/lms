import React from "react";
import { AntdModal, Button, Input, StudentCard } from "components";
import { useForm } from "react-hook-form";
import { useChangeExamProcessStatus } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { bgColors } from "styles/theme";
import { Buttons, Content } from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import { ConditionalPass } from "validation/exam";
import { validationErrorHandler } from "utils";
import { CONDITIONAL, FAIL } from "constants/exam";

interface Interface {
  description: string;
}

const ConditionPass = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    conditionalPass: { open, data },
  } = useSelector((state: IStore) => state.modals);
  const id = data?.data?.id;

  const changeExamProcessStatus = useChangeExamProcessStatus({
    onSuccess: () => {
      queryClient.invalidateQueries(data?.queryKeys);
      toast.info("Successfully updated");
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
    setValue,
  } = useForm<Interface>({
    resolver: yupResolver(ConditionalPass),
  });
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "conditionalPass",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const nextStatus = data?.data?.process?.status == FAIL ? CONDITIONAL : FAIL;
  const onSubmit = (data: Interface) => {
    changeExamProcessStatus.mutate({
      body: {
        description: data?.description,
        status: nextStatus,
      },
      query_params: {
        id,
      },
    });
  };

  const text =
    data?.data?.process?.status == FAIL
      ? `Are you sure to change status to CONDITIONAL`
      : `Are you sure to change status to FAIL`;

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <div className="mt10">
            <StudentCard data={data?.student} />
          </div>
          <div className="container">
            <p className="info">{text}</p>
            <Input
              name="description"
              control={control}
              placeholder="Write description here..."
              type="textarea"
              error={errors?.description?.message}
              rows={8}
            />
          </div>
        </Content>
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
            buttonLoading={changeExamProcessStatus?.isLoading}
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

export default ConditionPass;
