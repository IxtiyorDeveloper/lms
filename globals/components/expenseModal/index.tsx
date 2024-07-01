import * as React from "react";
import {
  AntdModal,
  BankGradientSvg,
  BookBoxSvg,
  Button,
  CoinsSvg,
  DeleteSvg,
  Gender,
  GiftHandSvg,
  Input,
  MySelect,
  PlusSvg,
  InputNumber,
  UploadImage,
  TreeSelect,
  SelectMonth,
} from "components";
import {
  ModalTitle,
  Wrapper,
  ButtonWrapper,
  FormWrapper,
  IconWrapper,
  Last,
  Field,
  MonthWrapper,
} from "./style";
import { bgColors, textColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useFieldArray, useForm } from "react-hook-form";
import {
  useCreateBatch,
  useExpenseCategoryList,
  useOneExpense,
  usePageDataMemo,
  useUpdateExpense,
} from "hooks";
import { Spin } from "antd";
import { makeArrayOptions } from "utils/functions/makeArrayOptions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Image from "next/image";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import moment from "moment";
import { generateFullMonthFromMonthYear } from "utils/generateFullMonthFromMonthYear";
import { validationErrorHandler } from "utils";
import UpdateExpenseTask from "./components/allTasks";
import CreateExpenseTask from "./components/task";

