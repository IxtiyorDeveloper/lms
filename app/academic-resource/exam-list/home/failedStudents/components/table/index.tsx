import React, {useMemo} from "react";
import {HeadSide, Wrapper} from "./style";
import {AntdTable, Button, CallSvg, MailSvg, PodoSvg} from "components";
import Columns from "./columns";
import {
  useExamResultsByStatus,
  useExamResultStudentsByStatus,
  usePageDataMemo,
} from "hooks";
import {
  EXAM_ABS,
  EXAM_PROCESS,
  EXAM_PROCESS_ATTENDANCE_STATUS,
  EXAM_USER_TYPE,
} from "constants/exam";
import {useRouter} from "next/router";
import {expandQuery, expandQuery2} from "./expand";
import {OneStudent} from "types/student";
import moment from "moment";
import {DATE_FORMAT_YYYY_MM_DD} from "constants/dates";
import {useDispatch} from "react-redux";
import {toggleModal} from "store";
import LabelAllFailedToPodoModal from "globals/components/labelAllFailedToPodo";
import {sortStudentList} from "app/academic-resource/exam-list/groupInside/components/table/sortStudents";
import {CheckPermission} from "utils";
import {COMPONENTS_VIEWS} from "constants/permissions";
import {bgColors, textColors} from "styles/theme";

const attendanceTitle = {
  [`${EXAM_PROCESS_ATTENDANCE_STATUS.FULL_ABS}`]: "Fully absent group",
  [`${EXAM_PROCESS_ATTENDANCE_STATUS.PARTIAL_ABS}`]:
    "Partially absent students",
};
const textTitle = {
  [`${EXAM_PROCESS.SUCCESS}`]: "Passed",
  [`${EXAM_PROCESS.FAIL}`]: "Failed group",
  [`${EXAM_PROCESS.CONDITIONAL}`]: "Passed with condition",
};

const TableSide = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pageData = usePageDataMemo();

  const {data, isLoading} = useExamResultsByStatus({
    expand: expandQuery2,
    exam_user_type: EXAM_USER_TYPE.TYPE_STUDENT,
    "per-page": router.query?.pageSize || 20,
    ...router.query,
    level_id: pageData.level.options
      ?.find((l) => l.value == router.query?.level_id)
      ?.subLevel.map((a) => +a.value),
  });

  const userIds = useMemo(() => {
    const array: any = [];
    data?.list?.map((a: any) => {
      array.push(a.user_id);
    });
    return array;
  }, [data]);

  const {data: users} = useExamResultStudentsByStatus({
    user_id: userIds,
    expand: expandQuery,
    page: router.query?.page,
    "per-page": router.query?.pageSize || 20,
    attendance_from_date: moment(
      `${router.query?.year || moment().format("YYYY")} ${
        router.query?.month || moment().format("MM")
      }`,
      "YYYY MM",
    )
      .startOf("month")
      .format(DATE_FORMAT_YYYY_MM_DD),
    attendance_to_date: moment(
      `${router.query?.year || moment().format("YYYY")} ${
        router.query?.month || moment().format("MM")
      }`,
      "YYYY MM",
    )
      .endOf("month")
      .format(DATE_FORMAT_YYYY_MM_DD),
  });

  const idUsers = useMemo(() => {
    const uList: OneStudent[] = [];
    users?.list?.map((user) => {
      uList[user.user_id] = user;
    });
    return uList;
  }, [users]);

  const handleClick = () => {
    dispatch(
      toggleModal({
        key: "labelAllFailedToPodo",
        data: {
          data: {},
          open: true,
        },
      }),
    );
  };

  return (
    <Wrapper>
      <LabelAllFailedToPodoModal/>
      <HeadSide>
        <p className="title">
          {textTitle?.[router.query?.process_status as keyof typeof textTitle]}{" "}
          {
            attendanceTitle?.[
              router.query?.attendance_status as keyof typeof textTitle
              ]
          }
          <span className="badge">{data?.meta?.totalCount || 0}</span>
        </p>
        <div className="flex">
          <Button className="btn" onClick={handleClick}>
            <PodoSvg width={18}/>
            &nbsp;<span>Set podo</span>
          </Button>
          <CheckPermission
            permission={[COMPONENTS_VIEWS.can_send_sms_to_students]}
          >
            <Button
              icon={<MailSvg width={20} height={20} color={bgColors.black}/>}
              style={{
                padding: "0 24px",
                color: textColors.blueGray,
                fontWeight: 700,
                borderRadius: 10,
                lineHeight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
              onClick={() => {
                dispatch(
                  toggleModal({
                    key: "groupSms",
                    data: {
                      data: {
                        filter:
                          router.query?.process_status ===
                          `${EXAM_PROCESS.FAIL}`
                            ? "failed-list"
                            : router.query?.process_status ===
                            `${EXAM_PROCESS.SUCCESS}`
                              ? "exam-passed-list"
                              : router.query?.process_status ===
                              `${EXAM_PROCESS.CONDITIONAL}`
                                ? "exam-condition-list"
                                : router.query?.attendance_status ===
                                `${EXAM_PROCESS_ATTENDANCE_STATUS.PARTIAL_ABS}`
                                  ? "exam-partial-abs-list"
                                  : router.query?.attendance_status ===
                                  `${EXAM_PROCESS_ATTENDANCE_STATUS.FULL_ABS}`
                                    ? "exam-full-abs-list"
                                    : "",
                        search: {...router.query, status},
                      },
                      open: true,
                    },
                  }),
                );
              }}
            />
          </CheckPermission>
          <CheckPermission permission={[COMPONENTS_VIEWS.can_call_user]}>
            <Button
              icon={<CallSvg width={20} height={20} color={bgColors.white}/>}
              style={{
                backgroundColor: bgColors.midori,
              }}
              onClick={() => {
                dispatch(
                  toggleModal({
                    key: "autoCall",
                    data: {
                      data: {
                        filter: "failed-list",
                        search: {...router.query},
                      },
                      open: true,
                    },
                  }),
                );
              }}
            />
          </CheckPermission>
        </div>
      </HeadSide>
      <AntdTable
        dataSource={sortStudentList(data?.list) || []}
        columns={Columns({
          main: data,
          level: pageData?.level?.options,
          users: idUsers,
        })}
        loading={isLoading}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
      />
    </Wrapper>
  );
};

export default TableSide;
