import React, { FC, Fragment, useState } from "react";
import { Wrapper } from "../../style";
import {
  AttentionSvg,
  Button,
  ErrorLabel,
  Input,
  PhoneNumberInput,
  RefreshSvg,
  SmsCheck,
} from "components";
import Timer from "app/student/create-student/components/phoneNumber/components/timer";
import { bgColors, textColors } from "styles/theme";
import {
  useStudentBalanceWithDrawConfirmation,
  useStudentBalanceWithDrawConfirmationCheck,
} from "hooks";
import { validationErrorHandler } from "utils";
import { MainPhone } from "constants/phoneTypes";
import { IStudentBalanceWithdrawCheck } from "types/finance/studentBalance";

interface IProps {
  control: any;
  errors: any;
  setValue: any;
  setError: any;
  clearErrors: any;
  getValues: any;
  userId: string | number;
}
const StudentBalanceSmsCheck: FC<IProps> = ({
  control,
  errors,
  setError,
  setValue,
  userId,
  getValues,
  clearErrors,
}) => {
  const [isSent, setIsSent] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const sendCode = useStudentBalanceWithDrawConfirmation({
    onSuccess: () => {
      setIsSent(true);
      setValue(`general.confirmation_id`, null);
      clearErrors();
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        setError,
        showToast: true,
        formHookMainField: true,
      });
    },
  });
  const smsCheck = useStudentBalanceWithDrawConfirmationCheck({
    onSuccess: (data: IStudentBalanceWithdrawCheck) => {
      if (data.is_confirmed) {
        setValue(`general.confirmation_id`, data.confirmation_id);
      }
      clearErrors();
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

  const onFinishedTime = () => {
    setDisabled(false);
  };

  const sendSms = () => {
    setIsSent(false);
    sendCode.mutate({
      query_params: {
        user_id: userId,
      },
      body: {
        amount: getValues("general.amount"),
        phone_number: getValues("general.phone_number"),
        phone_type: MainPhone,
      },
    });
  };
  const onCompleteSms = (value: string) => {
    smsCheck.mutate({
      query_params: {
        user_id: userId,
      },
      body: {
        phone_number: getValues("general.phone_number"),
        code: value,
      },
    });
  };
  const confirmationId = getValues(`general.confirmation_id`);
  return (
    <Fragment>
      <Wrapper style={{ paddingBottom: "20px", paddingTop: "0" }} padding={20}>
        <Input
          label="Reason"
          type="textarea"
          name="general.reason"
          control={control}
          suffix={<div className="suffix">UZS</div>}
          error={(errors as any)?.general?.reason?.message}
          rows={4}
        />
      </Wrapper>
      <Wrapper style={{ paddingBottom: "20px", paddingTop: "0" }} padding={20}>
        <div className="w-100">
          <PhoneNumberInput
            label="Request code"
            name="general.phone_number"
            control={control}
            error={(errors as any)?.general?.reason?.message}
            disabled
          />
        </div>
        <Button
          onClick={sendSms}
          buttonLoading={sendCode.isLoading}
          style={{ marginTop: "auto", height: "37px" }}
          disabled={isSent}
        >
          Confirm
        </Button>
      </Wrapper>
      {isSent && (
        <Fragment>
          <Wrapper
            style={{ paddingBottom: "20px", paddingTop: "0" }}
            padding={20}
          >
            <div className="danger w-100">
              <div>
                <AttentionSvg />
              </div>
              <div className="info">
                Please Attention!
                <br />
                You should check photo of student and call confirmed phone
                number for making sure that you are returning money to correct
                person.
              </div>
            </div>
          </Wrapper>
          <Wrapper
            style={{ paddingBottom: "20px", paddingTop: "0" }}
            padding={20}
            isChecked={!!confirmationId}
          >
            <SmsCheck onCompleted={onCompleteSms} />
            <Timer
              total={120}
              defaultValue={Date.now()}
              interval={1200}
              onComplete={onFinishedTime}
              onStarted={function (): void {
                setDisabled(true);
              }}
              strokeColor={bgColors.midori}
              trailColor={bgColors.purpleCrystal}
              strokeWidth={12}
              width={48}
              style={{ marginTop: "auto" }}
            />
            <Button
              icon={
                <RefreshSvg
                  style={{ marginRight: "4px" }}
                  color={bgColors.brilliance}
                />
              }
              style={{
                height: "37px",
                backgroundColor: bgColors.yukon,
                color: textColors.brilliance,
                width: "100%",
                marginLeft: "20px",
                ...(!disabled
                  ? {
                      borderRadius: "6px",
                      background: bgColors.deep,
                    }
                  : {
                      background: bgColors.purpleCrystal,
                    }),
              }}
              disabled={disabled}
              bgColor={bgColors.purpleCrystal}
              onClick={sendSms}
            >
              Resend code
            </Button>
          </Wrapper>
          <Wrapper style={{ padding: "0 20px", marginTop: "-10px" }}>
            <ErrorLabel error={(errors as any)?.general?.code?.message} />
          </Wrapper>
        </Fragment>
      )}
    </Fragment>
  );
};

export default StudentBalanceSmsCheck;
