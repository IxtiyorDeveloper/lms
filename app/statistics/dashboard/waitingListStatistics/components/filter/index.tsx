import React, { FC, useEffect } from "react";
import { MyDateRangePicker, MySelect } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { filterQuery } from "utils/filterQuery";
import { useExclude } from "utils/excludeObjectFields";
import dayjs from "dayjs";
import { Col, Row, Flex } from "antd";

const Filter: FC = () => {
  const { control, watch, setValue } = useForm();
  const selects = usePageDataMemo();

  const onSubmit = (data: any) => {
    filterQuery(data);
  };

  useExclude(watch, [], setValue, ["page", "pageSize"], false, {
    setFieldsName: "from_date",
    firstDateFieldName: "from_date",
    secondDateFieldName: "to_date",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      onSubmit(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  const today = dayjs();
  const startOfMonth = dayjs().startOf("month");
  const defaultValue = [startOfMonth, today];
  return (
    <div className="header-side">
      <form>
        <h1 className="title-stat">Created students statistics</h1>

        <Flex gap={12}>
          <div style={{ minWidth: 160, maxWidth: 200 }}>
            <MySelect
              name="branches"
              control={control}
              options={selects.branch}
              placeholder="All branch"
              mode="multiple"
              maxTagCount={1}
            />
          </div>
          <div style={{ minWidth: "240px", maxWidth: "250px" }}>
            <MyDateRangePicker
              name="from_date"
              label=""
              control={control}
              defaultValue={defaultValue}
            />
          </div>
        </Flex>
      </form>
    </div>
  );
};

export default Filter;
