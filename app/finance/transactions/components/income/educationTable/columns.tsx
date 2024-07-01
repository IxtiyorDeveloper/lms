import {
  AntdUserProfile,
  CircleImage,
  IncomeActions,
  PhoneCell,
  TableHeading,
} from "components";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { AmountWrapper, CellNameWrapper, DateTimeWrapper } from "./style";
import React, { useMemo } from "react";
import { IUser } from "types";
import { IProductAndServiceIncome } from "types/finance/transactionIncome";
import moment from "moment";
import {
  DATE_FORMAT_DD_MMM_YY_HH_mm,
  DATE_FORMAT_SHOW_MMM_YYYY,
} from "constants/dates";
import Link from "next/link";
import { IUserPhone } from "types/userPhone";
import { Tooltip } from "antd";
import { queryKeys } from "constants/queryKeys";
import { generatePaymentType } from "./components/utils/generatePaymentType";

export const Columns = ({ selects }: { selects: any }) => {
  return useMemo(
    () => [
      {
        title: (
          <TableHeading padding isId style={{ width: "180px" }}>
            <p>Name</p>
          </TableHeading>
        ),
        dataIndex: "name",
        render: (value: any, record: any, index: number) => {
          const educationalIncome: IProductAndServiceIncome =
            record?.educationalIncome;
          return (
            <AntdUserProfile
              props={record}
              propsValue={educationalIncome?.user?.userProfile}
              index={index}
              isMark
            />
          );
        },
      },
      {
        title: (
          <TableHeading>
            <p>Phone</p>
          </TableHeading>
        ),
        dataIndex: ["educationalIncome", "user", "userPhones"],
        render: (value: IUserPhone[], record: any, index: number) => {
          return <PhoneCell value={value} />;
        },
      },
      {
        title: (
          <TableHeading>
            <p>Branch</p>
          </TableHeading>
        ),
        dataIndex: "branch",
        render: (value: any, record: any, index: number) => {
          const educationalIncome: IProductAndServiceIncome =
            record?.educationalIncome;
          const branch = educationalIncome?.group?.room?.branch?.name;
          return <AmountWrapper>{branch}</AmountWrapper>;
        },
      },
      {
        title: (
          <TableHeading>
            <p>Group</p>
          </TableHeading>
        ),
        dataIndex: "educationalIncome",
        render: (value: any, record: any, index: number) => {
          const educationalIncome: IProductAndServiceIncome = value;
          return (
            <CellNameWrapper>
              <Link href={`/groups/${educationalIncome?.group?.id}`}>
                <p className="group_name">{educationalIncome?.group?.name}</p>
              </Link>
            </CellNameWrapper>
          );
        },
      },
      {
        title: (
          <TableHeading>
            <p>Payment type</p>
          </TableHeading>
        ),
        dataIndex: "payment_type",
        render: (value: any, record: any, index: number) => {
          const paymentType = generatePaymentType({ selects, value, record });
          return <AmountWrapper>{paymentType}</AmountWrapper>;
        },
      },
      {
        title: (
          <TableHeading>
            <p>Amount</p>
          </TableHeading>
        ),
        dataIndex: "amount",
        render: (value: any, record: any, index: number) => {
          return <AmountWrapper>{toCurrencyFormat(value)}</AmountWrapper>;
        },
      },
      {
        title: (
          <TableHeading>
            <p>Created by</p>
          </TableHeading>
        ),
        dataIndex: "createdBy",
        render: (value: any, record: any, index: number) => {
          const createdBy: IUser = value;
          return (
            <CellNameWrapper>
              <CircleImage src={createdBy?.userProfile?.avatar} />
              <p>
                {createdBy?.userProfile?.firstname +
                  " " +
                  createdBy?.userProfile?.lastname}
              </p>
            </CellNameWrapper>
          );
        },
      },
      {
        title: (
          <TableHeading>
            <p>Date & Time</p>
          </TableHeading>
        ),
        dataIndex: "created_at",
        render: (value: any, record: any, index: number) => {
          return (
            <DateTimeWrapper>
              <Tooltip
                destroyTooltipOnHide
                title={moment(value).format(DATE_FORMAT_DD_MMM_YY_HH_mm)}
              >
                {moment(value).format(DATE_FORMAT_SHOW_MMM_YYYY)}
              </Tooltip>
            </DateTimeWrapper>
          );
        },
      },
      {
        title: <TableHeading>Actions</TableHeading>,
        dataIndex: "actions",
        render: (value: any, record: any, index: number) => {
          return (
            <IncomeActions
              data={record}
              queryKeys={[
                queryKeys.admin_finance_income_index,
                queryKeys.admin_finance_statistic,
              ]}
              activeActions={{
                lifecycle: true,
                ...record?.buttonActions,
              }}
            />
          );
        },
      },
    ],
    [selects.incomePaymentTypes]
  );
};
