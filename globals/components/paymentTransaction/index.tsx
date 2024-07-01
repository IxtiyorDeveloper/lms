import * as React from "react";
import {
  AntdModal,
  Button,
  CardSvg,
  CircleImage,
  CoinsSvg,
  ContactActions,
  DebounceSelect,
  DollarsSvg,
  ErrorLabel,
  InputNumber,
  WalletColoredSvg,
  WalletSvg,
} from "components";
import {
  ModalTitle,
  Wrapper,
  ButtonWrapper,
  UserInfo,
  LabelWrapper,
  FormWrapper,
  PersonalInfo,
  PhotoWrapper,
  NoteWrapper,
  InfoDeviceIntegration,
  IconCheckWrapper,
  InfoDeviceIntegrationFailed,
} from "./style";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useCalculation, useCreatePayment } from "hooks";
import { QRCode, Spin } from "antd";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import {
  DebtWrapper,
  NumberD,
  NumberP,
  PayingWrapper,
  StatusWrapper,
  TextD,
} from "components/modals/paymentModal/style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { IOption } from "components/common/select/type";
import { fetchSearchFields, funcCheckPermission, GetReceipt } from "utils";
import { IContacts } from "types/contact";
import { IProductAndServiceIncome } from "types/finance/transactionIncome";
import { IUserPhone } from "types/userPhone";
import {
  ONLINE_PAYMENT,
  PAYMENT_CARD,
  PAYMENT_CASH,
  PAYMENT_MOT,
} from "constants/payment";
import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { styles } from "../firstEntranceModal";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { phoneEditor } from "utils/phoneNumberEditor";
import { MainPhone } from "constants/phoneTypes";
import { ADDED_BY } from "constants/contactResponsibles";
import { AmountWrapper, Balance, WalletWrapper } from "../paymentModal/style";
import formatPhoneNumber from "utils/phoneNumberFormatter";
import { WarningComponent } from "components";
import { useRouter } from "next/router";
import { PhoneNumberFormatted } from "constants/companySettings";
import { validationErrorHandler } from "utils";
import {
  CheckDeviceInactiveSvg,
  CheckDeviceSvg,
  TeacherGlassSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import Link from "next/link";
import { COMPONENTS_VIEWS, PAGE_VISITS } from "constants/permissions";
import lodash from "lodash";

const TransactionPaymentModal = () => {
  const checkRef = useRef();
  const router = useRouter();
  const userObj = useSelector((state: IStore) => state.user?.user);
  const {
    paymentTransaction: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const queryKeys = data?.queryKeys;
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [options, setOptions] = useState<IOption[] | undefined>(undefined);
  const [submitButtonAccess, setSubmitButtonAccess] = useState<boolean>(false);
  const [student, setStudent] = useState<IContacts | undefined>(undefined);
  const [groupData, setGroupData] = useState<
    | {
        full_name: string;
        group_name: string;
        group_id?: string;
        teacher_firstname: string;
        teacher_lastname: string;
        phone: string;
        id?: number;
        image?: string;
        note?: string;
        group_note?: string;
        phones?: IUserPhone[];
      }
    | undefined
  >({
    id: undefined,
    full_name: "Full name",
    group_name: "Group name",
    group_id: undefined,
    teacher_firstname: "",
    teacher_lastname: "",
    phone: "Phone number",
    image: undefined,
    note: undefined,
    phones: undefined,
  });

  const { data: calculation, isInitialLoading: isLoading } = useCalculation({
    id: student?.id,
  });

  const isTaxModalConnected = useSelector(
    (state: IStore) => state.check.isConnected
  );

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
      })
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
        { scroll: false }
      )
      .then(() => {
        setSubmitButtonAccess(false);
      });
    handleClose();
  };

  const createMutation = useCreatePayment({
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

  const handleClose = () => {
    reset({});
    setStudent(undefined);
    setGroupData({
      full_name: "Full name",
      group_name: "Group name",
      teacher_firstname: "",
      teacher_lastname: "",
      phone: "Phone number",
      image: undefined,
      note: undefined,
      group_note: undefined,
      group_id: undefined,
      phones: undefined,
    });
    dispatch(
      toggleModal({
        key: "paymentTransaction",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const bool = funcCheckPermission([COMPONENTS_VIEWS.can_use_red_balance]);

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
        "You should connect tax device to make payment by CASH or CARD"
      );
      setSubmitButtonAccess(false);
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
        contact_id: student?.id,
      });
    }
  };

  const handleGroupData = (option: IProductAndServiceIncome) => {
    setGroupData({
      id: option?.id,
      full_name: !!option
        ? option?.firstname + " " + option?.lastname
        : "Full name",
      group_name: option?.group_name ?? "Group name",
      teacher_firstname: option?.teacher_firstname ?? "-",
      teacher_lastname: option?.teacher_lastname ?? "-",
      group_id: option?.group_id ?? "-",
      group_note: option?.group_note,
      phone: !!option
        ? formatPhoneNumber(
            phoneEditor(option?.phones)?.find(
              (p: IUserPhone) => p.is_confirmed === 1
            )?.phone_number
          )?.toString()
        : "Phone number",
      image: option?.avatar_url || "/noimage.png",
      phones: phoneEditor(option?.phones),
      note: option?.note,
    });
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" && name === "user_id") {
        const option: IContacts = options?.find(
          (op: IOption) => op.value == (value["user_id"] as unknown as number)
        )?.additional;
        setStudent(option);
        handleGroupData(option as any);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, options]);

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
    >
      <Spin spinning={isLoading}>
        <ModalTitle>Payment box</ModalTitle>
        <UserInfo>
          <div className="payment-request">
            <ContactActions
              groupContactId={groupData?.id}
              student={
                {
                  user: {
                    userPhones: groupData?.phones,
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
          </div>
          <PhotoWrapper>
            <CircleImage
              src={{ full_url: groupData?.image }}
              width={80}
              height={80}
            />
          </PhotoWrapper>
          <PersonalInfo>
            <p>{groupData?.full_name}</p>
            <p>{groupData?.phone}</p>
            <div className="flex">
              {groupData?.group_id ? (
                <Link
                  className="group_link"
                  href={`/groups/${groupData?.group_id}`}
                >
                  {groupData?.group_name}
                </Link>
              ) : (
                <p className="group">{groupData?.group_name}</p>
              )}
              <p className="group">
                <TeacherGlassSvg width={13} />{" "}
                {groupData?.teacher_firstname +
                  " " +
                  groupData?.teacher_lastname}
              </p>
            </div>
          </PersonalInfo>
        </UserInfo>
        {isTaxModalConnected ? (
          <InfoDeviceIntegration>
            <IconCheckWrapper>
              <CheckDeviceSvg width={22} height={22} />{" "}
            </IconCheckWrapper>
            <p>The QR code will be printed by the tax terminal</p>
          </InfoDeviceIntegration>
        ) : (
          <InfoDeviceIntegrationFailed>
            <IconCheckWrapper className="bg">
              <CheckDeviceInactiveSvg width={22} height={22} />{" "}
            </IconCheckWrapper>
            <p>
              The QR code will not be printed by the tax terminal, you need to
              connect to the terminal.
            </p>
          </InfoDeviceIntegrationFailed>
        )}
        <NoteWrapper>
          <p className="label">Group’s note</p>
          <p className="note">
            {!!groupData?.group_note ? groupData?.group_note : "-"}
          </p>
        </NoteWrapper>
        <NoteWrapper>
          <p className="label">Student’s note</p>
          <p className="note">{!!groupData?.note ? groupData?.note : "-"}</p>
        </NoteWrapper>
        {calculation?.warning && (
          <Wrapper paddingX={20}>
            <WarningComponent text={calculation?.warning} />
          </Wrapper>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper paddingX={20}>
            <DebounceSelect
              isValue
              showSearch
              label="Student"
              control={control}
              name="user_id"
              placeholder="At least 3 letters"
              fetchOptions={async (searchString) => {
                const options: IOption[] = await fetchSearchFields({
                  search: searchString,
                });
                setOptions(options);
                return options;
              }}
              error={(errors as any)?.general?.user_id?.message}
            />
          </Wrapper>
          <Wrapper paddingX={20} style={{ padding: "10px 20px 40px 20px" }}>
            <StatusWrapper>
              <DebtWrapper>
                <TextD>DEBT</TextD>
                <NumberD className="grotesk">
                  {!!toCurrencyFormat(calculation?.student?.debt, 0) &&
                  !!calculation?.student?.debt
                    ? `-${toCurrencyFormat(calculation?.student?.debt, 0)}`
                    : toCurrencyFormat(0)}
                </NumberD>
              </DebtWrapper>
              <PayingWrapper>
                <p>Paying</p>
                <NumberP className="grotesk">
                  {toCurrencyFormat(
                    (+watch("mot") || 0) +
                      (+watch("card") || 0) +
                      (+watch("cash") || 0)
                  )}
                </NumberP>
              </PayingWrapper>
            </StatusWrapper>
          </Wrapper>
          <FormWrapper>
            <Wrapper>
              <LabelWrapper>
                <CardSvg /> Card
              </LabelWrapper>
              <InputNumber
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
                name="cash"
                control={control}
                suffix={<div className="suffix">UZS</div>}
                className="currency"
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper>
            <Wrapper>
              <LabelWrapper>
                <CoinsSvg /> MOT
              </LabelWrapper>
              <InputNumber
                name="mot"
                control={control}
                suffix={<div className="suffix">UZS</div>}
                className="currency"
              />
            </Wrapper>
            <Wrapper>
              <LabelWrapper>
                <WalletColoredSvg height={24} width={30} /> Balance
              </LabelWrapper>
              <InputNumber
                name="balance"
                control={control}
                suffix={<div className="suffix">UZS</div>}
                className="currency"
              />
            </Wrapper>
          </FormWrapper>
          <Wrapper style={{ marginLeft: "16px" }}>
            <ErrorLabel
              error={
                _.map(errors, (value) => {
                  return value;
                })?.[0]?.message
              }
            />
          </Wrapper>
          <ButtonWrapper>
            <WalletWrapper>
              <Balance>
                <WalletSvg />
                Balance
              </Balance>
              <AmountWrapper className="grotesk">
                {toCurrencyFormat(
                  bool
                    ? calculation?.student?.balance
                    : lodash.sumBy(
                        calculation?.student?.dividedBalance?.green,
                        "actual_balance"
                      ) +
                        lodash.sumBy(
                          calculation?.student?.dividedBalance?.yellow,
                          "actual_balance"
                        ),
                  0
                )}
              </AmountWrapper>
            </WalletWrapper>
            <div className="btn">
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
            </div>
          </ButtonWrapper>
        </form>
        <div style={{ display: "none" }}>
          <div ref={checkRef as any} style={{ position: "relative" }}>
            <table className="table">
              <tbody>
                <tr>
                  <td
                    style={{
                      ...styles.main,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                    }}
                  >
                    <h2
                      className="text-center grotesk"
                      style={{
                        ...(styles.mainTitle as any),
                        fontFamily:
                          "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      }}
                    >
                      PAYMENT
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        paddingBottom: "10px",
                        fontFamily:
                          "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      }}
                    >
                      <span
                        style={{
                          ...styles.title,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                        }}
                      >
                        Cashier:
                      </span>
                      {/* @ts-ignore */}
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: fontSizes.f10,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          marginBottom: 0,
                        }}
                      >
                        {userObj?.username}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        fontFamily:
                          "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      }}
                    >
                      <span
                        style={{
                          ...styles.title,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                        }}
                      >
                        Till this month:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: fontSizes.f10,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          marginBottom: 0,
                        }}
                      >
                        {toCurrencyFormat(calculation?.student?.debt)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        fontFamily:
                          "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      }}
                    >
                      <span
                        style={{
                          ...styles.title,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                        }}
                      >
                        Cash:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: fontSizes.f10,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          marginBottom: 0,
                        }}
                      >
                        {toCurrencyFormat(+watch("cash") || 0)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          ...styles.title,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                        }}
                      >
                        Card:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: fontSizes.f10,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          marginBottom: 0,
                        }}
                      >
                        {toCurrencyFormat(+watch("card") || 0)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          ...styles.title,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                        }}
                      >
                        MOT:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: fontSizes.f10,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          marginBottom: 0,
                        }}
                      >
                        {toCurrencyFormat(+watch("mot") || 0)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          ...styles.title,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                        }}
                      >
                        Balance:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: fontSizes.f10,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          marginBottom: 0,
                        }}
                      >
                        {toCurrencyFormat(+watch("balance") || 0)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        fontFamily:
                          "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      }}
                    >
                      <span
                        style={{
                          ...styles.title,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                        }}
                      >
                        Total:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: fontSizes.f10,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          marginBottom: 0,
                        }}
                      >
                        {toCurrencyFormat(
                          (+watch("mot") || 0) +
                            (+watch("card") || 0) +
                            (+watch("cash") || 0) +
                            (+watch("balance") || 0)
                        )}
                      </span>
                    </div>
                    <hr style={{ ...styles.hr, marginBottom: 7 }} />
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          ...styles.title,
                          paddingBottom: 10,
                          width: "40%",
                        }}
                      >
                        Full name:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          marginBottom: "2px",
                          fontSize: fontSizes.f12,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          display: "flex",
                          justifyContent: "flex-end",
                          textAlign: "right",
                        }}
                      >
                        {student?.user?.userProfile?.firstname}{" "}
                        {student?.user?.userProfile?.lastname}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          ...styles.title,
                          paddingBottom: 10,
                          width: "40%",
                        }}
                      >
                        Group No:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          marginBottom: "2px",
                          fontSize: fontSizes.f12,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          display: "flex",
                          justifyContent: "flex-end",
                          textAlign: "right",
                        }}
                      >
                        {student?.group?.name}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          ...styles.title,
                          paddingBottom: 10,
                          width: "40%",
                        }}
                      >
                        Room:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          marginBottom: "2px",
                          fontSize: fontSizes.f12,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          display: "flex",
                          justifyContent: "flex-end",
                          textAlign: "right",
                        }}
                      >
                        {student?.group?.room?.name}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          ...styles.title,
                          paddingBottom: 10,
                          width: "40%",
                        }}
                      >
                        Teacher:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          marginBottom: "2px",
                          fontSize: fontSizes.f12,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          display: "flex",
                          justifyContent: "flex-end",
                          textAlign: "right",
                        }}
                      >
                        {student?.group?.teacher?.user?.userProfile?.firstname}{" "}
                        {student?.group?.teacher?.user?.userProfile?.lastname}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          ...styles.title,
                          paddingBottom: 10,
                          width: "40%",
                        }}
                      >
                        Support:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          marginBottom: "2px",
                          fontSize: fontSizes.f12,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          display: "flex",
                          justifyContent: "flex-end",
                          textAlign: "right",
                        }}
                      >
                        {student?.group?.support?.user?.userProfile?.firstname}{" "}
                        {student?.group?.support?.user?.userProfile?.lastname}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          ...styles.title,
                          paddingBottom: 10,
                          width: "40%",
                        }}
                      >
                        Level:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          marginBottom: "2px",
                          fontSize: fontSizes.f12,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          display: "flex",
                          justifyContent: "flex-end",
                          textAlign: "right",
                        }}
                      >
                        {student?.group?.level?.parent?.name}{" "}
                        {student?.group?.level?.name}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          ...styles.title,
                          paddingBottom: 10,
                          width: "40%",
                        }}
                      >
                        Your administrator:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          marginBottom: "2px",
                          fontSize: fontSizes.f12,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          display: "flex",
                          justifyContent: "flex-end",
                          textAlign: "right",
                        }}
                      >
                        {
                          student?.contactResponsibles?.filter(
                            (u: any) => u.type == ADDED_BY
                          )[0]?.user?.username
                        }
                      </span>
                    </div>
                    <hr style={{ ...styles.hr, marginBottom: 7 }} />
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          ...styles.title,
                          width: "20%",
                          lineHeight: 2,
                          paddingBottom: 8,
                        }}
                      >
                        Login:
                      </span>
                      <span
                        // @ts-ignore
                        style={{
                          ...styles.value,
                          marginBottom: "0",
                          paddingBottom: "0",
                          fontSize: fontSizes.f12,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          width: "100%",
                          paddingLeft: "10px",
                          textAlign: "right",
                        }}
                      >
                        {student?.user?.username}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          ...styles.title,
                          width: "20%",
                          lineHeight: 2,
                          paddingBottom: 8,
                        }}
                      >
                        Password:
                      </span>
                      <span
                        style={{
                          // @ts-ignore
                          textAlign: "right",
                          ...styles.value,
                          marginBottom: "0",
                          paddingBottom: "0",
                          fontSize: fontSizes.f12,
                          fontFamily:
                            "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                          width: "100%",
                          paddingLeft: "10px",
                        }}
                      >
                        {student?.user?.userProfile?.dob
                          ?.split("-")
                          ?.reverse()
                          .join(".")}
                      </span>
                    </div>
                    <hr style={{ ...styles.hr, marginBottom: 15 }} />
                    <p
                      style={{
                        textAlign: "left",
                        fontSize: fontSizes.f10,
                        fontFamily:
                          "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      }}
                      className="grotesk"
                    >
                      <p style={{ textAlign: "center" }}>
                        До внесения первой оплаты за обучение Вы обязуетесь
                        ознакомиться с условиями публичной оферты{" "}
                        <strong>OOO INTEST MAX </strong>.
                      </p>
                      <hr
                        style={{
                          ...styles.hr,
                          background: bgColors.transparent,
                        }}
                      />
                      <p style={{ textAlign: "center" }}>
                        <strong>ПУБЛИЧНАЯ ОФЕРТА </strong> опубликована на сайте
                        www.inter-nation.uz
                      </p>
                      <hr
                        style={{
                          ...styles.hr,
                          background: bgColors.transparent,
                        }}
                      />
                      <p style={{ textAlign: "center" }}>
                        Внесение первой оплаты будет считаться как полное и
                        безоговорочное
                        <strong> принятие </strong> условий Публичной оферты.
                      </p>
                      <hr
                        style={{
                          ...styles.hr,
                          background: bgColors.transparent,
                        }}
                      />
                    </p>
                    <p
                      style={{ fontStyle: "none", fontWeight: 700 }}
                      className="grotesk"
                    >
                      {PhoneNumberFormatted}
                    </p>
                    <hr
                      style={{ ...styles.hr, background: bgColors.transparent }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: fontSizes.f12,
                        fontWeight: 800,
                        margin: "0 0 5px 0",
                      }}
                    >
                      Payment:
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      ...(styles.qr as any),
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <br />{" "}
                    <QRCode
                      size={110}
                      value={`http://qr.inter-nation.uz/p/${student?.user?.userPhones
                        ?.filter((p: any) => p.type === MainPhone)[0]
                        ?.phone_number.slice(3, 12)}`}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: fontSizes.f12,
                        fontWeight: 800,
                        margin: "0 0 5px 0",
                      }}
                    >
                      Application:
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      ...(styles.qr as any),
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <QRCode
                      size={110}
                      value="https://student-app.inter-nation.uz"
                    />
                    <hr
                      style={{ ...styles.hr, background: bgColors.transparent }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Spin>
    </AntdModal>
  );
};

export default TransactionPaymentModal;
