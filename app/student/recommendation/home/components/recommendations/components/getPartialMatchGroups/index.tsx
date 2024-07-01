import moment from "moment";
import { DATE_FORMAT_SHOW_MMM, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { STATE_OPENED, STATE_OPENING } from "constants/groupStatus";
import { Gender, IGroup } from "types";
import {
  CalendarESvg,
  ClockSvg,
  FemaleSymbolSvg,
  LearningSvg,
  LocationSvg,
  MaleSymbolSvg,
  StartLessonSvg,
} from "components";
import { checkGroupStatusOpeningOrOpened } from "utils";
import { GROUP_MENTOR_100 } from "constants/groupMentors";
import { TeacherSvg } from "@jasurbekyuldashov/lms-web-icons";
import { OneStudent } from "types/student";
import { getStatus } from "./getStatus";

export const getPartialMatchGroups = ({
  data,
  student,
}: {
  data?: IGroup[];
  student: OneStudent | undefined;
}) => {
  if (data) {
    return data?.map((item) => {
      const fullCount =
        item?.contactsCountByGender?.reduce(
          (acc: number, cur: { count: string | number }) => {
            return acc + +cur.count;
          },
          0,
        ) ?? 0;

      const isOpeningOrOpened = checkGroupStatusOpeningOrOpened({
        group: item,
      });

      const realFreePlace = isOpeningOrOpened
        ? +item?.groupType?.max_count +
          +item?.groupType?.additional_seat -
          fullCount
        : item?.free_place;

      const teacher = item.groupMentors?.find(
        (e: any) => e.type === GROUP_MENTOR_100,
      )?.user?.userProfile;
      const status = getStatus({ group: item, student });
      return {
        name: item.name,
        order: item.featureLevel?.order,
        startDate:
          item.start_date &&
          moment(item.start_date, DATE_FORMAT_YYYY_MM_DD).format(
            DATE_FORMAT_SHOW_MMM,
          ),
        freePlaces: realFreePlace,
        status: item.status,
        state: item.state,
        identify: "disabled",
        teacher: teacher
          ? `${teacher?.firstname} ${teacher?.lastname}`
          : "No teacher",
        note: item.note,
        isNew:
          item.state == STATE_OPENING?.toString() ||
          item.state == STATE_OPENED?.toString(),
        levelId: item.featureLevel?.id,
        levelName: item.featureLevel?.parent.name,
        subLevelId: item.featureLevel?.id,
        subLevelName: item.featureLevel?.name,
        day: item.lessonDay?.name,
        time: item.lessonTime?.time.slice(0, 5),
        branch: item.room?.branch?.name,
        branch_id: item.room?.branch?.id,
        male:
          item?.contactsCountByGender?.find(
            (g: { gender: Gender }) => g.gender == Gender.GENDER_MALE,
          )?.count ?? "0",
        female:
          item?.contactsCountByGender?.find(
            (g: { gender: Gender }) => g.gender == Gender.GENDER_FEMALE,
          )?.count ?? "0",
        weekIndex: item.lessonDay?.lessonWeeks?.map((e: any) => e.week_day),
        id: item.id,
        groupType: item.groupType.name,
        fullStatus: [
          {
            name: "teacher",
            icon: TeacherSvg,
            status: status.teacher ? "disabled" : "rejected",
          },
          { name: "levelName", icon: LearningSvg, status: "disabled" },
          {
            name: "subLevelName",
            icon: StartLessonSvg,
            status: "disabled",
          },
          {
            name: "day",
            icon: CalendarESvg,
            status: status.day ? "disabled" : "rejected",
          },
          {
            name: "time",
            icon: ClockSvg,
            status: status.time ? "disabled" : "rejected",
          },
          {
            name: "male",
            icon: MaleSymbolSvg,
            status: "disabled",
          },
          {
            name: "female",
            icon: FemaleSymbolSvg,
            status: "disabled",
          },
          {
            name: "branch",
            icon: LocationSvg,
            status: status.branch ? "disabled" : "rejected",
          },
          {
            name: "note",
            icon: LocationSvg,
            status: "disabled",
          },
        ],
      };
    });
  } else return undefined;
};
