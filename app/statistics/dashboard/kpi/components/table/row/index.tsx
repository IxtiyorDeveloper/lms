import React from "react";
import { Cell, TableHeading } from "components";
import { getRowNumber } from "utils/getRowNumber";
import { SCENARIO_KPI } from "constants/kpi";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

export const row = () => {
  return [
    {
      title: (
        <TableHeading gap="16px" className="header_staff" padding>
          <div>#</div>
          <div>Staff</div>
        </TableHeading>
      ),
      dataIndex: "firstname",
      width: "60%",
      render: (value: any, record: any, index: number) => {
        return (
          <Cell>
            <div className="header_staff">
              {/*<div>*/}
              {/*  <ArrowSelect180Svg*/}
              {/*    className={`arrow ${props.row.isExpanded ? "expanded" : ""}`}*/}
              {/*  />*/}
              {/*</div>*/}
              <div className="ml">{getRowNumber({ index })}</div>
              <div>
                {value} {record.lastname}
              </div>
            </div>
          </Cell>
        );
      },
    },
    {
      title: <TableHeading>Scenario name</TableHeading>,
      dataIndex: "scenario",
      width: "20%",
      render: (value: any, record: any, index: number) => {
        const components = record.components as {
          type: string;
          value: string;
        }[];
        let result = "";
        components.map((e, index) => {
          result += `${SCENARIO_KPI?.[+e.type as keyof typeof SCENARIO_KPI]}${
            index + 1 !== components.length ? "," : ""
          } `;
        });
        return <Cell>{result || "wqe"}</Cell>;
      },
    },
    {
      title: <TableHeading>Amount</TableHeading>,
      dataIndex: "amount",
      width: "20%",
      render: (value: any, record: any, index: number) => {
        const components = record.components as {
          type: string;
          value: string;
        }[];
        let result = 0;
        components.map((e, index) => (result += +e.value));
        return <Cell>{toCurrencyFormat(result)}</Cell>;
      },
    },
  ];
};

export const childRow = () => {
  return [
    {
      title: <></>,
      dataIndex: "firstname",
      render: (value: any, record: any, index: number) => null,
      width: "60%",
    },
    {
      title: <></>,
      dataIndex: "type",
      width: "20%",
      render: (value: any, record: any, index: number) => {
        return (
          <Cell className="pd-vertical-10">
            {SCENARIO_KPI?.[+value as keyof typeof SCENARIO_KPI]}{" "}
            {record?.data && (
              <span>
                (
                {Array.isArray(record?.data?.count)
                  ? record?.data?.count?.reduce(
                      (acc: number, cer: string) => acc + +cer,
                      0,
                    )
                  : record?.data?.count}
                )
              </span>
            )}
          </Cell>
        );
      },
    },
    {
      title: <></>,
      dataIndex: "value",
      width: "20%",
      render: (value: any, record: any, index: number) => {
        return <Cell>{toCurrencyFormat(value)}</Cell>;
      },
    },
  ];
};
