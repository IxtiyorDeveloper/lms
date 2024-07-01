import { CellWrapper, Part } from "./style";
import { getRowNumber } from "utils/getRowNumber";
import {
  Call,
  CircleImage,
  Mail,
  StudentLabels,
  TableHeading,
  ViewAction,
} from "components";
import React from "react";
import { CONDITIONAL, EXAM_PROCESS_STATUS, FAIL } from "constants/exam";
import Router from "next/router";
import { markColors, markColorsFreshman } from "constants/studentRowColor";
import { RowMark } from "components/common/useProfile/style";
import { IObj } from "./index";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import AttendanceCell from "./attendanceCell";
import { IExamPart, IExamPermissions } from "types/exam/exam";
import Image from "next/image";
import _ from "lodash";
import { STOPPING_STUDENT } from "constants/studentStatuses";
import { queryKeys } from "constants/queryKeys";
import MarkCell from "./markCell";
import NoteCell from "./noteCell";

const Columns = (
  users: any,
  control: any,
  exam_parts: IObj,
  parts: IExamPart[],
  permissions?: IExamPermissions,
  onChange?: any
) => {
  const dispatch = useDispatch();

  const totalPoint = _.sum(
    _.flatten(
      (parts || []).map((e) => {
        return e.config.components.map((e) => e.max_point);
      })
    )
  );

  const columns = _.flatten(
    (parts || []).map((e) => {
      return e.config.components.map((component) => {
        return {
          title: (
            <TableHeading
              style={{
                padding: "10px 0",
              }}>
              <Part>
                <Image
                  src={component.image_url}
                  alt="image"
                  width={16}
                  height={16}
                />
              </Part>
              <p style={{ textAlign: "center" }}>{component.label}</p>
            </TableHeading>
          ),
          dataIndex: ["process", "data", "components"],
          render: (value: any, record: any, index: number) => {
            return (
              <MarkCell
                value={value}
                component={component}
                control={control}
                record={record}
                exam_parts={exam_parts}
                permissions={permissions}
                current={e}
              />
            );
          },
        };
      });
    })
  );

  return [
    {
      title: (
        <TableHeading isId padding>
          #
        </TableHeading>
      ),
      dataIndex: "name",
      render: (value: any, record: any, index: number) => {
        const user = users?.filter(
          (user: any) => user?.user_id === record?.user_id
        )[0];

        const id = getRowNumber({ index });
        const isFreshman = false;
        return (
          <CellWrapper
            isNScore
            style={{
              position: "relative",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}>
            <RowMark
              style={{
                minHeight: "25px !important",
                backgroundColor: !isFreshman
                  ? user?.status?.toString() === "200"
                    ? markColors[
                        user?.currentGroupContact?.status?.toString() as keyof typeof markColors
                      ]
                    : markColorsFreshman[
                        user?.status?.toString() as keyof typeof markColorsFreshman
                      ]
                  : markColors[
                      user?.status?.toString() as keyof typeof markColors
                    ] || record?.color,
              }}
            />
            <span>{id}</span>
          </CellWrapper>
        );
      },
    },
    {
      title: <TableHeading>Students</TableHeading>,
      dataIndex: ["user", "studentProfile"],
      render: (value: any, record: any, index: number) => {
        return (
          <CellWrapper isNScore>
            <div className="supervisor">
              <CircleImage src={value?.avatar} />
              <span>
                {!!value?.first_name
                  ? value?.first_name + " " + value?.last_name
                  : "-"}
              </span>
            </div>
          </CellWrapper>
        );
      },
    },
    {
      title: <TableHeading>Podo</TableHeading>,
      dataIndex: "podo",
      render: (value: any, record: any, index: number) => {
        const userObj = users?.filter(
          (user: any) => user?.user_id === record?.user_id
        )[0];
        return (
          <CellWrapper isNScore>
            <StudentLabels
              activeLabels={{
                podo: userObj?.currentGroupContact?.status != STOPPING_STUDENT,
              }}
              data={userObj}
              size="medium"
              queryKeys={[
                queryKeys.admin_statistics_podo_index,
                queryKeys.group_exam_students_contacts,
                queryKeys.group_exam_students,
                queryKeys.admin_group_view,
              ]}
            />
          </CellWrapper>
        );
      },
    },
    ...(parts || []).map((e) => {
      return {
        title: <TableHeading>{e.config.name}</TableHeading>,
        dataIndex: "",
        render: (value: any, record: any, index: number) => {
          return (
            <CellWrapper>
              <AttendanceCell
                data={record}
                exam_part={e}
                type={e.config.type}
                isHasPermission={
                  !!permissions?.attendance.find((r) => r.type == e.config.type)
                    ?.can
                }
                callBack={onChange}
              />
            </CellWrapper>
          );
        },
      };
    }),
    ...columns.map((item) => (_.isEmpty(item) ? {} : item)),
    {
      title: <TableHeading></TableHeading>,
      dataIndex: ["process", "comment"],
      render: (value: any, record: any, index: number) => {
        return <NoteCell record={record} value={value} />;
      },
    },
    {
      title: <TableHeading>Total</TableHeading>,
      dataIndex: ["process", "data", "components"],
      render: (value: any, record: any, index: number) => {
        const total = _.sumBy(value, (e: any) => e.point);
        return (
          <CellWrapper>
            <div className="numbers total">
              {Number(((total / totalPoint) * 100).toFixed(2))}
            </div>
          </CellWrapper>
        );
      },
    },
    {
      title: <TableHeading>Status</TableHeading>,
      dataIndex: "process",
      render: (value: any, record: any, index: number) => {
        let res =
          EXAM_PROCESS_STATUS[
            value?.status?.toString() as keyof typeof EXAM_PROCESS_STATUS
          ];
        const user = users?.filter(
          (user: any) => user?.user_id === record?.user_id
        )[0];
        return (
          <CellWrapper isNScore>
            <span
              className="numbers"
              onClick={() => {
                if (
                  true
                  // permissions.
                ) {
                  if (
                    value?.status?.toString() == CONDITIONAL ||
                    value?.status?.toString() == FAIL
                  )
                    dispatch(
                      toggleModal({
                        key: "conditionalPass",
                        data: {
                          data: {
                            student: user,
                            data: record,
                          },
                          open: true,
                        },
                      })
                    );
                }
              }}>
              <span className={`${res as any} max`}>
                {res === EXAM_PROCESS_STATUS.NOT_SET_TEXT ? "-" : res}
              </span>
            </span>
          </CellWrapper>
        );
      },
    },
    {
      title: <TableHeading>Actions</TableHeading>,
      dataIndex: ["supervisor", "userProfiled"],
      render: (value: any, record: any, index: number) => {
        return (
          <CellWrapper isNScore>
            <div className="actions-wrapper">
              <Call size="small" />
              <Mail
                size="small"
                onClick={() => {
                  Router.replace({
                    pathname: Router.pathname,
                    query: {
                      ...Router.query,
                      sendSelfSms: true,
                      sendSelfSmsId: record.user.id,
                    },
                  }).then();
                }}
              />
            </div>
          </CellWrapper>
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
                      mock: false,
                    },
                  },
                })
              );
            }}
          />
        );
      },
    },
  ];
};

export default Columns;
