import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  CircleImage,
  CircleSmsSvg,
  DatePicker,
  DeleteSvg,
  DoubleArrowSvg,
  HasMoneyOperation,
  Input,
  InputNumber,
  MySelect,
  PlusSvg,
} from "components";
import {
  AntdModalC,
  ButtonWrapper,
  DateWrapper,
  FormWrapper,
  MainDescriptionWrapper,
  ModalTitle,
  StyledContent,
  StyledContentForMain,
  Wrapper,
} from "./style";
import { bgColors, textColors } from "styles/theme";
import { useFieldArray, useForm } from "react-hook-form";
import { Popover, Spin } from "antd";
import {
  useCreateDetailedCoverTeacher,
  useGetDetailedCoverTeacherFormData,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { TestCreateCoverTeacher } from "validation/finance/salary";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import {
  CoverActions,
  ICoverTeacherSettings,
  IDetailedCoverTeacher,
} from "types/finance/salary";
import { IOption } from "components/common/select/type";
import {
  createAssignments,
  currentDueGroupSumCalculator,
  currentGroupSumCalculator,
  disableOptions,
  dueSumCalculator,
  generateDescriptionArray,
  generateDescriptionArrayForMain,
  makeAssignmentOptions,
  mergeAndCheckGroupIds,
  restructureData,
  rewardSumCalculator,
} from "./utils";
import { ICoverTeacher } from "./type";
import { queryKeys } from "../../../constants/queryKeys";
import { makeFilteredGroupOptions, makeGroupOptions } from "./options";
import { validationErrorHandler } from "utils";

const regex = /teachers\[(\d+)\]\.group_id/;
const regexMoneyOperation =
  /teachers\[(\d+)\]\.has_cover_teacher_money_operation/;
const regexUserId = /teachers\[(\d+)\]\.user_id/;
const CoverTeacherModal = () => {
  const [groupsCollector, setGroupsCollector] = useState<undefined | IOption[]>(
    undefined,
  );

  const dispatch = useDispatch();
  const {
    coverTeacher: { data: reduxData, open },
  } = useSelector((state: IStore) => state.modals);
  const isUpdate = reduxData?.type === CoverActions.UPDATE;
  const settings: ICoverTeacherSettings | undefined = reduxData?.settings;
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ICoverTeacher>({
    resolver: yupResolver(TestCreateCoverTeacher),
    defaultValues: {
      group_id: undefined,
      has_main_teacher_money_operation: true,
      teachers: [
        {
          user_id: undefined,
          amount: undefined,
          group_id: undefined,
          description: undefined,
          main_description: undefined,
          has_cover_teacher_money_operation: true,
        },
      ],
    },
  });

  const date = watch("date");

  const { data: formData, isFetching } = useGetDetailedCoverTeacherFormData({
    body: {
      date: watch("date"),
      assignment_id: reduxData?.id ?? watch("user_id"),
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "teachers",
  });

  const create = useCreateDetailedCoverTeacher({
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.admin_v1_finance_salary_detailed_cover_index,
      ]);
      handleClose();
      toast.success("Success");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleClose = () => {
    reset({
      group_id: undefined,
      has_main_teacher_money_operation: true,
      teachers: [
        {
          user_id: undefined,
          amount: undefined,
          group_id: undefined,
          has_cover_teacher_money_operation: true,
          description: undefined,
          main_description: undefined,
        },
      ],
    });

    setGroupsCollector(undefined);
    setTimeout(() => {
      dispatch(
        toggleModal({
          key: "coverTeacher",
          data: {
            data: {},
            open: false,
          },
        }),
      );
    }, 0);
  };
  const watchAll = watch();
  const onSubmit = (data: ICoverTeacher) => {
    if (mergeAndCheckGroupIds(data)) {
      create.mutate({
        body: {
          date: data?.date,
          assignment_id: data?.user_id,
          covers: createAssignments({
            data: watchAll,
          }),
        },
      });
    } else {
      toast.error("Please select all groups in Cover Teacher side");
    }
  };

  const data: IDetailedCoverTeacher = reduxData?.data;

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const match = name?.match(regex);
      const match_has_cover_teacher_money_operation =
        name?.match(regexMoneyOperation);
      const matchRegexUserId = name?.match(regexUserId);
      const dynamicNumber: any = match?.[1];
      const dynamic_has_cover_teacher_money_operation: any =
        match_has_cover_teacher_money_operation?.[1];
      const dynamicRegexUserId: any = matchRegexUserId?.[1];

      if (name === `group_id` && type === "change") {
        setGroupsCollector(
          makeFilteredGroupOptions({
            groups: formData?.groups,
            selectedGroups: value?.group_id as any,
          }),
        );
        let array: any = [];
        const teachers = value?.teachers;
        if (teachers)
          for (let i = 0; i < teachers?.length; i++) {
            array = [
              ...array,
              {
                ...teachers?.[i],
                group_id: undefined,
                amount: undefined,
              },
            ];
          }
        setValue("teachers", array);
        const groups = value?.group_id;
        if (groups) {
          let sum = 0;
          if (value.has_main_teacher_money_operation) {
            for (let i = 0; i < groups?.length; i++) {
              const group_id = groups[i];
              sum = dueSumCalculator({
                formData,
                group_id,
                settings,
                sum,
              });
            }
            setValue("amount", sum);
          } else {
            setValue("amount", undefined);
          }
        }
      }
      if (name === "user_id" && type === "change") {
        setValue("group_id", []);
        setValue("amount", undefined);
        setValue("teachers", [
          {
            user_id: undefined,
            amount: undefined,
            description: undefined,
            group_id: undefined,
            has_cover_teacher_money_operation: true,
          },
        ]);
      }
      if (name === "has_main_teacher_money_operation" && type === "change") {
        if (value?.teachers)
          for (
            let teacherId = 0;
            teacherId < value?.teachers?.length;
            teacherId++
          ) {
            const cover_groups = value?.teachers?.[teacherId]?.group_id;
            //rewrite main description if has_main_teacher_money_operation changes
            let main_description: any = {};
            if (cover_groups)
              for (let i = 0; i < cover_groups?.length; i++) {
                const group_id = cover_groups[i];

                const currentDueGroupSum = currentDueGroupSumCalculator({
                  formData,
                  group_id,
                  settings,
                });

                main_description = generateDescriptionArrayForMain({
                  currentGroupSum: currentDueGroupSum,
                  description: main_description,
                  dynamicId: teacherId,
                  formData: formData,
                  group_id,
                  reduxData,
                  value,
                });
              }
            setValue(
              `teachers[${teacherId}].main_description` as any,
              main_description,
            );
          }
        // rewrite amount
        if (value.has_main_teacher_money_operation) {
          const groups = value?.group_id;
          if (groups) {
            let sum = 0;
            for (let i = 0; i < groups?.length; i++) {
              const group_id = groups[i];
              sum = dueSumCalculator({
                formData,
                group_id,
                settings,
                sum,
              });
            }
            setValue("amount", sum);
          }
        } else {
          setValue("amount", undefined);
        }
      }
      if (name === "date" && type === "change") {
        setValue("group_id", []);
        setValue("amount", undefined);
        setValue("teachers", [
          {
            user_id: undefined,
            amount: undefined,
            description: undefined,
            group_id: undefined,
            has_cover_teacher_money_operation: true,
          },
        ]);
      }
      if (name === `teachers[${dynamicNumber}].group_id` && type === "change") {
        const teachers = watch("teachers");
        if (teachers) {
          setGroupsCollector(disableOptions(groupsCollector, teachers));
        }
        const groups = value?.teachers?.[dynamicNumber]?.group_id;
        if (
          value?.teachers?.[dynamicNumber]?.has_cover_teacher_money_operation
        ) {
          if (groups) {
            let sum = 0;
            let description: any = {};
            let main_description: any = {};
            for (let i = 0; i < groups?.length; i++) {
              const group_id = groups[i];
              sum = rewardSumCalculator({
                formData,
                group_id,
                settings,
                sum,
              });

              const currentGroupSum = currentGroupSumCalculator({
                formData,
                group_id,
                settings,
              });
              const currentDueGroupSum = currentDueGroupSumCalculator({
                formData,
                group_id,
                settings,
              });
              description = generateDescriptionArray({
                currentGroupSum: currentGroupSum,
                description,
                dynamicId: dynamicNumber,
                formData: formData,
                group_id,
                reduxData,
                value,
              });
              main_description = generateDescriptionArrayForMain({
                currentGroupSum: currentDueGroupSum,
                description: main_description,
                dynamicId: dynamicNumber,
                formData: formData,
                group_id,
                reduxData,
                value,
              });
            }
            setValue(`teachers[${dynamicNumber}].amount` as any, sum);
            setValue(
              `teachers[${dynamicNumber}].description` as any,
              description,
            );
            setValue(
              `teachers[${dynamicNumber}].main_description` as any,
              main_description,
            );
          }
        } else {
          if (groups) {
            let description: any = {};
            let main_description: any = {};

            for (let i = 0; i < groups?.length; i++) {
              const group_id = groups[i];

              const currentGroupSum = currentGroupSumCalculator({
                formData,
                group_id,
                settings,
              });

              const currentDueGroupSum = currentDueGroupSumCalculator({
                formData,
                group_id,
                settings,
              });

              description = generateDescriptionArray({
                currentGroupSum: currentGroupSum,
                description,
                dynamicId: dynamicNumber,
                formData: formData,
                group_id,
                reduxData,
                value,
              });
              main_description = generateDescriptionArrayForMain({
                currentGroupSum: currentDueGroupSum,
                description: main_description,
                dynamicId: dynamicNumber,
                formData: formData,
                group_id,
                reduxData,
                value,
              });
            }
            setValue(
              `teachers[${dynamicNumber}].description` as any,
              description,
            );
            setValue(
              `teachers[${dynamicNumber}].main_description` as any,
              main_description,
            );
          }
          setValue(`teachers[${dynamicNumber}].amount` as any, null);
        }
      }
      if (
        name === `teachers[${dynamicRegexUserId}].user_id` &&
        type === "change"
      ) {
        const groups = value?.teachers?.[dynamicRegexUserId]?.group_id;
        if (groups) {
          let description: any = {};
          let main_description: any = {};
          for (let i = 0; i < groups?.length; i++) {
            const group_id = groups[i];

            const currentGroupSum = currentGroupSumCalculator({
              formData,
              group_id,
              settings,
            });
            const currentDueGroupSum = currentDueGroupSumCalculator({
              formData,
              group_id,
              settings,
            });
            description = generateDescriptionArray({
              currentGroupSum: currentGroupSum,
              description,
              dynamicId: dynamicRegexUserId,
              formData: formData,
              group_id,
              reduxData,
              value,
            });

            main_description = generateDescriptionArrayForMain({
              currentGroupSum: currentDueGroupSum,
              description: main_description,
              dynamicId: dynamicRegexUserId,
              formData: formData,
              group_id,
              reduxData,
              value,
            });
          }
          setValue(
            `teachers[${dynamicRegexUserId}].description` as any,
            description,
          );
          setValue(
            `teachers[${dynamicRegexUserId}].main_description` as any,
            main_description,
          );
        }
      }
      if (
        name ===
          `teachers[${dynamic_has_cover_teacher_money_operation}].has_cover_teacher_money_operation` &&
        type === "change"
      ) {
        if (
          !value?.teachers?.[dynamic_has_cover_teacher_money_operation]
            ?.has_cover_teacher_money_operation
        ) {
          setValue(
            `teachers[${dynamic_has_cover_teacher_money_operation}].amount` as any,
            null,
          );
          const groups =
            value?.teachers?.[dynamic_has_cover_teacher_money_operation]
              ?.group_id;
          if (groups) {
            let description: any = {};
            let main_description: any = {};
            for (let i = 0; i < groups?.length; i++) {
              const group_id = groups[i];

              const currentDueGroupSum = currentDueGroupSumCalculator({
                formData,
                group_id,
                settings,
              });

              description = generateDescriptionArray({
                currentGroupSum: 0,
                description,
                dynamicId: dynamic_has_cover_teacher_money_operation,
                formData: formData,
                group_id,
                reduxData,
                value,
              });

              main_description = generateDescriptionArrayForMain({
                currentGroupSum: currentDueGroupSum,
                description: main_description,
                dynamicId: dynamic_has_cover_teacher_money_operation,
                formData: formData,
                group_id,
                reduxData,
                value,
              });
            }
            setValue(
              `teachers[${dynamic_has_cover_teacher_money_operation}].description` as any,
              description,
            );
            setValue(
              `teachers[${dynamic_has_cover_teacher_money_operation}].main_description` as any,
              main_description,
            );
          }
        } else {
          const teachers = watch("teachers");
          if (teachers) {
            setGroupsCollector(disableOptions(groupsCollector, teachers));
          }
          const groups =
            value?.teachers?.[dynamic_has_cover_teacher_money_operation]
              ?.group_id;
          if (groups) {
            let sum = 0;
            let description: any = {};
            let main_description: any = {};

            for (let i = 0; i < groups?.length; i++) {
              const group_id = groups[i];

              sum = rewardSumCalculator({
                formData,
                group_id,
                settings,
                sum,
              });

              const currentGroupSum = currentGroupSumCalculator({
                formData,
                group_id,
                settings,
              });

              const currentDueGroupSum = currentDueGroupSumCalculator({
                formData,
                group_id,
                settings,
              });

              description = generateDescriptionArray({
                currentGroupSum: currentGroupSum,
                description,
                dynamicId: dynamic_has_cover_teacher_money_operation,
                formData: formData,
                group_id,
                reduxData,
                value,
              });

              main_description = generateDescriptionArrayForMain({
                currentGroupSum: currentDueGroupSum,
                description: main_description,
                dynamicId: dynamic_has_cover_teacher_money_operation,
                formData: formData,
                group_id,
                reduxData,
                value,
              });
            }
            setValue(
              `teachers[${dynamic_has_cover_teacher_money_operation}].description` as any,
              description,
            );
            setValue(
              `teachers[${dynamic_has_cover_teacher_money_operation}].main_description` as any,
              main_description,
            );
            setValue(
              `teachers[${dynamic_has_cover_teacher_money_operation}].amount` as any,
              sum,
            );
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, formData?.groups, groupsCollector, fields.length, settings]);

  useEffect(() => {
    if (reduxData?.type === CoverActions.UPDATE && open) {
      setValue("date", reduxData?.date);
    }
  }, [open]);

  useEffect(() => {
    if (reduxData?.type === CoverActions.UPDATE && formData && open) {
      const covered_teachers: unknown[] | undefined = restructureData(
        formData?.covers,
      );
      let teachers: any = [];

      if (!!covered_teachers?.length) {
        for (let i = 0; i < covered_teachers?.length; i++) {
          const covered_teacher: any = covered_teachers?.[i];
          const groups = covered_teacher?.covers?.map(
            (c: { group_id: number }) => c.group_id?.toString(),
          );
          let covered_sum = 0;
          if (groups) {
            for (let i = 0; i < groups?.length; i++) {
              const group_id = groups[i];
              covered_sum = covered_teacher?.covers?.[i]
                ?.has_cover_teacher_money_operation
                ? rewardSumCalculator({
                    formData,
                    group_id,
                    settings,
                    sum: covered_sum,
                  })
                : 0;
            }
          }

          let description = {};
          let main_description = {};
          for (let j = 0; j < covered_teacher?.covers?.length; j++) {
            const cover = covered_teacher?.covers?.[j];
            description = {
              ...description,
              [cover?.group_id]: cover?.description,
            };
            main_description = {
              ...main_description,
              [cover?.group_id]: cover?.main_description,
            };
          }

          teachers = [
            ...teachers,
            {
              user_id: covered_teacher?.assignment_id?.toString(),
              amount: covered_sum == 0 ? undefined : covered_sum,
              group_id: covered_teacher?.covers?.map(
                (c: { group_id: number }) => c.group_id?.toString(),
              ),
              has_cover_teacher_money_operation: covered_teacher?.covers?.some(
                (c: { has_cover_teacher_money_operation: boolean }) =>
                  c.has_cover_teacher_money_operation,
              ),
              description,
              main_description,
            },
          ];
        }
        const groups = teachers.reduce(
          (acc: string | any[], item: { group_id: any }) =>
            acc.concat(item.group_id),
          [],
        );
        let was_covered_sum = 0;
        if (groups) {
          for (let i = 0; i < groups?.length; i++) {
            const group_id = groups[i];

            was_covered_sum = dueSumCalculator({
              formData,
              group_id,
              settings,
              sum: was_covered_sum,
            });
          }
        }

        setValue("user_id", reduxData?.id?.toString());
        setValue("amount", was_covered_sum);
        setValue(
          "has_main_teacher_money_operation",
          formData?.covers?.every((c) => c.has_main_teacher_money_operation),
        );
        setValue(
          "group_id",
          teachers.reduce(
            (acc: string | any[], item: { group_id: any }) =>
              acc.concat(item.group_id),
            [],
          ),
        );
        setValue("teachers", teachers);
        setGroupsCollector(
          disableOptions(
            makeFilteredGroupOptions({
              groups: formData?.groups,
              selectedGroups: teachers.reduce(
                (acc: string | any[], item: { group_id: any }) =>
                  acc.concat(item.group_id),
                [],
              ) as any,
            }),
            teachers,
          ),
        );
      } else {
        setValue("teachers", [
          {
            user_id: undefined,
            amount: undefined,
            group_id: undefined,
            description: undefined,
            main_description: undefined,
            has_cover_teacher_money_operation: true,
          },
        ]);
      }
    }
  }, [reduxData?.type, formData, open]);

  return (
    <AntdModalC open={open} onCancel={handleClose} centered width="80%">
      <Spin spinning={isFetching}>
        <DateWrapper>
          <DatePicker
            control={control}
            name="date"
            format={DATE_FORMAT_YYYY_MM_DD}
            valueFormat={DATE_FORMAT_YYYY_MM_DD}
            className="abs"
            error={errors?.date?.message}
          />
        </DateWrapper>
        <div className="flex-head">
          <ModalTitle>Replaced Teacher</ModalTitle>
          <ModalTitle>Cover Teacher</ModalTitle>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <Wrapper>
              <div className="image-custom">
                <CircleImage
                  src={
                    data?.assignments?.find(
                      (teacher) => teacher.id == (watch as any)("user_id"),
                    )?.user?.userProfile?.avatar
                  }
                  // alt="asds"
                  className="profile"
                  width={40}
                  height={40}
                />
                <HasMoneyOperation
                  control={control}
                  name="has_main_teacher_money_operation"
                />
              </div>

              <MySelect
                disabled={isUpdate}
                name="user_id"
                control={control}
                options={makeAssignmentOptions(data?.assignments)}
                placeholder="Select Teacher"
                showSearch
                error={errors?.user_id?.message}
              />
              <MySelect
                // disabled={isUpdate}
                options={
                  (reduxData?.date ?? watch("date")) &&
                  (reduxData?.id ?? watch("user_id"))
                    ? makeGroupOptions(formData?.groups)
                    : []
                }
                name="group_id"
                control={control}
                placeholder="Groups"
                error={errors?.group_id?.message}
                mode="multiple"
                maxTagCount={1}
              />
              <div className="left">
                <InputNumber
                  name="amount"
                  control={control}
                  suffix={<div className="suffix">UZS</div>}
                  error={errors?.amount?.message}
                  disabled
                />
              </div>
              <Popover
                destroyTooltipOnHide
                getPopupContainer={(trigger) => trigger.parentElement as any}
                content={() => (
                  <MainDescriptionWrapper>
                    <p className="title">Create note</p>
                    {fields.map((field, index) => {
                      return (
                        <StyledContentForMain key={field.id}>
                          <div className="container">
                            {watch("teachers")?.[index]?.group_id?.map(
                              (item, itemIndex) => {
                                return (
                                  <div
                                    className="editor"
                                    key={`${itemIndex}_${index}`}
                                  >
                                    <Input
                                      name={`teachers[${index}].main_description.${item}`}
                                      control={control}
                                      placeholder="description"
                                      type="textarea"
                                      rows={8}
                                    />
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </StyledContentForMain>
                      );
                    })}
                  </MainDescriptionWrapper>
                )}
                trigger="click"
                placement="bottomRight"
              >
                <div className="sms">
                  <CircleSmsSvg />
                </div>
              </Popover>
            </Wrapper>
            <div className="svg">
              <DoubleArrowSvg
                color={
                  watch("amount") && watch("group_id") && watch("user_id")
                    ? bgColors.midori
                    : bgColors.pop
                }
              />
            </div>
            <div style={{ width: "100%" }}>
              {fields.map((field, index) => {
                return (
                  <Wrapper key={field.id}>
                    <div className="image-custom">
                      <CircleImage
                        src={
                          data?.assignments?.find(
                            (teacher) =>
                              teacher.id ==
                              (watch as any)(`teachers[${index}].user_id`),
                          )?.user?.userProfile?.avatar
                        }
                        alt="asds"
                        className="profile"
                        width={40}
                        height={40}
                      />
                      <HasMoneyOperation
                        control={control}
                        name={`teachers[${index}].has_cover_teacher_money_operation`}
                      />
                    </div>
                    <MySelect
                      name={`teachers[${index}].user_id`}
                      control={control}
                      options={makeAssignmentOptions(data?.assignments)}
                      placeholder="Select Teacher"
                      showSearch
                      error={errors?.teachers?.[index]?.user_id?.message}
                    />

                    <MySelect
                      // disabled={isUpdate}
                      options={groupsCollector}
                      showSearch
                      name={`teachers[${index}].group_id`}
                      control={control}
                      placeholder="Groups"
                      error={errors?.teachers?.[index]?.group_id?.message}
                      mode="multiple"
                      maxTagCount={1}
                    />
                    <div className="right">
                      <InputNumber
                        name={`teachers[${index}].amount`}
                        control={control}
                        suffix={<div className="suffix">UZS</div>}
                        error={errors?.teachers?.[index]?.amount?.message}
                        disabled
                      />
                    </div>
                    <Popover
                      destroyTooltipOnHide
                      getPopupContainer={(trigger) =>
                        trigger.parentElement as any
                      }
                      content={() => (
                        <StyledContent>
                          <p className="title">Create note</p>
                          <div className="container">
                            {watch("teachers")?.[index]?.group_id?.map(
                              (item, itemIndex) => {
                                return (
                                  <div
                                    className="editor"
                                    key={`${itemIndex}_${index}`}
                                  >
                                    <Input
                                      name={`teachers[${index}].description.${item}`}
                                      control={control}
                                      placeholder="description"
                                      type="textarea"
                                      rows={8}
                                    />
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </StyledContent>
                      )}
                      trigger="click"
                      placement="bottomRight"
                    >
                      <div className="sms">
                        <CircleSmsSvg />
                      </div>
                    </Popover>
                    {index === 0 ? (
                      <Button
                        onClick={() =>
                          append({
                            user_id: undefined,
                            amount: undefined,
                            group_id: undefined,
                            description: undefined,
                            main_description: undefined,
                            has_cover_teacher_money_operation: true,
                          })
                        }
                        bgColor={bgColors.midori}
                        textColor={textColors.white}
                      >
                        <PlusSvg color={bgColors.white} />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => remove(index)}
                        bgColor={bgColors.pop}
                        textColor={textColors.white}
                      >
                        <DeleteSvg color={bgColors.white} />
                      </Button>
                    )}
                  </Wrapper>
                );
              })}
            </div>
          </FormWrapper>
          <ButtonWrapper>
            <Button
              onClick={() => {
                reset();
                setValue("teachers", [
                  {
                    user_id: undefined,
                    amount: undefined,
                    description: undefined,
                    main_description: undefined,
                    group_id: undefined,
                    has_cover_teacher_money_operation: true,
                  },
                ]);
              }}
              bgColor={bgColors.wildSand}
              textColor={textColors.yourShadow}
            >
              Reset
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

export default CoverTeacherModal;
