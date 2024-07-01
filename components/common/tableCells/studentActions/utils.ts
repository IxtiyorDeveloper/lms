import moment from "moment";
import { DATE_FORMAT_SHOW_MMM, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { STATE_OPENED, STATE_OPENING } from "constants/groupStatus";
import {
  CalendarESvg,
  ClockSvg,
  LearningSvg,
  LocationSvg,
  StartLessonSvg,
} from "components";
import {TeacherSvg} from "@jasurbekyuldashov/lms-web-icons";

export function generateRecommendationData({
  extra,
}: {
  extra?: { [key: string]: { [key: string]: any } } | { [key: string]: any };
}) {
  const student = extra?.student;
  const group = extra?.group;
  const teacher = extra?.teacher;
  return {
    student,
    user_id: student?.user_id,
    group: {
      lessonDay: group?.lessonDay,
      name: group?.name,
      startDate:
        group?.start_date &&
        moment(group.start_date, DATE_FORMAT_YYYY_MM_DD).format(
          DATE_FORMAT_SHOW_MMM
        ),
      freePlaces: group?.free_place, //
      status: group?.status,
      state: group?.state,
      identify: "enabled",
      teacher: teacher?.user?.userProfile
        ? `${teacher?.user?.userProfile?.firstname} ${teacher?.user?.userProfile?.lastname}`
        : "no teacher",
      note: group?.note,
      isNew:
        group?.state?.toString() === STATE_OPENING?.toString() ||
        group?.state?.toString() === STATE_OPENED?.toString(),
      levelId: group?.level_id,
      levelName: group?.level?.parent.name,
      subLevelId: group?.level?.id,
      subLevelName: group?.level?.name,
      day: group?.lessonDay?.name,
      time: group?.lessonTime?.time.slice(0, 5),
      branch: group?.room?.branch?.name,
      id: group?.id,
      fullStatus: [
        { name: "teacher", icon: TeacherSvg, status: "enabled" },
        {
          name: "levelName",
          icon: LearningSvg,
          status: "enabled",
        },
        {
          name: "subLevelName",
          icon: StartLessonSvg,
          status: "enabled",
        },
        {
          name: "day",
          icon: CalendarESvg,
          status: "enabled",
        },
        {
          name: "time",
          icon: ClockSvg,
          status: "enabled",
        },
        {
          name: "branch",
          icon: LocationSvg,
          status: "enabled",
        },
        {
          name: "note",
          icon: LocationSvg,
          status: "enabled",
        },
      ],
    },
  };
}
