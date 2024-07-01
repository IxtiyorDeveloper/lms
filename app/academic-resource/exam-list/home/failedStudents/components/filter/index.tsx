import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { Filters, labelOptions } from "components";
import { Wrapper } from "./style";
import { EXAM_PROCESS_ATTENDANCE_STATUS } from "constants/exam";
import { IExamPageData } from "types/exam/exam";
import {
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRED_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";

interface IProps {
  data?: IExamPageData;
}

interface IProps {
  data?: IExamPageData;
}

const FilterComponent: FC<IProps> = ({ data }) => {
  const methods = useForm();
  const selects = usePageDataMemo();

  return (
    <Wrapper>
      <Filters
        activeElements={[
          {
            name: "search",
            elementType: "search",
            placeholder: "Search",
          },
          {
            name: "lesson_day_id",
            elementType: "select",
            label: "Days",
            placeholder: "-",
            options: "days",
          },
          {
            name: "lesson_time_id",
            elementType: "select",
            label: "Time",
            placeholder: "-",
            options: "time",
            args: {
              mode: "multiple",
              maxTagCount: 1,
            },
          },
          {
            name: "branch_id",
            elementType: "select",
            label: "Branch",
            placeholder: "-",
            options: "branch",
            args: {
              mode: "multiple",
              maxTagCount: 1,
            },
          },
          {
            name: "teacher_id",
            elementType: "select",
            label: "Teacher",
            placeholder: "-",
            customOptions: data?.teachers?.map((e) => {
              return {
                label: `${e.firstname} ${e.lastname}`,
                value: e.base_user_id?.toString(),
              };
            }),
          },
          {
            name: "support_id",
            elementType: "select",
            label: "Support",
            placeholder: "-",
            customOptions: data?.supports?.map((e) => {
              return {
                label: `${e.firstname} ${e.lastname}`,
                value: e.base_user_id?.toString(),
              };
            }),
          },
          {
            name: "supervisor_id",
            elementType: "select",
            label: "Supervisor",
            placeholder: "-",
            customOptions: data?.supervisors?.map((e) => {
              return {
                label: `${e.firstname} ${e.lastname}`,
                value: e.base_user_id?.toString(),
              };
            }),
          },
          {
            name: "contact_status",
            elementType: "select",
            label: "Student status",
            customOptions: [
              { label: "Studying", value: `${STUDYING_STUDENT}` },
              { label: "Transferring", value: `${TRANSFERRED_STUDENT}` },
              { label: "Stopping", value: `${STOPPING_STUDENT}` },
            ],
            args: {
              maxTagCount: 1,
              mode: "multiple",
            },
          },
          {
            name: "group_id",
            elementType: "select",
            label: "Group",
            placeholder: "-",
            customOptions: data?.groups?.map((e) => {
              return {
                label: e.name,
                value: e.id?.toString(),
              };
            }),
            args: {
              maxTagCount: 1,
              mode: "multiple",
            },
          },
          {
            name: "level_id",
            elementType: "select",
            label: "Level",
            placeholder: "-",
            customOptions: selects?.level?.options,
            args: {
              mode: "multiple",
              maxTagCount: 1,
            },
          },
          {
            name: "user_label_type",
            elementType: "select",
            label: "Label",
            customOptions: labelOptions.filter((option) =>
              selects?.activeStudentLabels.some(
                (label) => label.value == option.value
              )
            ),
            args: {
              maxTagCount: 1,
              mode: "multiple",
            },
          },
          {
            name: "attendance_status",
            elementType: "select",
            label: "Absent status",
            customOptions: Object.keys(EXAM_PROCESS_ATTENDANCE_STATUS).map(
              (key) => {
                return {
                  label: key,
                  value:
                    EXAM_PROCESS_ATTENDANCE_STATUS[
                      key as keyof typeof EXAM_PROCESS_ATTENDANCE_STATUS
                    ].toString(),
                };
              }
            ),
          },
        ]}
        resetQueryExceptions={[
          "page",
          "pageSize",
          "roundedTabIndex",
          "status",
          "date",
          "year",
          "month",
          "process_status",
        ]}
        useExcludeArguments={{
          array: [
            "page",
            "pageSize",
            "roundedTabIndex",
            "status",
            "date",
            "year",
            "month",
            "process_status",
          ],
        }}
        methods={methods}
        selects={selects}
      />
    </Wrapper>
  );
};

export default FilterComponent;
