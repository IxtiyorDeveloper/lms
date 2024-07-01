import * as React from "react";
import {
  AntdModal,
  AntdSwitch,
  Button,
  CardSvg,
  CircleImage,
  CoinsSvg,
  DebounceSelect,
  DollarsSvg,
  Gender,
  Input,
  InputNumber,
  MySelect,
  PhoneNumberInput,
  SelectMonth,
  CheckDeviceInactiveSvg,
  CheckDeviceSvg,
} from "components";
import {
  ModalTitle,
  Wrapper,
  ButtonWrapper,
  UserInfo,
  LabelWrapper,
  FormWrapper,
  PersonalInfo,
  IconWrapper,
  PhotoWrapper,
  InfoDeviceIntegration,
  IconCheckWrapper,
  InfoDeviceIntegrationFailed,
} from "./style";
import { bgColors, textColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useForm } from "react-hook-form";
import { useCreateIncome, usePageDataMemo, useProductCashBox } from "hooks";
import { Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchSearchFields, GetReceipt, validationErrorHandler } from "utils";
import { useEffect, useState } from "react";
import { IOption } from "components/common/select/type";
import { IUserPhone } from "types/userPhone";
import { ProductList } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  PAYMENT_CARD,
  PAYMENT_CASH,
  PAYMENT_MOT,
  paymentTypes,
} from "constants/payment";
import { IContacts } from "types/contact";
import * as yup from "yup";
import { IProductAndServiceIncome } from "types/finance/transactionIncome";
import { uzbekRegex } from "utils/regex";
import { phoneEditor } from "utils/phoneNumberEditor";
import { CheckCircleFilled } from "@ant-design/icons";
import formatPhoneNumber from "utils/phoneNumberFormatter";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS, PAGE_VISITS } from "constants/permissions";
import moment from "moment";
import { DATE_FORMAT_MMMM_YYYY_MONTH_SELECT } from "constants/dates";
import { generateFullMonthFromMonthYear } from "utils/generateFullMonthFromMonthYear";
import { calculateMonthDifference } from "utils/getMonthDifference";
import { ECashBoxProduct } from "../../../types";

enum customer_type {
  student = 0,
  guest = 1,
}

