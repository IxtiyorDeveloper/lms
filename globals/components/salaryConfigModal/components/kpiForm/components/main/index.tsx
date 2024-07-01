import React, { FC, useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { ActionFlex, Wrapper } from "../../../../style";
import { DeleteSvg, MySelect } from "components";
import { KPIInputs } from "../../../kpiInputs";
import { CirclePlusSvg } from "@jasurbekyuldashov/lms-web-icons";

interface IPropsKpiForm {
  control: any;
  selects: any;
  index: number;
  removeItem: (index: number) => void;
  item: any;
  handleCLickPLus: any;
}

const KpiForm: FC<IPropsKpiForm> = ({
  control,
  selects,
  removeItem,
  item,
  index,
  handleCLickPLus,
}) => {
  const {
    fields: teachingFields,
    remove: teachingRemove,
    append: teachingAppend,
  } = useFieldArray({ control, name: `kpis.${index}.ranges` });

  useEffect(() => {
    teachingFields.length === 0 && teachingAppend({});
  }, [teachingFields]);

  return (
    <Wrapper
      className="flex"
      style={{ flexDirection: "column" }}
      bgColor="wildSand"
    >
      <MySelect
        bgColor="white"
        label={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>KPI Type</div>
            <ActionFlex>
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
        options={selects.kpiTypes}
        name={`kpis.${index}.kpi_type`}
        control={control}
      />
      <div className="kpiInput">
        {
          KPIInputs({
            control,
            index,
            name: "kpis",
            teachingFields,
            teachingRemove,
            teachingAppend,
          })?.[item as keyof typeof KPIInputs]
        }
      </div>
    </Wrapper>
  );
};

export default KpiForm;
