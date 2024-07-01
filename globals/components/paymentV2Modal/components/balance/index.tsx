import React, { FC, useEffect, useState } from "react";
import {
  PaymentInfo,
  Wrapper,
  FormWrapper,
  StyledInputLabel,
  FlexWrapper,
} from "./style";
import AmountByGroupTable from "./components/amountByGroupTable";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { bgColors, textColors } from "styles/theme";
import {
  AntdSwitch,
  Button,
  CardSvg,
  CoinsSvg,
  DollarsSvg,
  InputNumber,
  SmsCheck,
  WalletColoredSvg,
  ComeSvg,
  MySelect,
} from "components";
import { ICalculation } from "types/ICalculation";
import { Spin } from "antd";
import Timer from "app/student/create-student/components/phoneNumber/components/timer";
import {
  useAdminFinanceStudentBalanceBalanceSpentConfirmation,
  useAdminFinanceStudentBalanceConfirmBalanceSpent,
} from "hooks";
import { phoneEditor } from "utils/phoneNumberEditor";
import PayFromAnotherBalance from "./components/fromAnotherBalance";
import formatPhoneNumber from "utils/phoneNumberFormatter";

interface IProps {
  control: any;
  watch: any;
  calculation?: ICalculation;
  isLoading: boolean;
  setValue: any;
  getValues: any;
  isPasswordConfirmed: boolean;
  openConfirmModal: any;
  errors: any;
  mot: any;
}

enum EStatus {
  notSend,
  timeOut,
  pending,
  completed,
}

