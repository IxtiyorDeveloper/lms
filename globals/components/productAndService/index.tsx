import React, { useEffect, useMemo } from "react";
import {
  AntdModal,
  Button,
  Input,
  InputNumber,
  MySelect,
  UploadImage,
} from "components";
import { Buttons, TitleWrapper, Wrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateProductService,
  useOneProduct,
  usePageDataMemo,
  useUpdateProduct,
} from "hooks";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateProductServiceSchema } from "validation/finance";
import { makeOptions } from "utils/makeObjectOptions";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { Interface } from "./type";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const ProductAndServiceModal = () => {
  const queryClient = useQueryClient();
  const { productAndServiceEnums, args } = usePageDataMemo();

  const dispatch = useDispatch();

  const {
    productAndService: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const id = data?.id;
  const action = data?.action;
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "productAndService",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const {
    isInitialLoading,
    isPreviousData,
    data: product,
  } = useOneProduct({
    id: data?.id,
  });
  const createMutation = useCreateProductService({
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.admin_finance_product_and_service_index,
      ]);
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        setError,
        showToast: false,
        formHookMainField: true,
      });
    },
  });
  const updateMutation = useUpdateProduct({
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.admin_finance_product_and_service_index,
      ]);
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: false,
        setError,
        formHookMainField: true,
      });
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    reset,
  } = useForm<Interface>({
    resolver: yupResolver(CreateProductServiceSchema),
  });

  const onSubmit = (data: any) => {
    if (action === "update") {
      updateMutation.mutate({
        body: data.general,
        id: id,
      });
    }
    if (action === "create") {
      createMutation.mutate({
        body: data.general,
      });
    }
  };

  const selects = useMemo(() => {
    if (productAndServiceEnums)
      return {
        sellPlaces: makeOptions(productAndServiceEnums?.sellPlaces),
        pricingTypes: makeOptions(productAndServiceEnums?.pricingTypes),
        viewLevels: makeOptions(productAndServiceEnums?.viewLevels),
        types: makeOptions(productAndServiceEnums?.types),
      };
  }, [productAndServiceEnums]);

  useEffect(() => {
    if (action === "update" && !!product && open) {
      setValue("general", {
        iconFile: product?.iconFile,
        name: product?.name,
        description: product?.description,
        pricing_type: product?.pricing_type.toString(),
        view_level: product?.view_level?.toString(),
        sell_place: product?.sell_place?.toString(),
        price: product?.price,
        type: product?.type?.toString(),
      });
    }
  }, [product, open]);

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Spin spinning={isInitialLoading || isPreviousData}>
          <TitleWrapper className="title">
            {`${action?.toString().charAt(0).toUpperCase()}` +
              `${action?.slice(1)}`}
          </TitleWrapper>
          <div>
            <Wrapper>
              <UploadImage
                name="general.icon_file_id"
                control={control}
                setValue={setValue}
                image={watch().general?.iconFile?.full_url}
                watch={watch().general?.iconFile?.full_url}
                action={action}
              />
            </Wrapper>
            <Wrapper>
              <Input
                control={control}
                name="general.name"
                label="Name"
                placeholder="Type here..."
                error={errors?.general?.name?.message}
              />
            </Wrapper>
            <Wrapper>
              <Input
                control={control}
                name="general.description"
                label="Description"
                placeholder="Type here..."
                type="textarea"
                rows={3}
                error={errors?.general?.description?.message}
              />
            </Wrapper>
            <Wrapper>
              <MySelect
                control={control}
                name="general.type"
                label="Product type"
                options={selects?.types}
                placeholder="Select"
                // @ts-ignore
                error={errors?.general?.type?.message}
              />
            </Wrapper>
            <Wrapper>
              <MySelect
                control={control}
                name="general.pricing_type"
                label="Pricing Type"
                options={selects?.pricingTypes}
                placeholder="Select"
                error={errors?.general?.pricing_type?.message}
              />
            </Wrapper>
            <Wrapper>
              <InputNumber
                control={control}
                name="general.price"
                label="Price"
                placeholder="Type here..."
                error={errors?.general?.price?.message}
              />
            </Wrapper>
            <Wrapper>
              <MySelect
                control={control}
                name="general.sell_place"
                label="Sell place"
                options={selects?.sellPlaces}
                placeholder="Select"
                error={errors?.general?.sell_place?.message}
              />
            </Wrapper>
            <Wrapper style={{ paddingBottom: "40px" }}>
              <MySelect
                control={control}
                name="general.view_level"
                label="View level"
                options={selects?.viewLevels}
                placeholder="Select"
                error={errors?.general?.view_level?.message}
              />
            </Wrapper>
          </div>
          <Buttons>
            <Button
              style={{
                height: "44px",
                color: textColors.yourShadow,
                boxShadow: "inset 0 2px 6px rgba(252, 252, 253, 0.8)",
                backgroundColor: bgColors.wildSand,
              }}
              onClick={handleClose}
              className="cancel"
            >
              Cancel
            </Button>
            <Button
              style={{
                height: "44px",
                color: textColors.dark,
                boxShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866",
              }}
              type="submit"
              className="save"
              buttonLoading={
                createMutation.isLoading || updateMutation.isLoading
              }
            >
              Save
            </Button>
          </Buttons>
        </Spin>
      </form>
    </AntdModal>
  );
};

export default ProductAndServiceModal;
