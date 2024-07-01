import * as React from "react";
import { AntdModal, Button, Input, MySelect } from "components";
import { ModalTitle, Wrapper, ButtonWrapper, FormWrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { Spin } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  useOneBranch,
  usePageDataMemo,
  useSaveBranch,
  useUpdateBranch,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import ExtraMedia from "./components/extraMedia";
import _ from "lodash";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "../../../../../../utils";

export interface IOpen {
  isOpen: boolean;
  regionId: number;
  type?: "update" | "create";
  id?: number | null;
}

const CreateBranchModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState<IOpen>({
    isOpen: false,
    regionId: 0,
    type: "create",
    id: 0,
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
    setValue,
    watch,
    clearErrors,
  } = useForm<any>({
    defaultValues: {
      branchFiles: [{}],
    },
  });
  const handleClose = () => {
    setOpen({
      isOpen: false,
      regionId: 0,
      type: "create",
      id: 0,
    });
    reset({
      branchFiles: [{}],
    });

    setTimeout(() => {
      setShow(true);
    }, 200);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        open: (props: IOpen) => {
          setShow(false);
          setOpen(props);
        },
        close: handleClose,
      };
    },
    []
  );

  const selects = usePageDataMemo();
  const queryClient = useQueryClient();

  const save = (open.type === "update" ? useUpdateBranch : useSaveBranch)?.({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.regions_list]);
      queryClient.invalidateQueries([queryKeys.page_data]);
      toast.success("Success");
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err, setError, showToast: false });
    },
  });
  const { isInitialLoading: isLoading, data } = useOneBranch({
    query_params: {
      id: open.id,
      expand: "room_count,coverFile,branchFiles",
    },
  });
  const onSubmit = (data: any) => {
    const a = data.branchFiles.filter((e: any) => !_.isEmpty(e));
    save.mutate({
      ...(open.type === "update" ? { query_params: { id: open.id } } : {}),
      body: {
        ...data,
        branchFiles: a.length === 0 ? null : a,
      },
    });
  };

  useEffect(() => {
    open.regionId && setValue("region_id", `${open.regionId}`);
  }, [open]);

  useEffect(() => {
    const subscription = watch((value, { type }) => {
      if (type === "change") {
        clearErrors();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!!data) {
      setValue("name", data?.name);
      setValue("latitude", data?.latitude);
      setValue("longitude", data?.longitude);
      setValue("address", data?.address);
      setValue("landmark", data?.landmark);
      setValue("location_url", data?.location_url);
      setValue("cover_file_id", data?.cover_file_id);
    }
  }, [show, data]);

  if (show) {
    return null;
  }

  return (
    <AntdModal
      padding="0"
      open={open.isOpen}
      onCancel={handleClose}
      centered
      width={520}>
      <Spin spinning={isLoading}>
        <ModalTitle>
          {open.type === "update" ? "Update" : "Create"} branch
        </ModalTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <Wrapper>
              <MySelect
                name="region_id"
                control={control}
                label="Region"
                options={selects.regions}
                placeholder="Select"
                error={errors?.region_id?.message}
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper>
            <Wrapper>
              <Input
                name="name"
                label="Name"
                placeholder="Type here..."
                control={control}
                error={errors?.name?.message}
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper>
            <Wrapper>
              <Input
                name="latitude"
                label="Latitude"
                placeholder="Type here..."
                control={control}
                error={errors?.latitude?.message}
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper>
            <Wrapper>
              <Input
                name="longitude"
                label="Longitude"
                placeholder="Type here..."
                control={control}
                error={errors?.longitude?.message}
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper>
            <Wrapper>
              <Input
                name="address"
                label="Address"
                placeholder="Type here..."
                control={control}
                error={errors?.address?.message}
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper>
            <Wrapper>
              <Input
                name="location_url"
                label="Location url"
                placeholder="Type here..."
                control={control}
                error={errors?.location_url?.message}
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper>
            <Wrapper>
              <Input
                name="landmark"
                label="Landmark"
                placeholder="Type here..."
                control={control}
                error={errors?.landmark?.message}
              />
            </Wrapper>
          </FormWrapper>
          {open.isOpen && (
            <ExtraMedia
              data={data}
              errors={errors}
              control={control}
              setValue={setValue}
            />
          )}
          <ButtonWrapper>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}>
              Cancel
            </Button>
            <Button type="submit" buttonLoading={false}>
              Save
            </Button>
          </ButtonWrapper>
        </form>
      </Spin>
    </AntdModal>
  );
});

export default CreateBranchModal;
