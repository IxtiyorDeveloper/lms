import React, { useMemo } from "react";
import _ from "lodash";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { bgColors, chartColors } from "styles/theme";
import { INewStudentStatistics } from "types";
import { usePageData } from "hooks";
import moment from "moment";
import ByTimeChart from "../../../components/statisticsCard/components/byTime";
import { ITimes } from "types/times";
import BodyCard from "../../../components/statisticsCard/components/bodyCard";
import { ClockSvg } from "components";

const getTime = <T extends ITimes[]>(data?: any[], time?: T, key?: string) => {
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
      const time = moment(e.time, "MMMM");
      return {
        time: e.time,
        lost: e?.lost || 0,
        sort: time.toDate().getMilliseconds(),
      };
    }),
    (e) => e.time,
  );
};
export const useData = ({
  data,
}: {
  data?: Partial<INewStudentStatistics>;
}) => {
  const { data: pageData } = usePageData();
  return useMemo(() => {
    const notAttendMonthShare = data?.notAttendMonthShare
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const notAttendBranch = data?.notAttendBranch
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const notAttendDay = data?.notAttendDay
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const notAttendLevel = data?.notAttendLevel
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const attendLevel = data?.attendLevel
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const notAttendTime = data?.notAttendTime
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const attendMonthShare = data?.attendMonthShare
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const attendBranchShare = data?.attendBranchShare
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const attendDay = data?.attendDay
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const attendTime = data?.attendTime
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);

    const thisMonthName = moment().format("MMMM");
    const nextMonthName = moment().add("month", 1).format("MMMM");
    return {
      byMonth: () => {
        const currentMonth = data?.notAttendMonthShare?.find(
          (e) => e.label === thisMonthName,
        );
        const nextMonth = data?.notAttendMonthShare?.find(
          (e) => e.label === nextMonthName,
        );
        return [
          {
            name: "All",
            value: notAttendMonthShare,
            color: bgColors.midori,
            total: notAttendMonthShare,
          },
          {
            name: "Current month",
            value: +(currentMonth?.count || 0),
            color: bgColors.deep,
            total: notAttendMonthShare,
          },
          {
            name: "Next month",
            value: +(nextMonth?.count || 0),
            color: bgColors.pepper,
            total: notAttendMonthShare,
          },
        ];
      },
      byAMonth: () => {
        const currentMonth = data?.attendMonthShare?.find(
          (e) => e.label === thisMonthName,
        );
        const nextMonth = data?.attendMonthShare?.find(
          (e) => e.label === nextMonthName,
        );
        return [
          {
            name: "All",
            value: notAttendMonthShare,
            color: bgColors.midori,
            total: notAttendMonthShare,
          },
          {
            name: "Current month",
            value: +(currentMonth?.count || 0),
            color: bgColors.deep,
            total: notAttendMonthShare,
          },
          {
            name: "Next month",
            value: +(nextMonth?.count || 0),
            color: bgColors.pepper,
            total: notAttendMonthShare,
          },
        ];
      },
      byBranch: () => {
        const randomElement = new RandomElementOfObject();
        return data?.notAttendBranch?.map((e) => {
          return {
            name: e.label,
            value: +e.count,
            color: randomElement.getRandomValue(chartColors),
            total: notAttendBranch,
          };
        });
      },
      byABranch: () => {
        const randomElement = new RandomElementOfObject();
        return data?.attendBranchShare?.map((e) => {
          return {
            name: e.label,
            value: +e.count,
            color: randomElement.getRandomValue(chartColors),
            total: attendBranchShare,
          };
        });
      },

      byDays: () => {
        const currentMonth = data?.notAttendDay?.filter(
          (e) => e.month === thisMonthName,
        );
        const nextMonth = data?.notAttendDay?.filter(
          (e) => e.month === nextMonthName,
        );
        const randomElement = new RandomElementOfObject();

        const summary: any = {};

        data?.notAttendDay?.forEach((entry) => {
          const level = entry.label;
          const count = parseInt(entry.count);

          if (summary[level]) {
            summary[level] += count;
          } else {
            summary[level] = count;
          }
        });

        const summaryArray = Object.keys(summary).map((label) => ({
          label,
          count: summary[label],
          month: "",
        }));

        return [
          {
            label: "All",
            children: (
              <BodyCard
                data={summaryArray?.map((e) => {
                  return {
                    name: e.label,
                    value: +e.count,
                    color: randomElement.getRandomValue(chartColors),
                    total: notAttendDay,
                  };
                })}
              />
            ),
          },
          {
            label: "Current month",
            children: (
              <BodyCard
                data={currentMonth?.map((e) => {
                  return {
                    name: e.label,
                    value: +e.count,
                    color: randomElement.getRandomValue(chartColors),
                    total: notAttendDay,
                  };
                })}
              />
            ),
          },
          {
            label: "Next month",
            children: (
              <BodyCard
                data={nextMonth?.map((e) => {
                  return {
                    name: e.label,
                    value: +e.count,
                    color: randomElement.getRandomValue(chartColors),
                    total: notAttendDay,
                  };
                })}
              />
            ),
          },
        ];
      },
      byADays: () => {
        const randomElement = new RandomElementOfObject();
        return data?.attendDay?.map((e) => {
          return {
            name: e.label,
            value: +e.count,
            color: randomElement.getRandomValue(chartColors),
            total: attendDay,
          };
        });
      },
      byLevel: () => {
        const currentMonth = data?.notAttendLevel?.filter(
          (e) => e.month === thisMonthName,
        );
        const nextMonth = data?.notAttendLevel?.filter(
          (e) => e.month === nextMonthName,
        );
        const randomElement = new RandomElementOfObject();

        const summary: any = {};

        data?.notAttendLevel?.forEach((entry) => {
          const level = entry.label;
          const count = parseInt(entry.count);

          if (summary[level]) {
            summary[level] += count;
          } else {
            summary[level] = count;
          }
        });

        const summaryArray = Object.keys(summary).map((label) => ({
          label,
          count: summary[label],
          month: "",
        }));
        return [
          {
            label: "All",
            children: (
              <BodyCard
                data={summaryArray?.map((e) => {
                  return {
                    name: e.label,
                    value: +e.count,
                    color: randomElement.getRandomValue(chartColors),
                    total: notAttendLevel,
                  };
                })}
              />
            ),
          },
          {
            label: "Current month",
            children: (
              <BodyCard
                data={currentMonth?.map((e) => {
                  return {
                    name: e.label,
                    value: +e.count,
                    color: randomElement.getRandomValue(chartColors),
                    total: notAttendLevel,
                  };
                })}
              />
            ),
          },
          {
            label: "Next month",
            children: (
              <BodyCard
                data={nextMonth?.map((e) => {
                  return {
                    name: e.label,
                    value: +e.count,
                    color: randomElement.getRandomValue(chartColors),
                    total: notAttendLevel,
                  };
                })}
              />
            ),
          },
        ];
      },
      byALevel: () => {
        const randomElement = new RandomElementOfObject();

        return data?.attendLevel?.map((e) => {
          return {
            name: e.label,
            value: +e.count,
            color: randomElement.getRandomValue(chartColors),
            total: attendLevel,
          };
        });
      },
      byTime: () => {
        const currentMonth = data?.notAttendTime?.filter(
          (e) => e.month === thisMonthName,
        );
        const nextMonth = data?.notAttendTime?.filter(
          (e) => e.month === nextMonthName,
        );
        const randomElement = new RandomElementOfObject();

        const summary: any = {};

        data?.notAttendTime?.forEach((entry) => {
          const level = entry.label;
          const count = parseInt(entry.count);

          if (summary[level]) {
            summary[level] += count;
          } else {
            summary[level] = count;
          }
        });

        const summaryArray = Object.keys(summary).map((label) => ({
          label,
          count: summary[label],
          month: "",
        }));
        return [
          {
            label: "All",
            children: (
              <BodyCard
                data={summaryArray?.map((e) => {
                  return {
                    name: e.label,
                    prefix: <ClockSvg />,
                    value: +e.count,
                    color: randomElement.getRandomValue(chartColors),
                    total: notAttendTime,
                  };
                })}
              />
            ),
          },
          {
            label: "Current month",
            children: (
              <BodyCard
                data={currentMonth?.map((e) => {
                  return {
                    name: e.label,
                    prefix: <ClockSvg />,
                    value: +e.count,
                    color: randomElement.getRandomValue(chartColors),
                    total: notAttendTime,
                  };
                })}
              />
            ),
          },
          {
            label: "Next month",
            children: (
              <BodyCard
                data={nextMonth?.map((e) => {
                  return {
                    name: e.label,
                    value: +e.count,
                    prefix: <ClockSvg />,
                    color: randomElement.getRandomValue(chartColors),
                    total: notAttendTime,
                  };
                })}
              />
            ),
          },
        ];
      },
      byATime: () => {
        const randomElement = new RandomElementOfObject();

        return (
          data?.attendTime?.map((e) => {
            return {
              name: e.label,
              value: +e.count,
              color: randomElement.getRandomValue(chartColors),
              total: attendTime,
            };
          }) || []
        );
      },
    };
  }, [data, pageData]);
};
