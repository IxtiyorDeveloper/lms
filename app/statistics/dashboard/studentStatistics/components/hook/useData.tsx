import React from "react";
import BodyCard from "../../../components/statisticsCard/components/bodyCard";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColors } from "styles/theme";
import { IStudentStatistics } from "types";
import moment from "moment";
import { DATE_FORMAT_HH_mm, DATE_FORMAT_HH_mm_ss } from "constants/dates";
import { ClockSvg } from "components";
import { map, groupBy as groupByLodash } from "lodash";

function humanize(str: string) {
  let i,
    frags = str.split("_");
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(" ");
}

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
        name: humanize(e.name || e.label),
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

export const useData = ({ data }: { data?: Partial<IStudentStatistics> }) => {
  const totalByStatus = data?.activeShare
    ?.map((e) => +e.count)
    .reduce((partialSum, a) => partialSum + a, 0);
  const totalAllByStatus = data?.totalShare
    ?.map((e) => +e.count)
    .reduce((partialSum, a) => partialSum + a, 0);
  const absShare = data?.absShare
    ?.map((e) => +e.count)
    .reduce((partialSum, a) => partialSum + a, 0);
  const totalShare = data?.totalShare
    ?.map((e) => +e.count)
    .reduce((partialSum, a) => partialSum + a, 0);
  return {
    byMonth: () => {
      return new Array(12).fill(null).map((e, index) => {
        const monthName = moment(index + 1, "M").format("MMMM");
        const item = data?.totalByMonth?.find(
          (month) => month.label === monthName
        );
        return item || { label: monthName, count: 0 };
      });
    },
    byStatus: () => {
      const groupBy = groupByLodash(data?.totalShare, (e) => e.label);
      return [
        {
          label: "All",
          children: <BodyCard data={getElements(data?.totalShare)} />,
        },
        ...map(groupBy, (value, key) => {
          return {
            label: key,
            children: <BodyCard data={getElements(value)} />,
          };
        }),
      ];
    },

    byStatuses: () => {
      const randomElement = new RandomElementOfObject();
      return data?.activeShare?.map((e) => {
        return {
          name: e.label || "",
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: totalByStatus,
        };
      });
    },
    byWithOutStatus: () => {
      const randomElement = new RandomElementOfObject();
      return data?.totalShare?.map((e) => {
        return {
          name: e.label.includes("NEW_STUDENT_")
            ? e.label?.split("NEW_STUDENT_")[1]
            : e.label || "",
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: totalShare,
        };
      });
    },
    byTime: () => {
      const randomElement = new RandomElementOfObject();
      return data?.timeShare?.map((e) => {
        return {
          name: moment(e.label, DATE_FORMAT_HH_mm_ss).format(DATE_FORMAT_HH_mm),
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: totalAllByStatus,
          prefix: (
            <>
              <ClockSvg />
            </>
          ),
        };
      });
    },
    byBranch: () => {
      const randomElement = new RandomElementOfObject();
      return data?.branchShare?.map((e) => {
        return {
          location: true,
          name: e.label || "",
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: totalAllByStatus,
        };
      });
    },
    byAbsent: () => {
      const randomElement = new RandomElementOfObject();
      return data?.absShare?.map((e) => {
        return {
          name: `ABS ${e.label}`,
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: absShare,
        };
      });
    },
    byDays: () => {
      const randomElement = new RandomElementOfObject();
      return data?.dayShare?.map((e) => {
        return {
          name: e.label || "",
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: totalAllByStatus,
        };
      });
    },
    byAge: () => {
      const randomElement = new RandomElementOfObject();
      return data?.ageShare?.map((e) => {
        return {
          name: e.label || "",
          value: +e.count,
          count: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: totalAllByStatus,
        };
      });
    },
    byLevel: () => {
      const randomElement = new RandomElementOfObject();
      return data?.levelShare?.map((e) => {
        return {
          name: e.label || "",
          value: +e.count,
          count: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: totalAllByStatus,
        };
      });
    },
    bySource: () => {
      const randomElement = new RandomElementOfObject();
      return data?.sourceShare?.map((e) => {
        return {
          name: e.label || "",
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: totalAllByStatus,
        };
      });
    },
    byGroupType: () => {
      const randomElement = new RandomElementOfObject();
      return data?.groupTypeShare?.map((e) => {
        return {
          name: e.label || "",
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: totalAllByStatus,
        };
      });
    },
    byPodo: () => {
      const randomElement = new RandomElementOfObject();
      return data?.podoShare?.map((e) => {
        return {
          name: e.label || "",
          value: +e.count,
          color: randomElement.getRandomValue(chartColors),
          total: totalAllByStatus,
        };
      });
    },
  };
};
