import React, { FC } from "react";
import { Filter } from "./components";
import { ShopStatisticsWrapper, TransactionsWrapper } from "./style";
import OrderTabs from "./components/orderTabs";
import { useRouter } from "next/router";
import { RedBadgeTitle, Segmented } from "components";
import BarChartV2 from "./components/barchartV2";
import { useAdminShopStatistics, useStockPageData } from "hooks";

const Transactions: FC = () => {
  const router = useRouter();

  const { data: categories } = useStockPageData({
    query_params: {
      expand: "shopCategories",
    },
  });

  const { data: statisticsData } = useAdminShopStatistics({
    query_params: {
      category_id:
        router.query.categoryId || categories?.shopCategories?.[0]?.id,
      expand:
        "products.count,products.units,products.variations.optionsValue,products.variations.count,products.coverFile.resolutions",
    },
    enabled: !!router.query.categoryId || !!categories?.shopCategories?.[0]?.id,
    keepPreviousData: true,
  });

  // const chartData = useMemo(
  //   () =>
  //     (statisticsData || []).map((e) => {
  //       return {
  //         time: `${e?.full_name}`,
  //         lost: +e.red_list_student_count,
  //         avatar: e.avatar,
  //         phone: e.phone,
  //       };
  //     }),
  //   [statisticsData]
  // );
  return (
    <TransactionsWrapper>
      <Filter />
      <ShopStatisticsWrapper>
        <div className="header-wrapper">
          <RedBadgeTitle title="Products by count" />
          <div>
            <Segmented
              options={
                categories?.shopCategories?.map((e) => {
                  return {
                    label: e.name,
                    value: `${e.id}`,
                    children: null,
                  };
                }) || []
              }
              routerKey="categoryId"
              initValue={
                (router.query.categoryId as string) ||
                `${categories?.shopCategories?.[0]?.id}`
              }
            />
          </div>
        </div>
        <BarChartV2 withLabel data={statisticsData} />
      </ShopStatisticsWrapper>
      <div className="mt16">
        <OrderTabs />
      </div>
    </TransactionsWrapper>
  );
};

export default Transactions;
