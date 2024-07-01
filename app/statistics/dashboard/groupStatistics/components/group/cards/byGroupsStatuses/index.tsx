import React, { useState } from "react";
import StatisticsCard from "../../../../../components/statisticsCard";
import { useGroupStatistics } from "hooks";
import { useRouter } from "next/router";
import moment from "moment";
import { Wrapper } from "./style";
import _ from "lodash";
import BodyCard from "../../../../../components/statisticsCard/components/bodyCard";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColorsStatic } from "styles/theme";
import { defaultGroupTab } from "../generateTab";

const ByGroupsStatuses = () => {
  const router = useRouter();

  const [groupForm, setGroupForm] = useState<number | string | null>(null);

  const month = router.query.monthM || moment().format("MM");
  const year = router.query.yearM || moment().format("YYYY");
  const branches = Array.isArray(router.query.branches)
    ? router.query.branches.map((l) => +l)
    : !!router.query.branches
      ? [Number(router.query.branches)]
      : null;

  const { isLoading, data } = useGroupStatistics({
    query_params: {
      type: "byStatus",
      year: year,
      month: month,
      branches: branches,
      group_form:
        router.query?.groupByStatuses !== "0"
          ? router.query?.groupByStatuses
          : groupForm === "0"
            ? null
            : groupForm,
    },
  });

  const getAllData = () => {
    if (data?.byStatus) {
      const groupStatusShare = data?.byStatus;
      const grouped = _.groupBy(groupStatusShare, "label");

      const total = groupStatusShare?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const dataList: {
        name: string;
        value: number;
        total: number;
        color: string;
      }[] = [];

      const randomElement = new RandomElementOfObject();

      Object.keys(grouped).map((key, index) => {
        const item = grouped[key];
        const count = item.reduce((acc, cer) => {
          return acc + +cer.count;
        }, 0);

        dataList.push({
          name: key,
          value: count,
          total,
          color: randomElement.getChartColorValue(chartColorsStatic, index),
        });
      });

      return dataList;
    }
  };

  const menuTabs = () => {
    return defaultGroupTab.map((a) => {
      return {
        ...a,
        label: <p onClick={() => setGroupForm(a.value)}>{a.label}</p>,
        children: <BodyCard data={getAllData()} />,
      };
    });
  };

  return (
    <Wrapper>
      <StatisticsCard
        withTabGroup
        initialTabValue={0}
        menu={menuTabs()}
        routerKey="groupByStatuses"
        title="Groups by statuses"
        isLoading={isLoading}
      />
    </Wrapper>
  );
};

export default ByGroupsStatuses;
