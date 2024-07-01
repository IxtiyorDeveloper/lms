import React, { FC } from "react";
import { IncomeWrapper, TabNameWrapper } from "./style";
import { EducationSvg, OpenBoxSvg, RoundedTab } from "components";
import { bgColors, textColors } from "styles/theme";
import OrdersTable from "./orderTable";
import { useRouter } from "next/router";
import { useOrderList } from "hooks";

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

const OrderTabs: FC = () => {
  const router = useRouter();
  const { data, isLoading } = useOrderList({
    query_params: {
      expand:
        "customer.phones,customer.profile,items.variation.optionsValue,items.variation.product,created,given.createdBy,cancel.createdBy,buttonActions",
      ...router.query,
      status: router.query.status || "100",
      ["per-page"]: router.query.pageSize || "20",
      incomeSecondaryTabIndex: undefined,
      categoryId: undefined,
      pageSize: undefined,
    },
  });

  const tabs = [
    {
      title: () => (
        <TabNameWrapper>
          <EducationSvg />
          New orders
        </TabNameWrapper>
      ),
      query: {
        status: 100,
      },
      children: null,
    },
    {
      title: () => (
        <TabNameWrapper>
          <OpenBoxSvg color={bgColors.blueGray} />
          <span>Given orders</span>
        </TabNameWrapper>
      ),
      query: {
        status: 300,
      },
      children: null,
    },
    {
      title: () => (
        <TabNameWrapper>
          <OpenBoxSvg color={bgColors.blueGray} />
          <span>Cancelled orders</span>
        </TabNameWrapper>
      ),
      query: {
        status: 200,
      },
      children: null,
    },
  ];

  return (
    <IncomeWrapper>
      <RoundedTab
        tabs={tabs}
        allStyles={allStyles}
        tabName="incomeSecondaryTabIndex"
      />
      <OrdersTable data={data} isLoading={isLoading} />
    </IncomeWrapper>
  );
};

export default OrderTabs;
