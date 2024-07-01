import { CellWrapper } from "./style";
import { getRowNumber } from "utils/getRowNumber";
import {
  CircleImage,
  ExamMSvg,
  ExamSSvg,
  MyLink,
  TableHeading,
} from "components";
import React, { useMemo } from "react";
import {
  EXAM_PARTS,
  EXAM_PROCESS_ATTENDANCE_STATUS,
  EXAM_PROCESS_STATUS,
} from "constants/exam";
import moment from "moment";
import { store, toggleModal } from "store";
import PackInfo from "./components/packInfo";

const Columns = () => {
  const dateFormat = "DD MMM";
  return useMemo(() => {
    return [
      {
        title: (
          <TableHeading padding isId>
            #
          </TableHeading>
        ),
        dataIndex: "name",
        width: "0%",
        render: (value: any, record: any, index: number) => {
          const id = getRowNumber({ index });
          return (
            <CellWrapper style={{ textAlign: "center" }}>
              <span className="index">{id}</span>
            </CellWrapper>
          );
        },
      },
      {
        title: <TableHeading>Group</TableHeading>,
        dataIndex: "group",
        width: "8%",
        render: (value: any, record: any, index: number) => {
          const original = record;
          return (
            <CellWrapper>
              <MyLink
                onClick={(e) => e.stopPropagation()}
                href={{
                  pathname: `/academic-resource/exam-list/${original?.group?.id}`,
                  query: {
                    year: original.year,
                    month: original.month,
                  },
                }}
              >
                {value.name}
              </MyLink>
            </CellWrapper>
          );
        },
      },
      {
        title: <TableHeading>Teacher</TableHeading>,
        dataIndex: ["teacher", "userProfile"],
        width: "20%",
        render: (value: any, record: any, index: number) => {
          const userProfile = record?.support?.userProfile;
          return (
            <CellWrapper>
              <span className="name">
                <span className="teacher">T.</span>{" "}
                {!!value?.firstname
                  ? value?.firstname + " " + value?.lastname
                  : "-"}
              </span>
              <span className="name">
                <span className="support">S.</span>{" "}
                {!!userProfile?.firstname
                  ? userProfile?.firstname + " " + userProfile?.lastname
                  : "-"}
              </span>
            </CellWrapper>
          );
        },
      },
      {
        title: <TableHeading>Pack info</TableHeading>,
        dataIndex: "pack",
        key: "pack",
        render: (text: string, record: any) => {
          const pack = record?.exam_device_pack;
          return <PackInfo data={pack} />;
        },
      },
      {
        title: <TableHeading>Venue</TableHeading>,
        dataIndex: "branch_id",
        width: "12%",
        render: (value: any, record: any, index: number) => {
          const group = record?.group?.room?.branch?.name;
          const room = record?.group?.room?.name;
          return (
            <CellWrapper>
              <span className="name">{group}</span>
              <span className="name">{room}</span>
            </CellWrapper>
          );
        },
      },
      {
        title: <TableHeading>Time</TableHeading>,
        dataIndex: "groups",
        width: "8%",
        render: (value: any, record: any, index: number) => {
          return (
            <CellWrapper>
              <span className="name one-line">
                {record?.group?.lessonDay.name.split(" ").join(" ")}
              </span>
              <span className="name">
                {record?.group?.lessonTime.time.slice(0, 5)}
              </span>
            </CellWrapper>
          );
        },
      },
      {
        dataIndex: "adasdasdas",
        width: "7%",
        title: <TableHeading>Exam dates</TableHeading>,
        render: (value: any, record: any, index: number) => {
          const examDate = record?.exam_parts?.filter(
            (exam: any) => exam.config.type === EXAM_PARTS.MAIN,
          )[0];
          const examDateSpeaking = record?.exam_parts?.filter(
            (exam: any) => exam.config.type === EXAM_PARTS.SPEAKING,
          )[0];
          return (
            <CellWrapper>
              <div className="line">
                <ExamMSvg /> {moment(examDate.date).format(dateFormat)}
              </div>
              <div className="line">
                <ExamSSvg /> {moment(examDateSpeaking.date).format(dateFormat)}
              </div>
            </CellWrapper>
          );
        },
      },
      {
        title: <TableHeading>{"  "}</TableHeading>,
        dataIndex: ["students"],
        width: "28%",
        render: (value: any, record: any, index: number) => {
          const passed = value?.filter(
            (st: any) => st?.process?.status === EXAM_PROCESS_STATUS.PASS,
          ).length;
          const fail = value?.filter(
            (st: any) => st?.process?.status === EXAM_PROCESS_STATUS.FAIL,
          ).length;
          const conditional = value?.filter(
            (st: any) =>
              st?.process?.status === EXAM_PROCESS_STATUS.CONDITIONAL,
          ).length;
          const PAbs = value?.filter(
            (st: any) =>
              st?.process?.attendance_status ===
              EXAM_PROCESS_ATTENDANCE_STATUS.PARTIAL_ABS,
          ).length;
          const FAbs = value?.filter(
            (st: any) =>
              st?.process?.attendance_status ===
              EXAM_PROCESS_ATTENDANCE_STATUS.FULL_ABS,
          ).length;
          const all = value?.length;
          return (
            <CellWrapper>
              <div className="numbers">
                <span className="box">All: {all}</span>
                <span
                  className="box pass"
                  onClick={(e) => {
                    e.stopPropagation();
                    store.dispatch(
                      toggleModal({
                        key: "passedStudents",
                        data: {
                          data: {
                            data: record,
                            type: EXAM_PROCESS_STATUS.PASS,
                          },
                          open: true,
                        },
                      }),
                    );
                  }}
                >
                  P: {passed}
                </span>
                <span
                  className="box fail"
                  onClick={() => {
                    // store.dispatch(
                    //   toggleModal({
                    //     key: "passedStudents",
                    //     data: {
                    //       data: {
                    //         data:record,
                    //         type: EXAM_PROCESS_STATUS.FAIL,
                    //       },
                    //       open: true,
                    //     },
                    //   })
                    // );
                  }}
                >
                  F: {fail}
                </span>
                <span
                  className="box cond"
                  onClick={() => {
                    // store.dispatch(
                    //   toggleModal({
                    //     key: "passedStudents",
                    //     data: {
                    //       data: {
                    //         data:record,
                    //         type: EXAM_PROCESS_STATUS.CONDITIONAL,
                    //       },
                    //       open: true,
                    //     },
                    //   })
                    // );
                  }}
                >
                  Con: {conditional}
                </span>
                <span
                  className="box abse"
                  onClick={() => {
                    // store.dispatch(
                    //   toggleModal({
                    //     key: "passedStudents",
                    //     data: {
                    //       data: {
                    //         data:record,
                    //         type: EXAM_PROCESS_STATUS.CONDITIONAL,
                    //       },
                    //       open: true,
                    //     },
                    //   })
                    // );
                  }}
                >
                  F.ABS: {FAbs}
                </span>
                <span
                  className="box abse"
                  onClick={() => {
                    // store.dispatch(
                    //   toggleModal({
                    //     key: "passedStudents",
                    //     data: {
                    //       data: {
                    //         data:record,
                    //         type: EXAM_PROCESS_STATUS.CONDITIONAL,
                    //       },
                    //       open: true,
                    //     },
                    //   })
                    // );
                  }}
                >
                  P.ABS: {PAbs}
                </span>
              </div>
            </CellWrapper>
          );
        },
      },
      {
        title: <TableHeading>Supervisor</TableHeading>,
        dataIndex: ["supervisor", "userProfile"],
        width: "18%",
        render: (value: any, record: any, index: number) => {
          return (
            <CellWrapper>
              <div className="supervisor">
                <CircleImage src={value?.avatar} />
                <span>
                  {!!value?.firstname
                    ? value?.firstname + " " + value?.lastname
                    : "-"}
                </span>
              </div>
            </CellWrapper>
          );
        },
      },
    ];
  }, []);
};

export default Columns;
