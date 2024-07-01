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
          name: "cover_teacher_date_from",
          elementType: "rangePicker",
          label: "Cover Teacher date period",
        },
        {
          name: "cover_teacher_id",
          elementType: "select",
          label: "Cover Teacher",
          customOptions: makeAssignmentUserOptions(data?.assignments),
          args: {
            mode: "multiple",
            maxTagCount: 1,
          },
        },
      ]}
      resetQueryExceptions={["coverType", "month", "year", "date"]}
      useExcludeArguments={{
        array: ["coverType", "month", "year", "date"],
      }}
      dates={[
        {
          enterFieldsName: "cover_teacher_date_from",
          firstFieldName: "cover_teacher_date_from",
          secondFieldName: "cover_teacher_date_to",
        },
      ]}
      methods={methods}
      selects={selects}
    />
  );
};

export default FilterComponent;
