import React, { useEffect, useState } from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { FilterWrapper } from "./style";
import _ from "lodash";
import { ITeacher } from "types/teacher";
import { IOption } from "components/common/select/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterBlackList } from "validation/finance";

function arrayContainsArray(arr1: string[], arr2: string[]) {
  return _.intersection(arr1, arr2).length > 0;
}

const FilterComponent = () => {
  const methods = useForm({
    resolver: yupResolver(FilterBlackList),
  });
  const selects = usePageDataMemo();
  const [dataOpt, setDataOpt] = useState<IOption[]>([]);

  const filterTeachers = (
    persons: ITeacher[],
    branches: string[],
    days: string[]
  ) => {
    let resFin: IOption[] = [];
    persons?.map((r) => {
      if (
        arrayContainsArray(
          r.branches?.map?.((e) => e.toString()),
          branches?.map?.((e) => e.toString())
        ) &&
        arrayContainsArray(
          r.days?.map((e) => e.toString()),
          days?.map((e) => e.toString())
        )
      ) {
        resFin.push({
          label: r.firstname + " " + r.lastname,
          value: r?.id,
        });
      }
    });
    return resFin;
  };

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      if (type === "change") {
        setDataOpt(
          filterTeachers(selects.teachers!, value.branch_id, value.day_id)
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [methods.watch, selects.teachers]);

  return (
    <FilterWrapper>
      <Filters
        isFieldsRequired={true}
        activeElements={[
          {
            name: "branch_id",
            elementType: "select",
            placeholder: "Branch",
            options: "branch",
            args: {
              maxTagCount: 1,
              mode: "multiple",
              error: methods.formState.errors.branch_id?.message,
              isSelectAll: true,
            },
          },
          {
            name: "day_id",
            elementType: "select",
            placeholder: "Day",
            options: "day",
            args: {
              maxTagCount: 1,
              mode: "multiple",
              isSelectAll: true,
            },
          },
          {
            name: "teacherIds",
            elementType: "select",
            placeholder: "Teachers",
            customOptions: Array.isArray(dataOpt) ? dataOpt : [],
            args: {
              maxTagCount: 1,
              mode: "multiple",
              isSelectAll: true,
            },
            colProps: {
              xl: 6,
              lg: 6,
            },
          },
        ]}
        useExcludeArguments={{}}
        methods={methods}
        selects={selects}
      />
    </FilterWrapper>
  );
};

export default FilterComponent;
