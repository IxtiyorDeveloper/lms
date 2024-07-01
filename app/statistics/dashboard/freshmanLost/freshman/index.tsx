import React, { Fragment } from "react";
import { SelectMonth, AntdTable, RoundedTab } from "components";
import { Box } from "@mui/material";
import { bgColors } from "styles/theme";
import { Columns } from "./components/table/columns";
import { useRouter } from "next/router";
import { useFreshmanList } from "hooks";
import { expand } from "./expand";
import { WaitingListFilterWrapper } from "./components/filter/style";
import FilterComponent from "./components/filter";
import { Wrapper } from "./style";
import moment from "moment/moment";
import { handleNavigateMonth } from "utils/handleNavigateMonth";

const FreshmanList = () => {
  const router = useRouter();
  const { data, isLoading, isPreviousData } = useFreshmanList({
    enabled: true,
    query_params: {
      search: router.query.search,
      tab: router.query.type,
      branches: router.query.branches,
      level_id: router.query.level_id,
      group_id: router.query.group_id,
      group_type_id: router.query.group_type_id,
      teacher_id: router.query.teacher_id,
      created_by: router.query.created_by,
      payment_state: router.query.payment_state,
      year: router.query.year,
      month: router.query.month,
      page: router?.query?.page || 1,
      times: router?.query?.times,
      days: router?.query?.days,
      from_date: router?.query?.from_date,
      to_date: router?.query?.to_date,
      "per-page": router?.query?.pageSize || 20,
      expand,
    },
  });
  return (
    <div>
      <WaitingListFilterWrapper>
        <div className="m-select">
          <SelectMonth
            onChange={(e) =>
              handleNavigateMonth({ e, router, queryKey: ["year", "month"] })
            }
            initValue={moment(
              `${router.query.year || moment().year()} ${
                router.query.month || moment().month() + 1
              }`,
              "YYYY MM",
            ).format("MMMM YYYY")}
          />
        </div>
        <FilterComponent />
      </WaitingListFilterWrapper>
      <Box
        mx="40px"
        mt="20px"
        overflow="hidden"
        // bgcolor={bgColors.whiteSmoke}
        borderRadius="12px"
        // boxShadow="0 40px 64px -12px rgba(0, 0, 0, 0.08), 0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);"
      >
        <RoundedTab
          allStyles={{
            buttonPadding: "8px 0",
            tabsAlign: "center",
            activeTabBg: bgColors.white,
            activeBg: bgColors.primary,
            bgColor: "transparent",
          }}
          tabs={[
            {
              query: { type: "100" },
              title: (isActive) => {
                return (
                  <div>New freshman({(data as any)?.counts?.["100"]})</div>
                );
              },
              children: <Fragment />,
            },
            {
              query: { type: "200" },
              title: (isActive) => {
                return (
                  <div>Old freshman({(data as any)?.counts?.["200"]})</div>
                );
              },
              children: <Fragment />,
            },
            {
              query: { type: "300" },
              title: (isActive) => {
                return <div>Lost back({(data as any)?.counts?.["300"]})</div>;
              },
              children: <Fragment />,
            },
          ]}
          // routerKey="type"
          // initValue={router.query.type ? +router.query.type : 100}
        />
        <Wrapper>
          {/*<div className="badge">*/}
          {/*  <RedBadgeTitle*/}
          {/*    title="Freshman"*/}
          {/*    // count={data?.meta?.totalCount}*/}
          {/*  />*/}
          {/*</div>*/}

          <AntdTable
            columns={Columns()}
            dataSource={data?.list || []}
            pagination={{
              current: data?.meta?.currentPage,
              total: data?.meta?.totalCount,
            }}
            loading={isLoading || isPreviousData}
          />
        </Wrapper>
      </Box>
    </div>
  );
};

export default FreshmanList;
