import React from "react";
import { Segmented, TabSupportSvg, TabTeacherSvg } from "components";
import { TYPE_SUPPORT, TYPE_TEACHER } from "constants/teacher";
import { bgColors } from "styles/theme";
import lodash from "lodash";
import { useRouter } from "next/router";
import { Type } from "./type";

const Tabs = ({ attendanceData }: Type) => {
  const router = useRouter();
  const mentorType = router.query.mentor_type || TYPE_TEACHER;

  return (
    <div>
      <Segmented
        options={[
          {
            label: (
              <div
                className="tab"
                style={{
                  color:
                    mentorType === TYPE_TEACHER
                      ? bgColors.blueGray
                      : bgColors.yourShadow,
                }}
              >
                <TabTeacherSvg
                  color={
                    mentorType === TYPE_TEACHER
                      ? bgColors.blueGray
                      : bgColors.yourShadow
                  }
                />
                Teacher (
                {lodash.sumBy(
                  attendanceData?.data?.[100],
                  (e: any) => +e.count,
                )}
                )
              </div>
            ),
            value: TYPE_TEACHER,
            children: null,
          },
          {
            label: (
              <div
                className="tab"
                style={{
                  color:
                    mentorType === TYPE_SUPPORT
                      ? bgColors.blueGray
                      : bgColors.yourShadow,
                }}
              >
                <TabSupportSvg
                  color={
                    mentorType === TYPE_SUPPORT
                      ? bgColors.blueGray
                      : bgColors.yourShadow
                  }
                />
                Support (
                {lodash.sumBy(
                  attendanceData?.data?.[200],
                  (e: any) => +e.count,
                )}
                )
              </div>
            ),
            value: TYPE_SUPPORT,
            children: null,
          },
        ]}
        // routerKey="mentor_type"
        initValue={mentorType as string}
        onChange={(e: any) => {
          router.replace({
            query: {
              ...router.query,
              mentor_type: e,
              mentor_id: null,
            },
          });
        }}
      />
    </div>
  );
};

export default Tabs;
