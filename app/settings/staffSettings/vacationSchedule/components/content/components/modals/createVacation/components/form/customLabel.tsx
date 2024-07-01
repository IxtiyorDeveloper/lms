import React, { FC } from "react";
import { AntdSwitch } from "components";
import { LabelPeriod } from "./style";
import { Control } from "react-hook-form";

interface IProps {
  control: Control;
  hideCheckBox?: boolean;
}

const CustomLabel: FC<IProps> = (props) => {
  const { control, hideCheckBox = false } = props;

  return (
    <LabelPeriod>
      Select period
      {!hideCheckBox ? (
        <AntdSwitch
          name="custom"
          control={control}
          label="Custom"
          labelStyle={{
            marginBottom: 0,
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        />
      ) : null}
    </LabelPeriod>
  );
};

export default CustomLabel;
