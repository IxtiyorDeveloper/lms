import React, { FC, useMemo } from "react";
import { Wrapper } from "./style";
import Filter from "./components/filter";
import { useKpiStatistics } from "hooks";
import { useRouter } from "next/router";
import { Spin } from "antd";
import _ from "lodash";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { tabColors } from "styles/theme";
import Tabs from "./components/tabs";
import { MySelect } from "components";
import { useForm } from "react-hook-form";
import TableElement from "./components/table";
import { SCENARIO_KPI } from "constants/kpi";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";

export interface IPropsCashFlow {
  chartData: {
    name: string;
    value: number;
    count: string;
    color: string;
    percent: number;
    percent1: number;
    roleId: string;
  }[];
}

const KpiStatistics: FC = () => {
  const router = useRouter();
  const { isLoading, isPreviousData, data } = useKpiStatistics({
    ...router.query,
    year: router.query?.year,
    month: router.query?.month,
    date: router.query?.date,
    fields: "staffs,byRoles",
    role_id: router.query?.role_id,
    branches: router.query?.branches || null,
  });

  const total = useMemo(() => {
    return _.sumBy(data?.byRoles, (e) => +e.amount) || 0;
  }, [data]);

  const chartData = useMemo(() => {
    if (!!data) {
      const randomElement = new RandomElementOfObject();
      return data.byRoles?.map((e) => {
        let a = +e.amount || 0;
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

  const { control, watch } = useForm();
  const scenario = watch("scenario");
  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <Filter chartData={chartData} />
        <Tabs chartData={chartData} />
        {funcCheckPermission([
          COMPONENTS_VIEWS.can_see_dashboard_kpi_total_by_all_role,
        ]) && (
          <div className="scenario">
            <MySelect
              name="scenario"
              options={_.map(SCENARIO_KPI, (value, key, collection) => {
                return {
                  value: key,
                  label: value,
                };
              })}
              control={control}
              placeholder="Scenario"
            />
          </div>
        )}

        <TableElement
          KPIData={
            scenario
              ? data?.staffs?.filter((e) => e.scenario == scenario)
              : data?.staffs
          }
          isLoading={isLoading || isPreviousData}
        />
      </Wrapper>
    </Spin>
  );
};

export default KpiStatistics;
