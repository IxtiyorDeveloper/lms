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
import { usePageDataMemo } from "hooks";
import formatPhoneNumber from "utils/phoneNumberFormatter";
import moment from "moment";
import {
  DATE_FORMAT_DD_MMM_YY_HH_mm,
  DATE_FORMAT_SHOW_MMM_YYYY,
} from "constants/dates";
import { Tooltip } from "antd";
import { queryKeys } from "constants/queryKeys";

export const Columns = () => {
  const selects = usePageDataMemo();
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
          const productAndServiceIncome = record?.productAndServiceIncome;
          return (
            <AntdUserProfile
              props={record}
              propsValue={{
                fullName: productAndServiceIncome?.full_name,
                ...productAndServiceIncome?.user?.userProfile,
              }}
              index={index}
              isMark
              isStudent={false}
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
        dataIndex: ["productAndServiceIncome", "user", "userPhones"],
        render: (value: any, record: any, index: number) => {
          if (!!value) {
            return <PhoneCell value={value} />;
          } else {
            return (
              <AmountWrapper>
                {formatPhoneNumber(
                  record?.productAndServiceIncome?.phone_number
                )}
              </AmountWrapper>
            );
          }
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
          const productAndServiceIncome = record?.productAndServiceIncome;
          return (
            <AmountWrapper>
              {productAndServiceIncome?.branch?.name}
            </AmountWrapper>
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
          return (
            <AmountWrapper>
              {
                selects.incomePaymentTypesWithBalance?.find(
                  (type) => type.value == value
                )?.label
              }
            </AmountWrapper>
          );
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
              modalName="productIncomeCheck"
              queryKeys={[
                queryKeys.admin_finance_income_index,
                queryKeys.admin_finance_statistic,
              ]}
              activeActions={{ lifecycle: true, ...record?.buttonActions }}
            />
          );
        },
      },
    ],
    [selects.incomePaymentTypes]
  );
};
