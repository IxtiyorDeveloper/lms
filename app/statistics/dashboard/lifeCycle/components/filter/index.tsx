import React from "react";
import { Filters } from "components";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { ILifeCyclePageData } from "types/lifeCycle";
import _ from "lodash";
import { DATE_FORMAT_YYYY_MM_DD_HH_mm } from "constants/dates";
import dayjs from "dayjs";

const FilterComponent = ({
  data,
  methods,
}: {
  data: ILifeCyclePageData | undefined;
  methods: UseFormReturn<FieldValues, any>;
}) => {
  const selects = usePageDataMemo();

  const today = dayjs();

  const startOfMonth = dayjs().startOf("month");

  return (
    <Filters
      dateFormatDisabled
      activeElements={[
        {
          name: "description",
          elementType: "search",
          placeholder: "Search",
        },
        {
          name: "model_scenario",
          elementType: "select",
          placeholder: "Lifecycle scenario",
          customOptions: _.map(data?.scenarios, (val, key) => {
            return {
              value: key,
              label: val,
            };
          }),
          args: {
            mode: "multiple",
            maxTagCount: 1,
          },
        },
        {
          name: "from_date",
          elementType: "datePicker",
          args: {
            showTime: true,
            format: DATE_FORMAT_YYYY_MM_DD_HH_mm,
            placeholder: "From date",
            valueFormat: DATE_FORMAT_YYYY_MM_DD_HH_mm,
            defaultValue: startOfMonth,
          },
        },
        {
          name: "to_date",
          elementType: "datePicker",
          args: {
            showTime: true,
            format: DATE_FORMAT_YYYY_MM_DD_HH_mm,
            valueFormat: DATE_FORMAT_YYYY_MM_DD_HH_mm,
            placeholder: "To date",
            defaultValue: today,
          },
          placeholder: "To date",
        },
        {
          name: "created_by_top_filter",
          elementType: "select",
          placeholder: "Created by",
          customOptions: data?.createdUsers?.map((item) => ({
            label: item.firstname + " " + item.lastname,
            value: item?.id,
          })),
          args: {
            mode: "multiple",
            maxTagCount: 1,
          },
        },
      ]}
      resetQueryExceptions={["page", "pageSize"]}
      useExcludeArguments={{
        array: ["page", "pageSize"],
      }}
      methods={methods}
      selects={selects}
    />
  );
};

export default FilterComponent;
