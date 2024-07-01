import React, { useMemo } from "react";
import { Filters } from "components";
import { useCreatedByTabs } from "hooks";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { map } from "lodash";
import {
  DeletedFromLeads,
  deletedFromLeadsOptions,
  LeadSourceTypes,
} from "constants/leadTabs";
import { funcCheckPermission } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";

const Filter = ({ selects }: { selects: any }) => {
  const { isLoading, data } = useCreatedByTabs();
  const createdByList = useMemo(() => {
    return data?.users?.map((e: any) => {
      return {
        value: `${e.id}`,
        label: `${e?.firstname ?? ""} ${e?.lastname ?? ""}`,
      };
    });
  }, [isLoading, data]);

  const methods = useForm();
  const today = dayjs();

  const startOfMonth = dayjs().startOf("month");
  const defaultValue = [startOfMonth, today];

  const is_community_manager = funcCheckPermission([
    COMPONENTS_VIEWS.can_only_use_source_community_manager,
  ]);

  const source = useMemo(() => {
    if (is_community_manager) {
      return selects?.leadSourceSelect?.find(
        (i: any) => i.type == LeadSourceTypes.COMMUNITY_MANAGER
      )?.value;
    }
    return;
  }, [selects]);

  const deletedFrom = useMemo(() => {
    if (is_community_manager) {
      return DeletedFromLeads.PROCESSING?.toString();
    }
    return;
  }, [selects]);

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
          args: {
            defaultValue: defaultValue,
          },
        },
        {
          name: "source_id",
          elementType: "select",
          label: "Source",
          options: "leadSourceSelect",
          args: {
            maxTagCount: 1,
            mode: "multiple",
            defaultValue: source,
            disabled: is_community_manager,
          },
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
        {
          name: "lead_action_type",
          elementType: "select",
          label: "Label",
          customOptions: map(data?.labels, (value, key) => {
            return {
              value: key,
              label: value,
            };
          }),
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "responsible_id",
          elementType: "select",
          options: "leadUsers",
          label: "Responsible",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "deleted_from",
          elementType: "select",
          label: "Deleted from",
          customOptions: deletedFromLeadsOptions?.map((i) => {
            return {
              value: i.value.toString(),
              label: i.label,
            };
          }),
          args: {
            maxTagCount: 1,
            defaultValue: deletedFrom,
          },
        },
        {
          name: "leaving_category_id",
          elementType: "select",
          options: "leadLeavingCategories",
          label: "Deleted category",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
      ]}
      resetQueryExceptions={["page", "pageSize", "roundedTabIndex", "status"]}
      useExcludeArguments={{
        array: ["page", "pageSize", "roundedTabIndex", "status"],
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
      defaultValues={{
        deleted_from: deletedFrom,
      }}
    />
  );
};

export default Filter;
