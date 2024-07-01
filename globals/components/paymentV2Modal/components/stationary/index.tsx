import React, { FC, useState } from "react";
import { Wrapper } from "./style";
import { AntdSwitch, StationarySvg } from "components";
import Card from "./components/card";
import { ICalculation } from "types/ICalculation";
import StationaryHistory from "./components/history";
import { EStationaryTypes } from "../../../../../types/student/payment";

interface IProps {
  control: any;
  watch: any;
  setValue: any;
  handleClose: any;
  getValues: any;
  calculation?: ICalculation;
}
const Stationary: FC<IProps> = ({
  control,
  watch,
  setValue,
  getValues,
  handleClose,
  calculation,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Wrapper>
      <div className="title">
        <div className="item">
          <div className="name">
            <div className="svg">
              <StationarySvg />
            </div>
            Student stationery
          </div>
          <StationaryHistory
            control={control}
            watch={watch}
            setValue={setValue}
            getValues={getValues}
            calculation={calculation}
          />
        </div>
        <div className="item secondary">
          Give stationery
          <div>
            <AntdSwitch
              name="tools.stationary"
              control={control}
              defaultValue={calculation?.giveStationary}
              // defaultValue={true}
              watchDefaultValue
            />
          </div>
        </div>
      </div>
      <div className="cards">
        <Card
          title="Student’s book"
          isActive={activeIndex === 1}
          onBlur={() => setActiveIndex(0)}
          onClick={() => setActiveIndex(1)}
          setValue={setValue}
          getValues={getValues}
          watch={watch}
          type={EStationaryTypes.Book}
          calculation={calculation}
          handleClose={handleClose}
        />
        <Card
          title="Copybook"
          isActive={activeIndex === 2}
          onBlur={() => setActiveIndex(0)}
          onClick={() => setActiveIndex(2)}
          setValue={setValue}
          getValues={getValues}
          watch={watch}
          type={EStationaryTypes.CopyBook}
          calculation={calculation}
          handleClose={handleClose}
        />
      </div>
    </Wrapper>
  );
};

export default Stationary;
