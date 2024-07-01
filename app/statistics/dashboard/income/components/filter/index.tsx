import React, { FC, useEffect } from "react";
import { MyDateRangePicker, MySelect } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { filterQuery } from "utils/filterQuery";
import { useExclude } from "utils/useExclude";
import { useRouter } from "next/router";
import dayjs, { Dayjs } from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";

const Filter: FC = () => {
  const router = useRouter();
  const { control, watch, setValue } = useForm();
  const selects = usePageDataMemo();

  const onSubmit = (data: any) => {
    filterQuery(data);
  };

  useEffect(() => {
    const subscription = watch((value, { type }) => {
      if (type === "change") {
        filterQuery(value, [
          {
            enterFieldsName: "from_date",
            firstFieldName: "from_date",
            secondFieldName: "to_date",
          },
        ]);
      }
    });
    if (!router.query.from_date) {
      const date = dayjs();
      router.replace(
        router.pathname,
        {
          query: {
            ...router.query,
            from_date: date.startOf("month").format(DATE_FORMAT_YYYY_MM_DD),
            to_date: date.format(DATE_FORMAT_YYYY_MM_DD),
          },
        },
        { scroll: undefined },
      );
      setValue("from_date", [date.startOf("month"), date]);
    }
    return () => subscription.unsubscribe();
  }, []);

  useExclude({
    watch,
    setValue,
    dates: [
      {
        firstFieldName: "from_date",
        secondFieldName: "to_date",
        enterFieldsName: "from_date",
      },
    ],
  });

  useEffect(() => {
    const subscription = watch((value) => {
      onSubmit(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const today = new Date();

  return (
    <div className="header-side">
      <h1 className="title-stat">Statistic</h1>
      <form>
        <MySelect
          name="branches"
          control={control}
          options={selects.branch}
          placeholder="Select branch"
        />
        <MyDateRangePicker
          disabledDate={function (value: Dayjs) {
            return !value.isBefore(today);
          }}
          name="from_date"
          control={control}
        />
        {/*<SelectMonth*/}
        {/*  onChange={(e) =>*/}
        {/*    handleNavigateMonth({ e, router, queryKey: ["year", "month"] })*/}
        {/*  }*/}
        {/*  initValue={moment(*/}
        {/*    `${router.query.year || moment().year()} ${*/}
        {/*      router.query.month || moment().month() + 1*/}
        {/*    }`,*/}
        {/*    "YYYY MM"*/}
        {/*  ).format("MMMM YYYY")}*/}
        {/*/>*/}
      </form>
    </div>
  );
};

export default Filter;
