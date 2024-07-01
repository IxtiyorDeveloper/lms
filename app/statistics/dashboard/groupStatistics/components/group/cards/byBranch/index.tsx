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

const ByBranch = () => {
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
      type: "byBranch",
      year: year,
      month: month,
      branches: branches,
      group_form:
        router.query?.groupByBranch !== "0"
          ? router.query?.groupByBranch
          : groupForm === "0"
            ? null
            : groupForm,
    },
  });

  const getAllData = () => {
    if (data?.byBranch) {
      const groupStatusShare = data?.byBranch;
      const grouped = _.groupBy(groupStatusShare, "branch_name");

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
        label: <p onClick={() => setGroupForm(() => a.value)}>{a.label}</p>,
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
        routerKey="groupByBranch"
        title="Groups by branch"
        isLoading={isLoading}
      />
    </Wrapper>
  );
};

export default ByBranch;
