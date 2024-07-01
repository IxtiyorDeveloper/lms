import * as React from "react";
import {
  Button,
  InputNumber,
  MySelect,
  DoubleArrowSvg,
  PlusSvg,
  DeleteSvg,
  CircleImage,
  TreeSelect,
} from "components";
import {
  ModalTitle,
  Wrapper,
  AntdModalC,
  ButtonWrapper,
  FormWrapper,
  Col,
} from "./style";
import { bgColors, textColors } from "styles/theme";
import { useFieldArray, useForm } from "react-hook-form";
import { Spin } from "antd";
import {
  useDivideExpense,
  useExpenseCategoryList,
  usePageDataMemo,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { DivideExpenseSchema } from "validation";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useEffect } from "react";
import { ITransactionExpense } from "types/finance/transactionExpense";
import { makeArrayOptions } from "utils/functions/makeArrayOptions";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

interface IDivideExpense {
  general: {
    received_by?: number | string;
    expense_category_id?: string | number;
    amount?: number;
    expenses?: {
      received_by?: number | string;
      expense_category_id?: string | number;
      amount?: number;
    }[];
  };
}

const DivideExpenseModal = () => {
  const dispatch = useDispatch();
  const {
    divideExpense: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const row: ITransactionExpense = data?.row;
  const { data: categories, isLoading: categoryLoading } =
    useExpenseCategoryList({
      page: 1,
      pageSize: 100,
      expand: "children",
    });

  const { staffs, args } = usePageDataMemo();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    reset,
    resetField,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<IDivideExpense>({
    resolver: yupResolver(DivideExpenseSchema),
    defaultValues: {
      general: {
        expenses: [
          {
            received_by: undefined,
            expense_category_id: undefined,
            amount: undefined,
          },
        ],
      },
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "general.expenses",
  });
  const create = useDivideExpense({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_finance_expense_index]);
      handleClose();
      toast.success("Success");
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const handleClose = () => {
    reset();
    dispatch(
      toggleModal({
        key: "divideExpense",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const onSubmit = (data: IDivideExpense) => {
    const { general } = data;
    if (general.expenses)
      create.mutate({
        body: {
          main_expense_id: row.id,
          expenses: general.expenses,
        },
      });
  };

  useEffect(() => {
    if (row) {
      setValue("general", {
        received_by: row?.receivedBy?.id.toString(),
        amount: row?.amount,
        expense_category_id: row.expenseCategory?.id?.toString(),
        expenses: [
          {
            received_by: undefined,
            expense_category_id: undefined,
            amount: undefined,
          },
        ],
      });
    }
  }, [row]);
  const watchAll = watch();

  return (
    <AntdModalC open={open} onCancel={handleClose} centered width="fit-content">
      <Spin spinning={args.isLoading || categoryLoading}>
        <div className="flex-head">
          <ModalTitle>Current expense</ModalTitle>
          <ModalTitle>Divided expense</ModalTitle>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <Wrapper>
              <Col className="col1">
                <CircleImage
                  src={
                    staffs?.find(
                      (staff) =>
                        staff.value.toString() == row?.receivedBy?.id.toString()
                    )?.avatar
                  }
                  alt="asds"
                  className="profile"
                  width={30}
                  height={30}
                />

                <MySelect
                  className="select"
                  disabled
                  name="general.received_by"
                  control={control}
                  options={staffs}
                  placeholder="Select Teacher"
                  showSearch
                  error={errors?.general?.received_by?.message}
                />
              </Col>
              <Col className="col1">
                <TreeSelect
                  className="tree"
                  disabled
                  isParentDisabled
                  // @ts-ignore
                  options={makeArrayOptions({
                    arr: categories?.list,
                    label: "name",
                    hasChildDisabled: true,
                    value: "id",
                    hasChild: true,
                  })}
                  name="general.expense_category_id"
                  control={control}
                  placeholder="Description"
                  error={errors?.general?.expense_category_id?.message}
                />
              </Col>
              <Col className="col1">
                <InputNumber
                  disabled
                  className="number"
                  name="general.amount"
                  control={control}
                  suffix={<div className="suffix">UZS</div>}
                  error={errors?.general?.amount?.message}
                />
              </Col>
            </Wrapper>
            <div className="svg">
              <DoubleArrowSvg />
            </div>
            <div style={{ width: "100%" }}>
              {fields.map((field, index) => {
                return (
                  <Wrapper key={field.id}>
                    <Col className="col">
                      <CircleImage
                        src={
                          staffs?.find(
                            (staff) =>
                              staff.value.toString() ==
                              watchAll.general.expenses?.[index]?.received_by
                          )?.avatar
                        }
                        alt="asds"
                        className="profile"
                        width={30}
                        height={30}
                      />
                      <MySelect
                        className="select"
                        name={`general.expenses[${index}].received_by`}
                        control={control}
                        options={staffs}
                        placeholder="Received By"
                        showSearch
                        error={
                          errors?.general?.expenses?.[index]?.received_by
                            ?.message
                        }
                      />
                    </Col>
                    <Col className="col">
                      <TreeSelect
                        isParentDisabled
                        // @ts-ignore
                        options={makeArrayOptions({
                          arr: categories?.list,
                          label: "name",
                          hasChildDisabled: true,
                          value: "id",
                          hasChild: true,
                        })}
                        name={`general.expenses[${index}].expense_category_id`}
                        control={control}
                        placeholder="Category"
                        className="tree"
                        error={
                          errors?.general?.expenses?.[index]
                            ?.expense_category_id?.message
                        }
                      />
                    </Col>
                    <Col className="col">
                      <InputNumber
                        // className="number"
                        name={`general.expenses[${index}].amount`}
                        control={control}
                        suffix={<div className="suffix">UZS</div>}
                        placeholder="Amount"
                        error={
                          errors?.general?.expenses?.[index]?.amount?.message
                        }
                      />
                    </Col>
                    <Col className="col">
                      {index === 0 ? (
                        <Button
                          onClick={() =>
                            append({
                              received_by: undefined,
                              amount: undefined,
                              expense_category_id: undefined,
                            })
                          }
                          bgColor={bgColors.midori}
                          textColor={textColors.white}
                        >
                          <PlusSvg color={bgColors.white} />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            remove(index);
                          }}
                          bgColor={bgColors.pop}
                          textColor={textColors.white}
                        >
                          <DeleteSvg color={bgColors.white} />
                        </Button>
                      )}
                    </Col>
                  </Wrapper>
                );
              })}
            </div>
          </FormWrapper>
          <ButtonWrapper>
            <Button
              onClick={handleClose}
              bgColor={bgColors.wildSand}
              textColor={textColors.yourShadow}
            >
              Cancel
            </Button>
            <Button type="submit" buttonLoading={create.isLoading}>
              Save
            </Button>
          </ButtonWrapper>
        </form>
      </Spin>
    </AntdModalC>
  );
};

export default DivideExpenseModal;
