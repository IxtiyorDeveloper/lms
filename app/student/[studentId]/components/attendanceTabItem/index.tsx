import React, { useEffect, useMemo } from "react";
import AttendanceTabItem from "app/groups/[groupId]/components/attendanceTab";
import { useGroup } from "hooks";
import { OneStudent } from "types/student";
import { Wrapper } from "./style";
import { checkRegularStudent } from "utils/checkRegularStudent";
import { ArchiveAttendance, ClickableTag } from "components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { archiveExpand } from "./expand";
import moment from "moment";

interface Interface {
  student: OneStudent | undefined;
  isLoading: boolean;
}

function AttendanceTab({ student, isLoading }: Interface) {
  const router = useRouter();
  const { control, watch, setValue } = useForm();

  const isRegularStudent = checkRegularStudent(student);

  const studiedGroupsLength = student?.studiedGroups?.length || 0;

  const activeGroupId =
    router.query?.currentGroup ||
    student?.studiedGroups?.[studiedGroupsLength - 1]?.id;

  const {
    data: group,
    isInitialLoading,
    isPreviousData,
  } = useGroup({
    id: activeGroupId,
    expand: archiveExpand,
    month: moment(router?.query?.date).format("MM"),
    year: moment(router?.query?.date).year(),
  });

  const tagData = useMemo(() => {
    let array: any[] = [];
    if (!!student?.studiedGroups)
      for (let i = 0; i < student.studiedGroups?.length; i++) {
        array = [
          ...array,
          {
            id: student?.studiedGroups?.[i]?.id,
            name: student?.studiedGroups?.[i]?.name,
          },
        ];
      }
    return array;
  }, [student?.studiedGroups]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "currentGroup" && type === "change") {
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            currentGroup: value?.currentGroup?.[0],
          },
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, router.query]);

  useEffect(() => {
    if (!!activeGroupId) {
      setValue("currentGroup", [activeGroupId]);
    }
  }, [student?.studiedGroups]);

  const activeGroup = student?.studiedGroups?.find(
    (st) => st.id == activeGroupId,
  );

  return (
    <Wrapper>
      {isRegularStudent ? (
        <div className="block">
          <AttendanceTabItem
            groupId={student?.currentGroupContact?.group?.id}
            outLoading={isLoading || isPreviousData || isInitialLoading}
          />
        </div>
      ) : (
        <div className="archive">
          <div className="groups">
            <ClickableTag
              control={control}
              name="currentGroup"
              data={tagData}
              oneChoice
              alwaysSelected
            />
          </div>
          <ArchiveAttendance
            group={group}
            initialMonth={activeGroup?.finish_date}
            isLoading={isLoading || isPreviousData || isInitialLoading}
          />
        </div>
      )}
    </Wrapper>
  );
}

export default AttendanceTab;
