import { EMentorTypes, IGroup } from "types";
import { OneStudent } from "types/student";

export const getStatus = ({
  group,
  student,
}: {
  group?: IGroup;
  student: OneStudent | undefined;
}) => {
  const groupTeacher = group?.groupMentors?.find(
    (m) => m.type == EMentorTypes.Teacher,
  );
  const groupDay = group?.lessonDay;
  const groupTime = group?.lessonTime;
  const groupBranch = group?.room?.branch;

  return {
    teacher: student?.preferMentors?.length
      ? student?.preferMentors?.some(
          (p) => p.mentor.id == groupTeacher?.user?.id,
        )
      : true,
    level: true,
    subLevel: true,
    day: student?.preferDays?.some((p) => p.day.id == groupDay?.id),
    time: student?.preferTimes?.some((p) => p.time.id == groupTime?.id),
    branch: student?.preferBranches?.some(
      (p) => p.branch.id == groupBranch?.id,
    ),
  };
};
