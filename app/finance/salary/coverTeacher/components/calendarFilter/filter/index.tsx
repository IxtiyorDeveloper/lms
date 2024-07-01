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
          name: "teacher_date_from",
          elementType: "rangePicker",
          label: "Date period",
        },
        {
          name: "group_type_id",
          elementType: "select",
          label: "Group type",
          options: "groupType",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
      ]}
      resetQueryExceptions={["coverType", "month", "year", "date"]}
      useExcludeArguments={{
        array: ["coverType", "month", "year", "date"],
      }}
      methods={methods}
      selects={selects}
      dates={[
        {
          enterFieldsName: "teacher_date_from",
          firstFieldName: "teacher_date_from",
          secondFieldName: "teacher_date_to",
        },
      ]}
    />
  );
};

export default FilterComponent;
