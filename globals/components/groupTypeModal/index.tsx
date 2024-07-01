import * as React from "react";
import { Buttons, Content, InputNumberWrapper } from "./style";
import { AntdModal, Button, Input, InputNumber, MySelect } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import {
  useCreateGroupType,
  useGroupType,
  usePageDataMemo,
  useUpdateGroupType,
} from "hooks";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateGroupType } from "validation/groupType";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import { useEffect } from "react";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";

export enum Enum {
  create = "create",
  update = "update",
}

const GroupTypeModal = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { staffEnumsGroupForms, args } = usePageDataMemo();

  const {
    groupTypeModal: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const groupTypeId = data?.groupTypeId;
  const {
    data: groupType,
    isPreviousData,
    isInitialLoading: isLoading,
  } = useGroupType({
    query_params: {
      id: groupTypeId,
    },
  });
  const type = data?.type;

  const createGroupType = useCreateGroupType({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_course_view]);
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const updateGroupType = useUpdateGroupType({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_course_view]);
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "groupTypeModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  }: any = useForm({
    resolver: yupResolver(CreateGroupType),
  });

  const onSubmit = (data: { general: any }) => {
    const { general } = data;

    if (type === Enum?.create) {
      createGroupType.mutate({
        body: {
          course_id: router?.query?.update_id,
          ...general,
        },
      });
    }
    if (type === Enum?.update) {
      updateGroupType.mutate({
        query_params: {
          id: groupTypeId,
        },
        body: {
          course_id: router?.query?.update_id,
          ...general,
        },
      });
    }
  };

  useEffect(() => {
    if (type === Enum.update) {
      setValue("general", {
        name: groupType?.name,
        group_form: groupType?.group_form?.toString(),
        min_count: groupType?.min_count,
        max_count: groupType?.max_count,
        min_age: groupType?.min_age,
        max_age: groupType?.max_age,
        additional_seat: groupType?.additional_seat,
        lesson_duration: groupType?.lesson_duration,
      });
    }
  }, [open, groupType]);
  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      title="Create group type"
    >
      <Spin spinning={args?.isLoading || isPreviousData || isLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <Input
              label="Name"
              name="general.name"
              control={control}
              placeholder="John"
              error={errors?.general?.name?.message}
            />
            <MySelect
              control={control}
              name="general.group_form"
              label="Group Form"
              placeholder="Select"
              options={staffEnumsGroupForms}
              error={errors?.general?.group_form?.message}
            />
            <InputNumberWrapper>
              <div className="col">
                <InputNumber
                  label="Max count of students"
                  name="general.max_count"
                  control={control}
                  placeholder="14"
                  error={errors?.general?.max_count?.message}
                />
              </div>
              <div className="col">
                <InputNumber
                  label="Min count of students"
                  name="general.min_count"
                  control={control}
                  placeholder="12"
                  error={errors?.general?.min_count?.message}
                />
              </div>
              <div className="col">
                <InputNumber
                  label="Additional seats"
                  name="general.additional_seat"
                  control={control}
                  placeholder="2"
                  error={errors?.general?.additional_seat?.message}
                />
              </div>
            </InputNumberWrapper>
            <InputNumberWrapper>
              <InputNumber
                label="Min age"
                name="general.min_age"
                control={control}
                placeholder="13"
                error={errors?.general?.min_age?.message}
              />
              <InputNumber
                label="Max age"
                name="general.max_age"
                control={control}
                placeholder="99"
                error={errors?.general?.max_age?.message}
              />
            </InputNumberWrapper>
            <InputNumber
              label="Lesson duration"
              name="general.lesson_duration"
              control={control}
              placeholder="1"
              error={errors?.general?.lesson_duration?.message}
            />
          </Content>
          <Buttons>
            <Button
              className="cancel"
              onClick={handleClose}
              style={{
                backgroundColor: bgColors.wildSand,
              }}
            >
              Cancel
            </Button>
            <Button
              className="save"
              type="submit"
              buttonLoading={
                createGroupType?.isLoading || updateGroupType?.isLoading
              }
            >
              Save
            </Button>
          </Buttons>
        </form>
      </Spin>
    </AntdModal>
  );
};
export default GroupTypeModal;
