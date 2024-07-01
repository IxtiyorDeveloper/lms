import {
  AmountWrapper,
  Balance,
  ButtonWrapper,
  Divider,
  Flex,
  LeftContainer,
  ModalTitle,
  WalletWrapper,
  Wrapper,
} from "./style";
import {
  AntdModal,
  Button,
  CircleSuccessSvg,
  ContactActions,
  DisconnectedSvg,
  StudentLabels,
  WalletSvg,
} from "components";
import {
  ONLINE_PAYMENT,
  PAYMENT_CARD,
  PAYMENT_CASH,
  PAYMENT_MOT,
} from "constants/payment";
import lodash from "lodash";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Receipt from "./components/receipt";
import Student from "./components/student";
import { IStore, toggleModal } from "store";
import React, { useEffect, useMemo, useRef, useState } from "react";
import InputBalance from "./components/balance";
import Stationary from "./components/stationary";
import { COMPONENTS_VIEWS, PAGE_VISITS } from "constants/permissions";
import { bgColors, textColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useCalculation, useCreatePayment, useGetOneStudent } from "hooks";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import StudentBalancePopover from "components/common/studentBalancePopover";
import { funcCheckPermission, GetReceipt, validationErrorHandler } from "utils";
import { IContacts } from "types/contact";
import { phoneEditor } from "utils/phoneNumberEditor";
import ConfirmPassword from "../confirmPassword";
import { DONT_TAKE_MOT } from "../../../constants";

