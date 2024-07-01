import { EStockAmountStatus } from "types";
import AntdBadge from "components/common/antdBadge";
import React from "react";

export const showTopStatus = ({
  amount_status,
}: {
  amount_status: EStockAmountStatus;
}) => {
  if (amount_status == EStockAmountStatus.LITTLE_LEFT) {
    return (
      <AntdBadge
        content={<div className="red-alert">Little left</div>}
        style={{ borderColor: "transparent" }}
        showZero
      />
    );
  }
  if (amount_status == EStockAmountStatus.MORE_THAN_NORMAL) {
    return (
      <AntdBadge
        content={<div className="more-alert">More</div>}
        style={{ borderColor: "transparent" }}
        showZero
      />
    );
  }
  return null;
};
