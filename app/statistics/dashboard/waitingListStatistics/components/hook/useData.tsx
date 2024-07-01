import React, { useMemo } from "react";
import _ from "lodash";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { bgColors, chartColors, chartColorsStatic } from "styles/theme";
import { IWaitingByStates, IWaitingListStatistics } from "types";
import { usePageData } from "hooks";
import moment from "moment";
import {
  DATE_FORMAT_HH_mm,
  DATE_FORMAT_HH_mm_ss,
  DATE_FORMAT_YYYY_MM_DD,
} from "constants/dates";
import ByTimeChart from "../../../components/statisticsCard/components/byTime";
import { ITimes } from "types/times";
import { useRouter } from "next/router";

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
const getWeek = (data?: IWaitingByStates[]) => {
  let start = +moment().startOf("week").format("d") + 4;
  return new Array(7).fill(null).map(() => {
    const dayName = moment(start, "DD").format("dddd");
    start += 1;
    const item: IWaitingByStates = data?.find((month) => {
      return month.label === dayName;
    })!;
    return item
      ? {
          time: item.label,
          lost: +item.count || 0,
        }
      : {
          time: dayName,
          lost: 0,
        };
  });
};

export const useData = ({
  data,
}: {
  data?: Partial<IWaitingListStatistics>;
  waitingProgress?: IWaitingListStatistics["waitingProgress"];
}) => {
  const router = useRouter();

  const { data: pageData } = usePageData();

  return useMemo(() => {
    const totalByState = data?.waitingByState
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const totalBranch = data?.waitingByBranch
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const waitingByStatus = data?.waitingByStatus
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const waitingByAdmins = data?.waitingByAdmins
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const waitingByCourse = data?.waitingByCourse
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const waitingByLevel = data?.waitingByLevel
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const waitingBySource = data?.waitingBySource
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const waitingByLanguage = data?.waitingByLanguage
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    const waitingByGender = data?.waitingByGender
      ?.map((e) => +e.count)
      .reduce((partialSum, a) => partialSum + a, 0);
    return {
      byMonth: (source?: string) => {
        const newData = new Array(+moment().endOf("month").format("DD"))
          .fill(null)
          .map((e, index) => {
            const dayName = moment(index + 1, "D");
            const item = data?.waitingProgress?.find((month) => {
              return month.date === dayName.format(DATE_FORMAT_YYYY_MM_DD);
            });
            return item
              ? {
                  ...item,
                  date: moment(item?.date, DATE_FORMAT_YYYY_MM_DD).format("DD"),
                }
              : { date: dayName.format("DD"), count: 0, source: null };
          });
        return !!source ? newData.filter((r) => r.source === source) : newData;
      },
      sourceSelect: () => {
        return _.uniqBy(data?.waitingProgress, (e) => e.source).map((e) => {
          return {
            label: e.source,
            value: e.source,
          };
        });
      },
      byProgress: (filter?: string | number) => {
        const from_date = router.query.from_date
          ? moment(router.query.from_date, DATE_FORMAT_YYYY_MM_DD)
          : moment().startOf("month");
        const date = router.query.to_date
          ? moment(router.query.to_date, DATE_FORMAT_YYYY_MM_DD)
          : moment();
        const res: any[] = [];
        const newData = filter
          ? (data?.waitingProgress || [])?.filter((e) => {
              return e.source == filter;
            })
          : data?.waitingProgress || [];

        function getDatesArray(
          startDate: moment.Moment,
          endDate: moment.Moment,
        ) {
          let currentDate = startDate.clone();

          while (currentDate.isSameOrBefore(endDate)) {
            const day = currentDate.format("DD MMM");
            const date = currentDate.format(DATE_FORMAT_YYYY_MM_DD);
            const find = newData
              ?.filter((e) => {
                return e.date == `${date}`;
              })
              ?.reduce((acc, cer) => +acc + Number(cer?.count), 0);

            find
              ? res.push({
                  time: day,
                  lost: find,
                })
              : res.push({
                  time: day,
                  lost: 0,
                });
            currentDate.add(1, "day");
          }
        }

        getDatesArray(from_date, date);
        return res;
      },
      byState: () => {
        const randomElement = new RandomElementOfObject();
        return data?.waitingByState?.map((e) => {
          return {
            name: e.label,
            value: +e.count,
            color: randomElement.getRandomValue(chartColors),
            total: totalByState,
          };
        });
      },
      byBranch: () => {
        const randomElement = new RandomElementOfObject();
        return (
          data?.waitingByBranch?.map?.((e, ind) => {
            return {
              location: true,
              name: e.label || "",
              value: +e.count,
              color: randomElement.getChartColorValue(chartColorsStatic, ind),
              total: totalBranch,
            };
          }) || []
        );
      },
      byApplication: () => {
        const randomElement = new RandomElementOfObject();
        return (
          data?.waitingByStatus?.map?.((e, ind) => {
            return {
              name: e.label || "",
              value: +e.count,
              color: randomElement.getChartColorValue(chartColorsStatic, ind),
              total: waitingByStatus,
            };
          }) || []
        );
      },
      waitingByAge: () => {
        const randomElement = new RandomElementOfObject();
        return (
          data?.waitingByAge?.map?.((e, ind) => {
            return {
              name: e.label || "",
              value: +e.count,
              color: randomElement.getChartColorValue(chartColorsStatic, ind),
              total: waitingByStatus,
            };
          }) || []
        );
      },
      byAdmin: () => {
        const randomElement = new RandomElementOfObject();
        return data?.waitingByAdmins?.map((e, ind) => {
          return {
            user: {
              name: e.name || "",
              image: e.avatar,
            },
            name: e.name || "",
            value: +e.count,
            color: randomElement.getChartColorValue(chartColorsStatic, ind),
            total: waitingByAdmins,
          };
        });
      },
      byCourse: () => {
        const randomElement = new RandomElementOfObject();
        return data?.waitingByCourse?.map((e) => {
          return {
            name: e.label || "",
            value: +e.count,
            color: randomElement.getRandomValue(chartColors),
            total: waitingByCourse,
          };
        });
      },
      byStatus: () => {
        const randomElement = new RandomElementOfObject();
        return data?.waitingByStatus?.map((e, ind) => {
          return {
            name: e.label.split("_").join(" ").toLocaleLowerCase() || "",
            value: +e.count,
            color: randomElement.getChartColorValue(chartColorsStatic, ind),
            total: waitingByStatus,
          };
        });
      },
      byLevel: () => {
        const randomElement = new RandomElementOfObject();
        return data?.waitingByLevel?.map((e, ind) => {
          return {
            name: e.label || "",
            value: +e.count,
            count: +e.count,
            color: randomElement.getChartColorValue(chartColorsStatic, ind),
            total: waitingByLevel,
          };
        });
      },
      byLanguage: () => {
        const randomElement = new RandomElementOfObject();
        return data?.waitingByLanguage?.map((e, ind) => {
          return {
            name: e.label || "",
            value: +e.count,
            count: +e.count,
            color: randomElement.getChartColorValue(chartColorsStatic, ind),
            total: waitingByLanguage,
          };
        });
      },
      byGender: () => {
        const randomElement = new RandomElementOfObject();
        return data?.waitingByGender?.map((e, ind) => {
          return {
            name: e.label || "",
            value: +e.count,
            count: +e.count,
            color: randomElement.getChartColorValue(chartColorsStatic, ind),
            total: waitingByGender,
          };
        });
      },
      waitingByLessonTime: () => {
        const randomElement = new RandomElementOfObject();
        return data?.waitingByLessonTime?.map((e) => {
          return {
            name: e.label || "",
            value: +e.count,
            count: +e.count,
            color: randomElement.getRandomValue(chartColors),
            total: waitingByLevel,
          };
        });
      },
      waitingByLessonTime1: () => {
        return data?.waitingByLessonTime?.map((e) => {
          return {
            time: e.label || "",
            lost: +e.count,
          };
        });
      },
      bySource: () => {
        const randomElement = new RandomElementOfObject();
        return data?.waitingBySource?.map((e, ind) => {
          return {
            name: e.label || "",
            value: +e.count,
            icon: e.image,
            color: randomElement.getChartColorValue(chartColorsStatic, ind),
            total: waitingBySource,
          };
        });
      },
      byRegisterTime: () => {
        const sortDataByWeekdays = (data?: any[]): any[] => {
          const weekdaysOrder: { [key: string]: number } = {
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
            Sunday: 7,
          };

          if (data) {
            return data.sort((a, b) => {
              return weekdaysOrder[a.time] - weekdaysOrder[b.time];
            });
          } else {
            return [];
          }
        };

        const sortedData = sortDataByWeekdays(getWeek(data?.waitingByWeekDay));

        return [
          {
            label: "By Hours",
            value: 1,
            children: (
              <ByTimeChart data={getTime(data?.waitingByHour, [], "label")} />
            ),
          },

          {
            label: "By Weekday",
            value: 2,
            children: <ByTimeChart data={sortedData} color={bgColors.midori} />,
          },
        ];
      },
    };
  }, [data, pageData]);
};
