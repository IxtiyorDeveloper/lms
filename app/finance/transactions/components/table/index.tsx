import React from "react";
import { ExpenseSvg, IncomeSvg, RoundedTab } from "components";
import { bgColors, textColors } from "styles/theme";
import { RoundedButton } from "./style";
import Income from "../income";
import Expense from "../expense";

const tabs = [
  {
    title: () => (
      <RoundedButton>
        <IncomeSvg width={34} height={34} /> Income
      </RoundedButton>
    ),
    children: <Income />,
  },
  {
    title: () => (
      <RoundedButton>
        <ExpenseSvg width={34} height={34} /> Expense
      </RoundedButton>
    ),
    children: <Expense />,
  },
];

const allStyles = {
  gap: "20px",
  paddingTab: "0",
  activeBg: bgColors.primary,
  tabBg: bgColors.transparent,
  bgColor: bgColors.brilliance,
  textColor: textColors.yourShadow,
  activeTabBg: bgColors.transparent,
  activeTColor: textColors.sceptreBlue,
  tabWidth: "100%",
  tabsAlign: "center",
};
const TableComponent = () => {
  return (
    <div>
      <RoundedTab
        tabs={tabs}
        allStyles={allStyles}
        containerStyle={{ backgroundColor: "transparent" }}
      />
    </div>
  );
};

export default TableComponent;
