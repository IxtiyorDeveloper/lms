import React, { FC } from "react";
import { InputNumber } from "components";

interface IProps {
  control: any;
  watch: any;
}
const Cashbox: FC<IProps> = ({ control, watch }) => {
  return (
    <>
      <InputNumber
        label="Enter price"
        name="notStationary.price"
        control={control}
        suffix="UZS"
      />
    </>
  );
};

export default Cashbox;
