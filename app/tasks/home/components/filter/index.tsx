import React from "react";
import { Wrapper } from "./style";
import { Filters } from "components";
import { useGetUsers, usePageDataMemo, useTaskCategories } from "hooks";
import { useForm } from "react-hook-form";
import { Interface } from "components/common/filters/type";
import { ITaskCategory, ITaskUserByDep } from "types";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const Filter = () => {
  const router = useRouter();
  const methods = useForm();
  const selects = usePageDataMemo();

  const { data: dataCategories } = useTaskCategories();

  const { data: dataSupervisors } = useGetUsers({
    query_params: {
      user_type: 500,
    },
  });

  const { data: dataResponsible } = useGetUsers({
    query_params: {
      user_type: 200,
    },
  });

  const dataSupervisorsByOpt = dataSupervisors?.map((supervisor) => {
    return {
      label: supervisor.name,
      value: supervisor.id,
      children: supervisor?.users?.map((user: ITaskUserByDep) => {
        return {
          label: user.name,
          value: `user__${user.id}`,
        };
      }),
    };
  });
  const router_from_date = router.query?.from_date?.toString();
  const router_to_date = router.query?.to_date?.toString();

  const from_date = dayjs(router_from_date);
  const to_date = dayjs(router_to_date);

  const startOfMonth = router_from_date ? from_date : dayjs().startOf("month");
  const endOfMonth = router_to_date ? to_date : dayjs().endOf("month");

  const defaultDates = [startOfMonth, endOfMonth];

  const options: Interface = {
    activeElements: [
      {
        name: "search",
        elementType: "search",
        placeholder: "Search",
      },
      {
        name: "from_date",
        elementType: "rangePicker",
        label: "Created date period",
        args: {
          defaultValue: defaultDates,
        },
      },
      {
        name: "category_id",
        elementType: "select",
        label: "Category",
        args: {
          maxTagCount: 1,
          mode: "multiple",
        },
        customOptions: dataCategories?.map((category: ITaskCategory) => {
          return { value: category.id?.toString(), label: category.name };
        }),
        placeholder: "Select",
      },
      {
        name: "branch_id",
        elementType: "select",
        options: "branch",
        label: "Branch",
        args: {
          maxTagCount: 1,
          mode: "multiple",
        },
        placeholder: "Select",
      },
      {
        name: "supervisor_ids",
        elementType: "treeSelect",
        label: "Supervisor",
        placeholder: "Select",
        customOptions: dataSupervisorsByOpt,
        args: {
          maxTagCount: 1,
          mode: "multiple",
          getPopupContainer: (triggerNode) => triggerNode.parentElement,
          treeCheckable: true,
        },
      },
      {
        name: "responsible_ids",
        elementType: "treeSelect",
        label: "Responsible",
        placeholder: "Select",
        customOptions: dataResponsible?.map((supervisor) => {
          return {
            label: supervisor.name,
            value: supervisor.id,
            children: supervisor?.users?.map((user: ITaskUserByDep) => {
              return {
                label: user.name,
                value: user.id,
              };
            }),
          };
        }),
        args: {
          maxTagCount: 1,
          mode: "multiple",
          getPopupContainer: (triggerNode) => triggerNode.parentElement,
          treeCheckable: true,
        },
      },
    ],
    resetQueryExceptions: ["page", "pageSize", "userType", "processing"],
    useExcludeArguments: {
      array: ["page", "pageSize", "userType", "processing"],
      dependencies: router.query,
    },
    dates: [
      {
        enterFieldsName: "from_date",
        firstFieldName: "from_date",
        secondFieldName: "to_date",
      },
    ],
    methods: methods,
    selects: selects,
  };

  return (
    <Wrapper>
      <Filters {...options} />
    </Wrapper>
  );
};

export default Filter;
