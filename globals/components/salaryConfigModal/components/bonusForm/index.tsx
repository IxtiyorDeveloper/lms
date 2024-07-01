import React, { FC, useEffect } from "react";
import { FormWrapper } from "../../style";
import { Wrapper as WrapperKPI } from "./style";
import { ErrorLabel, InputNumber } from "components";
import { IFinancePageData } from "types";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { Wrapper } from "../kpiInputs/style";
import { map } from "lodash";
import { KPI_TEACHER } from "constants/kpi";
import { teacherClassValues } from "app/ranking/home/components/table/components/tabs";

interface IProps {
  control: any;
  selects?: any;
  watch: any;
  pageData?: IFinancePageData;
  setValue: any;
  errors: any;
}

const BonusForm: FC<IProps> = ({ control, pageData, setValue, errors }) => {
  const openModal = useSelector(
    (state: IStore) => state.modals.financeConfig.open,
  );

  useEffect(() => {
    if (pageData && openModal) {
      const data = pageData.model.kpis?.find((e) => e.enum == KPI_TEACHER);
      map(data?.configuration, (value, key, collection) => {
        setValue(`bonus.a${key}`, value);
      });
    }
    return () => {
      setValue("bonus", null);
    };
  }, [pageData, openModal]);
  return (
    <WrapperKPI>
      {/*<div className="container">*/}
      {/*  <TitleWrapper color="red" m="0">*/}
      {/*    Teacher ranking bonus*/}
      {/*  </TitleWrapper>*/}
      {/*</div>*/}
      <FormWrapper>
        <Wrapper>
          <div className="teaching column" style={{}}>
            {map(teacherClassValues, (value, key, collection) => {
              return (
                <InputNumber
                  label={`${key.toUpperCase()} class`}
                  placeholder="0"
                  name={`bonus.a${value}`}
                  control={control}
                  style={{ height: "100%" }}
                />
              );
            })}
          </div>
        </Wrapper>
      </FormWrapper>

      <ErrorLabel error={errors?.group_share?.message} />
    </WrapperKPI>
  );
};

export default BonusForm;
