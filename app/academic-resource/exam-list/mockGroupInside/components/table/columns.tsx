import { CellWrapper, Part } from "./style";
import { getRowNumber } from "utils/getRowNumber";
import { Call, CircleImage, Mail, TableHeading, ViewAction } from "components";
import React from "react";
import { MockExamStatus } from "constants/exam";
import Router from "next/router";
import { markColors, markColorsFreshman } from "constants/studentRowColor";
import { RowMark } from "components/common/useProfile/style";
import { IObj } from "./index";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { IExamPart, IExamPermissions } from "types/exam/exam";
import Image from "next/image";
import _ from "lodash";
import MarkCell from "./markCell";

const Columns = (
  users: any,
  control: any,
  exam_parts: IObj,
  parts: IExamPart[],
  permissions?: IExamPermissions
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
                padding: "8px 0",
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
          dataIndex: ["studentProfile", "mockExam", "dataResult", "components"],
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
      dataIndex: ["studentProfile"],
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
    ...columns.map((item) => (_.isEmpty(item) ? {} : item)),
    {
      title: <TableHeading>Total</TableHeading>,
      dataIndex: ["studentProfile", "mockExam", "score"],
      render: (value: any, record: any, index: number) => {
        return (
          <CellWrapper>
            <div className="numbers total">
              {parseFloat((value || 0)?.toFixed(1))}
            </div>
          </CellWrapper>
        );
      },
    },
    {
      title: <TableHeading>Status</TableHeading>,
      dataIndex: ["studentProfile", "mockExam"],
      render: (value: any, record: any, index: number) => {
        const mock = record?.studentProfile?.mockExam;
        const passed = mock?.passed;

        const status = {
          [MockExamStatus.IN_PROGRESS]: (
            <div className="status_in_progress">In progress</div>
          ),
          [MockExamStatus.FINISHED]: passed ? (
            <div className="status_pass">Pass</div>
          ) : (
            <div className="status_fail_not_icon">Fail</div>
          ),
        };

        return (
          <CellWrapper isNScore>
            <div className="numbers">
              {status[mock?.status as keyof typeof status] ?? (
                <div className="status_not_started">Not done</div>
              )}
            </div>
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
      dataIndex: ["studentProfile", "mockExam", "score"],
      render: (value: number, record: any) => {
        const passed = record?.studentProfile?.mockExam?.passed;
        const progress = parseFloat((value || 0)?.toFixed(1));

        return (
          <ViewAction
            size="small"
            onClick={() => {
              if (passed == 1 || passed == 0) {
                dispatch(
                  toggleModal({
                    key: "studentMockExamResult",
                    data: {
                      open: true,
                      data: {
                        progress,
                        data: record,
                      },
                    },
                  })
                );
              }
            }}
          />
        );
      },
    },
  ];
};

export default Columns;
