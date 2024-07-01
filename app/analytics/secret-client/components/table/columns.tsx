import React from "react";
import moment from "moment";
import { ISecretClient } from "types";
import { Cell, TableHeading } from "components";
import { getRowNumber } from "utils/getRowNumber";
import { DATE_FORMAT_CREATED_AT } from "constants/dates";
import {
  DeleteSvg,
  EditSvg,
  FillStarSvg,
  ArrowSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { ColumnGroupType, ColumnType } from "antd/lib/table/interface";
import { Action } from "./style";
import { bgColors } from "styles/theme";
import { NextRouter } from "next/router";

export const columns = ({
  expandedRowKeys,
  setDeleteAction,
  router,
}: {
  expandedRowKeys: any;
  setDeleteAction: any;
  router: NextRouter;
}): (ColumnGroupType<any> | ColumnType<any> | boolean)[] => {
  return [
    {
      title: <TableHeading></TableHeading>,
      width: "1%",
      render: (value, record, index) => {
        return (
          <Cell
            style={{
              padding: "20px 0 20px 14px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {getRowNumber({ index })}
            <div style={{ marginLeft: "16px " }}>
              <ArrowSvg
                width={16}
                height={16}
                color={bgColors.yourShadow}
                style={{
                  transform: `rotate(${
                    expandedRowKeys?.includes(record.id || record.user_id)
                      ? 0
                      : -90
                  }deg)`,
                  transition: "0.3s",
                }}
              />
            </div>
          </Cell>
        );
      },
    },
    {
      title: <TableHeading padding>Cycle ID</TableHeading>,
      render: (value, record: ISecretClient, index) => {
        return <Cell>{record.name}</Cell>;
      },
    },
    {
      title: <TableHeading>Company name</TableHeading>,
      render: (value, record: ISecretClient, index) => {
        return <Cell>{record.location_name}</Cell>;
      },
    },
    {
      title: <TableHeading>Feedback count</TableHeading>,
      render: (value, record: ISecretClient, index) => {
        return <Cell>{record.reviews?.length || 0}</Cell>;
      },
    },
    {
      title: <TableHeading>Created date</TableHeading>,
      render: (value, record: ISecretClient, index) => {
        const date = moment(record.created_at, DATE_FORMAT_CREATED_AT);
        return (
          <Cell>
            <p>{date.format("DD MMM YYYY")}</p>
            <p>{date.format("HH:mm")}</p>
          </Cell>
        );
      },
    },
    {
      title: <TableHeading>Overall score</TableHeading>,
      render: (value, record: ISecretClient, index) => {
        let review = 0;
        let b = record.reviews?.map((e) => (review += e.rate))?.length;
        return (
          <Cell style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {(review / b).toFixed(1)}
            <FillStarSvg color={bgColors.primary} width={20} height={20} />
          </Cell>
        );
      },
    },
    {
      title: <TableHeading>Actions</TableHeading>,
      width: "10%",
      render: (value, record: ISecretClient, index) => {
        return (
          <Cell style={{ display: "flex", gap: "16px" }}>
            <Action
              onClick={(e) => {
                e.stopPropagation();
                router.push({
                  pathname: `/analytics/secret-client/cycle-action`,
                  query: {
                    type: record.type || "100",
                    name: record.location_name,
                    branch_id: record.branch_id,
                    id: record.id,
                  },
                });
              }}
            >
              <EditSvg width={16} height={16} />
            </Action>
            <Action
              onClick={(e) => {
                e.stopPropagation();
                setDeleteAction({ id: record.id, isOpen: true });
              }}
            >
              <DeleteSvg width={24} height={24} />
            </Action>
          </Cell>
        );
      },
    },
  ];
};
