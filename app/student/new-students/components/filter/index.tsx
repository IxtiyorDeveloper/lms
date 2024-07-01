import React, { useMemo } from "react";
import { Filters, labelOptions } from "components";
import { useForm } from "react-hook-form";
import { useGCPageDataMemo, usePageDataMemo } from "hooks";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { funcCheckPermission } from "utils/guard";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { checkLabelVisible } from "utils/checkLabelVisible";
import { LABEL_COMING } from "constants/labels";

const FilterComponent = () => {
  const methods = useForm();
  const selects = usePageDataMemo();
  const selectsGC = useGCPageDataMemo();
  const can_filter_default_all_new_students = funcCheckPermission([
    COMPONENTS_VIEWS.can_filter_default_all_new_students,
  ]);
  const defaultBranches = useSelector(
    (state: IStore) => state.user?.user?.defaultBranches
  );
  const userId = useSelector((state: IStore) => state.user?.user?.id);

  const argsAddedBy = useMemo(() => {
    if (can_filter_default_all_new_students)
      return {
        maxTagCount: 1,
        mode: "multiple" as "multiple",
      };
    else {
      return {
        maxTagCount: 1,
        mode: "multiple" as "multiple",
      };
    }
  }, [selectsGC.args.isSuccess, can_filter_default_all_new_students]);

  if (!selectsGC.addedBy) {
    return null;
  }

  const isComingVisible = checkLabelVisible({
    methods,
    labelKey: LABEL_COMING,
  });
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
          name: "lesson_day_id",
          elementType: "select",
          label: "Days",
          options: "days",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "time_id",
          elementType: "select",
          options: "time",
          label: "Time",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "branch_id",
          elementType: "select",
          label: "Branch",
          options: "branch",
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
            (e) => e?.value.toString() === methods.watch("parent_level_id")
          )?.subLevel,
          args: {
            disabled: !methods.watch("parent_level_id"),
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "teacher_id",
          elementType: "select",
          label: "Teacher",
          customOptions: selectsGC.teachers,
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "group_id",
          elementType: "select",
          label: "Group name",
          customOptions: selectsGC.groupName,
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "start_date",
          elementType: "rangePicker",
          label: "Start date period",
        },
        {
          name: "added_by",
          elementType: "select",
          label: "Added by",
          options: "responsibles",
          permission: [COMPONENTS_VIEWS.can_filter_student_by_created_by],
          customOptions: selectsGC.addedBy,
          args: argsAddedBy,
        },
        {
          name: "group_state",
          elementType: "select",
          label: "Group status",
          customOptions: selectsGC.groupStatus,
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "user_label_type",
          elementType: "select",
          label: "Label",
          // customOptions: disableLabels(
          //   labelOptions.filter((option) =>
          //     selects?.newStudentLabels.some(
          //       (label) => label.value == option.value
          //     )
          //   ),
          //   methods.watch,
          //   "user_label_type"
          // ),
          customOptions: labelOptions.filter((option) =>
            selects?.newStudentLabels.some(
              (label) => label.value == option.value
            )
          ),
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "label_date",
          elementType: "rangePicker",
          label: "Coming date period",
          isVisible: isComingVisible,
        },
      ]}
      resetQueryExceptions={["page", "pageSize", "roundedTabIndex", "status"]}
      useExcludeArguments={{
        array: ["page", "pageSize", "roundedTabIndex", "status"],
        isClearChange: [
          {
            watchField: "parent_level_id",
            clearField: "level_id",
          },
        ],
      }}
      dates={[
        {
          enterFieldsName: "start_date",
          firstFieldName: "start_date_from",
          secondFieldName: "start_date_to",
        },
        {
          enterFieldsName: "label_date",
          firstFieldName: "label_from_date",
          secondFieldName: "label_to_date",
          isVisible: isComingVisible,
        },
      ]}
      methods={methods}
      selects={selects}
      dateFormatDisabled
      deletedFields={["start_date", "label_date"]}
      defaultValues={{
        ...(defaultBranches?.length === 1 &&
        !!selectsGC.addedBy?.find?.((e) => e.value == `${userId}`)?.value
          ? { added_by: `${userId}` }
          : {}),
        branch_id: (defaultBranches?.length || 0) > 1 ? defaultBranches : [],
      }}
    />
  );
};

export default FilterComponent;
