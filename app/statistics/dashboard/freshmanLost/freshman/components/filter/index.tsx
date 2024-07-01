import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import {
  useFreshmanLostPageData,
  useGCPageDataMemo,
  usePageDataMemo,
} from "hooks";
import { COMPONENTS_VIEWS } from "constants/permissions";

const FilterComponent = () => {
  const methods = useForm();
  const selects = usePageDataMemo();
  const { groupName } = useGCPageDataMemo();

  const { data } = useFreshmanLostPageData();
  return (
    <Filters
      activeElements={[
        {
          name: "search",
          elementType: "search",
          placeholder: "Search",
          full_width: true,
        },
        {
          name: "teacher_id",
          elementType: "select",
          label: "Teacher",
          options: "teacher",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "parent_level_id",
          elementType: "select",
          customOptions: selects.level.options,
          label: "Level",
        },
        {
          name: "level_id",
          elementType: "select",
          label: "Sub level",
          customOptions: selects.level?.options?.find(
            (e) => e?.value.toString() === methods.watch("parent_level_id"),
          )?.subLevel,
          args: {
            disabled: !methods.watch("parent_level_id"),
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "group_id",
          elementType: "select",
          label: "Group",
          customOptions: groupName,
          args: {
            maxTagCount: 1,
            mode: "multiple",
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
        {
          name: "branches",
          elementType: "select",
          label: "Branch",
          options: "branch",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "payment_state",
          elementType: "select",
          label: "Payment status",
          options: "balanceStatuses",
          permission: [COMPONENTS_VIEWS.can_see_student_payment],
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "contact_status",
          elementType: "select",
          label: "Student status",
          options: "groupContactEnumsStatusesActive",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "days",
          elementType: "select",
          label: "Days",
          options: "days",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "times",
          elementType: "select",
          label: "Times",
          options: "time",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "start_date_from",
          elementType: "rangePicker",
          label: "Freshman date period",
        },
        {
          name: "created_by",
          elementType: "select",
          label: "Created by",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
          permission: [COMPONENTS_VIEWS.can_see_all_created_by_freshmen],
          customOptions: data?.createdUsers?.map((e) => ({
            label: e?.firstname + " " + e?.lastname,
            value: e?.id,
          })),
        },
      ]}
      resetQueryExceptions={["page", "pageSize", "roundedTabIndex", "status"]}
      useExcludeArguments={{
        array: ["page", "pageSize", "roundedTabIndex", "status"],
      }}
      dates={[
        {
          enterFieldsName: "start_date_from",
          firstFieldName: "from_date",
          secondFieldName: "to_date",
        },
      ]}
      methods={methods}
      selects={selects}
      deletedFields={["start_date_from"]}
    />
  );
};

export default FilterComponent;
