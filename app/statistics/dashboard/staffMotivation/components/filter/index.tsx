import React, { FC, useEffect } from "react";
import { MySelect, SelectMonth } from "components";
import moment from "moment";
import Router, { useRouter } from "next/router";
import ChartAndDetails from "../chartDetails";
import { IPropsCashFlow } from "../../index";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { DATE_FORMAT_MMMM_YYYY } from "constants/dates";
import { handleNavigateMonth } from "utils/handleNavigateMonth";

const Filter: FC<IPropsCashFlow> = ({ chartData }) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useForm({});
  const selects = usePageDataMemo();
  const router = useRouter();

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      // if (name === "date") {
      //   onChange(value.date);
      // } else {
      Router.replace({
        pathname: Router.pathname,
        query: {
          ...Router.query,
          [name as string]: value?.[name as string],
        },
      });
      // }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
            initValue={moment(
              `${router.query.year || moment().year()} ${
                router.query.month || moment().month() + 1
              }`,
              "YYYY MM",
            ).format("MMMM YYYY")}
            onChange={(e) =>
              handleNavigateMonth({ e, router, queryKey: ["year", "month"] })
            }
          />
        </div>
      </div>
      <ChartAndDetails data={chartData} />
    </div>
  );
};
export default Filter;
