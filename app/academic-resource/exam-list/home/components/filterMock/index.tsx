import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { Filters } from "components";
import { Wrapper } from "./style";
import { IExamPageData } from "types/exam/exam";
import { useAppSelector } from "store";
import { HEAD_TEACHER } from "constants/department";

interface IProps {
  data?: IExamPageData;
}
const FilterMockComponent: FC<IProps> = ({ data }) => {
  const methods = useForm();
  const selects = usePageDataMemo();
  const isHeadTeacher = useAppSelector(
    (state) => state.user.user?.rbacAssignment?.rbacRole?.key == HEAD_TEACHER
  );
  const defaultBranches = useAppSelector(
    (state) => state.user.user?.defaultBranches
  );

  const parentLevels = selects.level.options?.map((item) => ({
    ...item,
    value: item?.subLevel?.map((s) => s.value)?.toString(),
  }));

  return (
    <Wrapper>
      <Filters
        activeElements={[
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
            name: "room_id",
            elementType: "select",
            label: "Room",
            customOptions: selects?.room?.filter(
              (room: any) =>
                !methods.watch("branch_id") ||
                room.branch_id.toString() ===
                  methods.watch("branch_id")?.toString()
            ),
            args: {
              maxTagCount: 1,
              mode: "multiple",
            },
          },
          {
            name: "stats_level_id",
            elementType: "select",
            customOptions: parentLevels,
            label: "Level",
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
            name: "lesson_day_id",
            elementType: "select",
            label: "Day",
            placeholder: "-",
            customOptions: selects.day?.map((e) => {
              return {
                ...e,
                value: e.value.toString(),
              };
            }),
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
        ]}
        resetQueryExceptions={[
          "page",
          "pageSize",
          "roundedTabIndex",
          "status",
          "date",
        ]}
        useExcludeArguments={{
          array: ["page", "pageSize", "roundedTabIndex", "date"],
        }}
        defaultValues={{ branch_id: isHeadTeacher ? defaultBranches : [] }}
        methods={methods}
        selects={selects}
      />
    </Wrapper>
  );
};

export default FilterMockComponent;
