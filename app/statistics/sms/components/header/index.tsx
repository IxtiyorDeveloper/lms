import React, { FC, useEffect } from "react";
import { FilterWrapper, HeaderWrapper } from "./style";
import StatisticsCard, { IStat } from "../statisticsCard";
import { ISmsDelivery } from "types/statistics/sms";
import { Filters } from "components";
import dayjs from "dayjs";
import { useCronSms, usePageDataMemo } from "hooks";
import { useForm } from "react-hook-form";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { useRouter } from "next/router";

const Header: FC<IStat & { filters: ISmsDelivery | undefined }> = ({
  isLoading,
  data,
  filters,
}) => {
  const router = useRouter();
  const methods = useForm();
  const selects = usePageDataMemo();

  const today = dayjs();
  const startOfMonth = dayjs().startOf("month");
  const defaultValue = [startOfMonth, today];

  const { data: smsData } = useCronSms({});

  useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        to_date: today.format(DATE_FORMAT_YYYY_MM_DD),
        from_date: startOfMonth.format(DATE_FORMAT_YYYY_MM_DD),
      },
    });
  }, []);

  return (
    <div>
      <FilterWrapper>
        <Filters
          activeElements={[
            {
              name: "name",
              elementType: "search",
              placeholder: "Name or Phone number",
            },
            // {
            //   name: "project",
            //   elementType: "select",
            //   label: "Project",
            //   placeholder: "Select",
            //   options: "projectListByPermission",
            // },
            {
              name: "service_id",
              elementType: "select",
              label: "Sms service",
              placeholder: "Select",
              options: "smsServices",
            },
            // {
            //   name: "template_id",
            //   label: "Description",
            //   elementType: "treeSelect",
            //   customOptions: [
            //     ...(smsData?.crons?.map((e: any) => {
            //       return {
            //         label: e.label,
            //         disabled: true,
            //         value: e.label,
            //         children: e.templates?.map((e: any) => {
            //           return {
            //             label: e.name,
            //             value: e.scenario,
            //           };
            //         }),
            //       };
            //     }) || []),
            //     ...(smsData?.manuals?.map((e: any) => {
            //       return {
            //         label: e.name,
            //         value: e.id,
            //       };
            //     }) || []),
            //   ],
            //   placeholder: "Select",
            //   args: {
            //     maxTagCount: 1,
            //     className: "tree",
            //     mode: "multiple",
            //     multiple: true,
            //   },
            // },
            {
              name: "status",
              elementType: "select",
              label: "Source",
              customOptions: (filters?.totals || [])?.map((a) => {
                return { label: a.label, value: a.status };
              }),
              placeholder: "Select",
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
              elementType: "rangePicker",
              label: "Date Period",
              args: {
                defaultValue: defaultValue,
              },
              placeholder: "Select",
            },
          ]}
          resetQueryExceptions={["page", "pageSize", "from_date", "to_date"]}
          useExcludeArguments={{
            array: ["page", "pageSize", "from_date", "to_date"],
          }}
          dates={[
            {
              enterFieldsName: "from_date",
              firstFieldName: "from_date",
              secondFieldName: "to_date",
            },
          ]}
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
