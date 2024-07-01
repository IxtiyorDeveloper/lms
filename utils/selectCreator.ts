import { IAdminGroupInitialPage, TParams } from "types";

export function selectCreator(data: IAdminGroupInitialPage | undefined) {
  if (data)
    return {
      groupType: data?.groupTypes?.map((e) => {
        return {
          label: e.name,
          value: e.id,
        };
      }),
      course: data?.courses?.map((e) => {
        return {
          label: e.name,
          value: e.id?.toString(),
          groupType: e?.groupTypes?.map((groupType) => {
            return {
              label: groupType.name,
              value: groupType.id?.toString(),
              group_form: groupType?.group_form,
            };
          }),
          level: {
            options: e?.parentLevels
              ?.filter((filtered) => !filtered.parent_id)
              ?.map((item) => {
                return {
                  label: item.name,
                  value: item.id?.toString(),
                  subLevel: item?.children.map((subLevel) => {
                    return {
                      label: subLevel.name,
                      value: subLevel.id?.toString(),
                    };
                  }),
                };
              }),
          },
          time: e?.lessonTimes?.map((lessonTime) => {
            return {
              label: lessonTime.time.replace(/:[^:]*$/, ""),
              value: lessonTime.id?.toString(),
            };
          }),
          day: e?.lessonDays?.map((lessonDay) => {
            return {
              label: lessonDay.name,
              value: lessonDay.id?.toString(),
            };
          }),
        };
      }),
      level: {
        options: data?.levels
          ?.filter((e) => !e.parent_id)
          ?.map((item) => {
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
      room: data?.rooms?.map((e) => {
        return {
          label: e.name,
          value: e.id,
          branch_id: e.branch_id,
        };
      }),
      teacher: data?.teachers?.map((e) => {
        return {
          label: e.firstname + " " + e.lastname,
          value: e?.user_id,
        };
      }),
      support: data?.supports?.map((e) => {
        return {
          label: e.firstname + " " + e.lastname,
          value: e?.user_id,
        };
      }),
      time: data?.times?.map((e) => {
        return {
          label: e.time.replace(/:[^:]*$/, ""),
          value: e.id,
        };
      }),
      day: data?.days?.map((e) => {
        return {
          label: e.name,
          value: e.id,
        };
      }),
      stoppingCategories: data?.stoppingCategories?.map((e) => {
        return {
          label: e.name,
          value: e.id,
        };
      }),
      stoppedByUsers: data?.stoppedByUsers?.map((e) => {
        return {
          label: e?.firstname + " " + e.lastname,
          value: e.id,
        };
      }),
      balanceStatuses: Object?.entries(data?.balanceStatuses ?? {})?.map(
        (item) => {
          return {
            label: item[1] as any,
            value: item[0] as any,
          };
        }
      ),
    };
}

export const SingleObjectSelectCreator = (data?: TParams) => {
  if (data)
    return Object?.entries(data ?? {})?.map((item) => {
      return {
        label: item[1] as any,
        value: item[0] as any,
      };
    });
};
