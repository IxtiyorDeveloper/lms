import React, { FC } from "react";
import { AntdSwitch, InputNumber } from "components";
import Properties from "./components/properties";

interface IProps {
  control: any;
  setValue: any;
  getValues: any;
}
const Platform: FC<IProps> = ({ control, setValue, getValues }) => {
  return (
    <>
      <Properties control={control} setValue={setValue} getValues={getValues} />
      <InputNumber
        label="Enter price"
        name="notStationary.price"
        control={control}
        suffix="coin"
      />
      <div className="switch">
        <AntdSwitch name="notStationary.platform.switch" control={control} />
        Recommended
      </div>
    </>
  );
};

export default Platform;
