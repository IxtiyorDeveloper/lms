import React, { FC, useEffect } from "react";
import { MySelect, SelectMonth } from "components";
import moment from "moment";
import ChartAndDetails from "../chartDetails";
import { IPropsCashFlow } from "../../index";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { DATE_FORMAT_MMMM_YYYY, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { useRouter } from "next/router";
import { useExclude } from "utils/excludeObjectFields";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";

const Filter: FC<IPropsCashFlow> = ({ chartData }) => {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({});
  const selects = usePageDataMemo();
  const onChange = (e: string) => {
    const date = moment(e, DATE_FORMAT_YYYY_MM_DD);
    const { year, month, date: routerDate, ...rest } = router.query;
    if (e) {
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          year: date.year(),
          month: date.month() + 1,
          date: date.format(DATE_FORMAT_YYYY_MM_DD),
        },
      });
    } else {
      router.replace({
        pathname: router.pathname,
        query: {
          ...rest,
        },
      });
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "date") {
        onChange(value.date);
      } else {
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            [name as string]: value?.[name as string],
          },
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, router.query]);

  useExclude(watch, [], setValue, ["year", "month", "role_id"], false);
  return (
    <div className="head">
      <div className="flex-cash">
        <h2 className="title-cash">Statistics</h2>
        <div className="flex">
          <MySelect
            name="branches"
            control={control}
            placeholder="All Branches"
            options={selects.branch}
          />
          <SelectMonth
            initValue={moment(router.query.date?.toString()).format(
              DATE_FORMAT_MMMM_YYYY,
            )}
            onChange={(e) =>
              handleNavigateMonth({ e, router, queryKey: ["year", "month"] })
            }
          />
        </div>
      </div>
      {funcCheckPermission([
        COMPONENTS_VIEWS.can_see_dashboard_kpi_total_by_all_role,
      ]) && <ChartAndDetails data={chartData} />}
    </div>
  );
};
export default Filter;
