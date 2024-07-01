import React, { FC, useEffect } from "react";
import { ActionFlex, FormWrapper, TitleWrapper, Wrapper } from "../../style";
import { Wrapper as WrapperKPI } from "./style";
import { CirclePlusSvg, DeleteSvg, ErrorLabel, MySelect } from "components";
import { useFieldArray } from "react-hook-form";
import {
  KPI_ADDITIONAL_1,
  KPI_ADDITIONAL_2,
  KPI_ADDITIONAL_3,
  KPI_FRESHMAN,
  KPI_INCALL,
  KPI_OFFENCE,
  KPI_ONLINE_PAYMENT,
  KPI_TEACHING,
} from "constants/kpi";
import { useSelector } from "react-redux";
import { IStore } from "store";
import ExclusionItem from "./components/main";
import EmptyContent from "../emptyContent";

interface IProps {
  control: any;
  selects?: any;
  watch: any;
  pageData: any;
  setValue: any;
  errors: any;
}

const Exclusions: FC<IProps> = ({
  control,
  selects,
  watch,
  pageData,
  setValue,
  errors,
}) => {
  const { fields, append, remove, update } = useFieldArray({
    name: "exclusions",
    control,
  });

  const openModal = useSelector(
    (state: IStore) => state.modals.financeConfig.open,
  );
  const handleCLickPLus = () => {
    append({});
  };

  const removeItem = (index: number) => {
    remove(index);
  };

  // qachonki salary update bo'layotganida backend field lari formaga moslanmoqda
  useEffect(() => {
    if (pageData && openModal) {
      let index = 0;
      pageData.model.exclusions.map((item: any) => {
        update(index, {});
        setValue(`exclusions.${index}.user_id`, item.user_id);

        if (!!item.config?.fixed_salary && !!item.config?.total_salary) {
          setValue(`exclusions.${index}.type`, KPI_ADDITIONAL_2);
          setValue(`exclusions.${index}.fix_salary`, item.config.fixed_salary);
          update(index + 1, {});
          setValue(`exclusions.${index + 1}.user_id`, item.user_id);
          setValue(`exclusions.${index + 1}.type`, KPI_ADDITIONAL_1);
          setValue(
            `exclusions.${index + 1}.total_salary`,
            item.config.total_salary,
          );
          index += 1;
        } else if (!!item.config?.fixed_salary) {
          setValue(`exclusions.${index}.type`, KPI_ADDITIONAL_2);
          setValue(`exclusions.${index}.fix_salary`, item.config.fixed_salary);
          index += 1;
        } else if (!!item.config?.total_salary) {
          setValue(`exclusions.${index}.type`, KPI_ADDITIONAL_1);
          setValue(
            `exclusions.${index}.total_salary`,
            item.config.total_salary,
          );
          index += 1;
        }
        if (item.config?.kpis?.length > 0) {
          // if (item.config?.fixed_salary) {
          //   index += 1;
          // }
          // if (item.config?.total_salary) {
          //   index += 1;
          // }
          item.config.kpis.map((e: any, i: number) => {
            update(index, {});
            const enums = e.enum == KPI_TEACHING ? KPI_ADDITIONAL_3 : e.enum;
            setValue(`exclusions.${index}.user_id`, item.user_id);
            setValue(`exclusions.${index}.type`, enums);
            if (typeof e.configuration?.amount_per_accept === "number") {
              setValue(
                `exclusions.${index}.amount_per_own`,
                e.configuration?.amount_per_own,
              );
              setValue(
                `exclusions.${index}.amount_per_accept`,
                e.configuration?.amount_per_accept,
              );
              setValue(
                `exclusions.${index}.amount_per_reject`,
                e.configuration?.amount_per_reject,
              );
            }
            if (e.configuration?.from_percent) {
              setValue(
                `exclusions.${index}.from_percent`,
                e.configuration?.from_percent,
              );
              setValue(
                `exclusions.${index}.to_percent`,
                e.configuration?.to_percent,
              );
              setValue(
                `exclusions.${index}.amount_per_percent`,
                e.configuration?.amount_per_percent,
              );
            }
            if (enums === KPI_ADDITIONAL_3) {
              setValue(`exclusions.${index}.ranges`, e.configuration.ranges);
            } else if (e.enum === KPI_FRESHMAN || e.enum === KPI_INCALL) {
              e.configuration.ranges.map((e: any, index1: number) => {
                setValue(
                  `exclusions.${index}.${index1 + 1}.count_from`,
                  e.count_from,
                );
                setValue(
                  `exclusions.${index}.${index1 + 1}.count_to`,
                  e.count_to,
                );
                setValue(`exclusions.${index}.${index1 + 1}.amount`, e.amount);
              });
            }
            index += 1;
          });
        }
      });
    }
    return () => {
      fields.map((e, index) => {
        remove(index);
      });
    };
  }, [pageData, openModal]);
  return fields.length > 0 ? (
    <WrapperKPI>
      {/*<div*/}
      {/*  style={{*/}
      {/*    display: "flex",*/}
      {/*    justifyContent: "space-between",*/}
      {/*    padding: "0 20px 20px 20px",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <TitleWrapper color="orange" m="0" style={{ display: "flex", flex: 1 }}>*/}
      {/*    Exclusions*/}
      {/*  </TitleWrapper>*/}
      {/*  <span*/}
      {/*    className="plus"*/}
      {/*    style={{*/}
      {/*      marginLeft: "12.5px",*/}
      {/*      display: "flex",*/}
      {/*      alignItems: "center",*/}
      {/*      cursor: "pointer",*/}
      {/*    }}*/}
      {/*    onClick={handleCLickPLus}*/}
      {/*  >*/}
      {/*    <CirclePlusSvg />*/}
      {/*  </span>*/}
      {/*</div>*/}
      {fields.map((e, index) => {
        let item = watch(`exclusions.${index}.type`);
        item = item === KPI_TEACHING ? KPI_ADDITIONAL_3 : item;
        return (
          <FormWrapper key={e.id}>
            <Wrapper
              className="flex"
              style={{ flexDirection: "column" }}
              bgColor="wildSand"
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "10px",
                  alignItems: "flex-end",
                }}
              >
                <MySelect
                  bgColor="white"
                  label={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <DeleteSvg
                        style={{ visibility: "hidden" }}
                        width="20px"
                        height="20px"
                        // onClick={() => removeItem(index)}
                      />
                    </div>
                  }
                  options={selects.staff}
                  name={`exclusions.${index}.user_id`}
                  control={control}
                />
                <MySelect
                  bgColor="white"
                  label={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>Type</div>
                      <ActionFlex gap="8px">
                        <DeleteSvg
                          style={{ cursor: "pointer" }}
                          width="20px"
                          height="20px"
                          onClick={() => removeItem(index)}
                        />
                        <span className="plus" onClick={handleCLickPLus}>
                          <CirclePlusSvg />
                        </span>
                      </ActionFlex>
                    </div>
                  }
                  options={[
                    {
                      label: "Total",
                      value: KPI_ADDITIONAL_1,
                    },
                    {
                      label: "Fixed",
                      value: KPI_ADDITIONAL_2,
                    },
                    {
                      label: "KPI - Teaching",
                      value: KPI_ADDITIONAL_3,
                    },
                    {
                      label: "KPI - Freshman",
                      value: KPI_FRESHMAN,
                    },
                    {
                      label: "KPI - Incall",
                      value: KPI_INCALL,
                    },
                    {
                      label: "KPI - Online payment",
                      value: KPI_ONLINE_PAYMENT,
                    },
                    {
                      label: "KPI - Offence",
                      value: KPI_OFFENCE,
                    },
                  ]}
                  name={`exclusions.${index}.type`}
                  control={control}
                />
              </div>
              <div className="kpiInput">
                <ExclusionItem
                  control={control}
                  selects={selects}
                  index={index}
                  removeItem={removeItem}
                  item={item}
                />
              </div>
            </Wrapper>
          </FormWrapper>
        );
      })}
      <ErrorLabel
        error={
          errors?.exclusions?.message ||
          errors?.group_share?.message ||
          errors?.individual_share?.message ||
          errors?.group?.message ||
          errors?.group1?.message ||
          errors?.total_salary?.message ||
          errors?.fix_salary?.message ||
          errors?.count_from?.message ||
          errors?.count_to?.message ||
          errors?.amount?.message
        }
      />
    </WrapperKPI>
  ) : (
    <EmptyContent
      title="Create exclusion"
      description="Exclusion for this position has not yet been created"
      onClick={handleCLickPLus}
    />
  );
};

export default Exclusions;
