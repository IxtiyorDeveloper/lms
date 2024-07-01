import React, { useMemo } from "react";
import { NoteEditPopover, TableHeading, CircleImage } from "components";
import { useForm } from "react-hook-form";
import PhoneCell from "components/common/tableCells/phoneCell";
import { CellValue, NameWrapper, UserRow } from "./style";
import { IUserPhone } from "types/userPhone";
import { ICandidate } from "types";
import moment from "moment";
import { DATE_FORMAT_MMM_DD_YYYY_HH_mm } from "constants/dates";
import { useRouter } from "next/router";
import { IStaffInitialData, IStaffReward } from "types/staffSettings";
import { getRowNumber } from "utils/getRowNumber";
import { Col } from "antd";
import { separateNumberThousands } from "utils/number";
import { RewardStatus } from "constants/staff";
import CellActions from "./components/actions";

export const Columns = ({
  initialData,
}: {
  initialData: IStaffInitialData | undefined;
}) => {
  const router = useRouter();
  const { control, handleSubmit } = useForm({});
  const status = Number(router.query.status || RewardStatus.PENDING);
  const amontTypes = initialData?.rewardTypeList;

  return useMemo(() => {
    return [
      {
        dataIndex: ["user"],
        hide: false,
        title: <TableHeading padding>Candidate</TableHeading>,
        render: (value: any, record: IStaffReward, index: number) => {
          const order = getRowNumber({ index });
          const user = record?.user.userProfile;
          return (
            <UserRow gutter={10} align="middle">
              <Col className="order">{order}</Col>
              <Col>
                <CircleImage src={record.user.userProfile?.avatar?.full_url} />
              </Col>
              <NameWrapper>
                {user?.firstname} {user?.lastname}
              </NameWrapper>
            </UserRow>
          );
        },
      },
      {
        dataIndex: ["hired_date"],
        hide: status == RewardStatus.GIVEN,
        title: <TableHeading padding>Hired date</TableHeading>,
        render: (value: any, record: IStaffReward, index: number) => {
          return (
            <CellValue>
              {value && moment(value).format(DATE_FORMAT_MMM_DD_YYYY_HH_mm)}
            </CellValue>
          );
        },
      },
      {
        dataIndex: ["vacancy"],
        title: <TableHeading padding>Vacancy</TableHeading>,
        render: (value: any, record: IStaffReward, index: number) => {
          return <CellValue>{value}</CellValue>;
        },
      },
      {
        dataIndex: ["amount"],
        hide: status !== RewardStatus.GIVEN,
        title: <TableHeading padding>Amount</TableHeading>,
        render: (value: any, record: IStaffReward, index: number) => {
          return <CellValue>{separateNumberThousands(value)} UZS</CellValue>;
        },
      },
      {
        dataIndex: ["type"],
        hide: status !== RewardStatus.GIVEN,
        title: <TableHeading padding>Type</TableHeading>,
        render: (value: any, record: IStaffReward, index: number) => {
          const type = amontTypes?.find((e) => e.value == value);
          return <CellValue>{type?.label}</CellValue>;
        },
      },
      {
        title: (
          <TableHeading style={{ minWidth: "80px", width: "90px" }}>
            Phone number
          </TableHeading>
        ),
        hide: status == RewardStatus.GIVEN,
        dataIndex: ["user", "userPhones"],
        render: (value: IUserPhone[], record: any, index: number) => {
          return <PhoneCell value={value} />;
        },
      },
      {
        title: (
          <TableHeading style={{ minWidth: "80px", width: "90px" }}>
            Bonus for
          </TableHeading>
        ),
        dataIndex: ["referrer"],
        render: (value: any, record: IStaffReward, index: number) => {
          const id = record?.id;
          const isStaff = record?.bonusFor;
          const comment = isStaff
            ? isStaff?.userProfile.firstname +
              " " +
              isStaff?.userProfile.lastname
            : value;
          return (
            <NoteEditPopover
              id={id}
              note={comment}
              disabled
              title="Comment"
              control={control}
              defaultValue={comment}
              handleSubmit={handleSubmit}
              onSubmit={(formData: any) => {}}
            />
          );
        },
      },
      {
        dataIndex: ["hired_date"],
        hide: status !== RewardStatus.GIVEN,
        title: <TableHeading padding>Created at</TableHeading>,
        render: (value: any, record: IStaffReward, index: number) => {
          return (
            <CellValue>
              {value && moment(value).format(DATE_FORMAT_MMM_DD_YYYY_HH_mm)}
            </CellValue>
          );
        },
      },
      {
        dataIndex: ["createdBy"],
        hide: false,
        title: <TableHeading padding>Created by</TableHeading>,
        render: (value: any, record: IStaffReward, index: number) => {
          const user = record?.createdBy?.userProfile;
          return (
            <UserRow
              gutter={10}
              align="middle"
              style={{
                paddingLeft: 0,
              }}>
              <Col>
                <CircleImage src={user?.avatar_base_url} />
              </Col>
              <NameWrapper>
                {user?.firstname} {user?.lastname}
              </NameWrapper>
            </UserRow>
          );
        },
      },
      {
        dataIndex: ["given_date"],
        hide: status !== RewardStatus.GIVEN,
        title: <TableHeading padding>Given date</TableHeading>,
        render: (value: any, record: IStaffReward, index: number) => {
          return (
            <CellValue>
              {value && moment(value).format(DATE_FORMAT_MMM_DD_YYYY_HH_mm)}
            </CellValue>
          );
        },
      },
      {
        title: <TableHeading>Actions</TableHeading>,
        dataIndex: ["candidateActions"],
        hide: status === RewardStatus.GIVEN,
        render: (value: any, record: IStaffReward, index: number) => {
          return (
            <CellActions
              data={record}
              activeActions={record?.actionPermissions}
            />
          );
        },
      },
    ].filter((e) => !e.hide);
  }, [status, initialData]);
};
