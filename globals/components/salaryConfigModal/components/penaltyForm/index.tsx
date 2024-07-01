import React, { FC, useEffect } from "react";
import { Wrapper } from "./style";
import { InputNumber } from "../../../../../components";
import { KPI_PENALTY } from "../../../../../constants/kpi";

interface IProps {
  control: any;
  kpi: any;
  setValue: any;
}
const PenaltyForm: FC<IProps> = ({ control, kpi, setValue }) => {
  useEffect(() => {
    const a = kpi?.find((e: any) => e.enum == KPI_PENALTY);
    if (a) {
      setValue("penalty_amount_per_fault", a?.configuration?.amount);
    }
  }, [kpi]);
  return (
    <Wrapper>
      <div className="teaching">
        <InputNumber
          label="Amount per fault"
          placeholder="0"
          name={`penalty_amount_per_fault`}
          control={control}
          suffix={<span className="suffix">UZS</span>}
          style={{ height: "100%" }}
        />
      </div>
    </Wrapper>
  );
};

export default PenaltyForm;
