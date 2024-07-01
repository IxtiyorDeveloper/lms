import {
  AntdUserProfile,
  ExpenseActions,
  TableHeading,
  ExpenseFiles,
  TaskLinks,
} from "components";
import { AmountWrapper, HeaderCell, PopoverContent } from "./style";
import { Popover, Tooltip } from "antd";
import React, { useMemo } from "react";
import { usePageDataMemo } from "hooks";
import { useRouter } from "next/router";
import moment from "moment/moment";
import {
  DATE_FORMAT_DD_MMM_YY_HH_mm,
  DATE_FORMAT_SHOW_MMM_YYYY,
} from "constants/dates";
import Amount from "./components/amount";
import { queryKeys } from "constants/queryKeys";
import { ITaskModel } from "types/finance/transactionExpense";

export const Columns = () => {
  const selects = usePageDataMemo();
  const router = useRouter();
  return useMemo(
    () => [
      {
        title: (
          <TableHeading isId padding>
            <p>Created by</p>
          </TableHeading>
        ),
        dataIndex: ["createdBy", "userProfile"],
        Footer: "name",
        render: (value: any, record: any, index: number) => {
          return (
            <AntdUserProfile
              props={record}
              propsValue={value}
              index={index}
              isStudent={false}
              isMark
            />
          );
        },
      },
      {
        title: (
          <HeaderCell>
            <p>Description</p>
          </HeaderCell>
        ),
        dataIndex: "description",
        Footer: "Description",
        render: (value: any, record: any, index: number) => {
          return (
            <Popover
              destroyTooltipOnHide
              placement="bottomLeft"
              trigger="click"
              content={<PopoverContent>{value}</PopoverContent>}
            >
              <AmountWrapper>{value}</AmountWrapper>
            </Popover>
          );
        },
      },
      {
        title: (
          <HeaderCell>
            <p>Branch</p>
          </HeaderCell>
        ),
        dataIndex: ["branch", "name"],
        Footer: "Branch",
        render: (value: any, record: any, index: number) => {
          return <AmountWrapper>{value}</AmountWrapper>;
        },
      },
      {
        title: (
          <HeaderCell>
            <p>Category</p>
          </HeaderCell>
        ),
        dataIndex: ["expenseCategory", "name"],
        Footer: "Category",
        render: (value: any, record: any, index: number) => {
          return (
            <Popover
              destroyTooltipOnHide
              placement="bottomLeft"
              trigger="click"
              content={<PopoverContent>{value}</PopoverContent>}
            >
              <AmountWrapper>{value}</AmountWrapper>
            </Popover>
          );
        },
      },
      {
        title: (
          <HeaderCell>
            <p>Amount</p>
          </HeaderCell>
        ),
        dataIndex: "amount",
        Footer: "Amount",
        render: (value: any, record: any, index: number) => {
          return <Amount value={value} record={record} />;
        },
      },
      {
        title: (
          <HeaderCell>
            <p>Receiver</p>
          </HeaderCell>
        ),
        dataIndex: ["receivedBy", "userProfile"],
        Footer: "Receiver",
        render: (value: any, record: any, index: number) => {
          return (
            <AntdUserProfile
              props={record}
              propsValue={value}
              index={index}
              isStudent={false}
            />
          );
        },
      },
      {
        title: (
          <HeaderCell>
            <p>Ordered by</p>
          </HeaderCell>
        ),
        dataIndex: ["orderedBy", "username"],
        Footer: "Receiver",
        render: (value: any, record: any, index: number) => {
          return <AmountWrapper>{value ?? "system"}</AmountWrapper>;
        },
      },
      {
        title: (
          <HeaderCell>
            <p>Links</p>
          </HeaderCell>
        ),
        dataIndex: "linkedTasks",
        Footer: "Receiver",
        render: (
          value: ITaskModel[] | undefined,
          record: any,
          index: number
        ) => {
          return <TaskLinks value={value} />;
        },
      },
      {
        title: (
          <HeaderCell>
            <p>Date & Time</p>
          </HeaderCell>
        ),
        dataIndex: "created_at",
        Footer: "Date & Time",
        render: (value: any, record: any, index: number) => {
          return (
            <Popover
              destroyTooltipOnHide
              placement="bottomLeft"
              trigger="click"
              content={<PopoverContent>{value}</PopoverContent>}
            >
              <AmountWrapper>
                <Tooltip
                  destroyTooltipOnHide
                  title={moment(value).format(DATE_FORMAT_DD_MMM_YY_HH_mm)}
                >
                  {moment(value).format(DATE_FORMAT_SHOW_MMM_YYYY)}
                </Tooltip>
              </AmountWrapper>
            </Popover>
          );
        },
      },
      {
        title: (
          <HeaderCell>
            <p>File</p>
          </HeaderCell>
        ),
        dataIndex: "expenseFiles",
        Footer: "Payment type",
        render: (value: any, record: any, index: number) => {
          return <ExpenseFiles expenseFiles={value} />;
        },
      },
      {
        title: (
          <TableHeading style={{ textAlign: "center" }}>Actions</TableHeading>
        ),
        dataIndex: "actions",
        Footer: "Actions",
        render: (value: any, record: any, index: number) => {
          return (
            <ExpenseActions
              data={record}
              queryKeys={[
                queryKeys.admin_finance_expense_index,
                queryKeys.admin_finance_statistic,
              ]}
              activeActions={{ lifecycle: true, ...record?.buttonActions }}
            />
          );
        },
      },
    ],
    [selects.incomePaymentTypes, router.query]
  );
};
