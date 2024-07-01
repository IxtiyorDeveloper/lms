import {
  AntdModal,
  Button,
  CardSvg,
  CircleImage,
  CoinsSvg,
  DollarsSvg,
  EyeViewSvg,
  GroupSvg,
  InputNumber,
  PaymentDSvg,
  WalletColoredSvg,
  WalletSvg,
  WarningComponent,
} from "components";
import {
  ModalTitle,
  Wrapper,
  ButtonWrapper,
  PaymentIconWrapper,
  PaymentTitle,
  GroupWrapper,
  Group,
  StatusWrapper,
  DebtWrapper,
  PayingWrapper,
  TextD,
  NumberD,
  NumberP,
  LabelWrapper,
  FormWrapper,
  WalletWrapper,
  Balance,
  MyTable,
  NoteWrapper,
  BalanceBlur,
  BlurAmountWrapper,
} from "./style";
import { bgColors, textColors } from "styles/theme";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useForm } from "react-hook-form";
import { useCalculation, useCreatePayment } from "hooks";
import { Spin, Table } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  ONLINE_PAYMENT,
  PAYMENT_CARD,
  PAYMENT_CASH,
  PAYMENT_MOT,
} from "constants/payment";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { IContacts } from "types/contact";
import { ColumnsType } from "antd/es/table/interface";
import ConfirmPassword from "../confirmPassword";
import { funcCheckPermission, GetReceipt, validationErrorHandler } from "utils";
import { UNKNOWN_AMOUNT } from "constants/finance";
import {
  IconCheckWrapper,
  InfoDeviceIntegration,
  InfoDeviceIntegrationFailed,
} from "../paymentTransaction/style";
import {
  CheckDeviceInactiveSvg,
  CheckDeviceSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { debtorGroupInterface } from "./type";
import Columns from "./components/columns";
import { generateData } from "./components/generateData";
import { COMPONENTS_VIEWS, PAGE_VISITS } from "../../../constants/permissions";
import lodash from "lodash";

interface Interface {
  card: number;
  mot: number;
  cash: number;
  balance: number;
}

const PaymentModal = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [submitButtonAccess, setSubmitButtonAccess] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: {},
    watch,
    control,
    reset,
    getValues,
  } = useForm<Interface>();
  const {
    payment: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const { data: calculation, isInitialLoading: isLoading } = useCalculation({
    id: data?.user?.id,
  });

  const ref = useRef<{ open: () => void }>();
  const [isBalanceVisible, setIsBalanceVisible] = useState<number | null>(null);

  const getDeviceCheck = (dataCheck1: any) => {
    dispatch(
      toggleModal({
        key: "incomeCheckPreview",
        data: {
          data: { ...dataCheck1 },
          open: true,
        },
      }),
    );
    router
      .replace(
        {
          query: {
            ...router.query,
            paymentCheckAfterCreate: "true",
          },
        },
        undefined,
        { scroll: false },
      )
      .then(() => {
        setSubmitButtonAccess(false);
      });
    handleClose();
  };

  const userId = data?.user?.id;
  const dispatch = useDispatch();
  const createMutation = useCreatePayment({
    onSuccess: (data_check: any) => {
      if (Number(getValues("cash")) > 0 || Number(getValues("card")) > 0) {
        GetReceipt({
          income_group_id: data_check?.data?.result?.income?.income_group_id,
        }).then((res) => {
          getDeviceCheck({
            preload: false,
            data: {
              ...data_check?.data?.result?.check,
              ...res?.result,
            },
            payment_with_types: {
              cash: getValues("cash"),
              card: getValues("card"),
              mot: getValues("mot"),
              balance: getValues("balance"),
              debt:
                !!toCurrencyFormat(calculation?.student?.debt, 0) &&
                !!calculation?.student
                  ? `-${toCurrencyFormat(calculation?.student?.debt, 0)}`
                  : 0,
            },
          });
        });
      } else {
        getDeviceCheck({
          preload: false,
          data: {
            ...data_check?.data?.result?.check,
          },
          payment_with_types: {
            cash: getValues("cash"),
            card: getValues("card"),
            mot: getValues("mot"),
            balance: getValues("balance"),
            debt:
              !!toCurrencyFormat(calculation?.student?.debt, 0) &&
              !!calculation?.student
                ? `-${toCurrencyFormat(calculation?.student?.debt, 0)}`
                : 0,
          },
        });
      }
      queryClient.invalidateQueries(data?.queryKeys);
      toast.success("Success");
    },
    onError: (err) => {
      setSubmitButtonAccess(false);
      validationErrorHandler({ err });
    },
  });

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "payment",
        data: {
          data: {},
          open: false,
        },
      }),
    );
    reset();
    setIsBalanceVisible(null);
  };

  const isTaxModalConnected = useSelector(
    (state: IStore) => state.check.isConnected,
  );

  const onSubmit = (data: any) => {
    setSubmitButtonAccess(true);
    const cash = +data?.cash;
    const mot = +data?.mot;
    const card = +data?.card;
    const balance = +data?.balance;

    const canMakePaymentWithoutDevice = funcCheckPermission([
      PAGE_VISITS.can_take_payment_without_tax_device_connection,
    ]);

    const isCardOrCashAvailable = Number(cash) > 0 || Number(card) > 0;
    const canNotPay =
      isCardOrCashAvailable &&
      !canMakePaymentWithoutDevice &&
      !isTaxModalConnected;

    if (canNotPay) {
      toast.error(
        "You should connect tax device to make payment by CASH or CARD",
      );
    } else {
      createMutation.mutate({
        body: {
          amounts: {
            [PAYMENT_CASH]: !!cash ? cash : 0,
            [PAYMENT_MOT]: !!mot ? mot : 0,
            [PAYMENT_CARD]: !!card ? card : 0,
            [ONLINE_PAYMENT]: 0,
          },
          balance: !!balance ? balance : 0,
        },
        contact_id: userId,
      });
    }
  };

  const group = data?.group;
  const user: IContacts = data?.user;

  //generate Debtor group list data for table
  const debtorGroupList = useMemo(() => {
    return generateData({ calculation, group, user });
  }, [user, calculation?.student?.debt]);

  const setBalance = (data: { debt: number; balance: number }) => {
    setIsBalanceVisible(data.balance);
  };

  const isOpen =
    typeof isBalanceVisible != "number" && !calculation?.student?.balance;
  const bool = funcCheckPermission([COMPONENTS_VIEWS.can_use_red_balance]);

  return (
    <AntdModal
      zIndex={1001}
      open={open}
      onCancel={handleClose}
      centered
      width={520}
    >
      <Spin spinning={isLoading}>
        <ModalTitle>Payment box</ModalTitle>
        <PaymentIconWrapper>
          <div>
            <PaymentDSvg />
            <PaymentTitle>Check carefully and pay!</PaymentTitle>
          </div>
        </PaymentIconWrapper>
        {isTaxModalConnected ? (
          <InfoDeviceIntegration style={{ margin: "10px 0" }}>
            <IconCheckWrapper>
              <CheckDeviceSvg width={22} height={22} />{" "}
            </IconCheckWrapper>
            <p>The QR code will be printed by the tax terminal</p>
          </InfoDeviceIntegration>
        ) : (
          <InfoDeviceIntegrationFailed style={{ margin: "10px 0" }}>
            <IconCheckWrapper className="bg">
              <CheckDeviceInactiveSvg width={22} height={22} />{" "}
            </IconCheckWrapper>
            <p>
              The QR code will not be printed by the tax terminal, you need to
              connect to the terminal.
            </p>
          </InfoDeviceIntegrationFailed>
        )}
        {calculation?.warning && (
          <GroupWrapper>
            <WarningComponent text={calculation?.warning} />
          </GroupWrapper>
        )}
        <GroupWrapper>
          <Group>
            <div>
              <GroupSvg height={34} width={34} color={bgColors.yourShadow} />
              <p>{group?.name}</p>
            </div>
          </Group>
          <Group>
            <div>
              <CircleImage
                src={user?.user?.userProfile?.avatar}
                height={40}
                width={40}
              />
              <p>
                {user?.user?.userProfile?.firstname}{" "}
                {user?.user?.userProfile?.lastname}
              </p>
            </div>
          </Group>
        </GroupWrapper>
        <NoteWrapper>
          <p className="label">Student’s note</p>
          <div className="note">
            {!!user?.user?.student?.note ? user?.user?.student?.note : "-"}
          </div>
        </NoteWrapper>
        <StatusWrapper>
          <MyTable>
            <Table
              columns={
                Columns() as ColumnsType<debtorGroupInterface> | undefined
              }
              dataSource={debtorGroupList}
              pagination={false}
              className="table"
              rowClassName="row"
              bordered={false}
            />
            <DebtWrapper className="insideTable">
              <TextD>DEBT</TextD>
              <NumberD className="grotesk">
                {!!toCurrencyFormat(calculation?.student?.debt, 0) &&
                !!calculation?.student
                  ? `-${toCurrencyFormat(calculation?.student?.debt, 0)}`
                  : 0}
              </NumberD>
            </DebtWrapper>
          </MyTable>
          <PayingWrapper>
            <p>Paying</p>
            <NumberP className="grotesk">
              {toCurrencyFormat(
                (+watch("mot") || 0) +
                  (+watch("card") || 0) +
                  (+watch("cash") || 0) +
                  (+watch("balance") || 0),
              )}
            </NumberP>
          </PayingWrapper>
        </StatusWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <Wrapper>
              <LabelWrapper>
                <CardSvg /> Card
              </LabelWrapper>
              <InputNumber
                disabled={!calculation?.allowedPaymentTypes?.card}
                name="card"
                control={control}
                suffix={<div className="suffix">UZS</div>}
                className="currency"
              />
            </Wrapper>
            <Wrapper>
              <LabelWrapper>
                <DollarsSvg height={24} width={30} /> Cash
              </LabelWrapper>
              <InputNumber
                disabled={!calculation?.allowedPaymentTypes?.cash}
                name="cash"
                control={control}
                suffix={<div className="suffix">UZS</div>}
                className="currency"
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper last>
            <Wrapper>
              <LabelWrapper>
                <CoinsSvg /> MOT
              </LabelWrapper>
              <InputNumber
                disabled={!calculation?.allowedPaymentTypes?.mot}
                name="mot"
                control={control}
                suffix={<div className="suffix">UZS</div>}
                className="currency"
              />
            </Wrapper>
            <Wrapper>
              <LabelWrapper>
                <WalletColoredSvg /> Balance
              </LabelWrapper>
              <InputNumber
                disabled={!calculation?.allowedPaymentTypes?.balance}
                name="balance"
                control={control}
                suffix={<div className="suffix">UZS</div>}
                className="currency"
              />
            </Wrapper>
          </FormWrapper>
          <ButtonWrapper>
            <BalanceBlur>
              <WalletWrapper>
                <Balance>
                  <WalletSvg />
                  Balance
                </Balance>
                <BlurAmountWrapper className="grotesk" blur={isOpen}>
                  {isOpen
                    ? UNKNOWN_AMOUNT
                    : toCurrencyFormat(
                        isBalanceVisible ||
                          (bool
                            ? calculation?.student?.balance
                            : lodash.sumBy(
                                calculation?.student?.dividedBalance?.green,
                                "actual_balance",
                              ) +
                              lodash.sumBy(
                                calculation?.student?.dividedBalance?.yellow,
                                "actual_balance",
                              )),
                        0,
                      )}
                </BlurAmountWrapper>
              </WalletWrapper>
              {isOpen && (
                <div className="eye" onClick={() => ref.current?.open()}>
                  <EyeViewSvg />
                </div>
              )}
            </BalanceBlur>

            <ButtonWrapper>
              <Button
                onClick={handleClose}
                textColor={textColors.yourShadow}
                bgColor={bgColors.wildSand}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                buttonLoading={createMutation.isLoading || submitButtonAccess}
              >
                Pay
              </Button>
            </ButtonWrapper>
          </ButtonWrapper>
        </form>
        <ConfirmPassword setBalance={setBalance} contactId={userId} ref={ref} />
      </Spin>
    </AntdModal>
  );
};

export default PaymentModal;
