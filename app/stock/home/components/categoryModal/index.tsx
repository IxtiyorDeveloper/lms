import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  ActionModal,
  AntdModal,
  Button,
  DeleteSvg,
  Input,
  InputNumber,
  MySelect,
  UploadImage,
} from "components";

import { bgColors, textColors } from "styles/theme";
import { Spin } from "antd";
import { toggleModal, useAppSelector } from "store";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Divider, Wrapper } from "./style";
import { useAdminCategoryDelete, useCreateStockCategory } from "hooks";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";
import { EnumsStockStatus } from "constants/stock";
import _ from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { EDeleteProjectFile, EFileDirection } from "types/uploadFile";

const buttonStyle = {
  borderRadius: "10px",
};

const StockCategoryModal = ({}) => {
  const ref = useRef<any>();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();
  const { handleSubmit: deleteHandleSubmit } = useForm();

  const [openDelete, setOpenDelete] = useState(false);
  const {
    stockCategory: { open, data: modalData },
  } = useAppSelector((state) => state.modals);
  const isUpdate = modalData?.type === "update";

  useEffect(() => {
    if (open && isUpdate) {
      setValue("cover_file_id", modalData?.data?.image?.id);
      setValue("name", modalData?.data?.name);
      setValue("status", modalData?.data?.status?.toString());
      setValue("order", modalData?.data?.order);
    } else if (open) {
      reset();
    }
  }, [open]);

  const handleClose = () => {
    reset();
    setOpenDelete(false);
    dispatch(
      toggleModal({
        key: "stockCategory",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const create = useCreateStockCategory({
    onSuccess: () => {
      toast.success(`Category ${isUpdate ? "updated" : "created"}!`);
      handleClose();
      queryClient.invalidateQueries([queryKeys.admin_category_index]);
      queryClient.invalidateQueries([queryKeys.admin_page_data]);
    },
    onError: (err) => {
      validationErrorHandler({ err, setError, showToast: true });
    },
  });
  const deleteCategory = useAdminCategoryDelete({
    onSuccess: () => {
      toast.success("Category deleted");
      handleClose();
      queryClient.invalidateQueries([queryKeys.admin_category_index]);
      queryClient.invalidateQueries([queryKeys.admin_page_data]);
    },
    onError: (err) => {
      validationErrorHandler({ err, setError, showToast: true });
    },
  });

  const onSubmit = (data: any) => {
    create.mutate({
      body: data,
      action: isUpdate && "admin_category_update",
      query_params: {
        id: modalData?.data?.id,
      },
    });
  };
  const deleteOnSubmit = () => {
    deleteCategory.mutate({ query_params: { id: modalData?.data?.id } });
  };

  return (
    <AntdModal
      open={open}
      afterClose={() => ref.current?.reset()}
      onCancel={handleClose}
      centered
      width={520}
    >
      <Wrapper onSubmit={handleSubmit(onSubmit)}>
        <Spin spinning={false}>
          <div className="title">{isUpdate ? "Update" : "Create"} category</div>
          <UploadImage
            name="cover_file_id"
            error={errors?.cover_file_id?.message}
            control={control}
            setValue={setValue}
            image={modalData?.data?.imageUrl}
            fileDirection={EFileDirection.stock}
            deleteProjectFile={EDeleteProjectFile.stock}
          />
          <Divider mt={24} />

          <div className="input-container">
            <Input
              name="name"
              control={control}
              placeholder="Enter name"
              label="Category name"
              error={errors?.category_id?.message}
            />
          </div>

          <div className="input-container">
            <div className="item">
              <MySelect
                name="status"
                control={control}
                label="Status"
                options={_.map(EnumsStockStatus, (value, key, collection) => {
                  return { value: value, label: key };
                })}
                error={errors?.status?.message}
                defaultValue={EnumsStockStatus.ACTIVE}
              />
            </div>
            <div className="item">
              <InputNumber
                name="order"
                control={control}
                placeholder="number"
                label="Category order"
                error={errors?.order?.message}
              />
            </div>
          </div>
          <Divider mt={60} />

          <div className="buttons">
            <div>
              {isUpdate && (
                <Button
                  style={{
                    ...buttonStyle,
                    background: bgColors.wildSand,
                    color: textColors.pop,
                  }}
                  icon={<DeleteSvg />}
                  onClick={() => setOpenDelete(true)}
                >
                  Delete
                </Button>
              )}
            </div>
            <div className="btns">
              <Button
                style={{
                  ...buttonStyle,
                  background: bgColors.wildSand,
                  color: textColors.soulfulBlue,
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                buttonLoading={create.isLoading}
                type="submit"
                style={{ ...buttonStyle }}
              >
                Save
              </Button>
            </div>
          </div>
        </Spin>
      </Wrapper>
      <ActionModal
        handleSubmit={deleteHandleSubmit}
        handleClose={() => setOpenDelete(false)}
        open={openDelete}
        onSubmit={deleteOnSubmit}
        blurColor={bgColors.pop}
        label="Reason *"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
        icon={<DeleteSvg width={50} height={50} />}
        text={
          <div>
            <p>Are you sure?</p>
            <p>This property will be deleted for everyone</p>
          </div>
        }
        control={control}
        buttonLoading={false}
      />
    </AntdModal>
  );
};
export default StockCategoryModal;
