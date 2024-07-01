import React, { FC, useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { IFinancePageData } from "types";
import { CirclePlusSvg, DeleteSvg, DownloadSvg, InputNumber } from "components";
import { bgColors } from "styles/theme";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { Wrapper } from "./style";

interface IProps {
  control: any;
  pageData?: IFinancePageData;
  setValue: any;
  errors: any;
  keyName: string;
  isActive: boolean;
}
const MinMaxTeacherChild: FC<IProps> = ({
  control,
  keyName,
  pageData,
  setValue,
  errors,
  isActive,
}) => {
  const { fields, append, remove, update } = useFieldArray({
    name: `teacher_min_maxes.a${keyName}`,
    control,
  });

  const openModal = useSelector(
    (state: IStore) => state.modals.financeConfig.open
  );
  const handleCLickPLus = () => {
    append({});
  };

  const removeItem = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    if (pageData && openModal) {
      if (pageData.model?.teacher_min_maxes[keyName]?.length > 0) {
        setValue(
          `teacher_min_maxes.a${keyName}`,
          pageData.model?.teacher_min_maxes[keyName]
        );
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
    <Wrapper isActive={isActive}>
      {fields &&
        fields.map((item, index) => {
          return (
            <div key={item.id} className="teaching">
              <InputNumber
                label="From"
                placeholder="month"
                name={`teacher_min_maxes.a${keyName}.${index}.from`}
                control={control}
                style={{ height: "100%" }}
              />
              <InputNumber
                label="To"
                placeholder="month"
                name={`teacher_min_maxes.a${keyName}.${index}.to`}
                control={control}
              />
              <InputNumber
                label={
                  <div>
                    Min Salary <DownloadSvg />
                  </div>
                }
                placeholder="0"
                name={`teacher_min_maxes.a${keyName}.${index}.min`}
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
                name={`teacher_min_maxes.a${keyName}.${index}.max`}
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
    </Wrapper>
  );
};

export default MinMaxTeacherChild;
