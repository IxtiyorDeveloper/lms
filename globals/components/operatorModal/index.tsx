import * as React from "react";
import { Wrapper, Buttons, Content } from "./style";
import { AntdModal, AntdSwitch, Button, Input, MySelect } from "components";
import { bgColors, textColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateOperator,
  useOperator,
  usePageDataMemo,
  useUpdateOperator,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import { CreateOperatorSchema } from "validation/operator";
import { useEffect } from "react";
import {
  OPERATOR_STATUS_ACTIVE,
  OPERATOR_STATUS_INACTIVE,
} from "constants/operators";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export enum Enum {
  create = "create",
  update = "update",
}

export interface Interface {
  general: {
    operator_number: number;
    status: number | string | boolean;
    user_id: number | string;
    sip_login: string;
    sip_password: string;
  };
}

const OperatorModal = () => {
  const { staffs } = usePageDataMemo();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    operator: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const type = data?.type;
  const id = data?.id;
  const { data: operator, isFetching } = useOperator({
    query_params: {
      id,
    },
  });

  const createOperator = useCreateOperator({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_call_operator_list]);
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const updateOperator = useUpdateOperator({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_call_operator_list]);
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
    reset,
    control,
    setValue,
  } = useForm<Interface>({
    resolver: yupResolver(CreateOperatorSchema),
  });

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        data: {
          open: false,
          data: {},
        },
        key: "operator",
      })
    );
  };
  const onSubmit = (data: Interface) => {
    const { general } = data;
    const { status, ...rest } = general;
    if (type === Enum.create) {
      createOperator.mutate({
        body: {
          ...rest,
          status:
            status === "true"
              ? OPERATOR_STATUS_ACTIVE
              : OPERATOR_STATUS_INACTIVE,
        },
      });
    }
    if (type === Enum.update) {
      updateOperator.mutate({
        body: {
          ...rest,
          status:
            status === "true"
              ? OPERATOR_STATUS_ACTIVE
              : OPERATOR_STATUS_INACTIVE,
        },
        query_params: {
          id,
        },
      });
    }
  };
  useEffect(() => {
    if (type === Enum.update && operator) {
      setValue("general", {
        operator_number: operator.operator_number,
        status:
          operator.status?.toString() === OPERATOR_STATUS_ACTIVE?.toString(),
        sip_login: operator.sip_login.slice(4),
        sip_password: operator.sip_password.slice(4),
        user_id: operator.user_id?.toString(),
      });
    }
  }, [open, operator, type]);

  return (
    <AntdModal open={open} onCancel={handleClose} centered>
      <Wrapper>
        <Spin spinning={isFetching}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Content>
              <Input
                label="Operator number"
                name="general.operator_number"
                control={control}
                placeholder="Operator number"
                error={errors?.general?.operator_number?.message}
              />
              <MySelect
                name="general.user_id"
                control={control}
                label="Staff"
                placeholder="staff"
                options={staffs}
                error={errors?.general?.user_id?.message}
              />
              <Input
                label="Login"
                name="general.sip_login"
                control={control}
                placeholder="login"
                error={errors?.general?.sip_login?.message}
              />
              <Input
                label="Password"
                name="general.sip_password"
                control={control}
                placeholder="password"
                error={errors?.general?.sip_password?.message}
                type="password"
              />
              <AntdSwitch name="general.status" control={control} />
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
                onClick={handleClose}
              >
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
                  updateOperator.isLoading || createOperator.isLoading
                }
              >
                Save
              </Button>
            </Buttons>
          </form>
        </Spin>
      </Wrapper>
    </AntdModal>
  );
};
export default OperatorModal;
