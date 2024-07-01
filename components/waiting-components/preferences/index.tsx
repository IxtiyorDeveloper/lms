import React, { useEffect } from "react";
import {
  Wrapper,
  Title,
  SubContent,
  MultiContent,
  Bottom,
  TopTitle,
  PersonalWrapper,
  CWrapper,
  Circle,
} from "./style";
import { useForm } from "react-hook-form";
import GroupLevelSelect from "./components/groupLevel";
import { usePageDataMemo } from "hooks";
import PersonalDetails from "./components/personalDetails";
import { IPreferences } from "./type";
import BranchSelect from "./components/branchSelect";
import DaySelect from "./components/daySelect";
import TimeSelect from "./components/timeSelect";
import AdditionalPreferences from "./components/additionalPreferences";
import { Button } from "components";
import { useUpdatePreference } from "hooks";
import { toast } from "react-toastify";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";
import { EStudentStrict } from "types/student/waitingList";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import dayjs from "dayjs";
import { Collapse } from "antd";
import { ChevronLeftSvg } from "@jasurbekyuldashov/lms-web-icons";

const Preferences = ({
  student,
  isLoading,
  back_waiting_list,
}: IPreferences) => {
  const queryClient = useQueryClient();
  const selects = usePageDataMemo();

  const updatePreference = useUpdatePreference({
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.get_one_student],
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    const { root } = data;

    updatePreference.mutate({
      query_params: {
        id: student?.user_id,
      },
      body: {
        course_id: root?.course_id,
        group_type_id: root?.group_type_id,
        level_id: root?.sub_level_id,
        strict_by_level: root?.strict_by_level,
        strict_by_branch: root?.strict_by_branch,
        strict_by_time: root?.strict_by_time,
        strict_by_day: root?.strict_by_day,
        branch_id: root?.branch_id,
        lesson_day_id: root?.lesson_day_id,
        lesson_time_id: root?.lesson_time_id,
        teacher_id: root?.teacher_id?.map((e: any) => {
          return e.value ? e.value : e;
        }),
        start_date: root?.start_date,
      },
    });
  };

  useEffect(() => {
    if (student) {
      setValue("root", {
        course_id: student?.course?.id?.toString(),
        group_type_id: student?.groupType?.id?.toString(),
        level_id: student?.level?.parent?.id?.toString(),
        sub_level_id: student?.level?.id?.toString(),
        strict_by_branch: student?.strictPreferences?.[EStudentStrict.BRANCH],
        strict_by_level: student?.strictPreferences?.[EStudentStrict.LEVEL],
        strict_by_time: student?.strictPreferences?.[EStudentStrict.TIME],
        strict_by_day: student?.strictPreferences?.[EStudentStrict.DAY],
        branch_id: student?.preferBranches?.map((p) =>
          p.branch?.id?.toString(),
        ),
        lesson_day_id: student?.preferDays?.map((item) =>
          item.day?.id?.toString(),
        ),
        lesson_time_id: student?.preferTimes?.map((item) => {
          return item.time?.id?.toString();
        }),
        teacher_id: student?.preferMentors?.map((p) => p.mentor.id?.toString()),
        start_date: student?.startDateLabel?.datetime
          ? dayjs(student?.startDateLabel?.datetime).format(
              DATE_FORMAT_YYYY_MM_DD,
            )
          : null,
      });
    }
  }, [student]);

  return (
    <Wrapper>
      <PersonalWrapper>
        <PersonalDetails
          student={student}
          back_waiting_list={back_waiting_list}
        />
      </PersonalWrapper>
      <CWrapper>
        <Collapse
          ghost
          items={[
            {
              key: "1",
              label: <TopTitle>Student preferences</TopTitle>,
              children: (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Title>General preferences</Title>
                  <GroupLevelSelect
                    selects={selects}
                    control={control}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                  />
                  <SubContent>
                    <BranchSelect
                      control={control}
                      errors={errors}
                      watch={watch}
                      setValue={setValue}
                    />
                  </SubContent>
                  <MultiContent>
                    <DaySelect
                      watch={watch}
                      errors={errors}
                      control={control}
                    />
                    <TimeSelect
                      watch={watch}
                      errors={errors}
                      control={control}
                      selects={selects}
                      setValue={setValue}
                    />
                  </MultiContent>
                  <SubContent>
                    <AdditionalPreferences
                      control={control}
                      watch={watch}
                      setValue={setValue}
                    />
                  </SubContent>
                  <Bottom>
                    <Button
                      type="submit"
                      buttonLoading={updatePreference.isLoading}
                    >
                      Save
                    </Button>
                  </Bottom>
                </form>
              ),
            },
          ]}
          expandIcon={({ isActive }) => (
            <Circle isActive={isActive}>
              <ChevronLeftSvg width={16} height={10} />
            </Circle>
          )}
        />
      </CWrapper>
    </Wrapper>
  );
};

export default Preferences;
