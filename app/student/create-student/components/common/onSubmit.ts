import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { strOnlyNumbers } from "utils/textFormat";
import { NextRouter } from "next/router";

export interface IProps {
  isBan: 1 | 0;
  getValues: any;
  router: NextRouter;
  updateUser: any;
  saveUser: any;
  is_ban: number;
}

export const undefinedValues = {
  course_id: undefined,
  group_type_id: undefined,
  level_id: undefined,
  sub_level_id: undefined,
  strict_by_branch: undefined,
  strict_by_level: undefined,
  strict_by_time: undefined,
  strict_by_day: undefined,
  lesson_day_id: undefined,
  lesson_time_id: undefined,
  branch_id: undefined,
  teacher_id: undefined,
  start_date: undefined,
};

export const onSubmit = ({
  isBan,
  getValues,
  router,
  updateUser,
  saveUser,
  is_ban,
}: IProps) => {
  const e: any = getValues().root;
  router.query.type === "update"
    ? updateUser.mutate({
        ...e,
        id: router.query.id,
        dob: e.dob
          ? moment(new Date(e.dob)).format(DATE_FORMAT_YYYY_MM_DD)
          : null,
        phones: e.phones.map((item: any) => {
          return {
            type: item.type,
            phone_number: strOnlyNumbers(item.phone_number),
            is_confirmed: item.is_confirmed,
            confirmation_id:
              item.confirmation_id === -1 ? undefined : item.confirmation_id,
            admin_confirmation_id:
              item.admin_confirmation_id === -1
                ? undefined
                : item.admin_confirmation_id,
          };
        }),
        // locale: e.locale,
        day: undefined,
        time: undefined,
        is_ban: typeof isBan === "number" ? isBan : is_ban,
        preferences: {
          course_id: e.course_id,
          group_type_id: e.group_type_id,
          level_id: e.sub_level_id,
          strict_by_branch: e.strict_by_branch,
          strict_by_level: e.strict_by_level,
          strict_by_time: e.strict_by_time,
          strict_by_day: e.strict_by_day,
          lesson_day_id: e.lesson_day_id,
          lesson_time_id: e.lesson_time_id,
          branch_id: Array.isArray(e.branch_id) ? e.branch_id : [e.branch_id],
          teacher_id: e.teacher_id?.map((e: any) => e.value) || [],
          start_date: e.start_date,
        },

        ...undefinedValues,
      })
    : saveUser.mutate({
        ...e,
        dob: e.dob
          ? moment(new Date(e.dob)).format(DATE_FORMAT_YYYY_MM_DD)
          : null,
        phones: e.phones?.map((item: any) => {
          return {
            type: item.type,
            phone_number: strOnlyNumbers(item.phone_number),
            is_confirmed: item.is_confirmed,
            confirmation_id:
              item.confirmation_id === -1 ? undefined : item.confirmation_id,
          };
        }),
        locale: e.locale,
        day: undefined,
        time: undefined,
        is_ban: typeof isBan === "number" ? isBan : is_ban,
        preferences: {
          course_id: e.course_id,
          group_type_id: e.group_type_id,
          level_id: e.sub_level_id,
          strict_by_branch: e.strict_by_branch,
          strict_by_level: e.strict_by_level,
          strict_by_time: e.strict_by_time,
          strict_by_day: e.strict_by_day,
          lesson_day_id: e.lesson_day_id,
          lesson_time_id: e.lesson_time_id,
          branch_id: Array.isArray(e.branch_id) ? e.branch_id : [e.branch_id],
          teacher_id: e.teacher_id,
          start_date: e.start_date,
        },
        ...undefinedValues,
      });
};
