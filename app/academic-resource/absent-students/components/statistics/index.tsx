import { TabSupportSvg, TabTeacherSvg } from "@jasurbekyuldashov/lms-web-icons";
import { Segmented, labelOptions } from "components";
import { TYPE_SUPPORT, TYPE_TEACHER } from "constants/teacher";
import { useRouter } from "next/router";
import React from "react";
import { bgColors } from "styles/theme";
import BarChartV2 from "../barchartV2";
import { useGetAbsentStudentsByMentor } from "hooks";
import { Wrapper } from "./style";
import { Flex, Spin } from "antd";

const Statustics = ({ activeStudentLabels }: { activeStudentLabels: any }) => {
  const router = useRouter();
  const mentorType = router.query.mentor_type || TYPE_TEACHER;
  const { page, pageSize, ...rest } = router.query;
  const consecutive = (rest.consecutive ?? false).toString();

  const { data, isLoading } = useGetAbsentStudentsByMentor({
    query_params: {
      ...rest,
      mentor_type: mentorType,
      consecutive: JSON.parse(consecutive) ? 1 : 0,
      expand: "abs_count,group,absDates,user.userProfile.avatar",
      listed_labels: labelOptions
        .filter((option) =>
          activeStudentLabels.some((label:any) => label.value == option.value)
        )
        .map((e: any) => e.value)
        .filter((e: any) => e != null),
    },
  });

  return (
    <Wrapper>
      <Segmented
        options={[
          {
            label: (
              <Flex
                align="center"
                gap={6}
                className="tab"
                style={{
                  color:
                    !router.query?.mentor_type ||
                    router.query?.mentor_type === TYPE_TEACHER
                      ? bgColors.blueGray
                      : bgColors.yourShadow,
                }}>
                <TabTeacherSvg
                  color={
                    !router.query?.mentor_type ||
                    router.query?.mentor_type === TYPE_TEACHER
                      ? bgColors.blueGray
                      : bgColors.yourShadow
                  }
                />
                Teacher
              </Flex>
            ),
            value: TYPE_TEACHER,
            children: null,
          },
          {
            label: (
              <Flex
                align="center"
                gap={6}
                className="tab"
                style={{
                  color:
                    router.query?.mentor_type === TYPE_SUPPORT
                      ? bgColors.blueGray
                      : bgColors.yourShadow,
                }}>
                <TabSupportSvg
                  color={
                    router.query?.mentor_type === TYPE_SUPPORT
                      ? bgColors.blueGray
                      : bgColors.yourShadow
                  }
                />
                Support
              </Flex>
            ),
            value: TYPE_SUPPORT,
            children: null,
          },
        ]}
        routerKey="mentor_type"
        initValue={(router.query.mentor_type as string) || TYPE_TEACHER}
      />
      <Spin spinning={isLoading}>
        <BarChartV2 withLabel data={data?.list} />
      </Spin>
    </Wrapper>
  );
};

export default Statustics;
