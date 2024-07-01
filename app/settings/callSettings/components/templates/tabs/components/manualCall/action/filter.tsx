import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";

const FilterComponent = () => {
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
      resetQueryExceptions={["page", "pageSize", "activeTab"]}
      useExcludeArguments={{
        array: ["page", "pageSize", "activeTab"],
      }}
      methods={methods}
      selects={selects}
    />
  );
};

export default FilterComponent;
