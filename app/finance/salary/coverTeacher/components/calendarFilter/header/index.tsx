import React, { useMemo } from "react";
import { Wrapper, Container } from "./style";
import FilterComponent from "../filter";
import { IDetailedCoverTeacher } from "types/finance/salary";
import { IRestructured } from "../content/type";
import { sumAmountCalculator } from "../functions";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const CalendarHeader = ({
  data,
  restructured,
}: {
  data: IDetailedCoverTeacher | undefined;
  restructured: IRestructured[];
}) => {
  const amount = useMemo(() => {
    return sumAmountCalculator({
      restructured: restructured,
    });
  }, [restructured]);

  return (
    <Container>
      <FilterComponent />
      <Wrapper>
        <div className="left">
          <div className="teacher">Teacher</div>
          <div className="group">Group</div>
          <div className="desc">Description</div>
          <div className="amount">
            Amount:{" "}
            {amount.leftSum && <span>-{toCurrencyFormat(amount.leftSum)}</span>}
          </div>
        </div>
        <div className="right">
          <div className="teacher">Cover Teacher</div>
          <div className="group">Group</div>
          <div className="desc">Description</div>
          <div className="amount">
            Amount:{" "}
            {amount.rightSum && (
              <span>+{toCurrencyFormat(amount.rightSum)}</span>
            )}
          </div>
        </div>
      </Wrapper>
    </Container>
  );
};

export default CalendarHeader;
