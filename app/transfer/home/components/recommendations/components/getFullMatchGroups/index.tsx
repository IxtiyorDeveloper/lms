import moment from "moment";
import { DATE_FORMAT_SHOW_MMM, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import {
  groupStatus,
  STATE_OPENED,
  STATE_OPENING,
  TGroupState,
} from "constants/groupStatus";
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

export const getFullMatchGroups = ({ data }: { data?: IGroup[] }) => {
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
        identify: "enabled",
        teacher: teacher && `${teacher.firstname} ${teacher.lastname}`,
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
        male:
          item?.contactsCountByGender?.find(
            (g: { gender: Gender }) => g.gender == Gender.GENDER_MALE,
          )?.count ?? "0",
        female:
          item?.contactsCountByGender?.find(
            (g: { gender: Gender }) => g.gender == Gender.GENDER_FEMALE,
          )?.count ?? "0",
        groupType: item.groupType.name,
        weekIndex: item.lessonDay?.lessonWeeks?.map((e: any) => e.week_day),
        id: item.id,
        fullStatus: [
          { name: "teacher", icon: TeacherSvg, status: "enabled" },
          { name: "levelName", icon: LearningSvg, status: "enabled" },
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
            name: "male",
            icon: MaleSymbolSvg,
            status: "enabled",
          },
          {
            name: "female",
            icon: FemaleSymbolSvg,
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
      };
    });
  } else return undefined;
};
