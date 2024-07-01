import React, { FC, useEffect } from "react";
import { TitleWrapper } from "../../style";
import { Wrapper as WrapperKPI } from "./style";
import {
  CirclePlusSvg,
  DeleteSvg,
  DownloadSvg,
  ErrorLabel,
  InputNumber,
} from "components";
import { useFieldArray } from "react-hook-form";
import { IFinancePageData } from "types";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { bgColors } from "styles/theme";

interface IProps {
  control: any;
  pageData?: IFinancePageData;
  setValue: any;
  errors: any;
}

const MinMax: FC<IProps> = ({ control, pageData, setValue, errors }) => {
  const { fields, append, remove, update } = useFieldArray({
    name: "min_maxes",
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

  useEffect(() => {
    if (pageData && openModal) {
      if (pageData.model?.min_maxes?.length > 0) {
        setValue("min_maxes", pageData.model?.min_maxes);
      } else {
        update(0, {});
      }
    }
    return () => {
      fields.map((e, index) => {
        remove(index);
      });
    };
  }, [pageData, openModal]);
  return (
    <WrapperKPI>
      {/*<div className="container">*/}
      {/*  <TitleWrapper color="green" m="0">*/}
      {/*    Salary Range (By Experience)*/}
      {/*  </TitleWrapper>*/}
      {/*  /!*<span className="plus" onClick={handleCLickPLus}>*!/*/}
      {/*  /!*  <CirclePlusSvg />*!/*/}
      {/*  /!*</span>*!/*/}
      {/*</div>*/}
      <div className="content">
        {fields &&
          fields.map((item, index) => {
            return (
              <div key={item.id} className="teaching">
                <InputNumber
                  label="From"
                  placeholder="month"
                  name={`min_maxes.${index}.from`}
                  control={control}
                  style={{ height: "100%" }}
                />
                <InputNumber
                  label="To"
                  placeholder="month"
                  name={`min_maxes.${index}.to`}
                  control={control}
                />
                <InputNumber
                  label={
                    <div>
                      Min Salary <DownloadSvg />
                    </div>
                  }
                  placeholder="0"
                  name={`min_maxes.${index}.min`}
                  control={control}
                  style={{ height: "100%" }}
                />
                <InputNumber
                  label={
                    <div>
                      Max Salary
                      <DownloadSvg
                        style={{ transform: "rotate(180deg)" }}
                        color={bgColors.midori}
                      />
                    </div>
                  }
                  placeholder="0"
                  name={`min_maxes.${index}.max`}
                  control={control}
                  // suffix={<span className="suffix">%</span>}
                />
                {index === 0 ? (
                  <span
                    className="plus"
                    style={{
                      marginLeft: "12.5px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      justifyContent: "center",
                      alignSelf: "center",
                      marginTop: "25px",
                    }}
                    onClick={handleCLickPLus}
                  >
                    <CirclePlusSvg />
                  </span>
                ) : (
                  <span
                    className="plus"
                    style={{
                      marginLeft: "12.5px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      alignSelf: "center",
                      marginTop: "25px",
                    }}
                    onClick={() => removeItem(index)}
                  >
                    <DeleteSvg
                      style={{ cursor: "pointer" }}
                      width="20px"
                      height="20px"
                    />
                  </span>
                )}
              </div>
            );
          })}
      </div>
      <ErrorLabel
        error={
          errors?.min_maxes?.message ||
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

export default MinMax;
