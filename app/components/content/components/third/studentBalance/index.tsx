import React from "react";
import { StudentBalancePopover as StudentBalancePopoverComp } from "components";
import {
  AmountWrapper,
  Balance,
  WalletWrapper,
} from "app/finance/student-balance/components/transferMoneyModal/style";
import { WalletSvg } from "components";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const StudentBalancePopover = () => {
  const data = {
    green: null,
    yellow: [
      {
        id: 6496,
        user_id: 133142,
        year: "2024",
        month: "01",
        actual_balance: 1500000,
        total_balance: 1500000,
        company_id: 1,
      },
    ],
    red: [
      {
        id: 4955,
        user_id: 133142,
        year: "2023",
        month: "11",
        actual_balance: 1500000,
        total_balance: 1500000,
        company_id: 1,
      },
    ],
  };
  return (
    <div>
      <StudentBalancePopoverComp data={data as any}>
        <WalletWrapper>
          <Balance>
            <WalletSvg />
            Balance
          </Balance>
          <AmountWrapper className="grotesk">
            {toCurrencyFormat(23000)}
          </AmountWrapper>
        </WalletWrapper>
      </StudentBalancePopoverComp>
    </div>
  );
};

export default StudentBalancePopover;
