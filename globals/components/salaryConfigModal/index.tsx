import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { groupBy, isArray, isEmpty, map, mapKeys } from "lodash";
import {
  KPI_ADDITIONAL_3,
  KPI_COMMUNITY_MANAGER,
  KPI_FRESHMAN,
  KPI_INCALL,
  KPI_LOST_BACK,
  KPI_OFFENCE,
  KPI_ONLINE_PAYMENT,
  KPI_PASSING_RATE,
  KPI_PENALTY,
  KPI_REGISTERED_STUDENT,
  KPI_STUDENT_AMOUNT,
  KPI_SUPPORT,
  KPI_TEACHER,
  KPI_TEACHING,
} from "constants/kpi";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  ModalTitle,
  AntdModalC,
  ButtonWrapper,
  FormWrapper,
  ContentWrapper,
  FullContainer,
  ContentTab,
} from "./style";
import { Button, InputNumber, Segmented } from "components";
import { bgColors, textColors } from "styles/theme";
import { IStore, toggleModal } from "store";
import { useFinancePageData, useSaveFinanceConfig } from "hooks";
import KPIForm from "./components/kpiForm";
import Exclusions from "./components/exclusions";
import MinMax from "./components/minMax";
import { queryKeys } from "constants/queryKeys";
import MinMaxTeacher from "./components/minMaxTeacher";
import { validationErrorHandler } from "utils";
import BonusForm from "./components/bonusForm";
import PenaltyForm from "./components/penaltyForm";

