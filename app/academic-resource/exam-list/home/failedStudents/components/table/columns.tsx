import {
  CellWrapper,
  CenterParagraph,
  GroupWrapper,
  Padding20,
  SpanWrapper,
} from "./style";
import {
  AbsMergedWithUnit,
  AntdUserProfile,
  ContactActions,
  PhoneCell,
  StudentActions,
  StudentLabels,
  TableHeading,
  ViewAction,
} from "components";
import React, { useMemo } from "react";
import { Popover } from "antd";
import { colors } from "layout/header/style";
import { EXAM_ABS, EXAM_PARTS, EXAM_PROCESS_STATUS } from "constants/exam";
import moment from "moment";
import { studentStatusIdentifier } from "utils/studentStatusIdentifier";
import { textColors } from "styles/theme";
import { markColors, markColorsFreshman } from "constants/studentRowColor";
import Link from "next/link";
import { OneStudent } from "types/student";
import { queryKeys } from "constants/queryKeys";
import { IFetchList, studentDeleteType } from "types";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { IExamPart } from "types/exam/exam";

const Columns = ({
  main,
  users,
  level,
}: {
  main: any;
  level: any;
  users: OneStudent[];
}) => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return [
      {
        dataIndex: ["user", "userProfile"],
        title: (
          <TableHeading padding isId>
            Name
          </TableHeading>
        ),
        render: (value: any, record: any, index: number) => {
          const mainUser = users?.[record?.user_id];
          const isFreshman = false;
          return (
            <>
              <AntdUserProfile
                props={mainUser}
                user_id={mainUser?.user_id}
                index={index}
                children={
                  <div style={{ marginTop: "4px" }}>
                    <PhoneCell value={mainUser?.user?.userPhones} />
                  </div>
                }
                markColor={
                  !isFreshman
                    ? mainUser?.status?.toString() === "200"
                      ? markColors[
                          mainUser?.currentGroupContact?.status?.toString() as keyof typeof markColors
                        ]
                      : markColorsFreshman[
                          mainUser?.status?.toString() as keyof typeof markColorsFreshman
                        ]
                    : markColors[
                        mainUser?.status?.toString() as keyof typeof markColors
                      ] || record?.color
                }
                count={main?.currentGroupContact?.absDates?.length || 0}
                customTooltipChildren={(props) => (
                  <AbsMergedWithUnit
                    {...{ ...props, original: mainUser?.currentGroupContact }}
                    queryKeys={[
                      queryKeys.group_exam_students,
                      queryKeys.group_exam_students_contacts,
                    ]}
                  />
                )}
              />
            </>
          );
        },
      },
      // {
      //   title: (
      //     <TableHeading style={{ paddingLeft: "0" }}>
      //       <p>Podo</p>
      //     </TableHeading>
      //   ),
      //   dataIndex: ["process", "type"],
      //   render: (value: any, record: any, index: number) => {
      //     const user = users[record?.user_id];
      //     return (
      //       <CellWrapper
      //         style={{
      //           textAlign: "center",
      //           margin: "0 auto",
      //           display: "flex",
      //           justifyContent: "center",
      //         }}
      //       >
      //         <StudentLabels
      //           activeLabels={{ podo: true }}
      //           data={user?.user}
      //           queryKeys={[queryKeys.group_exam_students_contacts]}
      //         />
      //       </CellWrapper>
      //     );
      //   },
      // },
      {
        title: (
          <TableHeading style={{ textAlign: "center" }}>
            <CenterParagraph>Group</CenterParagraph>
          </TableHeading>
        ),
        dataIndex: ["exam", "group"],
        render: (value: any, record: any, index: number) => {
          return (
            <CellWrapper>
              <Link href={`/groups/${value?.id}`}>{value?.name}</Link>
            </CellWrapper>
          );
        },
      },
      {
        title: (
          <TableHeading style={{ textAlign: "center" }}>
            <CenterParagraph>Level</CenterParagraph>
          </TableHeading>
        ),
        dataIndex: ["exam", "group", "level", "name"],
        render: (value: any, record: any, index: number) => {
          return (
            <CellWrapper>
              <CenterParagraph>{value}</CenterParagraph>
            </CellWrapper>
          );
        },
      },
      {
        dataIndex: "exam",
        title: (
          <TableHeading>
            <CenterParagraph>Main part</CenterParagraph>
          </TableHeading>
        ),
        render: (value: any, record: any, index: number) => {
          const main_part = value?.exam_parts.filter(
            (exam_part: any) => exam_part.config.type === EXAM_PARTS.MAIN
          )[0];
          const obj = {
            mainPart: 0,
            isAbs: false,
          };
          record?.process?.data?.components.map((component: any) => {
            if (component.part_id === main_part?.config?.id) {
              obj.mainPart += component.point;
            }
          });

          record?.process?.data?.attendance?.map((a: any) => {
            if (a?.id === main_part?.config?.id) {
              if (a?.status === EXAM_ABS.ABSENT) {
                obj.isAbs = true;
              }
            }
          });

          return (
            <SpanWrapper>
              <span className="ball">
                {!obj.isAbs ? (
                  obj.mainPart
                ) : (
                  <span style={{ color: textColors.pop }}>ABS</span>
                )}
              </span>
              <br />
              <span className="number_phone">
                {moment(main_part?.date + " " + main_part?.time).format(
                  "DD MMMM YYYY"
                )}
              </span>
            </SpanWrapper>
          );
        },
      },
      {
        title: (
          <TableHeading>
            <CenterParagraph>Speaking part</CenterParagraph>
          </TableHeading>
        ),
        dataIndex: [],
        render: (value: any, record: any, index: number) => {
          const speaking_part = record?.exam?.exam_parts.filter(
            (exam_part: any) => {
              return exam_part.config.type === EXAM_PARTS.SPEAKING;
            }
          )[0];
          const obj = {
            speakingPart: 0,
            isAbs: false,
          };
          record?.process?.data?.components.map((component: any) => {
            if (component.part_id === speaking_part?.config?.id) {
              obj.speakingPart += component.point;
            }
          });

          record?.process?.data?.attendance?.map((a: any) => {
            if (a?.id === speaking_part?.config?.id) {
              if (a?.status === EXAM_ABS.ABSENT) {
                obj.isAbs = true;
              }
            }
          });

          return (
            <SpanWrapper>
              <span className="ball">
                {!obj.isAbs ? (
                  obj.speakingPart
                ) : (
                  <span style={{ color: textColors.pop }}>ABS</span>
                )}
              </span>
              <br />
              <span className="number_phone">
                {moment(speaking_part?.date + " " + speaking_part?.time).format(
                  "DD MMMM YYYY"
                )}
              </span>
            </SpanWrapper>
          );
        },
      },
      {
        title: (
          <TableHeading style={{ textAlign: "center" }}>
            <CenterParagraph>Overall</CenterParagraph>
          </TableHeading>
        ),
        dataIndex: [],
        render: (value: any, record: any, index: number) => {
          const obj = {
            overall: 0,
          };
          record?.process?.data?.components.map((component: any) => {
            obj.overall += component.point;
          });

          return (
            <div style={{ textAlign: "center" }}>
              <SpanWrapper style={{ margin: "0 auto" }}>
                <span className="ball">{obj.overall}</span>
              </SpanWrapper>
            </div>
          );
        },
      },
      {
        title: (
          <TableHeading style={{ textAlign: "center" }}>Currently</TableHeading>
        ),
        dataIndex: [],
        render: (value: any, record: any, index: number) => {
          const user = users?.[record?.user_id];
          const group = user?.currentGroupContact?.group;
          const popover = (
            <Popover
              destroyTooltipOnHide
              style={{ padding: "20px" }}
              content={<Padding20>{group?.name}</Padding20>}>
              <GroupWrapper className="name">
                <Link href={`/groups/${group?.id}`}>{group?.name || "-"}</Link>
                <br />
                <span
                  style={
                    colors[studentStatusIdentifier(user) as keyof typeof colors]
                  }
                  className="status">
                  {studentStatusIdentifier(user)}
                </span>
              </GroupWrapper>
            </Popover>
          );
          return <CellWrapper>{popover}</CellWrapper>;
        },
      },
      {
        title: (
          <TableHeading style={{ textAlign: "center" }}>Level</TableHeading>
        ),
        dataIndex: [],
        render: (value: any, record: any, index: number) => {
          const user = users?.[record?.user_id];
          // @ts-ignore
          const parentLevel =
            user?.currentGroupContact?.group?.level?.parent?.name;
          // @ts-ignore
          const level = user?.currentGroupContact?.group?.level?.name;

          const group = user?.level;
          const popover = (
            <GroupWrapper className="name">
              <p>{parentLevel?.slice(0, 12) || "-"}</p>
              <p style={{ fontSize: "12px" }}>{level || "-"}</p>
            </GroupWrapper>
          );
          return <CellWrapper>{popover}</CellWrapper>;
        },
      },
      {
        title: (
          <TableHeading style={{ textAlign: "center" }}>Status</TableHeading>
        ),
        dataIndex: "process",
        render: (value: any, record: any, index: number) => {
          const status = value?.status?.toString();
          const statusFixed = status as keyof typeof EXAM_PROCESS_STATUS;
          let stat = EXAM_PROCESS_STATUS[statusFixed];
          return (
            <CellWrapper style={{ textAlign: "center", margin: "0 auto" }}>
              <span className="numbers">
                <span className={`${stat} max`}>
                  {stat === EXAM_PROCESS_STATUS.NOT_SET_TEXT ? "-" : stat}
                </span>
              </span>
            </CellWrapper>
          );
        },
      },
      {
        title: (
          <TableHeading isId style={{ minWidth: "20px" }}>
            Label
          </TableHeading>
        ),
        dataIndex: [],
        render: (value: any, record: any, index: number) => {
          const user = users?.[record?.user_id];
          return (
            <StudentLabels
              data={user}
              queryKeys={[
                "group-exam-students-contacts",
                "group-exam-students",
              ]}
              activeLabels={user?.permissionLabels}
              tableKey="studying-group-list"
              clientUpdate
            />
          );
        },
      },
      {
        title: <TableHeading isId>Actions</TableHeading>,
        dataIndex: "",
        render: (value: any, record: any, index: number) => {
          const user = users?.[record?.user_id];
          return user?.currentGroupContact ? (
            <ContactActions
              queryKeys={[
                queryKeys.group_exam_students_contacts,
                queryKeys.group_exam_students,
                queryKeys.group_exam_data,
              ]}
              data={user?.currentGroupContact}
              activeActions={
                user?.currentGroupContact?.buttonActions ?? user?.buttonActions
              }
              deleteStudentType={
                user?.currentGroupContact
                  ? studentDeleteType.stopping
                  : studentDeleteType.regular
              }
              groupContactId={user?.currentGroupContact?.id}
              extra={{
                delete: {
                  textarea: true,
                  mySelect: false,
                },
              }}
            />
          ) : (
            <StudentActions
              queryKeys={[
                queryKeys.group_exam_students_contacts,
                queryKeys.group_exam_students,
                queryKeys.group_exam_data,
              ]}
              data={record}
              activeActions={user?.buttonActions}
              extra={{
                delete: {
                  textarea: true,
                  mySelect: false,
                },
              }}
            />
          );
        },
      },
      {
        title: "",
        key: "details",
        width: 50,
        dataIndex: ["process", "data", "components"],
        render: (value: string, record: any) => {
          return (
            <ViewAction
              size="small"
              onClick={() => {
                dispatch(
                  toggleModal({
                    key: "studentExamResult",
                    data: {
                      open: true,
                      data: {
                        id: record?.id,
                      },
                    },
                  })
                );
              }}
            />
          );
        },
      },
      // {
      //   title: <TableHeading>Actions</TableHeading>,
      //   dataIndex: [],
      //   render: (value: any, record: any, index: number) => {
      //     return (
      //       <CellWrapper>
      //         <div className="actions-wrapper">
      //           <Call size="small" />
      //           <Mail
      //             size="small"
      //             onClick={() => {
      //               dispatch(
      //                 toggleModal({
      //                   key: "selfSms",
      //                   data: {
      //                     data: {
      //                       user_id: record.user_id,
      //                       filter: "group",
      //                       sent_field_name: "user_id",
      //                     },
      //                     open: true,
      //                   },
      //                 })
      //               );
      //             }}
      //           />
      //         </div>
      //       </CellWrapper>
      //     );
      //   },
      // },
    ];
  }, [main, level, users]);
};

export default Columns;
