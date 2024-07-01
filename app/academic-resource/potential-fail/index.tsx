import React, { Fragment, useCallback, useMemo, useState } from "react";
import { Wrapper } from "./style";
import { Button } from "components";
import Filter from "./components/filter";
import BarChartV2 from "./components/barchartV2";
import { WaitingListFilterWrapper } from "./style";
import AcademicControlTable from "./components/table";
import { useRouter } from "next/router";
import { useAdminAcademicFallibleGetByMentor, usePageDataMemo } from "hooks";
import debounce from "lodash/debounce";
import { usePageData } from "hooks";
import { TYPE_TEACHER } from "constants/teacher";
import Tabs from "./components/tabs";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";

const PotentialFail = () => {
  const router = useRouter();
  const [width, setWidth] = useState(0);
  const { isLoading: isLoadingPageData } = usePageData();
  const mentorType = router.query.mentor_type || TYPE_TEACHER;
  const methods = useForm();
  const selects = usePageDataMemo();

  const changeWidth = useCallback(
    debounce((e) => {
      setWidth(e?.offsetWidth);
    }, 300),
    [],
  );

  const subLevelsNames = ["starts", "middles", "finals"];

  const getSubLevels = (label: "Start" | "Middle" | "Final") => {
    return selects.level.options?.map((r) => {
      return r.subLevel?.filter((l) => l.label === label)[0].value;
    });
  };

  const obj = {
    starts: getSubLevels("Start"),
    middles: getSubLevels("Middle"),
    finals: getSubLevels("Final"),
  };

  const getMultiLevel = (str?: string | string[]) => {
    if (!isNaN(Number(str))) {
      return str;
    }

    if (Array.isArray(str)) {
      let isAvailable = false;
      subLevelsNames.forEach((subLevel) => {
        if (str.includes(subLevel)) {
          isAvailable = true;
        }
      });

      if (isAvailable) {
        const sum = str.map((st) => {
          return obj[st as keyof typeof obj];
        });

        return sum.reduce((acc, curr) => acc?.concat(curr || []), []);
      }

      return str;
    }

    if (subLevelsNames.includes(str || "")) {
      return obj[str as keyof typeof obj];
    }
  };

  const {
    isLoading: attendanceLoading,
    data: attendanceData,
    isFetching: isFetchingAttendance,
  } = useAdminAcademicFallibleGetByMentor({
    query_params: {
      ...router.query,
      sub_level_id: getMultiLevel(router.query.sub_level_id) || "",
      mentor_type: mentorType,
      teacherSupportKey: undefined,
    },
    enabled: !isLoadingPageData,
    expand: "userProfile.hired_date",
  });

  const chartDataAttendance = useMemo(
    () =>
      (attendanceData?.data?.[mentorType as any] || [])?.map((e) => {
        return {
          time: `${e?.firstname} ${e?.lastname}`,
          lost: +e.count,
          avatar: e.avatar,
          phone: "",
        };
      }),
    [attendanceData?.data],
  );

  return (
    <Wrapper ref={changeWidth}>
      <Fragment>
        <div className="filter">
          <Filter methods={methods} />
        </div>
        <WaitingListFilterWrapper>
          <div className="header-wrapper">
            <Tabs attendanceData={attendanceData} />
            <Button
              bgColor={bgColors.pop}
              textColor={textColors.white}
              href="/academic-resource/potential-fail/potential-fail-request"
            >
              POTENTIAL FAIL request
            </Button>
          </div>
          <BarChartV2
            withLabel
            isLoading={isFetchingAttendance}
            data={chartDataAttendance}
            isPercent={false}
            isAllRed
          />
        </WaitingListFilterWrapper>
        <div className="table-wrap">
          <AcademicControlTable
            data={attendanceData?.data?.[mentorType as any]}
            isLoading={attendanceLoading}
            width={width}
          />
        </div>
      </Fragment>
    </Wrapper>
  );
};

export default PotentialFail;
