import React from "react";
import { Filters } from "components";
import { usePageDataMemo } from "hooks";
import { useForm } from "react-hook-form";

const Filter = () => {
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
      ]}
      resetQueryExceptions={["page", "pageSize", "roundedTabIndex"]}
      useExcludeArguments={{
        array: ["page", "pageSize", "roundedTabIndex"],
      }}
      methods={methods}
      selects={selects}
    />
  );
};

export default Filter;
