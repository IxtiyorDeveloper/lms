import React, { useMemo } from "react";
import {
  BText,
  Circular,
  CreatedBy,
  Details,
  Name,
  PContent,
  Position,
  TText,
} from "./style";
import { Progress } from "antd";
import { CircleImage, TableHeading } from "components";
import moment from "moment";
import { myStatus } from "./components/status";
import {
  IPotentialFailRequest,
  EPotentialFailStaffType,
} from "types/potentialFail/potentialFailRequest";

const staffType = {
  [EPotentialFailStaffType.SUPPORT]: "Support",
  [EPotentialFailStaffType.TEACHER]: "Teacher",
  [EPotentialFailStaffType.TEACHER_AND_SUPPORT]: "Teacher and Support",
};

const Columns = () => {
  return useMemo(() => {
    return [
      {
        title: (
          <TableHeading isId padding>
            Progress
          </TableHeading>
        ),
        dataIndex: "progress",
        render: (value: any, record: IPotentialFailRequest, index: number) => {
          const percent = Number(
            (
              (record?.doneReviewersCount * 100) /
              record?.allReviewersCount
            ).toFixed(2),
          );
          return (
            <Circular>
              <Progress
                type="circle"
                percent={percent}
                size={60}
                strokeWidth={7}
              />
              <PContent>
                <TText>Done: {record?.doneReviewersCount || 0}</TText>
                <BText>Not done: {record?.notDoneReviewersCount || 0}</BText>
              </PContent>
            </Circular>
          );
        },
      },
      {
        title: <TableHeading>Created by</TableHeading>,
        dataIndex: "createdBy",
        render: (value: any, record: IPotentialFailRequest, index: number) => {
          const fullName =
            record?.createdBy?.userProfile?.firstname +
            " " +
            record?.createdBy?.userProfile?.lastname;
          const role = record?.createdBy?.rbacAssignment?.rbacRole?.name;
          return (
            <CreatedBy>
              <CircleImage src={record?.createdBy?.userProfile?.avatar} />
              <Details>
                <Name>{fullName}</Name>
                <Position>{role}</Position>
              </Details>
            </CreatedBy>
          );
        },
      },
      {
        title: <TableHeading>Created date & time</TableHeading>,
        dataIndex: "createdBy",
        render: (value: any, record: IPotentialFailRequest, index: number) => {
          const day = moment(record?.created_at).format("DD MMM YYYY");
          const time = moment(record?.created_at).format("HH:mm");
          return (
            <CreatedBy>
              <Details>
                <Name>{day}</Name>
                <Name>{time}</Name>
              </Details>
            </CreatedBy>
          );
        },
      },
      {
        title: <TableHeading>Staff</TableHeading>,
        dataIndex: "createdBy",
        render: (value: any, record: IPotentialFailRequest, index: number) => {
          const staff = record?.staff_type;
          return (
            <CreatedBy>
              <Details>
                <Name>{staffType[staff as keyof typeof staffType]}</Name>
              </Details>
            </CreatedBy>
          );
        },
      },
      {
        title: <TableHeading>Status</TableHeading>,
        dataIndex: "createdBy",
        render: (value: any, record: IPotentialFailRequest, index: number) => {
          return myStatus({ record });
        },
      },
    ];
  }, []);
};

export default Columns;