const CreateTransactionModal = () => {
  const [options, setOptions] = useState<IOption[] | undefined>(undefined);
  const [month, setMonth] = useState<string>(
    moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT),
  );
  const selects = usePageDataMemo();
  const monthsDiff = calculateMonthDifference({ dateString: month });
  const [groupData, setGroupData] = useState<
    | {
        full_name: string;
        group_name: string;
        phone: string | number;
        image?: string;
      }
    | undefined
  >({
    full_name: "Full name",
    group_name: "Group name",
    phone: "Phone number",
  });

  const queryClient = useQueryClient();

  const {
    createTransaction: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const action = data?.action;

  const CreateIncome = yup.object().shape({
    general: yup.object().shape({
      amount: yup.string().required("Amount is a required field"),
      branch_id: yup.string().required("Branch is a required field"),
      payment_type: yup.string().required("Payment type is a required field"),
      product_id: yup
        .string()
        .nullable()
        .when("general.type", {
          is: () => !watch("general.type"),
          then: yup.string().required("Product is a required field"),
          otherwise: yup.string().nullable(),
        }),
      user_id: yup
        .string()
        .nullable()
        .when("general.customer_type", {
          is: () => watch("general.customer_type") === customer_type.student,
          then: yup.string().required("Full name is a required field"),
          otherwise: yup.string().nullable(),
        }),
      full_name: yup
        .string()
        .nullable()
        .when("general.customer_type", {
          is: () => watch("general.customer_type") === customer_type.guest,
          then: yup.string().required("Full name is a required field"),
          otherwise: yup.string().nullable(),
        }),
      phone_number: yup
        .string()
        .nullable()
        .when("general.customer_type", {
          is: () => watch("general.customer_type") === customer_type.guest,
          then: yup
            .string()
            .required("Phone number is a required field")
            .matches(uzbekRegex, "Please enter valid phone number"),
          otherwise: yup.string().nullable(),
        }),
    }),
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
    setError,
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(CreateIncome),
  });

  const { data: products, isInitialLoading: isLoading } = useProductCashBox({
    query_params: {
      branch_id: watch("general.branch_id"),
      expand: "createdBy,variation.options,count,price,coverFile.resolutions",
    },
  });

  const isTaxModalConnected = useSelector(
    (state: IStore) => state.check.isConnected,
  );

  const dispatch = useDispatch();
  const createMutation = useCreateIncome({
    onSuccess: (data_check: any) => {
      handleClose();
      for (let i = 0; i < data.queryKeys?.length; i++) {
        queryClient.invalidateQueries(data.queryKeys[i]);
      }
      const paymentType = data_check?.check?.payment_type;
      if (paymentType === paymentTypes[PAYMENT_MOT]) {
        toast.success("Success");
        dispatch(
          toggleModal({
            key: "incomeProductName",
            data: {
              data: { preload: false, data: data_check?.check },
              open: true,
            },
          }),
        );
      } else {
        if (
          isTaxModalConnected ||
          funcCheckPermission([
            PAGE_VISITS.can_take_payment_without_tax_device_connection,
          ])
        ) {
          GetReceipt({
            income_group_id: data_check?.income?.income_group_id,
          }).then((data_check1) => {
            toast.success("Success");
            dispatch(
              toggleModal({
                key: "incomeProductName",
                data: {
                  data: {
                    preload: false,
                    data: { ...data_check?.check, ...data_check1?.result },
                  },
                  open: true,
                },
              }),
            );
            handleClose();
          });
        } else {
          toast.error("You cannot get payment without tax device connection!");
        }
      }
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

  const handleClose = () => {
    setMonth(moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT));
    setGroupData({
      full_name: "Full name",
      group_name: "Group name",
      phone: "Phone number",
    });
    dispatch(
      toggleModal({
        key: "createTransaction",
        data: {
          data: {},
          open: false,
        },
      }),
    );
    reset({});
  };

  const onSubmit = (data: any) => {
    const { general } = data;

    const type = !!general?.type
      ? ECashBoxProduct.OTHER
      : ECashBoxProduct.PRODUCT;

    if (action === "create") {
      const cashOrCard =
        Number(data?.general?.payment_type) === PAYMENT_CARD ||
        Number(data?.general?.payment_type) === PAYMENT_CASH;

      const permissionToTakeWithoutDevice = funcCheckPermission([
        PAGE_VISITS.can_take_payment_without_tax_device_connection,
      ]);

      if (
        cashOrCard &&
        !isTaxModalConnected &&
        !permissionToTakeWithoutDevice
      ) {
        toast.error("You cannot get payment without tax device connection!");
      } else if (!!monthsDiff) {
        if (general?.customer_type == customer_type.guest) {
          createMutation.mutate({
            body: {
              amount: general?.amount,
              type,
              payment_type: general?.payment_type,
              product_id: general?.product_id,
              phone_number: general?.phone_number,
              comment: general?.comment,
              full_name: general?.full_name,
              branch_id: general?.branch_id,
              date: generateFullMonthFromMonthYear(
                month,
                funcCheckPermission([
                  COMPONENTS_VIEWS.can_create_income_old_month,
                ]),
              ),
            },
          });
        }
        if (general?.customer_type == customer_type.student) {
          createMutation.mutate({
            body: {
              full_name: groupData?.full_name,
              amount: general?.amount,
              type,
              payment_type: general?.payment_type,
              product_id: general?.product_id,
              phone_number: groupData?.phone,
              branch_id: general?.branch_id,
              comment: general?.comment,
              user_id: general.user_id,
              date: generateFullMonthFromMonthYear(
                month,
                funcCheckPermission([
                  COMPONENTS_VIEWS.can_create_income_old_month,
                ]),
              ),
            },
          });
        }
      } else {
        if (general?.customer_type == customer_type.guest) {
          createMutation.mutate({
            body: {
              amount: general?.amount,
              payment_type: general?.payment_type,
              type,
              product_id: general?.product_id,
              phone_number: general?.phone_number,
              branch_id: general?.branch_id,
              full_name: general?.full_name,
              comment: general?.comment,
            },
          });
        }
        if (general?.customer_type == customer_type.student) {
          createMutation.mutate({
            body: {
              full_name: groupData?.full_name,
              amount: general?.amount,
              payment_type: general?.payment_type,
              product_id: general?.product_id,
              phone_number: groupData?.phone,
              branch_id: general?.branch_id,
              type,
              user_id: general.user_id,
              comment: general?.comment,
            },
          });
        }
      }
    }
  };

  const handleGroupData = (option: IProductAndServiceIncome) => {
    setGroupData({
      full_name: !!option
        ? option?.firstname + " " + option?.lastname
        : "Full name",
      group_name: option?.group_name ?? "Group name",
      phone: !!option
        ? formatPhoneNumber(
            phoneEditor(option?.phones)?.find(
              (p: IUserPhone) => p.is_confirmed === 1,
            )?.phone_number,
          )
        : "Phone number",
      image: option?.avatar_url || "/student/image.png",
    });
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      clearErrors();
      if (type === "change" && name === "general.user_id") {
        const option: IContacts = options?.find(
          (op: IOption) =>
            op.value == (value["general"]["user_id"] as unknown as number),
        )?.additional;
        handleGroupData(option as any);
      }
      if (type === "change" && name === "general.product_id") {
        const price = products?.find(
          (li) => li?.id == value.general?.product_id,
        )?.price;
        setValue("general.amount", price);
        if (price) {
          setError("general.amount", null as any);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, options, products]);

  useEffect(() => {
    if (open) {
      setValue("general.customer_type", customer_type.student);
    }
  }, [open]);

  const type = watch("general.type");

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      maskClosable={false}
    >
      <Spin spinning={isLoading}>
        <ModalTitle>Create transaction</ModalTitle>
        <Wrapper>
          {funcCheckPermission([
            COMPONENTS_VIEWS.can_create_income_old_month,
          ]) &&
            action === "create" && (
              <div className="m-s">
                <SelectMonth
                  initValue={month}
                  onChange={(e) => {
                    setMonth(e);
                  }}
                />
              </div>
            )}
        </Wrapper>
        {watch("general.customer_type") !== customer_type.guest && (
          <Wrapper paddingX={20}>
            <UserInfo>
              <PhotoWrapper>
                <CircleImage
                  src={{ full_url: groupData?.image || "" }}
                  width={80}
                  height={80}
                />
              </PhotoWrapper>
              <PersonalInfo>
                <p>{groupData?.full_name}</p>
                <p>{groupData?.group_name}</p>
                <p>
                  <CheckCircleFilled
                    rel="true"
                    color={bgColors.midori as any}
                  />{" "}
                  {groupData?.phone}
                </p>
              </PersonalInfo>
            </UserInfo>
          </Wrapper>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Wrapper paddingX={20}>
            <MySelect
              placeholder="-"
              control={control}
              name="general.customer_type"
              label="Customer type"
              options={[
                {
                  label: "Student",
                  value: customer_type.student,
                },
                {
                  label: "Guest",
                  value: customer_type.guest,
                },
              ]}
            />
          </Wrapper>
          {watch("general.customer_type") === customer_type.guest ? (
            <FormWrapper style={{ paddingTop: "0", alignItems: "flex-start" }}>
              <Wrapper>
                <Input
                  placeholder="-"
                  control={control}
                  name="general.full_name"
                  error={(errors as any)?.general?.full_name?.message}
                  label="Guest name"
                />
              </Wrapper>
              <Wrapper>
                <PhoneNumberInput
                  placeholder="-"
                  control={control}
                  name="general.phone_number"
                  label="Phone number"
                  error={(errors as any)?.general?.phone_number?.message}
                />
              </Wrapper>
            </FormWrapper>
          ) : (
            <Wrapper paddingX={20} style={{ padding: "0 20px 0 20px" }}>
              <DebounceSelect
                isValue
                showSearch
                label="Student"
                control={control}
                name="general.user_id"
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
          )}

          <Wrapper paddingX={20}>
            <MySelect
              placeholder="Select"
              control={control}
              name="general.branch_id"
              label="Branch"
              options={selects.ownAllBranches}
              error={(errors as any)?.general?.branch_id?.message}
            />
          </Wrapper>
          <Wrapper>
            <div className="m-s">
              <AntdSwitch
                name="general.type"
                control={control}
                label="Income"
              />
            </div>
          </Wrapper>
          <Wrapper paddingX={20}>
            {!!type ? (
              <Input
                placeholder="-"
                control={control}
                name="general.comment"
                error={(errors as any)?.general?.product_name?.message}
                label="Description"
                type="textarea"
              />
            ) : (
              <ProductList
                name="general.product_id"
                data={products ?? []}
                control={control}
                label=""
                error={(errors as any)?.general?.product_id?.message}
              />
            )}
          </Wrapper>
          <FormWrapper style={{ paddingTop: "0" }}>
            <Wrapper>
              <Gender
                value={PAYMENT_CARD}
                name="general.payment_type"
                control={control}
                icon={() => {
                  return (
                    <IconWrapper>
                      <CardSvg /> Card
                    </IconWrapper>
                  );
                }}
                error={(errors as any)?.general?.payment_type?.message}
              />
            </Wrapper>
            <Wrapper>
              <Gender
                value={PAYMENT_CASH}
                name="general.payment_type"
                control={control}
                icon={() => {
                  return (
                    <IconWrapper>
                      <DollarsSvg height={24} width={30} /> Cash
                    </IconWrapper>
                  );
                }}
                error={(errors as any)?.general?.payment_type?.message}
              />
            </Wrapper>
            <Wrapper>
              <Gender
                value={PAYMENT_MOT}
                name="general.payment_type"
                control={control}
                icon={() => {
                  return (
                    <IconWrapper>
                      <CoinsSvg />
                      MOT
                    </IconWrapper>
                  );
                }}
                error={(errors as any)?.general?.payment_type?.message}
              />
            </Wrapper>
          </FormWrapper>
          <Wrapper
            style={{ paddingBottom: "20px", paddingTop: "0" }}
            paddingX={20}
          >
            <LabelWrapper>Payment amount</LabelWrapper>
            <InputNumber
              name="general.amount"
              control={control}
              suffix={<div className="suffix">UZS</div>}
              error={(errors as any)?.general?.amount?.message}
            />
          </Wrapper>
          <ButtonWrapper>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
            >
              Cancel
            </Button>
            <Button type="submit" buttonLoading={createMutation.isLoading}>
              Save
            </Button>
          </ButtonWrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default CreateTransactionModal;