const InputBalance: FC<IProps> = ({
  control,
  watch,
  calculation,
  isLoading,
  getValues,
  setValue,
  isPasswordConfirmed,
  openConfirmModal,
  errors,
  mot,
}) => {
  const balance = watch("balance");
  const isVisible = watch("tools.switch");
  const balance_type = watch("balance_type");
  const otherStudentBalance = watch("tools.otherStudentBalance");
  const otherStudentPhone = watch("tools.otherStudentPhone");
  const [disabled, setDisabled] = useState<EStatus>(EStatus.notSend);

  useEffect(() => {
    setDisabled(EStatus.notSend);
    setValue("confirmation_id", null);
  }, [balance]);

  const send = useAdminFinanceStudentBalanceBalanceSpentConfirmation({
    onSuccess: () => {
      setDisabled(EStatus.pending);
    },
    onError: () => {
      setDisabled(EStatus.notSend);
    },
  });

  const check = useAdminFinanceStudentBalanceConfirmBalanceSpent({
    onSuccess: (data) => {
      setValue("confirmation_id", data.confirmation_id);
      setDisabled(EStatus.completed);
    },
    onError: () => {},
  });

  const phones = phoneEditor(watch("tools.student.additional.phones"));
  const phoneNumber =
    phones?.find((p: any) => p.is_confirmed === 1)?.phone_number ||
    phones?.[0]?.phone_number;

  const sendSms = () => {
    const data = getValues();

    if (!data?.given_balance_user_id) {
      send.mutate({
        query_params: {
          user_id: data?.user_id,
        },
        body: {
          amount: data?.balance,
          phone_number: phoneNumber,
          phone_type: null,
        },
      });
    } else {
      send.mutate({
        query_params: {
          user_id: data?.given_balance_user_id,
        },
        body: {
          amount: data?.balance,
          phone_number: data?.tools?.otherStudentPhone,
          phone_type: null,
        },
      });
    }
  };

  useEffect(() => {
    if (isVisible && !isPasswordConfirmed) {
      openConfirmModal();
    }
  }, [isVisible]);

  const onCompleteSms = (value: string) => {
    const data = getValues();

    if (!data?.given_balance_user_id) {
      check.mutate({
        query_params: {
          user_id: data?.user_id,
        },
        body: {
          phone_number: phoneNumber,
          code: value,
        },
      });
    } else {
      check.mutate({
        query_params: {
          user_id: data?.given_balance_user_id,
        },
        body: {
          phone_number: data?.tools?.otherStudentPhone,
          code: value,
        },
      });
    }
  };

  const bool =
    !calculation?.allowedPaymentTypes?.balance &&
    (otherStudentBalance ? parseInt(otherStudentBalance) : 0) <= 0;

  useEffect(() => {
    if (bool) {
      setValue("tools.switch", false);
      setValue("balance", undefined);
      setValue("confirmation_id", undefined);
      setDisabled(EStatus.notSend);
    }
  }, [bool]);

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <AmountByGroupTable watch={watch} calculation={calculation} />
        <div className="info">
          <PaymentInfo
            borderColor={bgColors.fond}
            backgroud="rgba(252, 217, 211, 0.60)"
            textColor={textColors.pop}
          >
            <div>Total debt</div>
            <div className="amount">
              {!!toCurrencyFormat(calculation?.student?.debt, 0) &&
              !!calculation?.student?.debt
                ? `-${toCurrencyFormat(calculation?.student?.debt, 0)}`
                : toCurrencyFormat(0)}
            </div>
          </PaymentInfo>
          <PaymentInfo>
            <div>Paying</div>
            <div className="amount">
              {toCurrencyFormat(
                (+watch("mot") || 0) +
                  (+watch("card") || 0) +
                  (+watch("cash") || 0),
              )}
            </div>
          </PaymentInfo>
        </div>
        <FormWrapper>
          <InputNumber
            name="card"
            control={control}
            suffix={<div className="suffix">UZS</div>}
            className="currency"
            disabled={!calculation?.allowedPaymentTypes?.card}
            label={
              <StyledInputLabel>
                <CardSvg height={20} width={20} /> Card
              </StyledInputLabel>
            }
          />
          <InputNumber
            name="cash"
            control={control}
            suffix={<div className="suffix">UZS</div>}
            className="currency"
            disabled={!calculation?.allowedPaymentTypes?.cash}
            label={
              <StyledInputLabel>
                <DollarsSvg height={24} width={24} /> Cash
              </StyledInputLabel>
            }
          />
          <InputNumber
            name="mot"
            control={control}
            suffix={<div className="suffix">UZS</div>}
            className="currency"
            disabled={!!mot || !calculation?.allowedPaymentTypes?.mot}
            label={
              <StyledInputLabel>
                <CoinsSvg height={20} width={20} /> MOT
              </StyledInputLabel>
            }
          />
        </FormWrapper>
        <FlexWrapper>
          <div className="input-container item">
            <StyledInputLabel>
              <div className="w-100">
                <WalletColoredSvg height={20} width={20} /> Balance
                <AntdSwitch
                  size="small"
                  name="tools.switch"
                  control={control}
                  disabled={bool}
                />
              </div>
            </StyledInputLabel>
          </div>
          <div className="w-100">
            <MySelect
              name="balance_type"
              control={control}
              options={[
                { label: "Pay from own balance", value: "100" },
                { label: "Pay from another balance", value: "200" },
              ]}
              style={{ width: "100%" }}
              defaultValue="100"
            />
          </div>
        </FlexWrapper>
        {balance_type == "200" && (
          <PayFromAnotherBalance
            setValue={setValue}
            control={control}
            errors={errors}
          />
        )}
        <FlexWrapper>
          {isVisible && (
            <div className="flex">
              {isVisible && (
                <div className="item">
                  <InputNumber
                    name="balance"
                    control={control}
                    suffix={<div className="suffix">UZS</div>}
                    className="currency"
                    label="Enter amount"
                  />
                </div>
              )}
              {disabled === EStatus.notSend ? (
                <Button
                  style={{ height: "35px" }}
                  disabled={disabled !== EStatus.notSend}
                  onClick={sendSms}
                  buttonLoading={send.isLoading}
                >
                  Confirm
                </Button>
              ) : disabled === EStatus.completed ? (
                <div className="completed">
                  <ComeSvg />
                  Confirmed
                </div>
              ) : null}
              {disabled == EStatus.timeOut ? (
                <Button
                  style={{ height: "35px" }}
                  onClick={sendSms}
                  buttonLoading={send.isLoading}
                >
                  Retry
                </Button>
              ) : disabled === EStatus.pending ? (
                <>
                  <SmsCheck
                    onCompleted={(value: string) => onCompleteSms(value)}
                    label={`Code sent to ${formatPhoneNumber(otherStudentPhone || phoneNumber)}`}
                  />
                  <Timer
                    total={120}
                    defaultValue={Date.now()}
                    interval={1200}
                    onComplete={() => {
                      setDisabled(EStatus.timeOut);
                    }}
                    onStarted={() => {
                      setDisabled(EStatus.pending);
                    }}
                    strokeColor={bgColors.midori}
                    trailColor={bgColors.purpleCrystal}
                    strokeWidth={6}
                    width={36}
                    style={{ marginTop: "auto" }}
                  />
                </>
              ) : null}
            </div>
          )}
          <div />
        </FlexWrapper>
      </Wrapper>
    </Spin>
  );
};

export default InputBalance;
