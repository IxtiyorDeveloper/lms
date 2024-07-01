import React, { useMemo } from "react";
import _ from "lodash";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColors } from "styles/theme";
import { usePageData } from "hooks";
import moment from "moment";
import {
  DATE_FORMAT_HH_mm,
  DATE_FORMAT_HH_mm_ss,
  DATE_FORMAT_YYYY_MM_DD,
} from "constants/dates";
import ByTimeChart from "../../../components/statisticsCard/components/byTime";
import { ITimes } from "types/times";
import { ILeadStatistics } from "types/statistics/lead";

const getTime = <T extends ITimes[]>(
  data?: any[],
  time?: T,
  key?: string,
  isWeek?: boolean,
) => {
  const a = [
    ...(data?.map((e) => {
      return {
        time: e?.[key || ""],
        lost: +e.count,
      };
    }) || []),
    ...(time || []),
  ];

  return _.sortBy(
    _.uniqBy(a, (e) => e.time).map((e: any) => {
      const time = moment(e.time, !isWeek ? DATE_FORMAT_HH_mm_ss : "DDDD");
      return {
        time: time.format(DATE_FORMAT_HH_mm),
        lost: e?.lost || 0,
        sort: time.toDate().getMilliseconds(),
      };
    }),
    (e) => e.time,
  );
};
const getWeek = <T extends ITimes[]>(data?: any[]) => {
  let start = +moment().startOf("week").format("d") + 2;
  return new Array(7).fill(null).map(() => {
    const dayName = moment(start, "DD").format("dddd");
    start += 1;
    const item: any = data?.find((month) => {
      return month.weekday === dayName;
    })!;
    return item
      ? {
          time: item.weekday,
          lost: +item.count || 0,
        }
      : {
          time: dayName,
          lost: 0,
        };
  });
};

export const useData = ({ data }: { data: Partial<ILeadStatistics> }) => {
  const { data: pageData } = usePageData();
  const leadBySource = data?.leadBySource
    ?.map((e) => +e.count)
    .reduce((partialSum, a) => partialSum + a, 0);
  const leadByStatus = data?.leadByStatus
    ?.map((e) => +e.count)
    .reduce((partialSum, a) => partialSum + a, 0);
  const registeredByAdmin = data?.registeredByAdmin
    ?.map((e) => +e.count)
    .reduce((partialSum, a) => partialSum + a, 0);
  const leadByOperator = data?.leadByOperator
    ?.map((e) => +e.count)
    .reduce((partialSum, a) => partialSum + a, 0);
  const leadByLevel = data?.leadByLevel
    ?.map((e) => +e.count)
    .reduce((partialSum, a) => partialSum + a, 0);
  const leadByBranch = data?.leadByBranch
    ?.map((e) => +e.count)
    .reduce((partialSum, a) => partialSum + a, 0);
  // const waitingBySource = data?.waitingBySource
  //   .map((e) => +e.count)
  //   .reduce((partialSum, a) => partialSum + a, 0);
  return {
    byMonth: (source?: string) => {
      const newData = new Array(+moment().endOf("month").format("DD"))
        .fill(null)
        .map((e, index) => {
          const dayName = moment(index + 1, "D");
          const item = data?.leadProgress?.find((month) => {
            return month.date === dayName.format(DATE_FORMAT_YYYY_MM_DD);
          });
          return item
            ? {
                ...item,
                date: moment(item?.date, DATE_FORMAT_YYYY_MM_DD).format("DD"),
              }
            : { date: dayName.format("DD"), count: 0, source: null };
        });
      return !!source ? newData?.filter((r) => r.source === source) : newData;
    },
    sourceSelect: () => {
      return _.uniqBy(data?.leadProgress, (e) => e.source).map((e) => {
        return {
          label: e.source,
          value: e.source,
        };
      });
    },
    bySource: () => {
      const randomElement = new RandomElementOfObject();
      return data?.leadBySource?.map((e) => {
        return {
          name: e.name || "",
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: leadBySource,
        };
      });
    },
    byStatus: () => {
      const randomElement = new RandomElementOfObject();
      return data?.leadByStatus?.map((e) => {
        return {
          name: e.status,
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: leadByStatus,
        };
      });
    },
    byOperator: () => {
      const randomElement = new RandomElementOfObject();
      return data?.leadByOperator?.map((e) => {
        return {
          user: {
            name: e.name,
            image: e.avatar,
          },
          name: e.name,
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: leadByOperator,
        };
      });
    },
    byAdmin: () => {
      const randomElement = new RandomElementOfObject();
      return data?.registeredByAdmin?.map((e) => {
        return {
          name: e.name || "",
          user: {
            name: e.name || "",
            image: e.avatar,
          },
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: registeredByAdmin,
        };
      });
    },
    byBranch: () => {
      const randomElement = new RandomElementOfObject();
      return data?.leadByBranch?.map((e) => {
        return {
          name: e.label,
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: leadByBranch,
        };
      });
    },

    byLevel: () => {
      const randomElement = new RandomElementOfObject();
      return data?.leadByLevel?.map((e) => {
        return {
          name: e.label,
          value: +e.count,
          count: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: leadByLevel,
        };
      });
    },
    byRegisterTime: () => {
      return [
        {
          label: "By Hours",
          children: (
            <ByTimeChart data={getTime(data?.registeredByTime, [], "hour")} />
          ),
        },

        {
          label: "By Weekday",
          children: <ByTimeChart data={getWeek(data?.registeredByWeekDay)} />,
        },
      ];
    },
  };
};
