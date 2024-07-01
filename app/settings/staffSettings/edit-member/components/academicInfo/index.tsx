import React, { FC, useMemo } from "react";
import { LesseonInfoWrapper, TopWrapper, Wrapper } from "./style";
import { IDataGetOne } from "../../type";
import { useRouter } from "next/router";
import TimeTable from "./components/timeTable";
import StudentsInfoCard from "./components/studentsInfoCard";
import studentData from "./components/studentsInfoCard/data";
import {
  useGetGroupDays,
  useGetStaff,
  useGetStaffTimeTable,
  useGetStudentScores,
  useGroup,
  useStaffGroups,
} from "hooks";
import AttendanceTabItem from "app/groups/[groupId]/components/attendanceTab";
import { expandGroup } from "./expand";
import LessonDayTab from "./components/lessonDayTab";
import GroupsTab from "./components/groupsTab";
import { Row, Col } from "antd";
import UnitSwiperCard from "./components/unitSwiperCard";
import { GROUP_FORM_GROUP } from "constants/groupForms";
import { getMonthAndYear } from "utils/getFormattedDate";
import LessonInfo from "./components/groupInfoCard/lessonInfo";

const AcademicInfo: FC<IDataGetOne> = ({ dataGetOne }) => {
  const router = useRouter();
  const { group_id, lesson_day_id } = router.query;
  const { month, year } = getMonthAndYear();

  const { data: getMe, isLoading } = useGetStaff({
    query_params: {
      user_id: dataGetOne?.userProfile.user_id,
    },
    enabled: true,
  });

  const { data, isInitialLoading } = useGetStaffTimeTable({
    support_id: dataGetOne?.userProfile.user_id,
    enabled: dataGetOne?.is_support,
  });

  const { data: groups, isLoading: groupsLoading } = useStaffGroups({
    query_params: {
      user_id: dataGetOne?.userProfile.user_id,
      lesson_day_id: lesson_day_id ?? 1,
    },
  });

  const groupId = useMemo(() => {
    return Number(group_id ?? groups?.[0]?.id);
  }, [group_id, groups]);

  const { data: group } = useGroup({
    id: groupId,
    expand: expandGroup,
  });

  const initialGroupForm =
    group?.groupType?.group_form?.toString() || GROUP_FORM_GROUP?.toString();

  const yearMonthFilter =
    initialGroupForm === GROUP_FORM_GROUP?.toString()
      ? {
          month,
          year,
        }
      : {};

  const { data: units, isInitialLoading: unitsLoading } = useGetGroupDays({
    query_params: {
      group: groupId,
      ...yearMonthFilter,
      expand: "unit, unit.parent_unit",
    },
  });

  const {
    data: studentScores,
    isInitialLoading: isStudentScoresLoading,
    isPreviousData: isStudentScoresPrevious,
  } = useGetStudentScores({
    query_params: {
      group_id: groupId,
      ...yearMonthFilter,
    },
  });

  const currentUnit = useMemo(() => {
    const opened = units?.filter((unit) => unit.opened);
    return opened?.at(-1);
  }, [units, groupId]);

  return (
    <Wrapper>
      <TopWrapper>
        {studentData({ data: getMe })?.map((item, index) => (
          <div className="col" key={index}>
            <StudentsInfoCard
              type={item.type}
              title={item.title}
              value={item.value}
              isLoading={isLoading}
              extra={item?.extra}
            />
          </div>
        ))}
      </TopWrapper>

      <TimeTable
        data={data}
        dataGetOne={dataGetOne}
        loading={isInitialLoading}
        is_support={!!dataGetOne?.is_support}
      />

      <LessonDayTab />

      <GroupsTab isLoading={groupsLoading} groups={groups} />

      <LesseonInfoWrapper>
        <Row gutter={10}>
          <Col span={6}>
            <UnitSwiperCard
              month={month}
              units={units}
              loading={unitsLoading}
              level={group?.level}
              currentUnit={currentUnit}
            />
          </Col>
          <LessonInfo
            studentScores={studentScores}
            loading={isStudentScoresLoading}
            contacts={group?.allContacts}
          />
        </Row>
      </LesseonInfoWrapper>
      <AttendanceTabItem passedGroup={group} disabledActions />
    </Wrapper>
  );
};

export default AcademicInfo;
