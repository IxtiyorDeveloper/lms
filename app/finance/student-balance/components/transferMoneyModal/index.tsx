import * as React from "react";
import {
  AntdModal,
  Button,
  Call,
  CircleImage,
  InputNumber,
  Mail,
  MySelect,
  PhoneCell,
  WalletSvg,
} from "components";
import {
  ModalTitle,
  Wrapper,
  ButtonWrapper,
  UserInfo,
  PersonalInfo,
  PhotoWrapper,
  AmountWrapper,
  Balance,
  WalletWrapper,
  Flex,
} from "./style";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { usePageDataMemo, useReturnMoney } from "hooks";
import { Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FC, useEffect, useMemo, useState } from "react";
import { IUserPhone } from "types/userPhone";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { expand } from "./expand";
import { queryKeys } from "constants/queryKeys";
import { funcCheckPermission, validationErrorHandler } from "utils";
import StudentBalanceSmsCheck from "./components/smsCheck";
import { TList } from "types";
import { EssentialSvg } from "@jasurbekyuldashov/lms-web-icons";
import _ from "lodash";
import StudentBalancePopover from "../../../../../components/common/studentBalancePopover";
import { COMPONENTS_VIEWS } from "../../../../../constants/permissions";
import lodash from "lodash";

enum customer_type {
  student = 0,
  guest = 1,
}

interface IProps {
  data?: any;
  open: boolean;
  setSelected: (obj: any) => void;
  selected: { isOpen: boolean; data: TList };
}

const YupReturnMoney = yup.object().shape({
  general: yup.object().shape({
    amount: yup.number().nullable(),
    payment_type: yup.string().nullable(),
    branch_id: yup.string().required("Branch is a required field"),
  }),
});

