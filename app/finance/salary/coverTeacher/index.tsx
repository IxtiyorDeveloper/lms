import React, { useMemo } from "react";
import { Wrapper } from "./style";
import TopFilter from "./components/topFilter";
import CoverTeacherModal from "globals/components/coverTeacher";
import { useCoverTeacherSettings, useGetDetailedCoverTeacher } from "hooks";
import { Spin } from "antd";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { CalendarContent } from "./components/calendarFilter";
import DeleteCoverTeacher from "globals/components/deleteCoverTeacher";
import { IncomingContent } from "./components/incoming";
import { OutgoingContent } from "./components/outgoing";
import { IRestructured } from "./components/calendarFilter/content/type";
import {
  groupByDate,
  restructureDataByReceiverId,
} from "./components/calendarFilter/functions";
import { restructureArrayToUser } from "./components/outgoing/functions";

export enum coverTab {
  CALENDAR = "calendar",
  INCOMING = "incoming",
  OUTGOING = "outgoing",
}

const CoverTeacher = () => {
  const router = useRouter();
  const {
    teacher_date_from,
    teacher_date_to,
    teacher_id,
    cover_teacher_date_from,
    cover_teacher_date_to,
    cover_teacher_id,
    group_type_id,
  } = router.query;

  const isCoverTypeNotOutGoing =
    router.query.coverType?.toString() !== coverTab.OUTGOING;

  const { data, isLoading, isPreviousData } = useGetDetailedCoverTeacher({
    query_params: {
      year: router.query?.year || moment().year(),
      month: router.query?.month || moment().month(),
      expand: "rbacRole,user.userProfile.avatar,salary,pair.salary",
    },
    body: {
      teacher_date_from,
      teacher_date_to,
      teacher_id,
      cover_teacher_date_from,
      cover_teacher_date_to,
      cover_teacher_id,
      group_type_id: isCoverTypeNotOutGoing ? group_type_id : undefined,
    },
  });

  const {
    data: settings,
    isLoading: isSettingsLoading,
    isPreviousData: isSettingsPrevious,
  } = useCoverTeacherSettings();

  // uchta tab uchun data ni qaytadan shakllantiramiz
  const restructured = useMemo(() => {
    const calendarRestructured: IRestructured[] = groupByDate({
      components: data?.components,
      assignments: data?.assignments,
    });

    const incomingRestructured = restructureDataByReceiverId({
      data: data?.components,
      assignments: data?.assignments,
    });

    const outgoingRestructured = restructureArrayToUser({
      data: data?.components,
      assignments: data?.assignments,
    });
    return {
      calendarRestructured,
      incomingRestructured,
      outgoingRestructured,
    };
  }, [data]);

  const content = {
    [coverTab.CALENDAR]: (
      <CalendarContent
        data={restructured.calendarRestructured}
        settings={settings}
        mainData={data}
      />
    ),
    [coverTab.INCOMING]: (
      <IncomingContent
        data={restructured.incomingRestructured}
        settings={settings}
      />
    ),
    [coverTab.OUTGOING]: (
      <OutgoingContent
        data={restructured.outgoingRestructured}
        settings={settings}
      />
    ),
  };

  return (
    <Wrapper>
      <Spin
        spinning={
          isLoading || isPreviousData || isSettingsPrevious || isSettingsLoading
        }
      >
        <CoverTeacherModal />
        <DeleteCoverTeacher />
        <TopFilter
          data={data}
          settings={settings}
          restructured={restructured}
        />
        {
          content?.[
            (router.query?.coverType ??
              coverTab.CALENDAR) as keyof typeof content
          ]
        }
      </Spin>
    </Wrapper>
  );
};

export default CoverTeacher;
