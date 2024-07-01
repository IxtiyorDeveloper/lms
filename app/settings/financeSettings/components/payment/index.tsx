import React, { useEffect, useState } from "react";
import { ActionModal, AntdSwitch, DatePickerAnt, Input } from "components";
import { useForm } from "react-hook-form";
import { FormWrapper } from "./style";
import {
  useChangeBlackListStatus,
  useChangePaymentSettings,
  usePaymentConfig,
  usePaymentConfigData,
  usePaymentSecurity,
  usePaymentSettingsPageData,
  useToolsChangeWillPayDate,
} from "hooks";
import { toast } from "react-toastify";
import SwitchPayment from "./components/switch";
import { bgColors } from "styles/theme";
import { Switch } from "antd";
import ContainerPayment from "./components/container";
import { validationErrorHandler } from "utils";
import moment from "moment";
import {
  INTERNAL_ONLINE_PAYMENT_IS_ACTIVE,
  ONLINE_PAYMENT_SERVICE_CLICK_ACTIVE,
  ONLINE_PAYMENT_SERVICE_PAYME_ACTIVE,
  ONLINE_PAYMENT_SERVICE_PLUM_ACTIVE,
  ONLINE_PAYMENT_SERVICE_UZUM_ACTIVE,
} from "constants/onlinePayments";
import lodash from "lodash";

const initial = {
  payment: {
    data: {},
    isOpen: false,
  },
  mot: {
    data: {},
    isOpen: false,
  },
  black_list: {
    data: {},
    isOpen: false,
  },
};