const dateFormat = "MMMM yyyy";
const ordered_by_regex = /root\.expenses\[(\d+)\]\.ordered_by/;
const received_by_regex = /root\.expenses\[(\d+)\]\.received_by/;
const CreateExpenseModal = () => {
  const [month, setMonth] = useState<string>(moment().format(dateFormat));
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    watch,
    setError,
  }: any = useForm({
    //default values
    defaultValues: {
      root: {
        files: [
          {
            file: undefined,
          },
        ],
        expenses: [
          {
            description: undefined,
            expense_category_id: undefined,
            branch_id: undefined,
            received_by: undefined,
            ordered_by: undefined,
            payment_form: undefined,
            amount: undefined,
            task_id: undefined,
          },
        ],
      },
    },
  });

  const {
    createExpense: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const id = data?.id;
  const action = data?.action;
  const isViewOnly = data?.isViewOnly || false;

  const {
    data: expense,
    isInitialLoading: expenseLoading,
    isPreviousData,
  } = useOneExpense({
    query_params: {
      id: id,
      expand: "expenseFiles,linkedTasks",
    },
  });

  const createBatch = useCreateBatch({
    onSuccess: () => {
      for (let i = 0; i < data.queryKeys?.length; i++) {
        queryClient.invalidateQueries(data.queryKeys[i]);
      }
      handleClose();
      toast.success("Success");
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const updateExpense = useUpdateExpense({
    onSuccess: () => {
      for (let i = 0; i < data.queryKeys?.length; i++) {
        queryClient.invalidateQueries(data.queryKeys[i]);
      }
      handleClose();
      toast.success("Success");
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const selects = usePageDataMemo();

  const { data: categories, isInitialLoading: isLoading } =
    useExpenseCategoryList({
      page: 1,
      pageSize: 100,
      expand: "children",
    });
  const dispatch = useDispatch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "root.expenses",
  });

  const {
    fields: fileFields,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: "root.files",
  });

  const handleClose = async () => {
    //reset to initial state
    await reset({
      root: {
        files: [
          {
            file: undefined,
          },
        ],
        expenses: [
          {
            description: undefined,
            expense_category_id: undefined,
            branch_id: undefined,
            received_by: undefined,
            ordered_by: undefined,
            payment_form: undefined,
            amount: undefined,
            task_id: undefined,
          },
        ],
      },
    });

    setTimeout(() => {
      dispatch(
        toggleModal({
          key: "createExpense",
          data: {
            data: {},
            open: false,
          },
        })
      );
    }, 0);
    // setValue("root.expenses", []);
    // setValue("root.uploadFile", undefined);
  };

  const onSubmit = (data: any) => {
    const { root } = data;
    const { task_id, ...initial } = root?.expenses?.[0];
    const currentFiles = root?.files?.filter((f: { file: any }) => !!f?.file);
    if (action === "create") {
      let array: any;
      //receipt for files
      if (currentFiles?.length) {
        const files = currentFiles?.map(
          (item: { file: { id: any; name: any } }) => ({
            id: item?.file?.id,
            name: item?.file?.name,
          })
        );
        array = root?.expenses?.map((item: any, index: any) => {
          const { task_id, ...rest } = item;
          const links = task_id?.map((l: any) => {
            return {
              model_id: l,
              model_type: 8500,
            };
          });
          return {
            ...rest,
            links,
            files: files,
          };
        });
      } else {
        array = root?.expenses?.map((item: any, index: any) => {
          const { task_id, ...rest } = item;
          const links = task_id?.map((l: any) => {
            return {
              model_id: l,
              model_type: 8500,
            };
          });
          return {
            ...rest,
            links,
          };
        });
      }
      //create batch array
      createBatch.mutate({
        body: {
          expenses: array,
          date: generateFullMonthFromMonthYear(
            month,
            funcCheckPermission([COMPONENTS_VIEWS.can_create_expense_old_month])
          ),
        },
      });
    }
    //update mutation
    if (action === "update") {
      const links = task_id?.map((l: any) => {
        return {
          model_id: l,
          model_type: 8500,
        };
      });

      let temObj: any;

      if (currentFiles) {
        //collect files
        const files = currentFiles?.map(
          (item: { file: { id: any; name: any } }) => ({
            id: item?.file?.id,
            name: item?.file?.name,
          })
        );

        temObj = {
          ...initial,
          links,
          files,
        };
      } else {
        temObj = { ...initial, links };
      }
      updateExpense.mutate({
        query_params: {
          id,
        },
        body: {
          ...temObj,
          date: generateFullMonthFromMonthYear(
            month,
            funcCheckPermission([COMPONENTS_VIEWS.can_create_expense_old_month])
          ),
        },
      });
    }
  };

  useEffect(() => {
    if (!open) {
      setMonth(moment().format(dateFormat));
    }
    if (action === "update" && !!expense) {
      //set initial values to update
      setValue("root.expenses[0]", {
        description: expense?.description,
        expense_category_id: expense?.expenseCategory?.id,
        branch_id: expense?.branch?.id?.toString(),
        received_by: expense?.receivedBy?.id?.toString(),
        ordered_by: expense?.orderedBy?.id?.toString(),
        payment_form: expense?.payment_form,
        amount: expense?.amount,
        task_id: expense?.linkedTasks?.map((item) =>
          item?.model_id?.toString()
        ),
      });
      if (open) {
        //setting files
        setValue(
          "root.files",
          expense?.expenseFiles?.map((f) => ({
            file: {
              ...f.file,
              name: f.name,
              id: f.file.id,
            },
          }))
        );
      } else {
        setValue("root.files", [
          {
            file: undefined,
          },
        ]);
      }
    }
  }, [expenseLoading, id, isPreviousData, open, expense]);

  useEffect(() => {
    const subscription = watch((value: any, { name, type }: any) => {
      //ordered_by
      const ordered_by_match = name?.match(ordered_by_regex);
      const ordered_by_match_id = ordered_by_match?.[1];
      if (
        type === "change" &&
        name == `root.expenses[${ordered_by_match_id}].ordered_by`
      ) {
        setValue(`root.expenses[${ordered_by_match_id}].task_id`, undefined);
      }
      //received_by
      const received_by_match = name?.match(received_by_regex);
      const received_by_match_id = received_by_match?.[1];
      if (
        type === "change" &&
        name == `root.expenses[${received_by_match_id}].received_by`
      ) {
        setValue(`root.expenses[${received_by_match_id}].task_id`, undefined);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      maskClosable={false}
    >
      <Spin
        spinning={
          isLoading ||
          createBatch.isLoading ||
          updateExpense.isLoading ||
          isPreviousData ||
          expenseLoading
        }
      >
        <ModalTitle>
          <MonthWrapper>
            <p>{action === "update" ? "Update expense" : "Create expense"}</p>
            {funcCheckPermission([
              COMPONENTS_VIEWS.can_create_expense_old_month,
            ]) &&
              action === "create" && (
                <SelectMonth
                  initValue={month}
                  onChange={(e) => {
                    setMonth(e);
                  }}
                />
              )}
          </MonthWrapper>
        </ModalTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper paddingX={20} style={{ padding: "0 20px" }}>
            {fileFields?.map((field, index) => {
              return (
                <div
                  className="row"
                  onClick={(e) => e.stopPropagation()}
                  key={field.id}
                >
                  <UploadImage
                    isViewOnly={isViewOnly}
                    control={control}
                    name={`root.files[${index}].file`}
                    error={errors?.root?.file?.message}
                    setValue={setValue}
                    height="109px"
                    isNecessaryAllFields
                    text="Upload File"
                    watch={`root.files[${index}].file`}
                    image={watch()?.root.files?.[index]?.file?.full_url}
                    filename={watch()?.root.files?.[index]?.file?.name}
                    action={action}
                    canCheckFileType
                    accept={{
                      "image/*": [],
                      "application/pdf": [".pdf"],
                      "application/vnd.ms-excel": [".xls"],
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        [".xlsx"],
                      "audio/*": [],
                      "video/*": [],
                      "application/msword": [".doc"],
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        [".docx"],
                    }}
                    placeholder={
                      <div style={{ userSelect: "none" }} draggable={false}>
                        <Image
                          src="/common/file.png"
                          alt="file"
                          width={80}
                          height={60}
                          draggable={false}
                        />
                      </div>
                    }
                  />
                </div>
              );
            })}
            <div className="add">
              <Button
                style={{ width: "100%" }}
                onClick={() =>
                  appendFile({
                    file: undefined,
                  })
                }
              >
                <PlusSvg /> &nbsp; Add File
              </Button>
            </div>
          </Wrapper>
          {fields?.map((item, index) => {
            return (
              <Field key={item.id} isNext={index > 0}>
                {index > 0 && (
                  <div className="row">
                    <div className="line" />
                  </div>
                )}
                <div className={index > 0 ? "next" : ""}>
                  <Wrapper style={{ paddingBottom: "0" }}>
                    <Input
                      name={`root.expenses[${index}].description`}
                      control={control}
                      type="textarea"
                      label="Expense description"
                      placeholder="Text here"
                      error={
                        errors?.root?.expenses?.[index]?.description?.message
                      }
                    />
                  </Wrapper>
                  <FormWrapper flexStart>
                    <Wrapper>
                      <TreeSelect
                        placeholder="Select"
                        control={control}
                        isParentDisabled
                        name={`root.expenses[${index}].expense_category_id`}
                        label="Category"
                        // @ts-ignore
                        options={makeArrayOptions({
                          arr: categories?.list,
                          label: "name",
                          hasChildDisabled: true,
                          value: "id",
                          hasChild: true,
                        })}
                        error={
                          errors?.root?.expenses?.[index]?.expense_category_id
                            ?.message
                        }
                      />
                    </Wrapper>
                    <Wrapper>
                      <MySelect
                        placeholder="Select"
                        control={control}
                        name={`root.expenses[${index}].branch_id`}
                        label="Branch"
                        options={selects.ownAllBranches}
                        error={
                          errors?.root?.expenses?.[index]?.branch_id?.message
                        }
                      />
                    </Wrapper>
                  </FormWrapper>
                  <FormWrapper flexStart>
                    <Wrapper>
                      <MySelect
                        showSearch
                        placeholder="-"
                        icon={<GiftHandSvg />}
                        control={control}
                        name={`root.expenses[${index}].received_by`}
                        options={selects.staffs}
                        label="Receiver"
                        error={
                          errors?.root?.expenses?.[index]?.received_by?.message
                        }
                      />
                    </Wrapper>
                    <Wrapper>
                      <MySelect
                        showSearch
                        placeholder="-"
                        icon={<BookBoxSvg />}
                        control={control}
                        options={selects.staffs}
                        name={`root.expenses[${index}].ordered_by`}
                        label="Ordered by"
                        error={
                          errors?.root?.expenses?.[index]?.ordered_by?.message
                        }
                      />
                    </Wrapper>
                  </FormWrapper>
                  <FormWrapper flexStart>
                    <Wrapper>
                      {action == "update" ? (
                        <UpdateExpenseTask
                          control={control}
                          index={index}
                          watch={watch}
                        />
                      ) : (
                        <CreateExpenseTask
                          control={control}
                          index={index}
                          watch={watch}
                        />
                      )}
                    </Wrapper>
                  </FormWrapper>
                  <FormWrapper style={{ paddingTop: "0" }}>
                    <Wrapper>
                      <Gender
                        value={200}
                        name={`root.expenses[${index}].payment_form`}
                        control={control}
                        icon={() => {
                          return (
                            <IconWrapper>
                              <CoinsSvg />
                              MOT
                            </IconWrapper>
                          );
                        }}
                        error={
                          errors?.root?.expenses?.[index]?.payment_form?.message
                        }
                      />
                    </Wrapper>
                    {funcCheckPermission([
                      COMPONENTS_VIEWS.can_create_expense_with_bank,
                    ]) && (
                      <Wrapper>
                        <Gender
                          value={100}
                          name={`root.expenses[${index}].payment_form`}
                          control={control}
                          icon={() => {
                            return (
                              <IconWrapper>
                                <BankGradientSvg height={16} width={16} /> Bank
                              </IconWrapper>
                            );
                          }}
                          error={
                            errors?.root?.expenses?.[index]?.payment_form
                              ?.message
                          }
                        />
                      </Wrapper>
                    )}
                  </FormWrapper>
                  <Wrapper>
                    <Last
                      isErr={!!errors?.root?.expenses?.[index]?.amount?.message}
                    >
                      <InputNumber
                        label="Payment amount"
                        name={`root.expenses[${index}].amount`}
                        control={control}
                        suffix={<div className="suffix">UZS</div>}
                        error={errors?.root?.expenses?.[index]?.amount?.message}
                      />
                      {action === "create" && (
                        <Button
                          icon={<DeleteSvg width={20} height={20} />}
                          onClick={() => {
                            remove(index);
                          }}
                          style={{
                            padding: "0 24px",
                            color: textColors.blueGray,
                            backgroundColor: bgColors.pale,
                          }}
                        />
                      )}
                    </Last>
                  </Wrapper>
                </div>
              </Field>
            );
          })}
          {action === "create" && (
            <Wrapper paddingX={20}>
              <Button
                style={{ width: "100%" }}
                onClick={() =>
                  append({
                    description: undefined,
                    expense_category_id: undefined,
                    branch_id: undefined,
                    received_by: undefined,
                    ordered_by: undefined,
                    payment_form: undefined,
                    amount: undefined,
                  })
                }
              >
                <PlusSvg /> &nbsp; Add expense
              </Button>
            </Wrapper>
          )}
          <ButtonWrapper>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
            >
              Cancel
            </Button>
            {!isViewOnly && (
              <Button
                type="submit"
                buttonLoading={createBatch.isLoading || updateExpense.isLoading}
              >
                Save
              </Button>
            )}
          </ButtonWrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default CreateExpenseModal;