export const ReturnModal: FC<IProps> = ({ open, setSelected, selected }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
    setError,
    setValue,
    getValues,
    clearErrors,
  } = useForm<any>({
    resolver: yupResolver(YupReturnMoney),
  });

  const [show, setShow] = useState(false);
  const selects = usePageDataMemo();

  const groupData = useMemo(() => {
    return {
      full_name: `${selected.data?.user?.userProfile?.firstname} ${selected.data?.user?.userProfile?.lastname}`,
      group: selected.data?.currentGroupContact?.group?.name,
      phone: selected.data?.user.userPhones?.find((e: IUserPhone) => {
        return e.is_confirmed === 1;
      })?.phone_number,
      image: selected.data?.user?.userProfile?.avatar,
    };
  }, [selected]);

  const returnMoney = useReturnMoney({
    onSuccess: (data: any) => {
      queryClient
        .invalidateQueries([queryKeys.student_balance_dashboard])
        .then();
      queryClient.invalidateQueries([queryKeys.student_balance]).then();
      toast.success("Success");
      dispatch(
        toggleModal({
          key: "returnMoneyCheckModal",
          data: {
            data: data,
            open: true,
          },
        })
      );
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err, setError, formHookMainField: true });
    },
  });

  const handleClose = () => {
    setSelected({
      isOpen: false,
      data: null,
    });
    reset({});
  };

  const onSubmit = (data: any) => {
    const { general } = data;
    returnMoney.mutate({
      query_params: {
        expand,
        user_id: selected.data?.user?.id,
      },
      body: {
        amount: general?.amount,
        reason: general?.reason,
        branch_id: general?.branch_id,
        confirmation_id: general?.confirmation_id,
      },
    });
  };

  useEffect(() => {
    setValue("general.phone_number", `+${groupData.phone}`);
  }, [groupData.phone]);

  useEffect(() => {
    if (open) {
      setShow(true);
    } else {
      reset();
      setTimeout(() => {
        setShow(false);
      }, 300);
    }
  }, [open]);

  const bool = funcCheckPermission([COMPONENTS_VIEWS.can_use_red_balance]);

  if (!show) {
    return null;
  }

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      forceRender
    >
      <Spin spinning={false}>
        <ModalTitle>Return Money</ModalTitle>
        {watch("general.customer_type") !== customer_type.guest && (
          <UserInfo>
            <PhotoWrapper>
              <CircleImage src={groupData?.image} width={80} height={80} />
            </PhotoWrapper>
            <PersonalInfo>
              <p>{groupData?.full_name}</p>
              <PhoneCell value={selected.data?.user.userPhones} />
              <div className="container">
                <div className="balance">
                  {toCurrencyFormat(selected?.data?.user?.balance) || "0 UZS"}
                </div>
                <div className="flex">
                  <Call size="small" />
                  <Mail size="small" />
                </div>
              </div>
            </PersonalInfo>
          </UserInfo>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper style={{ flexDirection: "column" }} padding={20}>
            <div className="card green">
              <div className="title">Green balance</div>
              <div className="title t-right">
                <div>
                  <EssentialSvg color={bgColors.spring} />
                </div>
                You can return only this money
              </div>
              <div className="price t-white">
                {toCurrencyFormat(
                  _.sumBy(
                    selected.data?.dividedBalance?.green,
                    "actual_balance"
                  )
                )}
              </div>
            </div>
            <div className="flex">
              <div className="card">
                <div className="title" style={{ color: textColors.palomino }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                  >
                    <circle
                      cx="6"
                      cy="6.5"
                      r="3.5"
                      fill="#FFDF3F"
                      stroke="#FFCF00"
                    />
                  </svg>
                  Yellow balance
                </div>
                <div className="price">
                  {toCurrencyFormat(
                    _.sumBy(
                      selected.data?.dividedBalance?.yellow,
                      "actual_balance"
                    )
                  )}
                </div>
              </div>
              {bool && (
                <div className="card">
                  <div className="title" style={{ color: textColors.rose }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                    >
                      <circle
                        cx="6"
                        cy="6.5"
                        r="3.5"
                        fill="#F05B71"
                        stroke="#E92857"
                      />
                    </svg>
                    Red balance
                  </div>
                  <div className="price">
                    {toCurrencyFormat(
                      _.sumBy(
                        selected.data?.dividedBalance?.red,
                        "actual_balance"
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </Wrapper>
          <Wrapper
            style={{
              paddingBottom: "20px",
              paddingTop: "0",
              marginTop: "20px",
            }}
            padding={20}
          >
            <InputNumber
              label="Amount"
              name="general.amount"
              control={control}
              suffix={<div className="suffix">UZS</div>}
              error={(errors as any)?.general?.amount?.message}
              defaultValue={0}
            />
          </Wrapper>
          <Wrapper
            style={{
              paddingBottom: "20px",
              paddingTop: "0",
            }}
            padding={20}
          >
            <MySelect
              control={control}
              name="general.branch_id"
              label="Branch"
              options={selects.ownAllBranches}
              error={(errors as any)?.general?.branch_id?.message}
            />
          </Wrapper>
          <StudentBalanceSmsCheck
            errors={errors}
            control={control}
            setValue={setValue}
            getValues={getValues}
            setError={setError}
            clearErrors={clearErrors}
            userId={selected.data?.user?.id}
          />
          <ButtonWrapper>
            <StudentBalancePopover data={selected.data?.dividedBalance}>
              <WalletWrapper>
                <Balance>
                  <WalletSvg />
                  Balance
                </Balance>
                <AmountWrapper className="grotesk">
                  {toCurrencyFormat(
                    bool
                      ? selected?.data?.user?.balance
                      : lodash.sumBy(
                          selected?.data?.dividedBalance?.green,
                          "actual_balance"
                        ) +
                          lodash.sumBy(
                            selected?.data?.dividedBalance?.yellow,
                            "actual_balance"
                          )
                  )}
                </AmountWrapper>
              </WalletWrapper>
            </StudentBalancePopover>

            <Flex>
              <Button
                onClick={handleClose}
                textColor={textColors.yourShadow}
                bgColor={bgColors.wildSand}
              >
                Cancel
              </Button>
              <Button type="submit" buttonLoading={returnMoney.isLoading}>
                Pay
              </Button>
            </Flex>
          </ButtonWrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};
