import { IActionAcademic, IActionCompany } from "types/stopPageData";
import { ToHourMinute } from "utils/toHourMinute";

export function selectCreator(data: IActionAcademic & IActionCompany) {
  return {
    groupType: data?.group_types?.map((e) => {
      return {
        label: e.name,
        value: e.id,
      };
    }),
    course: data?.courses?.map((e) => {
      return {
        label: e.name,
        value: e.id,
      };
    }),
    level: {
      options: data?.levels
        ?.filter((e) => !e.parent_id)
        .map((item) => {
          return {
            label: item.name,
            value: item.id,
            subLevel: item?.children.map((e) => {
              return {
                label: e.name,
                value: e.id,
              };
            }),
          };
        }),
    },
    branch: data?.branches?.map((e) => {
      return {
        label: e.name,
        value: e.id,
      };
    }),
    stopping_categories: data?.stopping_categories?.map((e) => {
      return {
        label: e.name,
        value: e.id,
      };
    }),
    lesson_days: data?.lesson_days?.map((e) => {
      return {
        label: e.name,
        value: e.id,
      };
    }),
    lesson_times: data?.lesson_times?.map((e) => {
      return {
        label: ToHourMinute(e.time),
        value: e.id,
      };
    }),
  };
}
