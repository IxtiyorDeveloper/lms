import * as React from "react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { AntdModal, Button, Input } from "components";
import { ButtonWrapper, FormWrapper, Wrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { Spin } from "antd";
import { useChangePassword } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { OneStudent } from "types/student";
import moment from "moment";
import {
  DATE_FORMAT_DD_MM_YYYY,
  DATE_FORMAT_YYYY_MM_DD,
} from "constants/dates";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export interface IOpen {
  isOpen: boolean;
  id?: number | null;
  student?: OneStudent;
}

const ChangePasswordModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState<IOpen>({
    isOpen: false,
    student: undefined,
    id: 0,
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
    watch,
    setValue,
    clearErrors,
  } = useForm<any>();
  const handleClose = () => {
    setOpen({
      isOpen: false,
      id: 0,
    });
    reset({});
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        open: (props: IOpen) => {
          setOpen(props);
          setValue(
            "password",
            moment(
              props.student?.user?.userProfile?.dob,
              DATE_FORMAT_YYYY_MM_DD
            ).format(DATE_FORMAT_DD_MM_YYYY)
          );
        },
        close: handleClose,
      };
    },
    []
  );

  const queryClient = useQueryClient();

  const save = useChangePassword?.({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.get_one_student]);
      toast.success("Success");
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err, setError, showToast: false });
    },
  });

  const onSubmit = (data: any) => {
    save.mutate({
      id: open.id,
      ...data,
    });
  };

  useEffect(() => {
    const subscription = watch(() => clearErrors());
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <AntdModal
      padding="0"
      open={open.isOpen}
      onCancel={handleClose}
      centered
      width={340}
    >
      <Spin spinning={false}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <Wrapper>
              <Input
                name="password"
                label="Change password"
                placeholder="password"
                control={control}
                type="password"
                error={errors?.password?.message || errors?.user_id?.message}
                hasThreeDots={false}
                autoComplete="new-password"
                // suffix={null}
                // visibilityToggle={false}
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
              buttonLoading={save?.isLoading}
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

export default ChangePasswordModal;
