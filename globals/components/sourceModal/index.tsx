import * as React from "react";
import { Wrapper, Buttons, Content, InputWrapper } from "./style";
import { AntdModal, Button, Input, MySelect, UploadImage } from "components";
import { bgColors, textColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateSourceSchema } from "validation/source";
import {
  useCreateSource,
  usePageDataMemo,
  useSource,
  useUpdateSource,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { CopySvg } from "@jasurbekyuldashov/lms-web-icons";
import { SourceTypesEnum } from "../../../types/company/settings";

export enum Enum {
  create = "create",
  update = "update",
}

export interface Interface {
  general: {
    name: string;
    using_place: string;
    icon_file_id?: string | number;
    slug?: string;
    iconFile?: any;
    order: number | string;
  };
}

const SourceModal = () => {
  const { sourceEnumsUsingPlaces } = usePageDataMemo();
  const dispatch = useDispatch();
  const [isLead, setIsLead] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    source: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const type = data?.type;
  const id = data?.id;
  const { data: source, isFetching } = useSource({
    query_params: {
      id,
      expand: "iconFile",
    },
  });

  const createSource = useCreateSource({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_company_get_source_list]);
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const updateSource = useUpdateSource({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_company_get_source_list]);
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control,
    setValue,
    getValues,
  } = useForm<Interface>({
    resolver: yupResolver(CreateSourceSchema),
  });

  const handleClose = () => {
    reset({});
    setValue("general.slug", "");
    dispatch(
      toggleModal({
        data: {
          open: false,
          data: {},
        },
        key: "source",
      })
    );
  };

  const onSubmit = (data: Interface) => {
    const { general } = data;
    if (type === Enum.create) {
      createSource.mutate({
        body: general,
      });
    }
    if (type === Enum.update) {
      updateSource.mutate({
        body: general,
        query_params: {
          id,
        },
      });
    }
  };

  useEffect(() => {
    if (type === Enum.update && source) {
      if (source?.slug) setIsLead(true);

      setValue("general", {
        name: source.name,
        using_place: source.using_place.toString(),
        icon_file_id: source.iconFile?.id,
        slug: source?.slug,
        order: source.order,
      });
    }
  }, [open, source, type]);

  useEffect(() => {
    let subscription = watch((value: any, { name, type }: any) => {
      if (type === "change") {
        if (value.general.using_place !== SourceTypesEnum.Reception) {
          setIsLead(true);
        } else {
          setIsLead(false);
        }
      }
    });
    return () => subscription && subscription.unsubscribe();
  }, [watch]);

  return (
    <AntdModal open={open} onCancel={handleClose} centered destroyOnClose>
      <Wrapper>
        <Spin spinning={isFetching}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Content>
              <Input
                label="Name"
                name="general.name"
                onInput={(e) => {
                  // @ts-ignore
                  const value = e.target?.value.split(" ").join("_");
                  setValue("general.slug", value.toLocaleLowerCase());
                }}
                control={control}
                placeholder="Source name"
                error={errors?.general?.name?.message}
              />

              <Input
                onlyNumber
                label="Order"
                name="general.order"
                control={control}
                placeholder="type here..."
                error={errors?.general?.order?.message}
              />
              <MySelect
                name="general.using_place"
                control={control}
                label="Type"
                placeholder="type"
                options={sourceEnumsUsingPlaces}
              />
              {isLead && (
                <InputWrapper>
                  <Input
                    prefix={`https://inter-nation.uz/${
                      watch()?.general?.using_place === "200" ? "l/" : "hr?s="
                    }`}
                    label="Path"
                    disabled
                    name="general.slug"
                    control={control}
                    placeholder="Type here..."
                    error={errors?.general?.slug?.message}
                    suffix={
                      <CopySvg
                        onClick={() => {
                          const slug = getValues("general.slug");
                          navigator.clipboard.writeText(
                            `https://inter-nation.uz/${
                              watch()?.general?.using_place === "200"
                                ? `l/${slug}`
                                : `hr?s=${slug}`
                            }`
                          );
                          toast("text copied");
                        }}
                      />
                    }
                  />
                </InputWrapper>
              )}
              <UploadImage
                name="general.icon_file_id"
                control={control}
                setValue={setValue}
                image={source?.iconFile?.full_url}
                watch={watch("general.icon_file_id")}
                action={type}
              />
            </Content>
            <Buttons>
              <Button
                style={{
                  width: "100%",
                  height: "44px",
                  color: textColors.yourShadow,
                  boxShadow: "inset 0 2px 6px rgba(252, 252, 253, 0.8)",
                  backgroundColor: bgColors.wildSand,
                  borderRadius: 8,
                }}
                onClick={handleClose}>
                Cancel
              </Button>
              <Button
                style={{
                  width: "100%",
                  height: "44px",
                  color: textColors.dark,
                  borderRadius: 8,
                  boxShadow:
                    "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866",
                }}
                type="submit"
                buttonLoading={
                  updateSource.isLoading || createSource.isLoading
                }>
                Save
              </Button>
            </Buttons>
          </form>
        </Spin>
      </Wrapper>
    </AntdModal>
  );
};
export default SourceModal;
