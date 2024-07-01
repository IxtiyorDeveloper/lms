import {
  STATE_CLOSED,
  STATE_OPENED,
  STATE_OPENING,
  TGroupState,
} from "constants/groupStatus";
import { GROUP_MENTOR_100 } from "constants/groupMentors";
import moment from "moment/moment";
import { DATE_FORMAT_SHOW_MMM, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { Gender, IGroup, TWaitingList } from "types";
import {
  CalendarESvg,
  ClockSvg,
  FemaleSymbolSvg,
  LearningSvg,
  LocationSvg,
  MaleSymbolSvg,
  StartLessonSvg,
} from "components";
import _, { chain } from "lodash";
import { InfiniteData } from "@tanstack/query-core";
import { checkGroupStatusOpeningOrOpened } from "utils/groupStatusIdentifier";
import { TeacherSvg } from "@jasurbekyuldashov/lms-web-icons";

export function generateRecommendationList({
  data,
  lesson_time_id,
}: {
  data: TWaitingList | undefined;
  lesson_time_id: string[];
}) {
  let a: any[] = [];
  let b: any[] = [];

  data?.list
    .filter((e: any) => (e.state as TGroupState) !== STATE_CLOSED)
    .map((item: any) => {
      const teacher = item.groupMentors?.find(
        (e: any) => e.type === GROUP_MENTOR_100,
      )?.user?.userProfile;

      const fullCount = item?.contactsCountByGender?.reduce(
        (acc: number, cur: { count: string | number }) => {
          return acc + +cur.count;
        },
        0,
      );

      const isOpeningOrOpened = checkGroupStatusOpeningOrOpened({
        group: item,
      });

      const realFreePlace = isOpeningOrOpened
        ? +item?.groupType?.max_count +
          +item?.groupType?.additional_seat -
          fullCount
        : item?.free_place;

      if (lesson_time_id.findIndex((e: any) => e == item.lesson_time_id) > -1) {
        a.push({
          name: item.name,
          order: item.featureLevel.order,
          startDate:
            item.start_date &&
            moment(item.start_date, DATE_FORMAT_YYYY_MM_DD).format(
              DATE_FORMAT_SHOW_MMM,
            ),
          freePlaces: realFreePlace,
          status: item.status,
          identify: "enabled",
          teacher: teacher && `${teacher.firstname} ${teacher.lastname}`,
          note: item.note,
          isNew: item.state === STATE_OPENING || item.state === STATE_OPENED,
          state: item.state,
          male:
            item?.contactsCountByGender?.find(
              (g: { gender: Gender }) => g.gender == Gender.GENDER_MALE,
            )?.count ?? "0",
          female:
            item?.contactsCountByGender?.find(
              (g: { gender: Gender }) => g.gender == Gender.GENDER_FEMALE,
            )?.count ?? "0",
          levelId: item.featureLevel?.id,
          levelName: item.featureLevel.parent.name,
          subLevelId: item.featureLevel.id,
          subLevelName: item.featureLevel.name,
          day: item.lessonDay.name,
          time: item.lessonTime.time.slice(0, 5),
          branch: item.room.branch.name,
          weekIndex: item.lessonDay.lessonWeeks?.map((e: any) => e.week_day),
          id: item.id,
          fullStatus: [
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
        });
      } else {
        b.push({
          name: item.name,
          order: item.featureLevel.order,
          startDate:
            item.start_date &&
            moment(item.start_date, DATE_FORMAT_YYYY_MM_DD).format(
              DATE_FORMAT_SHOW_MMM,
            ),
          freePlaces: realFreePlace,
          status: item.status,
          identify: "disabled",
          teacher: teacher && `${teacher.firstname} ${teacher.lastname}`,
          note: item.note,
          isNew: item.state === STATE_OPENING || item.state === STATE_OPENED,
          state: item.state,
          male:
            item?.contactsCountByGender?.find(
              (g: { gender: Gender }) => g.gender == Gender.GENDER_MALE,
            )?.count ?? "0",
          female:
            item?.contactsCountByGender?.find(
              (g: { gender: Gender }) => g.gender == Gender.GENDER_FEMALE,
            )?.count ?? "0",
          levelId: item.featureLevel?.id,
          levelName: item.featureLevel.parent.name,
          subLevelId: item.featureLevel.id,
          subLevelName: item.featureLevel.name,
          day: item.lessonDay.name,
          time: item.lessonTime.time.slice(0, 5),
          branch: item.room.branch.name,
          weekIndex: item.lessonDay.lessonWeeks?.map((e: any) => e.week_day),
          id: item.id,
          fullStatus: [
            { name: "levelName", icon: LearningSvg, status: "enabled" },
            {
              name: "subLevelName",
              icon: StartLessonSvg,
              status: "enabled",
            },
            {
              name: "day",
              icon: CalendarESvg,
              status: "disabled",
            },
            {
              name: "time",
              icon: ClockSvg,
              status: "rejected",
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
              status: "disabled",
            },
            {
              name: "note",
              icon: LocationSvg,
              status: "disabled",
            },
          ],
        });
      }
      // }
    });
  return [a, b] || [[], []];
}

export function generateFullGroups({
  dataFullGroup,
}: {
  dataFullGroup?: IGroup[];
}) {
  let a: any[] = [];
  dataFullGroup &&
    (dataFullGroup as any)
      ?.filter((e: any) => (e?.state as TGroupState) !== STATE_CLOSED)
      ?.map((item: any) => {
        const teacher = item.groupMentors.find(
          (e: any) => e.type == GROUP_MENTOR_100,
        )?.user?.userProfile;

        const fullCount = item?.contactsCountByGender?.reduce(
          (acc: number, cur: { count: string | number }) => {
            return acc + +cur.count;
          },
          0,
        );

        const isOpeningOrOpened = checkGroupStatusOpeningOrOpened({
          group: item,
        });

        const realFreePlace = isOpeningOrOpened
          ? +item?.groupType?.max_count +
            +item?.groupType?.additional_seat -
            fullCount
          : item?.free_place;

        a.push({
          name: item.name,
          order: item.featureLevel.order,
          startDate:
            item.start_date &&
            moment(item.start_date, DATE_FORMAT_YYYY_MM_DD).format(
              DATE_FORMAT_SHOW_MMM,
            ),
          freePlaces: realFreePlace,
          status: item.status,
          identify: "disabled",
          teacher: teacher
            ? `${teacher.firstname} ${teacher.lastname}`
            : "No teacher",
          note: item.note,
          isNew: item.state === STATE_OPENING || item.state === STATE_OPENED,
          state: item.state,
          male:
            item?.contactsCountByGender?.find(
              (g: { gender: Gender }) => g.gender == Gender.GENDER_MALE,
            )?.count ?? "0",
          female:
            item?.contactsCountByGender?.find(
              (g: { gender: Gender }) => g.gender == Gender.GENDER_FEMALE,
            )?.count ?? "0",
          levelId: item.featureLevel?.id,
          levelName: item.featureLevel.parent?.name,
          subLevelId: item.featureLevel?.id,
          subLevelName: item.featureLevel?.name,
          day: item.lessonDay.name,
          time: item.lessonTime.time.slice(0, 5),
          weekIndex: item.lessonDay.lessonWeeks?.map((e: any) => e.week_day),
          branch: item.room.branch.name,
          id: item.id,
          fullStatus: [
            { name: "teacher", icon: TeacherSvg, status: "disabled" },
            { name: "levelName", icon: LearningSvg, status: "disabled" },
            {
              name: "subLevelName",
              icon: StartLessonSvg,
              status: "disabled",
            },
            {
              name: "day",
              icon: CalendarESvg,
              status: "disabled",
            },
            {
              name: "time",
              icon: ClockSvg,
              status: "disabled",
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
              status: "disabled",
            },
            {
              name: "note",
              icon: LocationSvg,
              status: "disabled",
            },
          ],
        });
      });
  return a.length > 0
    ? chain(_.sortBy(a, "order").reverse())
        .groupBy("levelId")
        .map((value) => value)
        .value()
    : [];
}
