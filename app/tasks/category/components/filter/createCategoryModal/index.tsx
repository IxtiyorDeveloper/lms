import React, { useEffect } from "react";
import {
  AntdModal,
  Button,
  ColorSelect,
  Input,
  InputNumber,
  MySelect,
  UploadImage,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { BtnsWrapper, BtnWrapper, FormItem, TitleModal } from "./style";
import { useForm } from "react-hook-form";
import { Popover, Spin } from "antd";
import { ColorPickerSvg } from "@jasurbekyuldashov/lms-web-icons";
import { taskCategoryGradients } from "constants/colors";
import {
  useCreateTaskCategory,
  useGetSingleTaskCategory,
  useUpdateTaskCategory,
} from "hooks";
import { queryKeys } from "constants/queryKeys";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";
import { Enum } from "globals/components/sourceModal";
import { EDeleteProjectFile, EFileDirection } from "types/uploadFile";

const CreateCategoryModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { control, handleSubmit, setValue, watch, reset } = useForm();

  const {
    createTaskCategory: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const { data: singleCategory, isInitialLoading } = useGetSingleTaskCategory({
    query_params: {
      id: data?.id,
    },
  });

  const type = data?.action;

  useEffect(() => {
    if (type === Enum.update && singleCategory) {
      setValue("description", singleCategory.description);
      setValue(
        "supervisor_ids",
        singleCategory.supervisor_roles?.map((item) => item),
      );
      setValue(
        "responsible_ids",
        singleCategory.responsible_roles?.map((item) => item),
      );
      setValue("name", singleCategory.name);
      setValue("order", singleCategory.order);
      setValue("icon_obj", singleCategory.icon);
      setValue(
        "color",
        `${singleCategory.from_color}_${singleCategory.to_color}`,
      );
    }
  }, [open, singleCategory, type]);

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "createTaskCategory",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const createTaskCategory = useCreateTaskCategory({
    onSuccess: () => {
      queryClient
        .invalidateQueries([queryKeys.task_admin_category_index])
        .then();
      handleClose();
      toast.success("Task Category Created!");
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const updateTaskCategory = useUpdateTaskCategory({
    onSuccess: () => {
      queryClient
        .invalidateQueries([queryKeys.task_admin_category_index])
        .then();
      handleClose();
      toast.success("Task Category Updated!");
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmit = (resultData: any) => {
    const readyData = {
      name: resultData.name,
      icon: resultData.icon_obj?.url,
      description: resultData.description,
      order: resultData.order,
      from_color: resultData.color?.split("_")[0],
      to_color: resultData.color?.split("_")[1],
    };

    if (type === Enum.create) createTaskCategory.mutate({ body: readyData });

    if (type === Enum.update)
      updateTaskCategory.mutate({
        query_params: { id: data?.id },
        body: readyData,
      });
  };

  return (
    <AntdModal width={520} open={open} onCancel={handleClose}>
      <TitleModal>Create</TitleModal>
      <Spin spinning={isInitialLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem>
            <Input
              label="Name"
              name="name"
              control={control}
              placeholder="Type here..."
            />
          </FormItem>
          <FormItem>
            <UploadImage
              isNecessaryAllFields
              height="100px"
              label="Upload Icon"
              name="icon_obj"
              control={control}
              setValue={setValue}
              action={type}
              image={singleCategory?.icon}
              watch={watch("icon_obj")}
              deleteProjectFile={EDeleteProjectFile.task}
              fileDirection={EFileDirection.task}
            />
          </FormItem>
          <FormItem>
            <Input
              label="Description"
              type="textarea"
              rows={6}
              name="description"
              control={control}
              placeholder="Type here..."
            />
          </FormItem>
          <FormItem>
            <InputNumber
              label="Order"
              name="order"
              control={control}
              placeholder="Type here..."
            />
          </FormItem>
          <FormItem>
            <MySelect
              disabled
              mode="multiple"
              name="responsible_ids"
              label="Responsible"
              control={control}
              placeholder="Select"
              options={[]}
            />
          </FormItem>
          <FormItem>
            <MySelect
              disabled
              mode="multiple"
              name="supervisor_ids"
              label="Supervisor"
              control={control}
              placeholder="Select"
              options={[]}
            />
          </FormItem>
          <BtnsWrapper>
            <Popover
              placement="topLeft"
              trigger="click"
              content={() => (
                <ColorSelect
                  contentStyle={{
                    width: "320px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                  }}
                  name="color"
                  control={control}
                  isGradient
                  gradients={taskCategoryGradients}
                />
              )}
            >
              <Button className="colorPicker-btn">
                <ColorPickerSvg />
                Color
              </Button>
            </Popover>
            <BtnWrapper>
              <Button onClick={handleClose} className="cancel-btn">
                Cancel
              </Button>
              <Button
                buttonLoading={
                  createTaskCategory.isLoading || updateTaskCategory.isLoading
                }
                type="submit"
              >
                Save
              </Button>
            </BtnWrapper>
          </BtnsWrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default CreateCategoryModal;
