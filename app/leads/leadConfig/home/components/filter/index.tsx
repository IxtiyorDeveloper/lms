import React, { useMemo } from "react";
import { Filters } from "components";
import { useCreatedByTabs, usePageDataMemo } from "hooks";
import { useForm } from "react-hook-form";

const Filter = () => {
  const { isLoading, data } = useCreatedByTabs();
  const createdByList = useMemo(() => {
    return data?.configCreatedBy?.map((e: any) => {
      return {
        value: `${e.id}`,
        label: `${e?.firstname ?? ""} ${e?.lastname ?? ""}`,
      };
    });
  }, [isLoading, data]);
  const methods = useForm();
  const selects = usePageDataMemo();
  return (
    <Filters
      activeElements={[
        {
          name: "search",
          elementType: "search",
          placeholder: "Search",
        },
        {
          name: "start_date",
          elementType: "rangePicker",
          label: "Date",
        },
        {
          name: "updated_by",
          elementType: "select",
          customOptions: createdByList,
          label: "Created by",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
      ]}
      resetQueryExceptions={["page", "pageSize", "roundedTabIndex", "status"]}
      useExcludeArguments={{
        array: ["page", "pageSize", "roundedTabIndex"],
      }}
      dates={[
        {
          enterFieldsName: "start_date",
          firstFieldName: "start_date",
          secondFieldName: "end_date",
        },
      ]}
      methods={methods}
      selects={selects}
    />
  );
};

export default Filter;
