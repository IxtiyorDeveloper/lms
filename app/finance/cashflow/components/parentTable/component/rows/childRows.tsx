import React from "react";
import {
  Cell,
  CircleImage,
  Paint,
  TableHeading,
  View,
  TaskLinks,
} from "components";
import { textColors } from "styles/theme";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import moment from "moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MMM__HH_mm,
} from "constants/dates";
import { useChangeExpenseColor } from "hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  ITaskModel,
  ITransactionExpense,
} from "types/finance/transactionExpense";
import { getRowNumber } from "utils/getRowNumber";
import {
  CellNameWrapper,
  RowMark,
} from "app/finance/transactions/components/expense/table/style";
import { Tooltip } from "antd";
import { PAYMENT_MOT } from "constants/payment";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import ExpenseFiles from "components/common/expenseFiles";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

interface IProps {
  total?: number;
}

export const ChildRows = ({ total }: IProps) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const changeExpenseColor = useChangeExpenseColor({
    onSuccess: (fetchData: ITransactionExpense) => {
      queryClient.setQueriesData(
        [queryKeys.admin_cashflow_expense_index],
        (data) => {
          const newData = data as ITransactionExpense[];
          return newData.map((e) => {
            return e.id === fetchData.id ? fetchData : e;
          });
        }
      );
      toast.success("Success");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmit = (data: { color: string; id: number }) => {
    const { id, color } = data;
    changeExpenseColor.mutate({
      query_params: {
        id: id,
        expand:
          "expenseLinks,linkedTasks,expenseFiles,receivedBy.userProfile.avatar.children",
      },
      body: {
        color,
      },
    });
  };

  const handleOpenUpdateTaskModal = (id?: string) => {
    dispatch(
      toggleModal({
        key: "taskView",
        data: {
          data: {
            id,
          },
          open: true,
        },
      })
    );
  };

  return [
    {
      title: (
        <TableHeading
          style={{ paddingLeft: "20px" }}
          color={textColors.soulfulBlue}
        >
          Receiver
        </TableHeading>
      ),
      dataIndex: "receivedBy",
      render: (value: any, record: ITransactionExpense, index: number) => {
        const data = record;
        const id = getRowNumber({ index });
        const createdBy = data?.receivedBy;
        const full_name =
          createdBy?.userProfile?.firstname +
          " " +
          createdBy?.userProfile?.lastname;
        const color = data?.color;
        return (
          <CellNameWrapper
            style={{
              textAlign: "left",
            }}
            className="name"
          >
            <RowMark
              style={{
                backgroundColor: color,
              }}
            />
            <span className="index">{id}</span>
            <CircleImage
              src={createdBy?.userProfile?.avatar}
              alt="a"
              height={40}
              width={40}
              className="image"
            />
            <Tooltip
              destroyTooltipOnHide
              placement="bottomRight"
              title={full_name}
            >
              <div className="name">{full_name}</div>
            </Tooltip>
          </CellNameWrapper>
        );
      },
    },
    {
      title: (
        <TableHeading color={textColors.soulfulBlue}>Description</TableHeading>
      ),
      dataIndex: "description",
      render: (value: any, record: any, index: number) => {
        return (
          <div style={{ width: "300px" }}>
            <pre style={{ width: "300px", whiteSpace: "pre-wrap" }}>
              {value}
            </pre>
          </div>
        );
      },
    },
    {
      title: <TableHeading color={textColors.soulfulBlue}>Branch</TableHeading>,
      dataIndex: ["branch", "name"],
      render: (value: any, record: any, index: number) => {
        return <Cell className="name">{value}</Cell>;
      },
    },
    {
      title: (
        <TableHeading style={{ padding: "5px" }} color={textColors.soulfulBlue}>
          Mot
        </TableHeading>
      ),
      dataIndex: "amount",
      render: (value: any, record: any, index: number) => (
        <Cell className="name">
          {toCurrencyFormat(+record.payment_form === PAYMENT_MOT ? 0 : value)}
        </Cell>
      ),
    },
    {
      title: <TableHeading color={textColors.soulfulBlue}>Bank</TableHeading>,
      dataIndex: ["expenseCategory", "name"],
      render: (value: any, record: any, index: number) => {
        return (
          <Cell className="name">
            {toCurrencyFormat(
              +record.payment_form !== PAYMENT_MOT ? 0 : +record.amount
            )}
          </Cell>
        );
      },
    },
    {
      title: (
        <TableHeading color={textColors.soulfulBlue}>Date & Time</TableHeading>
      ),
      dataIndex: "created_at",
      render: (value: any, record: any, index: number) => (
        <Cell className="name">
          {value
            ? moment(value, DATE_FORMAT_CREATED_AT).format(
                DATE_FORMAT_DD_MMM__HH_mm
              )
            : "-"}
        </Cell>
      ),
    },
    {
      title: (
        <TableHeading color={textColors.soulfulBlue}>Ordered by</TableHeading>
      ),
      dataIndex: ["orderedBy", "userProfile"],
      render: (value: any, record: any, index: number) => (
        <Cell className="name">
          {value ? `${value?.firstname} ${value?.lastname}` : "-"}
        </Cell>
      ),
    },
    {
      title: (
        <TableHeading color={textColors.soulfulBlue}>Created by</TableHeading>
      ),
      dataIndex: ["createdBy", "userProfile"],
      render: (value: any, record: any, index: number) => (
        <Cell className="name">
          {value ? `${value?.firstname} ${value?.lastname}` : "-"}
        </Cell>
      ),
    },
    {
      title: <TableHeading color={textColors.soulfulBlue}>Task</TableHeading>,
      dataIndex: "linkedTasks",
      render: (value: ITaskModel[] | undefined, record: any, index: number) => {
        return <TaskLinks value={value} />;
      },
    },
    {
      title: <TableHeading color={textColors.soulfulBlue}>File</TableHeading>,
      dataIndex: "expenseFiles",
      render: (value: any, record: any, index: number) => {
        return <ExpenseFiles expenseFiles={value} />;
      },
    },
    {
      title: (
        <TableHeading color={textColors.soulfulBlue}>Actions</TableHeading>
      ),
      dataIndex: "actions",
      render: (value: any, record: any, index: number) => {
        const data: ITransactionExpense = record;
        const id = data?.id;
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Paint size="small" onSubmit={(color) => onSubmit({ id, color })} />
            <View
              size="small"
              onClick={() =>
                dispatch(
                  toggleModal({
                    key: "createExpense",
                    data: {
                      open: true,
                      data: {
                        queryKeys: [queryKeys.admin_cashflow_expense_index],
                        action: "update",
                        isViewOnly: true,
                        id: id,
                      },
                    },
                  })
                )
              }
            />
          </div>
        );
      },
    },
  ];
};
