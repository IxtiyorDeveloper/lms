import React, { FC, useState } from "react";
import { Wrapper } from "./style";
import { StationarySvg } from "components";
import Card from "./components/card";
import { ICalculation } from "types/ICalculation";
import StationaryHistory from "./components/history";

interface IProps {
  control: any;
  watch: any;
  setValue: any;
  getValues: any;
  level_id: any;
  handleClose: any;
  branch_id: any;
  calculation?: ICalculation;
}
const Stationary: FC<IProps> = ({
  control,
  watch,
  setValue,
  getValues,
  calculation,
  level_id,
  handleClose,
  branch_id,
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
          type="100"
          calculation={calculation}
          level_id={level_id}
          branch_id={branch_id}
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
          type="200"
          calculation={calculation}
          level_id={level_id}
          branch_id={branch_id}
          handleClose={handleClose}
        />
      </div>
    </Wrapper>
  );
};

export default Stationary;