const SalaryConfigModal = () => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      kpis: [],
    },
  });
  const data = useSelector((state: IStore) => state.modals.financeConfig.data);
  const openModal = useSelector(
    (state: IStore) => state.modals.financeConfig.open
  );

  const queryClient = useQueryClient();
  const title = data?.data?.shift?.name
    ? `${data?.data?.role?.name} (${data?.data?.shift?.name})`
    : data?.data?.role?.name;
  const dispatch = useDispatch();
  const handleClose = () => {
    reset();
    dispatch(
      toggleModal({
        key: "financeConfig",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const save = useSaveFinanceConfig({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.finance_config_page_data],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.admin_finance_salary_main_index],
      });

      handleClose();
      reset();
      toast.success("Config changed!");
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: true,
        setError,
        formHookMainField: false,
      });
    },
  });

  // bu yerda backenda qabul qiladigan fieldlar yig'ilgan
  const onSubmit = (formData: any) => {
    const ex = formData.exclusions?.map((e: any) => {
      const a = e;
      const kpi_type = e.type;
      delete a.type;
      return {
        user_id: e.user_id,
        ...(1 == kpi_type
          ? {
              total_salary: e.total_salary,
            }
          : 2 == kpi_type
            ? {
                fixed_salary: e.fix_salary,
              }
            : {}),

        kpis: [
          KPI_ONLINE_PAYMENT == kpi_type || KPI_OFFENCE == kpi_type
            ? {
                enum: kpi_type,
                configuration: { ...a, ranges: undefined },
              }
            : {
                ...(kpi_type != 1 && kpi_type != 2 ? { enum: kpi_type } : {}),
                configuration:
                  KPI_FRESHMAN == kpi_type || KPI_INCALL == kpi_type
                    ? {
                        ranges: map(a, (value) => {
                          return value;
                        }).filter((e) => !!e && typeof e === "object"),
                      }
                    : 3 == kpi_type
                      ? a
                      : undefined,
              },
        ],
      };
    });
    const a = groupBy<any>(ex, "user_id");
    let result: any[] = [];
    map(a, (value) => {
      let newMergedObject: any = {
        kpis: [],
      };
      for (let j = 0; j < value?.length; j++) {
        newMergedObject = {
          ...newMergedObject,
          ...value[j],
          kpis:
            [...newMergedObject.kpis, ...value[j]?.kpis].length > 0
              ? [...newMergedObject.kpis, ...value[j]?.kpis]
                  .map((e) => {
                    return {
                      ...e,
                      enum: e.enum === KPI_ADDITIONAL_3 ? KPI_TEACHING : e.enum,
                      ...(e.configuration
                        ? {
                            configuration: {
                              ...e.configuration,
                              ranges: e.configuration.ranges?.filter(
                                (e: any) => !isArray(e)
                              ),
                            },
                          }
                        : {}),
                    };
                  })
                  .filter((e) => {
                    return (
                      !isEmpty(e) &&
                      !isEmpty(e.configuration) &&
                      !!e.configuration
                    );
                  })
              : undefined,
        };
      }
      result.push(newMergedObject);
    });
    const transformedObject = mapKeys(
      formData.teacher_min_maxes,
      (value, key) => {
        return key.replace("a", "");
      }
    );
    let bonus: any = undefined;
    let isHave = false;
    map(formData.bonus, (value, key) => {
      if (typeof value === "number") {
        bonus = !!bonus
          ? {
              ...bonus,
              [key.substring(1)]: value,
            }
          : { [key.substring(1)]: value };
      } else {
        isHave = true;
      }
    });
    save.mutate({
      ...data,
      shift_id: data.shift_id && data.shift_id?.id,
      min_maxes: (formData.min_maxes ?? [])?.filter?.((e: any) => !!e?.to),
      teacher_min_maxes: transformedObject || [],
      fixed_salary: formData.fixed_salary,
      difference_limit: formData.difference_limit,
      kpis: [
        ...formData.kpis
          ?.filter((e: any) => e.kpi_type !== KPI_TEACHER)
          ?.map((e: any) => {
            const a = e;
            const kpi_type = e.kpi_type;
            delete a.kpi_type;
            return KPI_SUPPORT == kpi_type ||
              KPI_PASSING_RATE == kpi_type ||
              KPI_OFFENCE == kpi_type ||
              KPI_ONLINE_PAYMENT == kpi_type ||
              KPI_STUDENT_AMOUNT == kpi_type ||
              KPI_COMMUNITY_MANAGER == kpi_type
              ? {
                  enum: kpi_type,
                  configuration: isHave ? {} : { ...a, ranges: undefined },
                }
              : KPI_FRESHMAN == kpi_type ||
                  KPI_REGISTERED_STUDENT == kpi_type ||
                  KPI_INCALL == kpi_type ||
                  KPI_LOST_BACK == kpi_type
                ? {
                    enum: kpi_type,
                    configuration: {
                      ranges: map(a, (value) => {
                        return value;
                      }).filter((e) => {
                        return !isArray(e) && !!e;
                      }),
                    },
                  }
                : {
                    enum: kpi_type,
                    configuration: {
                      ranges: e.ranges.filter((e: any) => {
                        return !isArray(e) && !!e;
                      }),
                    },
                  };
          }),
        bonus && {
          enum: KPI_TEACHER,
          configuration: bonus,
        },
        formData.penalty_amount_per_fault && {
          enum: KPI_PENALTY,
          configuration: {
            amount: formData.penalty_amount_per_fault,
          },
        },
      ].filter((e: any) => {
        return !isEmpty(e) && !!e.enum;
      }),
      exclusions: result.filter((e: any) => {
        return !!e;
      }),
    });
  };

  const { isLoading, data: pageData } = useFinancePageData({
    ...data,
    open: openModal || false,
  });

  const selects = useMemo(() => {
    if (!!pageData) {
      setValue("min_salary", pageData.model.min_salary);
      setValue("max_salary", pageData.model.max_salary);
      setValue("fixed_salary", pageData.model.fixed_salary);
      setValue("difference_limit", pageData.model.difference_limit);
      return {
        kpiTypes: pageData.config?.kpis?.map((e) => {
          return {
            value: e.enum,
            label: e.name,
          };
        }),
        staff: pageData.config.users.map((e) => {
          return {
            value: e.user.id,
            label: `${e.user?.userProfile?.firstname || ""} ${
              e.user?.userProfile?.lastname || ""
            }`,
          };
        }),
      };
    }
    return [];
  }, [pageData]);

  const [active, setActive] = useState<string>("1");
  useEffect(() => {
    const subscription = watch(() => {
      if (!!errors) {
        clearErrors();
      }
    });
    return () => {
      reset();
      subscription.unsubscribe();
      setActive("1");
    };
  }, []);

  const content = {
    "1": (
      <ContentWrapper>
        {/*<TitleWrapper color="blue">Fixed</TitleWrapper>*/}
        <FormWrapper pb={0}>
          <div className="card">
            <div className="label">Fixed salary for this shift</div>
            <InputNumber
              name="fixed_salary"
              label="Amount"
              control={control}
              suffix={<div className="suffix green">UZS</div>}
              className="currency"
              error={errors?.fixed_salary?.message}
            />
          </div>
        </FormWrapper>
      </ContentWrapper>
    ),
    "2": (
      <ContentWrapper>
        <KPIForm
          pageData={pageData}
          control={control}
          selects={selects}
          watch={watch}
          setValue={setValue}
          errors={errors}
        />
      </ContentWrapper>
    ),
    "3": (
      <ContentWrapper>
        {pageData?.model?.role?.key === 100 && (
          <BonusForm
            pageData={pageData}
            control={control}
            selects={selects}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
        )}
      </ContentWrapper>
    ),
    "4": (
      <ContentWrapper>
        <PenaltyForm
          control={control}
          kpi={pageData?.model?.kpis}
          setValue={setValue}
        />
      </ContentWrapper>
    ),
    "5": (
      <ContentWrapper>
        {pageData?.model?.role?.key === 100 ? (
          <MinMaxTeacher
            control={control}
            setValue={setValue}
            errors={errors}
            pageData={pageData}
          />
        ) : (
          <MinMax
            control={control}
            setValue={setValue}
            errors={errors}
            pageData={pageData}
          />
        )}
        <FormWrapper>
          <div className="card">
            <div className="label">
              Difference in salaries compared to last months (up and down)
            </div>
            <InputNumber
              name="difference_limit"
              label="Ignore up to"
              control={control}
              suffix={<div className="suffix green">UZS</div>}
              className="currency"
              error={errors?.fixed_salary?.message}
            />
          </div>
        </FormWrapper>
      </ContentWrapper>
    ),
    "6": (
      <ContentWrapper>
        <Exclusions
          control={control}
          selects={selects}
          watch={watch}
          pageData={pageData}
          setValue={setValue}
          errors={errors}
        />
      </ContentWrapper>
    ),
  };

  return (
    <AntdModalC open={openModal} onCancel={handleClose} width={650}>
      <Spin spinning={isLoading}>
        <ModalTitle>{title}</ModalTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FullContainer>
            <div className="pd">
              <Segmented
                options={[
                  { label: "Fixed", value: "1" },
                  { label: "KPI", value: "2" },
                  { label: "Bonus", value: "3" },
                  { label: "Penalty", value: "4" },
                  { label: "Salary range", value: "5" },
                  { label: "Exclusions", value: "6" },
                ]}
                block
                onChange={(e: string) => {
                  setActive(e);
                }}
                initValue={active}
              />
            </div>

            {/* {content?.[active as keyof typeof content]} */}
            {map(content, (value, key) => {
              return <ContentTab isActive={active == key}>{value}</ContentTab>;
            })}

            <ButtonWrapper style={{ padding: "20px" }}>
              <div></div>
              <ButtonWrapper>
                <Button
                  onClick={handleClose}
                  textColor={textColors.yourShadow}
                  bgColor={bgColors.wildSand}
                >
                  Cancel
                </Button>
                <Button type="submit" buttonLoading={save.isLoading}>
                  Save
                </Button>
              </ButtonWrapper>
            </ButtonWrapper>
          </FullContainer>
        </form>
      </Spin>
    </AntdModalC>
  );
};

export default SalaryConfigModal;
