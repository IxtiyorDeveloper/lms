import React, { FC } from "react";
import { IncomeWrapper, TabNameWrapper } from "./style";
import { EducationSvg, OpenBoxSvg, RoundedTab } from "components";
import { bgColors, textColors } from "styles/theme";
import EducationTable from "./educationTable";
import { useRouter } from "next/router";
import { useIncomeList } from "hooks";
import { expand } from "./expand";
import ProductAndServiceTable from "./productAndService";

const Income: FC = () => {
  const router = useRouter();
  const { data, isLoading } = useIncomeList({
    query_params: {
      expand: expand,
      type: router.query?.type,
      ...router.query,
      transactionPayModal: undefined,
      date: undefined,
      queryKeys: undefined,
      income_id: undefined,
      paymentIncomeCheck: undefined,
      paymentCheckAfterCreate: undefined,
      productIncomeCheck: undefined,
    },
  });

  const tabs = [
    {
      title: () => (
        <TabNameWrapper>
          <EducationSvg />
          Education
        </TabNameWrapper>
      ),
      query: {
        type: 100,
      },
      children: <EducationTable data={data} isLoading={isLoading} />,
    },
    {
      title: () => (
        <TabNameWrapper>
          <OpenBoxSvg color={bgColors.blueGray} />
          <span>Product and Service</span>
        </TabNameWrapper>
      ),
      query: {
        type: 200,
      },
      children: <ProductAndServiceTable data={data} isLoading={isLoading} />,
    },
  ];
  const allStyles = {
    tabWidth: "30%",
    tabsAlign: "left",
    paddingTab: "15px 16px",
    tabBg: bgColors.brilliance,
    activeTabBg: bgColors.primary,
    activeBg: bgColors.transparent,
    textColor: textColors.yourShadow,
    buttonBgColor: bgColors.transparent,
    activeTColor: textColors.sceptreBlue,
  };
  return (
    <IncomeWrapper>
      <RoundedTab
        tabs={tabs}
        allStyles={allStyles}
        tabName="incomeSecondaryTabIndex"
      />
    </IncomeWrapper>
  );
};

export default Income;
