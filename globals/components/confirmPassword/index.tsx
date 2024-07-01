import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Buttons, Content } from "../changePassword/style";
import { AntdModal, Button, Input, EyeSvg } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useStudentBalance } from "hooks";
import { validationErrorHandler } from "utils";

interface IProps {
  contactId: string | number;
  setBalance: (data: { balance: number; debt: number }) => void;
  onCancel?: () => void;
  // open:()=>void
}

const ConfirmPassword = forwardRef((props: IProps, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    watch,
    clearErrors,
  } = useForm();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const balance = useStudentBalance({
    onSuccess: (data) => {
      props.setBalance(data);
      handleClose();
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
  const handleClose = () => {
    reset({
      password: undefined,
    });
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    balance.mutate({
      body: {
        password: data?.kjbsldbdfjklsa2,
      },
      query_params: {
        contact_id: props.contactId,
      },
    });
  };

  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
    };
  });
  const password = watch("kjbsldbdfjklsa2");

  useEffect(() => {
    if (errors?.password?.message) {
      clearErrors();
    }
  }, [password]);

  return (
    <AntdModal
      open={open}
      onCancel={() => {
        props?.onCancel?.();
        handleClose();
      }}
      centered
      width={340}
      title="Confirm password"
      zIndex={10000}
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Content>
          <Input
            label="Password"
            name="kjbsldbdfjklsa2"
            control={control}
            placeholder="password"
            // type="password"
            hasThreeDots={false}
            error={errors?.password?.message}
            autoComplete="off"
            suffix={
              <EyeSvg
                onClick={() => setShowPassword(!showPassword)}
                color={
                  showPassword ? bgColors.sceptreBlue : bgColors.brotherBlue
                }
                className="pointer"
              />
            }
            style={
              {
                width: "100%",
                ...(showPassword ? { WebkitTextSecurity: "disc" } : {}),
              } as any
            }
          />
        </Content>
        <Buttons>
          <Button
            className="cancel"
            onClick={() => {
              props?.onCancel?.();
              handleClose();
            }}
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
            buttonLoading={balance?.isLoading}
            style={{
              width: "100%",
            }}
          >
            Check
          </Button>
        </Buttons>
      </form>
    </AntdModal>
  );
});

export default ConfirmPassword;
