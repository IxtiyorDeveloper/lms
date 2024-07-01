import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";
import {
  AntdModal,
  Button,
  Input,
  MySelect,
  DeleteSvg,
  ActionModal,
} from "components";
import { useForm } from "react-hook-form";
import { toggleModal, useAppSelector } from "store";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import Photos from "./photos";
import { bgColors, textColors } from "styles/theme";
import {
  EnumsStockStatus,
  StockProductType,
  StockSellPlace,
  StockStationary,
} from "constants/stock";
import map from "lodash/map";
import StudentTypeForm from "./studentTypeForm";
import {
  useStockPageData,
  useStockProductDelete,
  useStockProductSave,
} from "hooks";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";
import { queryKeys } from "constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { IStockProduct } from "types";
import Router from "next/router";
import AlterCount from "./alertCount";

const buttonStyle = {
  borderRadius: "10px",
};

const ProductModal = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
    setError,
    reset,
    clearErrors,
  } = useForm<any>({
    defaultValues: {
      alert_counts: [{ location_id: undefined, min_count: 0, max_count: 0 }],
    },
  });

  const { handleSubmit: deleteHandleSubmit, control: deleteControl } =
    useForm();

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data, isLoading } = useStockPageData({});
  const [mainImageIndex, setIndex] = useState<any>(null);

  const {
    stockProduct: { open, data: modalData },
  } = useAppSelector((state) => state.modals);

  const { data: pageData } = useStockPageData();
  const isUpdate = !!modalData?.id;
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "stockProduct",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  useEffect(() => {
    if (open) {
      setValue("category_id", modalData?.category?.id);
      if (!modalData?.id) setValue("photo", [{ a0: null }]);
      if (modalData?.id) {
        const data = modalData as IStockProduct;
        setValue("is_stationary", data.isStationary);
        setValue("notification_status", !!data.notification_status);
        setValue("type", data.type?.toString());
        setValue("description", data?.description);
        setValue("order", data?.order);
        setValue("name", data?.name);
        // setValue("alert_counts", data?.alert_counts);
        setValue(
          "alert_counts",
          data?.alert_counts && data.alert_counts?.length > 0
            ? data?.alert_counts
            : [{ location_id: undefined, min_count: 0, max_count: 0 }],
        );
        setValue("barcode", data?.barcode);
        setValue("status", data?.status?.toString());

        let a = {};
        [...(modalData?.photos || []), { id: null }]?.map(
          (e: any, index: number) => {
            if (modalData?.cover_file_id == e.id) {
              setIndex(`a${index}`);
            }
            a = {
              ...a,
              [`a${index}`]: e.id,
            };
          },
        );
        setValue("photo", a);

        if (data.isStationary) {
          setValue("stationary", {
            status: data.status?.toString(),
            sell_place: data.stationary_type?.toString(),
            level_id: data.level_id?.toString(),
            price: data.sellPlaces?.[0].price,
          });
        }
        const sellPlace = data.sellPlaces?.[0];

        if (!!sellPlace?.type) {
          setValue("notStationary", {
            sell_place: sellPlace?.type.toString(),
            price: sellPlace?.price,
            properties: data.properties,
            platform: { switch: data?.tags?.includes("recommend_students") },
          });
        }
      }
    }

    return () => {
      reset();
      clearErrors();
      setIndex(null);
    };
  }, [open]);

  const save = useStockProductSave({
    onSuccess: () => {
      toast.success(`Category ${isUpdate ? "updated" : "created"}!`);
      handleClose();
      queryClient.invalidateQueries([queryKeys.admin_category_index]);
      queryClient.invalidateQueries([queryKeys.admin_product_view]);
      queryClient.invalidateQueries([queryKeys.admin_page_data]);
    },
    onError: (err) => {
      validationErrorHandler({ err, setError });
    },
  });

  const deleteProduct = useStockProductDelete({
    onSuccess: () => {
      toast.success(`Category deleted!`);
      handleClose();
      queryClient.invalidateQueries([queryKeys.admin_category_index]);
      queryClient.invalidateQueries([queryKeys.admin_page_data]);
      Router.back();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmit = (data: any) => {
    const is_stationary = data.is_stationary;
    delete data.is_stationary;
    save.mutate({
      action: modalData?.id ? "admin_product_update" : undefined,
      query_params: {
        id: modalData?.id,
      },
      body: {
        ...data,
        photo: undefined,
        notification_status: data?.notification_status,
        files: map(data?.photo, (value, key, collection) => {
          return {
            id: value,
            is_main: mainImageIndex == key,
          };
        }).filter((e) => !!e.id),
        ...(data.type == StockProductType.Student
          ? {
              is_stationary: !!is_stationary,
              description: data.description,
              ...(is_stationary
                ? {
                    stationary_type: data?.stationary?.sell_place,
                    level_id:
                      data?.stationary?.sell_place == StockStationary.Book
                        ? data?.stationary?.level_id
                        : undefined,
                    price: data?.stationary?.price,
                  }
                : data?.notStationary?.sell_place == StockSellPlace.Cashbox
                  ? {
                      sell_places: [
                        {
                          type: data?.notStationary?.sell_place,
                          price: data?.notStationary?.price,
                        },
                      ],
                    }
                  : {
                      sell_places: [
                        {
                          type: data?.notStationary?.sell_place,
                          price: data?.notStationary?.price,
                        },
                      ],
                      properties: data?.notStationary?.properties,
                      tags: data?.notStationary?.platform?.switch
                        ? ["recommend_students"]
                        : [],
                    }),
            }
          : {}),
      },
    });
  };

  useEffect(() => {
    const subscription = watch((value, { type }) => {
      if (type === "change") {
        clearErrors();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const deleteOnSubmit = () => {
    deleteProduct.mutate({
      action: "admin_product_delete",
      query_params: {
        id: modalData?.id,
      },
    });
  };

  return (
    <AntdModal
      padding="0"
      open={open}
      width={520}
      destroyOnClose
      onCancel={handleClose}
    >
      <Spin spinning={isLoading}>
        <Wrapper>
          <div className="p">
            <div className="title">
              {isUpdate ? "Update product" : "Create product"}
            </div>
            <div className="i-wrapper">
              <Input
                name="name"
                control={control}
                placeholder="Enter name"
                label="Product name"
                error={errors?.name?.message}
              />
            </div>
            <div>
              <div className="label">photos</div>
              <Photos
                mainIndex={mainImageIndex}
                control={control}
                setValue={setValue}
                error={errors?.files?.message}
                setIndex={setIndex}
                setError={setError}
                clearErrors={clearErrors}
                photos={modalData?.photos}
              />
            </div>
            <div className="flex">
              <div>
                <MySelect
                  name="category_id"
                  control={control}
                  placeholder="Select"
                  label="Category"
                  options={map(data?.categories, (value) => {
                    return {
                      label: value.name,
                      value: value.id,
                    };
                  })}
                  disabled={!isUpdate}
                  error={errors?.category_id?.message}
                />
              </div>
              <div>
                <MySelect
                  name="status"
                  control={control}
                  placeholder="Enter name"
                  options={map(EnumsStockStatus, (value, key, collection) => {
                    return { value: value, label: key };
                  })}
                  error={errors?.status?.message}
                  label="Product status"
                />
              </div>
            </div>
            <div className="flex">
              <div>
                <Input
                  name="order"
                  control={control}
                  placeholder="Order"
                  label="Product order"
                />
              </div>
              <div>
                <MySelect
                  name="type"
                  control={control}
                  placeholder="Enter name"
                  options={map(StockProductType, (value, key, collection) => {
                    return {
                      label: key,
                      value,
                    };
                  })}
                  label="Product type"
                  error={errors?.type?.message}
                />
              </div>
            </div>
            <AlterCount control={control} data={pageData} />
            {watch("type") == StockProductType.Student && (
              <StudentTypeForm
                errors={errors}
                control={control}
                watch={watch}
                setValue={setValue}
                getValues={getValues}
              />
            )}
          </div>
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
                buttonLoading={save.isLoading}
                type="submit"
                style={{ ...buttonStyle }}
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </div>
          </div>
        </Wrapper>
      </Spin>
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
        control={deleteControl}
        buttonLoading={false}
      />
    </AntdModal>
  );
};

export default ProductModal;
