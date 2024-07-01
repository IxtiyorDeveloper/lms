import React, { FC, useState } from "react";
import { TitleWrapper } from "../../style";
import { Wrapper as WrapperKPI } from "./style";
import { ErrorLabel, Segmented } from "components";
import { IFinancePageData } from "types";
import { map } from "lodash";
import MinMaxTeacherChild from "./components/minMaxTeacherChild";

interface IProps {
  control: any;
  pageData?: IFinancePageData;
  setValue: any;
  errors: any;
}

const MinMaxTeacher: FC<IProps> = ({ control, pageData, setValue, errors }) => {
  const [active, setActive] = useState(
    map(pageData?.config.group_form, (value, key, collection) => key)?.[0],
  );
  return (
    <WrapperKPI>
      {/*<div className="container">*/}
      {/*  <TitleWrapper color="green" m="0">*/}
      {/*    Salary Range (By Experience)*/}
      {/*  </TitleWrapper>*/}
      {/*</div>*/}
      {/*<Segmented*/}
      {/*  initValue={active}*/}
      {/*  options={map(pageData?.config.group_form, (value, key, collection) => {*/}
      {/*    return {*/}
      {/*      value: key,*/}
      {/*      children: <></>,*/}
      {/*      label: value,*/}
      {/*    };*/}
      {/*  })}*/}
      {/*  segmentedWidth="100%"*/}
      {/*  onChange={(e: string) => setActive(e)}*/}
      {/*/>*/}
      <div className="flex-column-gap">
        <div className="content">
          <div className="title">Individual Teacher (By Experience)</div>
          <MinMaxTeacherChild
            key={"100"}
            keyName={"100"}
            control={control}
            setValue={setValue}
            errors={errors}
            pageData={pageData}
            isActive={true}
          />
        </div>
        <div className="content">
          <div className="title">Group Teacher (By Experience)</div>
          <MinMaxTeacherChild
            key={"200"}
            keyName={"200"}
            control={control}
            setValue={setValue}
            errors={errors}
            pageData={pageData}
            isActive={true}
          />
        </div>
      </div>
      <ErrorLabel
        error={
          errors?.teacher_min_maxes?.message ||
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
  );
};

export default MinMaxTeacher;
