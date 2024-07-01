import React, { FC, useMemo } from "react";
import { SelectMonth } from "components";
import moment from "moment";
import { useRouter } from "next/router";
import { bgColors } from "styles/theme";
import ChartAndDetails from "../chartDetails";
import { IPropsCashFlow } from "../../index";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const Filter: FC<IPropsCashFlow> = ({ data, total }) => {
  const router = useRouter();

  const a = useMemo(() => {
    if (!!data) {
      return data.map((e) => {
        let a = +e.total_amount || 0;
        const percent = (a * 100) / total;
        return {
          name: e.name,
          value: +e.total_amount || 0,
          color: e.color || bgColors.primary,
          // percent: isNaN(percent) ? 0 : percent,
          percent: isNaN(percent) ? 0 : percent,
          percent1: a,
          total,
        };
      });
    }
    return [];
  }, [data, total]);

  return (
    <div className="head">
      <div className="flex-cash">
        <h2 className="title-cash">Statistics</h2>
        <SelectMonth
          onChange={(e) =>
            handleNavigateMonth({ e, router, queryKey: ["year", "month"] })
          }
          initValue={moment(
            `${router.query.year || moment().year()} ${
              router.query.month || moment().month() + 1
            }`,
            "YYYY MM"
          ).format("MMMM YYYY")}
        />
      </div>
      <div className="total">
        <div>Total Amount:</div>
        <div className="value">{toCurrencyFormat(total)}</div>
      </div>
      <ChartAndDetails data={a} />
    </div>
  );
};
export default Filter;
