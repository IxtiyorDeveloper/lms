import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { IDetailedCoverTeacher } from "types/finance/salary";
import { makeAssignmentUserOptions } from "globals/components/coverTeacher/utils";

const FilterComponent = ({
  data,
}: {
  data: IDetailedCoverTeacher | undefined;
}) => {
  const methods = useForm();
  const selects = usePageDataMemo();
  return (
    <Filters
      activeElements={[
        {
          name: "teacher_date_from",
          elementType: "rangePicker",
          label: "Teacher date period",
        },
        {
          name: "teacher_id",
          elementType: "select",
          label: "Teacher",
          customOptions: makeAssignmentUserOptions(data?.assignments),
          args: {
            mode: "multiple",
            maxTagCount: 1,
          },
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
      dates={[
        {
          enterFieldsName: "teacher_date_from",
          firstFieldName: "teacher_date_from",
          secondFieldName: "teacher_date_to",
        },
      ]}
      methods={methods}
      selects={selects}
    />
  );
};

export default FilterComponent;
