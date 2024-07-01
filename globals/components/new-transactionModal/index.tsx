import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  ModalTitle,
  MonthWrapper,
  SubContent,
} from "./style";
import {
  AntdModal,
  Button,
  CircleSuccessSvg,
  DebounceSelect,
  DisconnectedSvg,
  MySelect,
  SelectMonth,
} from "components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { Wrapper, ButtonWrapper } from "./style";
import {
  ETransactionActions,
  ETransactionType,
} from "types/finance/transaction";
import StudentContent from "./components/student";
import { IContacts } from "types/contact";
import { IOption } from "components/common/select/type";
import { useCreateIncome, usePageDataMemo } from "hooks";
import { bgColors, textColors } from "styles/theme";
import GuestContent from "./components/guest";
import IncomeContent from "./components/income";
import {
  PAYMENT_CARD,
  PAYMENT_CASH,
  PAYMENT_MOT,
  paymentTypes,
} from "constants/payment";
import { toast } from "react-toastify";
import {
  fetchSearchFields,
  funcCheckPermission,
  GetReceipt,
  validationErrorHandler,
} from "utils";
import { COMPONENTS_VIEWS, PAGE_VISITS } from "constants/permissions";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment/moment";
import { DATE_FORMAT_MMMM_YYYY_MONTH_SELECT } from "constants/dates";
import { ECashBoxProduct } from "types";
import { generateFullMonthFromMonthYear } from "utils/generateFullMonthFromMonthYear";

const NewTransactionModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const selects = usePageDataMemo();
  const { user } = useSelector((state: IStore) => state?.user);

  const [activeStudent, setActiveStudent] = useState<
    IContacts & { [k: string]: string }
  >();
  const [month, setMonth] = useState<string>(
    moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT)
  );

  const [options, setOptions] = useState<IOption[]>([]);
  const connected = useSelector((state: IStore) => state.check.isConnected);
  const isTaxModalConnected = useSelector(
    (state: IStore) => state.check.isConnected
  );

  const {
    newTransaction: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const action = data?.action;

  const {
    control,
    watch,
    formState: { errors },
    setValue,
    reset,
    getValues,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm();

  const handleClose = () => {
    setActiveStudent(undefined);
    dispatch(
      toggleModal({
        key: "newTransaction",
        data: {
          data: {},
          open: false,
        },
      })
    );
    reset({});
  };

  const createMutation = useCreateIncome({
    onSuccess: (data_check: any) => {
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
          })
        );
        handleClose();
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
              })
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

  const contents = {
    [ETransactionType.student]: (
      <StudentContent
        control={control}
        errors={errors}
        setValue={setValue}
        watch={watch}
        activeStudent={activeStudent}
        options={options}
        setActiveStudent={setActiveStudent}
        setOptions={setOptions}
        selects={selects}
        clearErrors={clearErrors}
        setError={setError}
      />
    ),
    [ETransactionType.guest]: (
      <GuestContent
        control={control}
        errors={errors}
        selects={selects}
        setValue={setValue}
        watch={watch}
        clearErrors={clearErrors}
        setError={setError}
      />
    ),
    [ETransactionType.income]: (
      <IncomeContent
        control={control}
        errors={errors}
        selects={selects}
        setValue={setValue}
        watch={watch}
      />
    ),
  };
  const contentType =
    watch("general.customer_type") || ETransactionType.student;

  const onSubmit = (data: any) => {
    const { general } = data;

    const type =
      general?.customer_type == ETransactionType.income
        ? ECashBoxProduct.OTHER
        : ECashBoxProduct.PRODUCT;

    if (action === ETransactionActions.create) {
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
      }
      {
        createMutation.mutate({
          body: {
            full_name: general?.full_name,
            amount: general?.amount,
            type,
            payment_type: general?.payment_type,
            product_id: general?.product_id,
            phone_number: general?.phone_number,
            branch_id: general?.branch_id,
            comment: general?.comment,
            user_id: general.user_id,
            date: generateFullMonthFromMonthYear(
              month,
              funcCheckPermission([
                COMPONENTS_VIEWS.can_create_income_old_month,
              ])
            ),
          },
        });
      }
    }
  };

  useEffect(() => {
    if (open && action == ETransactionActions.create) {
      setValue("general.customer_type", ETransactionType.student);
    }
  }, [open]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      clearErrors();
      if (type === "change" && name === "general.customer_type") {
        if (value?.general?.customer_type == ETransactionType.guest) {
          setValue("general.user_id", undefined);
          setValue("general.full_name", undefined);
          setValue("general.phone_number", undefined);
          setValue("general.comment", undefined);
        }
        if (value?.general?.customer_type == ETransactionType.income) {
          setValue("general.user_id", undefined);
          setValue("general.full_name", undefined);
          setValue("general.phone_number", undefined);
          setValue("general.product_id", undefined);
        }
        if (value?.general?.customer_type == ETransactionType.student) {
          setValue("general.comment", undefined);
          setValue("general.full_name", undefined);
          setValue("general.phone_number", undefined);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const defaultBranches = user?.defaultBranches;

  useEffect(() => {
    if (defaultBranches?.length === 1) {
      const branch_id = defaultBranches[0];
      setValue("general.branch_id", branch_id);
    }
  }, [user, open]);

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      width={660}
      maskClosable={false}
    >
      <Wrapper onSubmit={handleSubmit(onSubmit)}>
        <ModalTitle>
          <div>
            <p>Create transaction</p>
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
          </div>
          <MonthWrapper>
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
          </MonthWrapper>
        </ModalTitle>
        <Container>
          <SubContent>
            <MySelect
              placeholder="-"
              control={control}
              name="general.customer_type"
              label="Customer type"
              options={[
                {
                  label: "Student",
                  value: ETransactionType.student,
                },
                {
                  label: "Guest",
                  value: ETransactionType.guest,
                },
                {
                  label: "Income",
                  value: ETransactionType.income,
                },
              ]}
            />
          </SubContent>
          <Content>{contents[contentType as keyof typeof contents]}</Content>
        </Container>
        <ButtonWrapper>
          <Button
            onClick={handleClose}
            textColor={textColors.yourShadow}
            bgColor={bgColors.wildSand}
          >
            Cancel
          </Button>
          <Button type="submit" buttonLoading={createMutation.isLoading}>
            Create
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </AntdModal>
  );
};

export default NewTransactionModal;
