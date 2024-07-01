import React, { FC, useMemo } from "react";
import { Wrapper } from "./style";
import Filter from "./components/filter";
import { useStaffMotivation } from "hooks";
import { useRouter } from "next/router";
import { Spin } from "antd";
import _ from "lodash";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { tabColors } from "styles/theme";
import Tabs from "./components/tabs";
import TableElement from "./components/table";
import moment from "moment";

export interface IPropsCashFlow {
  chartData: {
    name: string;
    value: number;
    color: string;
    count: string;
    percent: number;
    percent1: number;
    roleId: string;
  }[];
}

const year = moment().format("YYYY");
const mm = moment().format("MM");
const StaffMotivation: FC = () => {
  const router = useRouter();
  const { isLoading, data } = useStaffMotivation({
    from_date: router.query?.from_date,
    branches: router.query?.branches,
    year: router.query?.year || year,
    month: router.query?.month || mm,
  });
  const { isLoading: isLoadingKPI, data: KPIData } = useStaffMotivation(
    {
      ...router.query,
      year: router.query?.year || year,
      month: router.query?.month || mm,
      role_id: router.query?.role_id || data?.byRoles?.[0]?.role_id || null,
      fields: "staffs",
    },
    "staff-motivation-fields",
  );

  const total = useMemo(() => {
    return _.sumBy(data?.byRoles, (e) => +e.amount) || 0;
  }, [data]);

  const chartData = useMemo(() => {
    if (!!data) {
      const randomElement = new RandomElementOfObject();
      return data.byRoles.map((e, index) => {
        let a = +e.amount || 0;
        if (index == 0) {
          router.replace(
            {
              pathname: router.pathname,
              query: { ...router.query, role_id: e.role_id },
            },
            undefined,
            { scroll: false },
          );
        }
        const percent = (a * 100) / total;
        return {
          name: e.name,
          count: e.count,
          value: +e.amount || 0,
          color: randomElement.getRandomValue(tabColors) || tabColors.apricot,
          percent: isNaN(percent) ? 0 : percent,
          percent1: a,
          roleId: e.role_id,
        };
      });
    }
    return [];
  }, [data, total]);

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <Filter chartData={chartData} />
        <Tabs chartData={chartData} />
        <TableElement KPIData={KPIData?.staffs} isLoading={isLoadingKPI} />
      </Wrapper>
    </Spin>
  );
};

export default StaffMotivation;
