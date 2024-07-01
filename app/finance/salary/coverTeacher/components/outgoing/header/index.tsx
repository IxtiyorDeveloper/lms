import React, { useMemo } from "react";
import { Container, Wrapper } from "./style";
import { IDetailedCoverTeacher } from "types/finance/salary";
import FilterComponent from "../filter";
import { OutgoingRestructuredObject, sumAmountCalculator } from "../functions";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const OutgoingHeader = ({
  data,
  restructured,
}: {
  data: IDetailedCoverTeacher | undefined;
  restructured: OutgoingRestructuredObject[];
}) => {
  const amount = useMemo(() => {
    return sumAmountCalculator({ restructured: restructured });
  }, [restructured]);
  return (
    <Container>
      <FilterComponent data={data} />
      <Wrapper>
        <div className="left">
          <div className="teacher">Teacher</div>
          <div className="date">
            <p className="date-text">Date</p>
          </div>
          <div className="group">Group</div>
          <div className="desc">Description</div>
          <div className="amount">
            Amount: <span>-{toCurrencyFormat(amount.leftSum)}</span>
          </div>
        </div>
        <div className="right">
          <div className="teacher">Cover Teacher</div>
          <div className="date">
            <p className="date-text">Date</p>
          </div>
          <div className="group">Group</div>
          <div className="desc">Description</div>
          <div className="amount">
            Amount: <span>+{toCurrencyFormat(amount.rightSum)}</span>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
};

export default OutgoingHeader;
