import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { Wrapper } from "./style";
import { getOptions } from "./selects";
import {
  IStaffInitialData,
  ITypeStaffWorkingStatus,
} from "types/staffSettings";
import { Spin } from "antd";
import { makeArrayOptions } from "utils/functions/makeArrayOptions";
import { useRouter } from "next/router";
import { usePageDataMemo } from "../../../../../hooks";

const FilterComponent = ({
  initialData,
  loading,
  tab,
}: {
  initialData: IStaffInitialData | undefined;
  loading: boolean;
  tab?: ITypeStaffWorkingStatus;
}) => {
  const router = useRouter();

  const methods = useForm();
  const createdBy =
    tab == ITypeStaffWorkingStatus.REGISTERING
      ? makeArrayOptions({
          arr: initialData?.registeringCreatedByList,
          label: "username",
          value: "id",
        })
      : getOptions({
          data: initialData,
          optionName: "created_by",
        });

  const selects = usePageDataMemo();

  return (
    <Wrapper>
      <Spin spinning={loading}>
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
              label:
                router.query?.roundedTabIndex === "2" ||
                Number(router.query?.status) ===
                  ITypeStaffWorkingStatus.ARCHIVED
                  ? "Archived date period"
                  : "Created date period",
            },
            {
              name: "created_by",
              elementType: "select",
              customOptions: createdBy as any,
              label: "Created by",
              placeholder: "Select",
              args: {
                maxTagCount: 1,
                mode: "multiple",
              },
            },
            {
              name: "age",
              elementType: "select",
              label: "Age",
              placeholder: "Select",
              customOptions: getOptions({ optionName: "age" }),
              args: {
                maxTagCount: 1,
                mode: "multiple",
              },
            },
            {
              name: "gender",
              elementType: "select",
              label: "Gender",
              placeholder: "Select",
              customOptions: getOptions({ optionName: "gender" }),
            },
            {
              name: "branch_id",
              elementType: "select",
              label: "Branch",
              placeholder: "Select",
              customOptions: selects.branch,
              args: {
                maxTagCount: 1,
                mode: "multiple",
              },
            },
          ]}
          resetQueryExceptions={[
            "page",
            "pageSize",
            "create-role",
            "staffsGroupId",
            "status",
            "roundedTabIndex",
          ]}
          useExcludeArguments={{
            array: [
              "roundedTabIndex",
              "page",
              "pageSize",
              "staffsGroupId",
              "status",
              "create-role",
            ],
          }}
          dates={[
            {
              enterFieldsName: "start_date",
              firstFieldName: "start_date",
              secondFieldName: "end_date",
            },
          ]}
          methods={methods}
        />
      </Spin>
    </Wrapper>
  );
};

export default FilterComponent;
