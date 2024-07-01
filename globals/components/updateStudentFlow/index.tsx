import React, { useEffect } from "react";
import { AntdModal, Button, Input, MySelect, StudentCard } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo, useUpdateStudentFlow } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { bgColors } from "styles/theme";
import { Buttons, Content } from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateStudentFlowSchema } from "validation";
import { validationErrorHandler } from "utils";

interface Interface {
  general: {
    leaving_category_id: number;
    reason: string;
  };
}

const UpdateStudentFlow = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    updateStudentFlow: { open, data },
  } = useSelector((state: IStore) => state.modals);
  const leaving_category_id = data?.leaving_category_id;
  const selects = usePageDataMemo();
  const changeUserPassword = useUpdateStudentFlow({
    onSuccess: () => {
      toast.info("Successfully updated");
      queryClient.invalidateQueries(data?.queryKeys);
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
    resolver: yupResolver(UpdateStudentFlowSchema),
  });
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "updateStudentFlow",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  let reduxData = data;
  const onSubmit = (data: Interface) => {
    changeUserPassword.mutate({
      body: data?.general,
      query_params: {
        id: reduxData.id,
      },
    });
  };
  const options = selects.stoppingCategories?.some(
    (category) => category.value == leaving_category_id
  )
    ? selects.stoppingCategories
    : selects.transferringCategories;
  useEffect(() => {
    setValue("general", {
      leaving_category_id: leaving_category_id?.toString(),
      reason: data?.reason,
    });
  }, [open]);

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={340}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <StudentCard data={reduxData.student} />
          <MySelect
            label="Category"
            name="general.leaving_category_id"
            control={control}
            options={options}
            placeholder="Category"
            error={errors?.general?.leaving_category_id?.message}
          />
          <Input
            label="Reason"
            name="general.reason"
            control={control}
            placeholder="Reason"
            type="textarea"
            error={errors?.general?.reason?.message}
          />
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
            buttonLoading={changeUserPassword?.isLoading}
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

export default UpdateStudentFlow;
