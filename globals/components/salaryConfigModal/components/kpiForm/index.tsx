import React, { FC, useEffect } from "react";
import { FormWrapper, TitleWrapper } from "../../style";
import { Wrapper as WrapperKPI } from "./style";
import { CirclePlusSvg, ErrorLabel } from "components";
import { useFieldArray } from "react-hook-form";
import { IFinancePageData } from "types";
import { useSelector } from "react-redux";
import { IStore } from "store";
import {
  KPI_FRESHMAN,
  KPI_INCALL,
  KPI_LOST_BACK,
  KPI_PENALTY,
  KPI_REGISTERED_STUDENT,
  KPI_TEACHER,
  KPI_TEACHING,
} from "constants/kpi";
import KpiForm from "./components/main";
import EmptyContent from "../emptyContent";

interface IProps {
  control: any;
  selects?: any;
  watch: any;
  pageData?: IFinancePageData;
  setValue: any;
  errors: any;
}

const KPIForm: FC<IProps> = ({
  control,
  selects,
  watch,
  pageData,
  setValue,
  errors,
}) => {
  const { fields, append, remove, update } = useFieldArray({
    name: "kpis",
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
      pageData.model.kpis?.map((e, index) => {
        if (e.enum == KPI_TEACHER || e.enum == KPI_PENALTY) {
          return;
        }
        update(index, {});
        setValue(`kpis.${index}.kpi_type`, e.enum);
        if (e.fixed_salary) {
          setValue(`kpis.${index}.fix_salary`, e.fixed_salary);
        }
        if (e.configuration?.amount_per_count) {
          setValue(
            `kpis.${index}.amount_per_count`,
            e.configuration?.amount_per_count,
          );
        }
        if (typeof e.configuration?.amount_per_accept === "number") {
          setValue(
            `kpis.${index}.amount_per_own`,
            e.configuration?.amount_per_own,
          );
          setValue(
            `kpis.${index}.amount_per_accept`,
            e.configuration?.amount_per_accept,
          );
          setValue(
            `kpis.${index}.amount_per_reject`,
            e.configuration?.amount_per_reject,
          );
        }
        if (e.configuration?.from_percent) {
          setValue(`kpis.${index}.from_percent`, e.configuration?.from_percent);
          setValue(`kpis.${index}.to_percent`, e.configuration?.to_percent);
          setValue(
            `kpis.${index}.amount_per_percent`,
            e.configuration?.amount_per_percent,
          );
        }
        if (e.total_salary) {
          setValue(`kpis.${index}.total_salary`, e.total_salary);
        }
        if (e.enum === KPI_TEACHING) {
          setValue(`kpis.${index}.ranges`, e.configuration.ranges);
        } else if (
          e.enum === KPI_LOST_BACK ||
          e.enum === KPI_FRESHMAN ||
          e.enum === KPI_REGISTERED_STUDENT ||
          e.enum === KPI_INCALL
        ) {
          e.configuration.ranges.map((e: any, index1: number) => {
            setValue(`kpis.${index}.${index1 + 1}.count_from`, e.count_from);
            setValue(`kpis.${index}.${index1 + 1}.count_to`, e.count_to);
            setValue(`kpis.${index}.${index1 + 1}.amount`, e.amount);
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
      {/*<div className="container">*/}
      {/*  <TitleWrapper color="red" m="0">*/}
      {/*    KPI*/}
      {/*  </TitleWrapper>*/}
      {/*  <span className="plus" onClick={handleCLickPLus}>*/}
      {/*    <CirclePlusSvg />*/}
      {/*  </span>*/}
      {/*</div>*/}
      {fields.map((e, index) => {
        const item = watch(`kpis.${index}.kpi_type`);
        return (
          <FormWrapper key={e.id}>
            <KpiForm
              control={control}
              selects={selects}
              index={index}
              item={item}
              removeItem={removeItem}
              handleCLickPLus={handleCLickPLus}
            />
          </FormWrapper>
        );
      })}

      <div className="p">
        <ErrorLabel
          error={
            errors?.group_share?.message ||
            errors?.kpis?.message ||
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
      </div>
    </WrapperKPI>
  ) : (
    <EmptyContent
      title="Create KPI type"
      description="KPI type for this position has not yet been created"
      onClick={handleCLickPLus}
    />
  );
};

export default KPIForm;