const PaymentV2Modal = () => {
  const checkRef = useRef();
  const studentRef = useRef<any>();
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeStudent, setActiveStudent] = useState<
    IContacts & { [k: string]: string }
  >();
  const {
    paymentV2: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const queryClient = useQueryClient();
  const connected = useSelector((state: IStore) => state.check.isConnected);
  const [submitButtonAccess, setSubmitButtonAccess] = useState<boolean>(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  const { data: studentData, refetch } = useGetOneStudent({
    expand: "user.userLabels",
    id: activeStudent?.user_id,
    type: "update",
  });

  const mot = studentData?.user?.userLabels?.find?.(
    (e: any) => e.type === DONT_TAKE_MOT,
  );

  const queryKeys = data?.queryKeys;
  const {
    control,
    watch,
    formState: { errors },
    setValue,
    reset,
    getValues,
    handleSubmit,
  } = useForm<any>({
    defaultValues: {
      balance_type: "100",
    },
  });

  const ref = useRef<any>();

  const student = watch("tools.student");
  const contact_id = student?.additional?.id;

  const { data: calculation, isFetching } = useCalculation({
    id: student?.additional?.id,
  });

  const handleClose = () => {
    reset({});
    setSubmitButtonAccess(false);
    setIsPasswordConfirmed(false);
    studentRef.current?.clear();
    dispatch(
      toggleModal({
        key: "paymentV2",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const handleRequestForReceipt = (dataReceipt: any) => {
    dispatch(
      toggleModal({
        key: "incomeCheckPreview",
        data: {
          data: {
            preload: false,
            data: {
              ...dataReceipt,
            },
          },
          open: true,
        },
      }),
    );
    router
      .replace(
        {
          pathname: router.pathname,
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

  const createPayment = useCreatePayment({
    onSuccess: (data_check) => {
      if (Number(getValues("cash")) > 0 || Number(getValues("card")) > 0) {
        GetReceipt({
          income_group_id: data_check?.data?.result?.income?.income_group_id,
        }).then((data_check_1) => {
          handleRequestForReceipt({
            ...data_check?.data?.result?.check,
            ...data_check_1.result,
          });
        });
      } else {
        handleRequestForReceipt(data_check?.data?.result?.check);
      }

      // handleRequestForReceipt(data_check?.data?.result?.receipt);
      toast.success("Success");
      if (queryKeys) {
        for (let i = 0; i < queryKeys?.length; i++) {
          queryClient.invalidateQueries(queryKeys[i]);
        }
      }
    },
    onError: (err) => {
      setSubmitButtonAccess(false);
      validationErrorHandler({ err });
    },
  });

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
      isCardOrCashAvailable && !canMakePaymentWithoutDevice && !connected;

    if (canNotPay) {
      toast.error(
        "You should connect tax device to make payment by CASH or CARD",
      );
      setSubmitButtonAccess(false);
    } else {
      createPayment.mutate({
        body: {
          amounts: {
            [PAYMENT_CASH]: !!cash ? cash : 0,
            [PAYMENT_MOT]: !!mot ? mot : 0,
            [PAYMENT_CARD]: !!card ? card : 0,
            [ONLINE_PAYMENT]: 0,
          },
          balance: !!balance ? balance : 0,
          confirmation_id: data?.confirmation_id,
          given_balance_user_id: data?.given_balance_user_id,
          give_stationary: data?.tools?.stationary,
          stationary_items: {
            "100": data?.["stationary_items-100"],
            "200": data?.["stationary_items-200"],
          },
        },
        contact_id,
      });
    }
  };

  const watchAll = watch();
  const bool = useMemo(() => {
    const balance =
      (watchAll.card || 0) +
      (watchAll.cash || 0) +
      (watchAll.mot || 0) +
      ((watchAll.balance || 0) && !!watchAll.confirmation_id);

    const a100 = watchAll?.["stationary_items-100"] || [];
    const a200 = watchAll?.["stationary_items-200"] || [];
    if (watchAll.balance_type == "200" && !watchAll.given_balance_user_id) {
      return false;
    }
    if ((watchAll.balance || 0) > 0 && !watchAll.confirmation_id) {
      return false;
    }
    if (watchAll?.tools?.stationary) {
      return balance > 0 && a100?.length > 0 && a200.length > 0;
    } else {
      if (balance > 0 && a100?.length > 0 && a200.length > 0) {
        return true;
      }
      return balance > 0;
    }
  }, [watchAll, calculation]);

  const is_red_balance = funcCheckPermission([
    COMPONENTS_VIEWS.can_use_red_balance,
  ]);

  useEffect(() => {
    if (calculation) {
      setValue("tools.stationary", calculation?.giveStationary);
    }
  }, [calculation]);

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      width={660}
      destroyOnClose
    >
      <Wrapper onSubmit={handleSubmit(() => {})}>
        <ModalTitle>
          Payment box
          <div className={`tax ${connected ? "" : "disconnected"}`}>
            {connected ? (
              <div>
                <CircleSuccessSvg />
                Tax terminal connected
              </div>
            ) : (
              <div>
                <DisconnectedSvg />
                Connect the terminal to print the QR code
              </div>
            )}
          </div>
        </ModalTitle>
        <Student
          ref={studentRef}
          control={control}
          watch={watch}
          errors={errors}
          setValue={setValue}
          activeStudent={activeStudent}
          setActiveStudent={setActiveStudent}
          mot={mot}
        />
        <Divider />
        <InputBalance
          control={control}
          watch={watch}
          calculation={calculation}
          isLoading={isFetching}
          setValue={setValue}
          getValues={getValues}
          isPasswordConfirmed={isPasswordConfirmed}
          openConfirmModal={() => ref?.current?.open()}
          errors={errors}
          mot={mot}
        />

        <Stationary
          control={control}
          watch={watch}
          getValues={getValues}
          setValue={setValue}
          handleClose={handleClose}
          calculation={calculation}
        />
        <ButtonWrapper>
          {/*<StudentBalancePopover data={selected.data?.dividedBalance}>*/}
          <LeftContainer>
            {isPasswordConfirmed ? (
              <StudentBalancePopover
                data={{
                  green: [],
                  red: [],
                  yellow: [],
                  ...(calculation?.student?.dividedBalance || {}),
                }}
              >
                <WalletWrapper>
                  <Balance>
                    <WalletSvg />
                    Balance
                  </Balance>
                  <AmountWrapper className="grotesk">
                    {toCurrencyFormat(
                      lodash.sumBy(
                        calculation?.student?.dividedBalance?.green,
                        "actual_balance",
                      ) +
                        lodash.sumBy(
                          calculation?.student?.dividedBalance?.yellow,
                          "actual_balance",
                        ) +
                        (is_red_balance
                          ? lodash.sumBy(
                              calculation?.student?.dividedBalance?.red,
                              "actual_balance",
                            )
                          : 0),
                    )}
                  </AmountWrapper>
                </WalletWrapper>
              </StudentBalancePopover>
            ) : (
              <WalletWrapper style={{ filter: "blur(10px)" }}>
                <Balance>
                  <WalletSvg />
                  Balance
                </Balance>
                <AmountWrapper
                  className="grotesk"
                  onClick={() => ref?.current?.open()}
                >
                  XXXXXX UZS
                </AmountWrapper>
              </WalletWrapper>
            )}
            <ContactActions
              className="sms"
              groupContactId={activeStudent?.id}
              student={
                {
                  user: {
                    userPhones: phoneEditor(activeStudent?.phones),
                  },
                } as any
              }
              size="medium"
              activeActions={{
                book: false,
                notebook: false,
                paymentRequest: true,
              }}
              stationaryHistory={calculation?.stationaryHistory as any}
            />
            <StudentLabels
              size="medium"
              activeLabels={{
                dont_take_mot: true,
              }}
              data={{
                ...activeStudent,
                user: {
                  ...(studentData?.user || {}),
                  id: activeStudent?.user_id,
                  userLabels: studentData?.user?.userLabels,
                },
              }}
              queryKeys={queryKeys}
              onSuccess={() => {
                refetch();
              }}
            />
          </LeftContainer>
          <Flex>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              // type="submit"
              disabled={!bool}
              buttonLoading={createPayment.isLoading || submitButtonAccess}
            >
              Pay
            </Button>
          </Flex>
        </ButtonWrapper>
        <Receipt checkRef={checkRef} watch={watch} calculation={calculation} />
      </Wrapper>

      <ConfirmPassword
        ref={ref}
        setBalance={() => {
          setIsPasswordConfirmed(true);
        }}
        contactId={contact_id}
        onCancel={() => setValue("tools.switch", false)}
      />
    </AntdModal>
  );
};

export default PaymentV2Modal;
