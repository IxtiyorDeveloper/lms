import { Col } from "antd";
import React, { useMemo } from "react";
import GroupInfoCard from ".";
import { GroupInfoCardType } from "./type";
import { IProgress, StudentProgressEnum } from "types/ars/teacher";
import moment from "moment";
import { useRouter } from "next/router";
import { IContacts } from "types/contact";
import { getDividedValue } from "utils/number";

const LessonInfo = ({
  studentScores,
  loading,
  contacts,
}: {
  studentScores: IProgress[] | undefined;
  loading: boolean;
  contacts?: IContacts[] | undefined;
}) => {
  const router = useRouter();
  const { unit_date, unit } = router.query;

  const groupProgress = useMemo(() => {
    const selectUnitDate = moment(unit_date);
    return contacts
      ?.filter((student) => {
        const a = student.actualPayment?.start_date;
        const b = student.actualPayment?.finish_date;
        const isWithinRange = selectUnitDate.isBetween(a, b, null, "[]");
        return isWithinRange;
      })
      .map((student) => {
        const user = student.user?.userProfile;
        return {
          id: student?.user?.id,
          fullName: `${user?.firstname} ${user?.lastname}`,
          ...studentScores?.find(
            (score) =>
              score?.base_user_id === student?.user?.id &&
              score.group_unit_id.toString() == unit?.toString()
          ),
        };
      })
      .filter((score) => score?.status === StudentProgressEnum.COUNTABLE);
  }, [unit_date, unit, studentScores, contacts]);

  const homeworkDone = useMemo(() => {
    return groupProgress?.filter((item) => item?.passed);
  }, [groupProgress]);

  const homeworkNotDone = useMemo(() => {
    return groupProgress?.filter((item) => !item?.passed);
  }, [groupProgress]);

  const allScores = useMemo(() => {
    return groupProgress?.map((item) => {
      return item.progress ?? 0;
    });
  }, [groupProgress]);

  return (
    <>
      <Col span={6}>
        <GroupInfoCard
          type={GroupInfoCardType.DONE}
          value={homeworkDone?.length}
          loading={loading}
        />
      </Col>
      <Col span={6}>
        <GroupInfoCard
          type={GroupInfoCardType.NOT_DONE}
          value={homeworkNotDone?.length}
          loading={loading}
        />
      </Col>
      <Col span={6}>
        <GroupInfoCard
          type={GroupInfoCardType.PROGRESS}
          value={groupProgress?.length}
          loading={loading}
          overall={getDividedValue(
            allScores?.reduce((a, b) => a + b, 0),
            allScores?.length
          )}
        />
      </Col>
    </>
  );
};

export default LessonInfo;