const Payment = () => {
  const { data } = usePaymentSettingsPageData();
  const { control, handleSubmit, setError, setValue } = useForm();
  const {
    control: securityControl,
    handleSubmit: securityHandleSubmit,
    setError: securitySetError,
    setValue: securitySetValue,
    formState: { errors: securityErrors },
  } = useForm();
  const {
    control: paymentsControl,
    handleSubmit: paymentsHandleSubmit,
    setError: paymentsSetError,
    setValue: paymentsSetValue,
    formState: { errors: paymentsErrors },
  } = useForm();
  const {
    control: willPayController,
    handleSubmit: willPayHandleSubmit,
    setError: willPaySetError,
    setValue: willPaySetValue,
    formState: { errors: willPayErrors },
  } = useForm();

  const { data: paymentPageData } = usePaymentConfigData({});

  const [modals, setModals] = useState<any>(initial);

  useEffect(() => {
    setValue("is_active", data?.is_active);
    setValue("attribute.group", data?.groupBlackListSwitchConstant);
    setValue("attribute.individual", data?.individualBlackListSwitchConstant);
    setValue("taking_mot_is_enabled", data?.taking_mot_enabled);
    willPaySetValue("lesson_count", data?.will_pay_lesson_count);
    willPaySetValue("max_day", data?.will_pay_max_day);
    securitySetValue("root.is_active", data?.expense_security);
    data?.expense_security_day_of_month &&
      securitySetValue(
        "root.day_of_month",
        moment(data?.expense_security_day_of_month, "DD")
      );
  }, [data]);

  useEffect(() => {
    if (!!paymentPageData) {
      lodash.map(paymentPageData?.systems, (value, key) => {
        paymentsSetValue(`root.i_${key}`, value);
      });
    }
  }, [paymentPageData]);

  const changePaymentSettings = useChangePaymentSettings({
    onSuccess: () => {
      handleClose();
      toast.success("Settings changed!");
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
  const changeWillPayDate = useToolsChangeWillPayDate({
    onSuccess: () => {
      toast.success("Settings changed!");
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: false,
        setError: willPaySetError,
        formHookMainField: false,
      });
    },
  });
  const paymentSecurity = usePaymentSecurity({
    onSuccess: () => {
      toast.success("Settings changed!");
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: true,
        setError: paymentsSetError,
        formHookMainField: "root",
      });
    },
  });

  const paymentConfig = usePaymentConfig({
    onSuccess: () => {
      toast.success("Settings changed!");
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: true,
        setError: securitySetError,
        formHookMainField: "root",
      });
    },
  });

  const changeBlackListStatus = useChangeBlackListStatus({
    onSuccess: () => {
      toast.success("Settings changed!");
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmit = () => {
    changePaymentSettings.mutate({
      body: { ...modals.payment?.status },
    });
  };

  const onSubmitBlackList = () => {
    changeBlackListStatus.mutate({
      body: modals.black_list?.status,
    });
  };

  const handleClose = () => {
    setModals(initial);
  };

  const handleOpen = (
    data: any,
    typeModal: "black_list" | "payment_control"
  ) => {
    switch (typeModal) {
      case "payment_control":
        setModals({
          ...modals,
          payment: {
            status: data,
            isOpen: true,
          },
        });
        break;
      case "black_list":
        setModals({
          ...modals,
          black_list: {
            status: data,
            isOpen: true,
          },
        });
        break;
    }
  };

  const willPaySubmit = (body: any) => {
    changeWillPayDate.mutate({
      body,
    });
  };

  const securitySubmit = (body: any) => {
    paymentSecurity.mutate({
      body: {
        ...body.root,
        day_of_month: body.root.day_of_month
          ? moment(body.root.day_of_month).format("DD")
          : undefined,
      },
    });
  };
  const paymentSubmit = (body: any) => {
    let a = {};
    lodash.map(body.root, (value, key) => {
      a = {
        ...a,
        [key.replace("i_", "")]: value,
      };
    });
    paymentConfig.mutate({
      body: { systems: a },
    });
  };

  return (
    <FormWrapper>
      <Input
        name="api_token"
        control={control}
        placeholder="Type here..."
        label="Online payment API key"
      />
      <div className="switches">
        <ContainerPayment
          control={willPayController}
          info="Will pay controller"
          onSubmit={willPaySubmit}
          handleSubmit={willPayHandleSubmit}
        >
          <div className="child">
            <Input
              name="lesson_count"
              placeholder="Lesson count"
              control={willPayController}
              label="Max lesson count"
              error={willPayErrors?.lesson_count?.message}
              defaultValue={data?.will_pay_lesson_count}
            />
            <Input
              name="max_day"
              placeholder="Day of month"
              control={willPayController}
              label="Max day of month"
              error={willPayErrors?.day?.message}
              defaultValue={data?.will_pay_max_day}
            />
          </div>
        </ContainerPayment>
        {/*<SwitchPayment*/}
        {/*  control={control}*/}
        {/*  name="black_list_status"*/}
        {/*  info="Black list controller"*/}
        {/*  label="Black list Activeness"*/}
        {/*  handleSubmit={handleSubmit}*/}
        {/*  onSubmit={(data: any) => handleOpen(data, "black_list")}*/}
        {/*/>*/}
        <ContainerPayment
          control={control}
          info="Black list controller"
          handleSubmit={handleSubmit}
          onSubmit={(data: any) => handleOpen(data, "black_list")}
        >
          <div className="child switch">
            <div className="switch-input">
              <div className="child">
                <div className="text">Black list groups</div>
                <AntdSwitch
                  name={`attribute.group`}
                  placeholder="Black list groups"
                  control={control}
                  // @ts-ignore
                  // error={paymentsErrors.root?.is_active?.message}
                />
              </div>
            </div>
          </div>
          <div className="child switch">
            <div className="switch-input">
              <div className="child">
                <div className="text">Black list IND</div>
                <AntdSwitch
                  name={`attribute.individual`}
                  placeholder="Black list IND"
                  control={control}
                  // @ts-ignore
                  // error={paymentsErrors.root?.is_active?.message}
                />
              </div>
            </div>
          </div>
        </ContainerPayment>
        <SwitchPayment
          control={control}
          name="taking_mot_is_enabled"
          info="Payment type"
          label="Can take MOT"
          handleSubmit={handleSubmit}
          onSubmit={(data: any) => handleOpen(data, "payment_control")}
        />
        <SwitchPayment
          control={control}
          name="is_active"
          info="Payment controller"
          label="Payment Activeness"
          handleSubmit={handleSubmit}
          onSubmit={(data: any) => handleOpen(data, "payment_control")}
        />
        <ContainerPayment
          control={securityControl}
          info="Transaction edit and delete"
          onSubmit={securitySubmit}
          handleSubmit={securityHandleSubmit}
        >
          <div className="child switch">
            <DatePickerAnt
              name="root.day_of_month"
              placeholder="Select date"
              control={securityControl}
              label="Expire date"
              format="DD"
              // @ts-ignore
              error={willPayErrors?.root?.day_of_month?.message}
            />
            <div className="switch-input">
              <div className="title">Permission</div>
              <div className="child">
                <div className="text">Delete & edit</div>
                <AntdSwitch
                  name="root.is_active"
                  placeholder="Day of month"
                  control={securityControl}
                  // @ts-ignore
                  error={securityErrors.root?.is_active?.message}
                />
              </div>
            </div>
          </div>
        </ContainerPayment>
        <ContainerPayment
          control={paymentsControl}
          info="Online payments"
          onSubmit={paymentSubmit}
          handleSubmit={paymentsHandleSubmit}
        >
          <div className="child switch">
            <div className="switch-input">
              <div className="title">Permission</div>
              <div className="child">
                <div className="text">Student platform</div>
                <AntdSwitch
                  name={`root.i_${INTERNAL_ONLINE_PAYMENT_IS_ACTIVE}`}
                  placeholder="Day of month"
                  control={paymentsControl}
                  // @ts-ignore
                  error={paymentsErrors.root?.is_active?.message}
                />
              </div>
            </div>
          </div>
          <div className="child switch">
            <div className="switch-input">
              <div className="title">Permission</div>
              <div className="child">
                <div className="text">Uzum</div>
                <AntdSwitch
                  name={`root.i_${ONLINE_PAYMENT_SERVICE_UZUM_ACTIVE}`}
                  placeholder="Day of month"
                  control={paymentsControl}
                  // @ts-ignore
                  error={paymentsErrors.root?.is_active?.message}
                />
              </div>
            </div>
            <div className="switch-input">
              <div className="title">Permission</div>
              <div className="child">
                <div className="text">Payme</div>
                <AntdSwitch
                  name={`root.i_${ONLINE_PAYMENT_SERVICE_PAYME_ACTIVE}`}
                  placeholder="Day of month"
                  control={paymentsControl}
                  // @ts-ignore
                  error={paymentsErrors.root?.is_active?.message}
                />
              </div>
            </div>
          </div>
          <div className="child switch">
            <div className="switch-input">
              <div className="title">Permission</div>
              <div className="child">
                <div className="text">Click</div>
                <AntdSwitch
                  name={`root.i_${ONLINE_PAYMENT_SERVICE_CLICK_ACTIVE}`}
                  placeholder="Day of month"
                  control={paymentsControl}
                  // @ts-ignore
                  error={paymentsErrors.root?.is_active?.message}
                />
              </div>
            </div>
            <div className="switch-input">
              <div className="title">Permission</div>
              <div className="child">
                <div className="text">Plum</div>
                <AntdSwitch
                  name={`root.i_${ONLINE_PAYMENT_SERVICE_PLUM_ACTIVE}`}
                  placeholder="Day of month"
                  control={paymentsControl}
                  // @ts-ignore
                  error={paymentsErrors.root?.is_active?.message}
                />
              </div>
            </div>
          </div>
        </ContainerPayment>
        {/*<SwitchPayment*/}
        {/*  control={control}*/}
        {/*  name="is_active"*/}
        {/*  info="Payment type"*/}
        {/*  label="Can take MOT"*/}
        {/*  handleSubmit={handleSubmit}*/}
        {/*  onSubmit={(data: any) => handleOpen(data, "payment_control")}*/}
        {/*/>*/}
      </div>
      <ActionModal
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        open={modals.black_list.isOpen}
        onSubmit={onSubmitBlackList}
        blurColor={bgColors.primary}
        label="Reason *"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.10), 0 4px 6px 0 #FFE866 inset;"
        icon={
          <div style={{ margin: "20px" }}>
            <Switch checked={true} />
          </div>
        }
        text={
          <div>
            <p>Are you sure?</p>
            <p>This property will be changed for everyone</p>
          </div>
        }
        control={control}
        buttonLoading={changeBlackListStatus?.isLoading}
        cancelButtonText="No"
        submitButtonText="Yes"
      />
      <ActionModal
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        open={modals.payment.isOpen}
        onSubmit={onSubmit}
        blurColor={bgColors.primary}
        label="Reason *"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.10), 0 4px 6px 0 #FFE866 inset;"
        icon={
          <div style={{ margin: "20px" }}>
            <Switch checked={true} />
          </div>
        }
        text={
          <div>
            <p>Are you sure?</p>
            <p>This property will be changed for everyone</p>
          </div>
        }
        control={control}
        buttonLoading={changeBlackListStatus?.isLoading}
        cancelButtonText="No"
        submitButtonText="Yes"
      />
    </FormWrapper>
  );
};

export default Payment;
