import { useEffect } from "react";
import { NextRouter } from "next/router";
import { MainPhone } from "constants/phoneTypes";
import { usePageDataMemo } from "hooks";
import { OneStudent } from "types/student";
import dayjs from "dayjs";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_YYYY_MM_DD,
} from "constants/dates";

interface IProps {
  setValue: any;
  data: any;
  router: NextRouter;
  isLoading: boolean;
}
export const useSetUpdate = ({ setValue, data, router, isLoading }: IProps) => {
  const selects = usePageDataMemo();

  useEffect(() => {
    const data1 = data as OneStudent;
    if (!isLoading && router.query.type === "update" && data1?.source) {
      setValue("root", {
        note: data1?.note,
        first_name: data1?.user?.userProfile?.firstname,
        last_name: data1?.user?.userProfile?.lastname,
        dob: data1?.user?.userProfile?.dob,
        gender: data1?.user?.userProfile?.gender,
        locale: data1?.user?.userProfile?.locale,
        start_date:
          data1.startDateLabel?.datetime &&
          dayjs(data1.startDateLabel?.datetime, DATE_FORMAT_CREATED_AT).format(
            DATE_FORMAT_YYYY_MM_DD,
          ),
        source_id: data1.source?.id && `${data1.source?.id}`,
        course_id: data1.course?.id && `${data1.course?.id}`,
        group_type_id: data1.groupType?.id && `${data1.groupType?.id}`,
        level_id: data1.level?.parent_id && `${data1.level?.parent_id}`,
        sub_level_id: `${data1.level?.id}`,
        branch_id: data1.preferBranches
          .map((r: any) => `${r.branch?.id}`)
          .filter((e: any) => !!e),
        teacher_id: data1.preferMentors
          .map((r: any) => {
            return {
              value: `${r.mentor?.id}`,
              label: `${r.mentor?.userProfile?.firstname || ""} ${r.mentor?.userProfile?.lastname || ""}`,
            };
          })
          .filter((e: any) => !!e),
        avtar_file_id: data1?.user?.userProfile?.avatar?.id,
        strict_by_day: data1?.strictPreferences?.["100"],
        strict_by_time: data1?.strictPreferences?.["200"],
        strict_by_branch: data1?.strictPreferences?.["300"],
        // strict_by_teacher: data1?.strictPreferences?.["400"],
        strict_by_level: data1?.strictPreferences?.["500"],
      });
      setValue(
        "root.phones",
        (data1?.user?.userPhones || [])?.length > 0
          ? data1.user?.userPhones?.map((r: any) => {
              return {
                type: `${r?.type}`,
                phone_number: `+${r?.phone_number}`,
                is_confirmed: r?.is_confirmed,
                checked: !!r?.is_confirmed,
                is_finished: r?.is_finished,
                confirmation_id: r?.is_confirmed && -1,
                admin_confirmation_id: r?.is_confirmed && -1,
                is_active: r?.is_active,
                date: r?.date,
                sms: r?.sms,
                time: r?.time,
              };
            })
          : [
              {
                type: MainPhone.toString(),
              },
            ],
      );
      setValue(
        "root.lesson_time_id",
        data1.preferTimes
          .map((r: any) => r?.time?.id && `${r?.time?.id}`)
          .filter((e: any) => !!e),
      );
      setValue(
        "root.lesson_day_id",
        data1.preferDays
          .map((r: any) => {
            return r?.day?.id && `${r?.day?.id}`;
          })
          .filter((e: any) => !!e),
      );
    } else {
      setValue(
        "root.branch_id",
        selects.branch
          ?.filter((e) => !e.label?.toLocaleLowerCase()?.includes("test"))
          ?.map((e) => e.value),
      );
      setValue(
        "root.lesson_day_id",
        selects.days?.map((e) => e.value),
      );
      setValue(
        "root.lesson_time_id",
        selects.time?.map((e) => e.value),
      );
    }
  }, [isLoading, data, selects?.branch?.length, router.query]);
};
