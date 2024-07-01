import React, { useMemo } from "react";
import _ from "lodash";
import ByTimeChart from "../../../components/statisticsCard/components/byTime";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { bgColors, chartColorsStatic } from "styles/theme";
import { IIncomeStatistics, RealTotalByPaymentType } from "types";
import { usePageData } from "hooks";
import { ITimes } from "types/times";
import SingleAreaChart from "../../../components/statisticsCard/components/singleAreaChart";
import BodyCard from "../../../freshmanLost/components/statisticsCard/components/bodyCard";
import { groupStatus } from "constants/groupStatus";
import moment from "moment/moment";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { ESubPaymentPayment } from "../../../../../../constants/payment";

const getElements = (
  data?: any[],
  isHaveAvatar?: boolean,
  isHaveLocation?: boolean,
) => {
  const randomElement = new RandomElementOfObject();
  const totalByBranch =
    data?.map((e) => +e.amount).reduce((partialSum, a) => partialSum + a, 0) ||
    0;
  return (
    data?.map((e, index) => {
      return {
        name: groupStatus?.[`${e?.contact_status as keyof typeof groupStatus}`],
        value: +e.amount,
        color: randomElement.getChartColorValue(chartColorsStatic, index),
        total: totalByBranch,
        location: isHaveLocation || false,
        ...(isHaveAvatar
          ? {
              user: {
                name: e.name || e.label || "",
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
        lost: +e.amount,
      };
    }) || []),
    ...(time || []),
  ];

  return _.uniqBy(a, (e) => e.time).map((e: any) => {
    const time = e.time;
    return {
      time: time,
      lost: e?.lost || 0,
    };
  });
};
const currentM = moment(new Date()).endOf("month").format("DD");

const getProgress = (data: any[], x: string, y: string) => {
  let result: { [x: string]: number }[] = [];
  new Array(+currentM).fill(null).map((_, ind) => {
    const a =
      data.find(
        (e) => +moment(e.date, DATE_FORMAT_YYYY_MM_DD).format("DD") === ind + 1,
      )?.amount || 0;
    result.push({
      [`${x}`]: ind + 1,
      [`${y}`]: ind !== 0 ? result[ind - 1]?.[`${y}`] + +a : +a,
    });
  });

  return result;
};

const getPercent = (data: any[], x: string, y: string) => {
  let res: { [x: string]: number }[] = [];
  new Array(+currentM).fill(null).map((_, index) => {
    const a =
      data.find(
        (e) =>
          +moment(e.date, DATE_FORMAT_YYYY_MM_DD).format("DD") === index + 1,
      )?.amount || 0;
    res.push({
      [`${x}`]: index + 1,
      [`${y}`]: index !== 0 ? res[index - 1]?.[`${y}`] + +a : +a,
    });
  });
  const latest = res[res.length - 1][`${y}`];
  return res.map((e) => {
    return {
      ...e,
      [`${y}`]: (e[`${y}`] * 100) / latest,
    };
  });
};

const getDaily = (data: any[]) => {
  let res: { [x: string]: number }[] = [];
  new Array(+currentM).fill(null).map((_, index) => {
    const a =
      data.find(
        (e) =>
          +moment(e.date, DATE_FORMAT_YYYY_MM_DD).format("DD") === index + 1,
      )?.amount || 0;
    res.push({
      time: index + 1,
      lost: +a,
    });
  });
  return res;
};

export const uniqAndSumBy = (
  data: any[],
  uniqBy: string,
  sumBy: string,
): any[] => {
  const grouped = _.values(_.groupBy(data, uniqBy));
  const result: any[] = [];
  grouped.map((e) => {
    result.push({
      ...e[0],
      [sumBy]: _.sumBy(e, (e) => +e?.[sumBy]),
    });
  });
  return result;
};

export const useData = ({ data }: { data?: IIncomeStatistics }) => {
  const { data: pageData } = usePageData();
  return useMemo(() => {
    const totalAllByBranch = data?.realTotalByBranch
      .map((e) => +e.amount)
      .reduce((partialSum, a) => partialSum + a, 0);
    const realTotalByGroupType = data?.realTotalByGroupType
      .map((e) => +e.amount)
      .reduce((partialSum, a) => partialSum + a, 0);
    const realTotalByGroupForm = data?.realTotalByGroupForm
      .map((e) => +e.amount)
      .reduce((partialSum, a) => partialSum + a, 0);
    const realTotalByPaymentType = data?.realTotalByPaymentType
      .map((e) => +e.amount)
      .reduce((partialSum, a) => partialSum + a, 0);
    return {
      realTotal: () => {
        return [
          {
            label: "Progress",
            children: (
              <SingleAreaChart
                data={getProgress(
                  data?.realTotalProgress || [],
                  "day",
                  "total",
                )}
                x="day"
                y="total"
              />
            ),
          },
          {
            label: "By percent",
            children: (
              <SingleAreaChart
                x="day"
                y="total"
                data={getPercent(data?.realTotalProgress || [], "day", "total")}
                color={bgColors.orange}
              />
            ),
          },
          {
            label: "Daily total",
            children: (
              <ByTimeChart
                data={getDaily(data?.realTotalProgress || []) as any}
              />
            ),
          },
        ];
      },
      byRegisterTime: () => {
        return [
          {
            label: "By Hours",
            children: (
              <ByTimeChart data={getTime(data?.realTotalByHour, [], "hour")} />
            ),
          },

          {
            label: "By Weekday",
            children: (
              <ByTimeChart data={getTime(data?.realTotalByWeek, [], "week")} />
            ),
          },
        ];
      },
      statuses: () => {
        const groupBy = _.groupBy(data?.potentialByStudent, (e) => e.label);
        return [
          {
            label: "All",
            children: (
              <BodyCard
                data={uniqAndSumBy(
                  getElements(data?.totalByStudentStatus),
                  "label",
                  "amount",
                )}
              />
            ),
          },
          ..._.map(groupBy, (value, key) => {
            return {
              label: key,
              children: (
                <BodyCard
                  data={uniqAndSumBy(getElements(value), "label", "amount")}
                />
              ),
            };
          }),
        ];
      },
      realTotalByPaymentType: (branch_id?: string) => {
        const grouped = _.groupBy(data?.realTotalByPaymentType, "label");
        const results: any = {};
        Object.keys(grouped)?.map((item) => {
          let m = 0;
          grouped[item]?.map((r) => (m += +r.amount));
          results[item] = m;
        });

        const valS: any = [];

        const randomElement = new RandomElementOfObject();

        Object.keys(results)?.map((item, index) => {
          valS.push({
            name: item || "",
            value: results[item],
            color: randomElement.getChartColorValue(chartColorsStatic, index),
            total: realTotalByPaymentType,
          });
        });

        if (+branch_id! === -1) {
          return valS;
        }

        const result = _.reduce(
          data?.realTotalByPaymentType,
          function (acc: any, obj) {
            const label = obj.label;
            const value = obj.amount ? obj.amount : "0";
            if (!acc[label]) {
              acc[label] = { label, amount: +value };
            } else {
              acc[label].amount = +acc[label].amount + +value;
            }
            return acc;
          },
          {},
        );

        const output: any = _.values(result) as RealTotalByPaymentType[];

        let res = uniqAndSumBy(
          branch_id == "-1"
            ? output
            : data?.realTotalByPaymentType?.filter(
                (e) => +e.branch_id === +branch_id!,
              ),
          "label",
          "amount",
        );
        const val = res.map((e: RealTotalByPaymentType, index) => {
          return {
            name: e.label || "",
            value: +e.amount,
            color: randomElement.getChartColorValue(chartColorsStatic, index),
            total: realTotalByPaymentType,
          };
        });

        return val;
      },
      onlinePaymentTypes: (branch_id?: string) => {
        const randomElement = new RandomElementOfObject();
        const groupBy = _.groupBy(
          data?.realTotalByOnlinePaymentType,
          "sub_payment_type",
        );

        const paymentTypes = [
          ESubPaymentPayment.ONLINE_PLUM,
          ESubPaymentPayment.ONLINE_UZUM,
          ESubPaymentPayment.ONLINE_PAYME,
          ESubPaymentPayment.ONLINE_CLICK,
        ];

        return paymentTypes?.map((e, index) => {
          return {
            // @ts-ignore
            name: groupBy[e]?.length ? groupBy[e][0]?.label : "",
            value:
              groupBy[e]?.reduce((acc, cur) => {
                return acc + Number(cur?.amount);
              }, 0) ?? 0,
            color: randomElement.getChartColorValue(chartColorsStatic, index),
            total: totalAllByBranch,
          };
        });
      },
      byBranch: () => {
        const randomElement = new RandomElementOfObject();
        return data?.realTotalByBranch.map((e, index) => {
          return {
            // @ts-ignore
            name: e["IFNULL(branch.name, 'Unknown')" as any] || e?.name || "",
            value: +e.amount,
            color: randomElement.getChartColorValue(chartColorsStatic, index),
            total: totalAllByBranch,
          };
        });
      },
      byGroupForm: () => {
        const randomElement = new RandomElementOfObject();
        return uniqAndSumBy(
          data?.realTotalByGroupForm.map((e, index) => {
            return {
              name: e.label || "",
              value: +e.amount,
              color: randomElement.getChartColorValue(chartColorsStatic, index),
              total: realTotalByGroupForm,
            };
          }) || [],
          "name",
          "total",
        );
      },
      realTotalByGroupType: () => {
        const randomElement = new RandomElementOfObject();
        return data?.realTotalByGroupType.map((e, index) => {
          return {
            name: e.group_type || "",
            value: +e.amount,
            color: randomElement.getChartColorValue(chartColorsStatic, index),
            total: realTotalByGroupType,
          };
        });
      },
    };
  }, [data, pageData]);
};
