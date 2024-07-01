import React, { FC } from "react";
import { FilterWrapper, HeaderWrapper } from "./style";
import StatisticsCard, { IStat } from "../statisticsCard";
import { Filters } from "components";
import dayjs from "dayjs";
import { usePageDataMemo } from "hooks";
import { useForm } from "react-hook-form";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_YYYY_MM_DD_HH_mm,
} from "../../../../../constants/dates";

const Header: FC<IStat> = ({ isLoading, data }) => {
  const methods = useForm();
  const selects = usePageDataMemo();

  const today = dayjs();
  const startOfMonth = dayjs().startOf("month");
  const defaultValue = [startOfMonth, today];

  return (
    <div>
      <FilterWrapper>
        <Filters
          activeElements={[
            {
              name: "search",
              elementType: "search",
              placeholder: "Name or Phone number",
            },
            {
              name: "branches",
              elementType: "select",
              label: "All Branches",
              options: "branch",
              args: {
                isSelectAll: true,
                mode: "multiple",
              },
              placeholder: "Select",
            },
            {
              name: "from_date",
              elementType: "datePicker",
              args: {
                showTime: true,
                format: DATE_FORMAT_CREATED_AT,
                placeholder: "From date",
                valueFormat: DATE_FORMAT_CREATED_AT,
              },
            },
            {
              name: "to_date",
              elementType: "datePicker",
              args: {
                showTime: true,
                format: DATE_FORMAT_CREATED_AT,
                valueFormat: DATE_FORMAT_CREATED_AT,
                placeholder: "To date",
              },
              placeholder: "To date",
            },
          ]}
          resetQueryExceptions={["page", "pageSize"]}
          useExcludeArguments={{
            array: ["page", "pageSize"],
          }}
          methods={methods}
          selects={selects}
        />
      </FilterWrapper>
      <HeaderWrapper>
        <h1 className="title">Statistics</h1>
        <StatisticsCard isLoading={isLoading} data={data} />
      </HeaderWrapper>
    </div>
  );
};

export default Header;
