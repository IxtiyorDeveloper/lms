import React from "react";
import { Progress } from "antd";
import { CardSvg, PersonStatSvg } from "components";
import { Wrapper } from "./style";
import { bgColors, fixed } from "styles/theme";
import { ISalaryMain } from "types/finance/salary";
import { ISalaryTotal } from "../../type";

const FourthCardChild = ({
  total,
  data,
}: {
  total: ISalaryTotal;
  data: ISalaryMain[] | undefined;
}) => {
  const staffs = data?.reduce((acc, cur) => {
    return acc + (cur?.assignments?.length || 0);
  }, 0);
  return (
    <Wrapper>
      <div className="orange-card">
        <Progress
          width={70}
          strokeColor="white"
          strokeWidth={10}
          type="circle"
          percent={(total.card_4.card.length / (staffs || 0)) * 100}
          format={() => <PersonStatSvg />}
        />
        <p className="number">{total.card_4.card.length}</p>
        <p className="text">Staff</p>
      </div>
      <div className="midori-card">
        <Progress
          width={70}
          strokeColor="white"
          strokeWidth={10}
          type="circle"
          percent={(total.card_4.total_card / total.card_1.total_salary) * 100}
          format={() => <CardSvg color={bgColors.white} />}
        />
        <p className="number">
          {(
            (total.card_4.total_card / total.card_1.total_salary) *
            100
          ).toFixed(fixed)}
          %
        </p>
        <p className="text">Card</p>
      </div>
    </Wrapper>
  );
};

export default FourthCardChild;
