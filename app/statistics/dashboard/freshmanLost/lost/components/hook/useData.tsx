import React, { useMemo } from "react";
import _ from "lodash";
import BodyCard from "../../../components/statisticsCard/components/bodyCard";
import ByTimeChart from "../../../components/statisticsCard/components/byTime";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColors } from "styles/theme";
import { IFreshmanLost, ILevel } from "types";
import { usePageData } from "hooks";
import { ITimes } from "types/times";
import moment from "moment";
import {
  DATE_FORMAT_HH_mm,
  DATE_FORMAT_HH_mm_ss,
  DATE_FORMAT_YYYY_MM_DD,
} from "constants/dates";
import { mergeObjects } from "utils/mergeObjects";

const getElements = (
  data?: any[],
  isHaveAvatar?: boolean,
  isHaveLocation?: boolean
) => {
  const randomElement = new RandomElementOfObject();
  const totalByBranch =
    data?.map((e) => +e.count).reduce((partialSum, a) => partialSum + a, 0) ||
    0;
  return (
    data?.map((e) => {
      return {
        name: e.name || e.label,
        value: +e.count,
        color: randomElement.getRandomValue(chartColors),
        total: totalByBranch,
        location: isHaveLocation || false,
        ...(isHaveAvatar
          ? {
              user: {
                name: e.name || e.label,
                image: e.avatar,
              },
            }
          : {}),
      };
    }) || []
  );
};

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
      const time = moment(e.time, DATE_FORMAT_HH_mm_ss);
      return {
        time: time.format(DATE_FORMAT_HH_mm),
        lost: e?.lost || 0,
        sort: time.toDate().getMilliseconds(),
      };
    }),
    (e) => e.time
  );
};

const getLevel = <T extends ILevel[]>(data?: any[], time?: T, key?: string) => {
  const a = [
    ...(data?.map((e) => {
      return {
        time: e?.[key || ""],
        lost: +e.count,
      };
    }) || []),
    ...(time?.map((e) => ({
      time: e.name,
      lost: 0,
    })) || []),
  ];

  return _.uniqBy(a, (e) => e.time).map((e: any) => {
    return {
      time: e.time,
      lost: e?.lost || 0,
    };
  });
};

export const useData = ({ data }: { data?: IFreshmanLost }) => {
  const { data: pageData } = usePageData();
  return useMemo(() => {
    return {
      byBranch: () => {
        const groupBy = _.groupBy(data?.lostBranch, (e) => e.type);
        return [
          {
            label: "All",
            children: (
              <BodyCard
                data={getElements(mergeObjects(data?.lostBranch), false, true)}
              />
            ),
          },
          ..._.map(groupBy, (value, key) => {
            return {
              label: key,
              children: <BodyCard data={getElements(value, false, true)} />,
            };
          }),
        ];
      },
      byAdmins: () => {
        const groupBy = _.groupBy(data?.lostAdminShare, (e) => e.type);
        return [
          {
            label: "All",
            children: <BodyCard data={getElements(data?.lostAdminShare)} />,
          },
          ..._.map(groupBy, (value, key) => {
            return {
              label: key,
              children: <BodyCard data={getElements(value)} />,
            };
          }),
        ];
      },
      byCategories: () => {
        const groupBy = _.groupBy(data?.lostCategory, (e) => e.type);
        return [
          {
            label: "All",
            children: <BodyCard data={getElements(data?.lostCategory)} />,
          },
          ..._.map(groupBy, (value, key) => {
            return {
              label: key,
              children: <BodyCard data={getElements(value)} />,
            };
          }),
        ];
      },
      byTeacher: () => {
        const groupBy = _.groupBy(data?.lostTeacherShare, (e) => e.type);
        return [
          {
            label: "All",
            children: (
              <BodyCard data={getElements(data?.lostTeacherShare, true)} />
            ),
          },
          ..._.map(groupBy, (value, key) => {
            return {
              label: key,
              children: <BodyCard data={getElements(value, true)} />,
            };
          }),
        ];
      },
      byAge: () => {
        const groupBy = _.groupBy(data?.lostAge, (e) => e.type);
        return [
          {
            label: "All",
            children: <BodyCard data={getElements(data?.lostAge, true)} />,
          },
          ..._.map(groupBy, (value, key) => {
            return {
              label: key,
              children: <BodyCard data={getElements(value, true)} />,
            };
          }),
        ];
      },
      byTime: () => {
        const groupBy = _.groupBy(data?.lostTime, (e) => e.type);
        return [
          {
            label: "All",
            children: (
              <ByTimeChart
                data={getTime(data?.lostTime, pageData?.times, "label")}
              />
            ),
          },
          ..._.map(groupBy, (value, key) => {
            return {
              label: key,
              children: (
                <ByTimeChart data={getTime(value, pageData?.times, "label")} />
              ),
            };
          }),
        ];
      },
      byLevel: () => {
        const groupBy = _.groupBy(data?.lostLevel, (e) => e.type);
        return [
          {
            label: "All",
            children: (
              <ByTimeChart
                data={getLevel(data?.lostLevel, pageData?.levels, "name")}
              />
            ),
          },
          ..._.map(groupBy, (value, key) => {
            return {
              label: key,
              children: (
                <ByTimeChart data={getLevel(value, pageData?.levels, "name")} />
              ),
            };
          }),
        ];
      },
      differenceByAmount: () => {
        return data
          ? data.freshmanProgress.map((e) => {
              return {
                day: moment(e.label, DATE_FORMAT_YYYY_MM_DD).format("DD"),
                freshman: +e.count,
                lost: +data.lostProgress.find((i) => e.label === e.label)
                  ?.count!,
              };
            })
          : [];
      },
      differenceByMoney: () => {
        return data
          ? data.freshmanProgress.map((e) => {
              return {
                day: moment(e.label, DATE_FORMAT_YYYY_MM_DD).format("DD"),
                freshman: +e.count,
                lost: +data.lostProgress.find((i) => e.label === e.label)
                  ?.count!,
              };
            })
          : [];
      },
    };
  }, [data, pageData]);
};
