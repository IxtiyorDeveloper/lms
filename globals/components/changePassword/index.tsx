import React from "react";
import { AntdModal, Button, Input } from "components";
import { useForm } from "react-hook-form";
import { useChangeUserPassword } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { bgColors } from "styles/theme";
import { Buttons, Content } from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordSchema } from "validation/user";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

interface Interface {
  password: string;
  confirm_password: string;
}

const ChangePasswordModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    changePassword: { open },
  } = useSelector((state: IStore) => state.modals);

  const changeUserPassword = useChangeUserPassword({
    onSuccess: () => {
      toast.info("Successfully updated");
      queryClient.invalidateQueries([queryKeys.admin_group_view]);
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Interface>({
    resolver: yupResolver(PasswordSchema),
  });
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "changePassword",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const onSubmit = (data: Interface) => {
    changeUserPassword.mutate({
      body: data,
    });
  };

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={340}
      title="Change password"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Content>
          <Input
            label="Old password"
            name="old_password"
            control={control}
            placeholder="Note"
            type="password"
            hasThreeDots={false}
            error={errors?.password?.message}
          />
          <Input
            label="New password"
            name="password"
            control={control}
            placeholder="Note"
            type="password"
            hasThreeDots={false}
            error={errors?.password?.message}
          />
          <Input
            label="Repeat password"
            name="confirm_password"
            control={control}
            placeholder="Note"
            type="password"
            hasThreeDots={false}
            autoComplete="off"
            error={errors?.confirm_password?.message}
          />
        </Content>
        <Buttons>
          <Button
            className="cancel"
            onClick={handleClose}
            style={{
              backgroundColor: bgColors.wildSand,
              width: "100%",
            }}
          >
            Cancel
          </Button>
          <Button
            className="save"
            type="submit"
            buttonLoading={changeUserPassword?.isLoading}
            style={{
              width: "100%",
            }}
          >
            Save
          </Button>
        </Buttons>
      </form>
    </AntdModal>
  );
};

export default ChangePasswordModal;
