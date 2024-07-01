import * as React from "react";
import { AntdModal, Button, Input } from "components";
import { Wrapper, ButtonWrapper, FormWrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { Spin } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useOneRegions, useSaveRegion, useUpdateRegion } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const RegionModal = forwardRef((props, ref) => {
  const router = useRouter();
  const [open, setOpen] = useState<{ isOpen: boolean; id: number | null }>({
    isOpen: false,
    id: null,
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const type = useMemo(() => {
    return !!open.id;
  }, [open.id]);

  const { isInitialLoading: isLoading, data } = useOneRegions({ id: open.id });

  const handleClose = () => {
    setOpen({
      isOpen: false,
      id: null,
    });
    reset({});
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        open: (id?: number) => {
          setOpen({
            isOpen: true,
            id: id || null,
          });
        },
        close: handleClose,
      };
    },
    []
  );

  const save = (type ? useUpdateRegion : useSaveRegion)?.({
    onSuccess: () => {
      handleClose();
      toast.success(type ? "Updated" : "Created");
      queryClient.invalidateQueries([queryKeys.regions_list]);
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: false,
        setError,
        formHookMainField: false,
      });
    },
  });

  const onSubmit = (formData: any) => {
    save.mutate({
      body: formData,
      ...(type ? { query_params: { id: data?.id } } : {}),
    });
  };

  useEffect(() => {
    const subscription = watch((value, { type }) => {
      if (type === "change") {
        clearErrors();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, router.query]);

  useEffect(() => {
    setValue("name", data?.name);
  }, [type, data]);

  return (
    <AntdModal
      padding="0"
      open={open.isOpen}
      onCancel={handleClose}
      centered
      width={340}
    >
      <Spin spinning={type && isLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper style={{ paddingTop: "20px" }}>
            <Wrapper>
              <Input
                name="name"
                label="Create region name"
                placeholder="Type here..."
                control={control}
                error={errors?.name?.message}
              />
            </Wrapper>
          </FormWrapper>
          <ButtonWrapper>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
              style={{ width: "100%" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              buttonLoading={false}
              style={{ width: "100%" }}
            >
              Save
            </Button>
          </ButtonWrapper>
        </form>
      </Spin>
    </AntdModal>
  );
});

export default RegionModal;
