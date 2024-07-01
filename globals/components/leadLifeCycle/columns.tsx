import React from "react";
import moment from "moment/moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MM_YYYY,
  DATE_FORMAT_HH_mm,
} from "constants/dates";
import { EventLifeCycle } from "constants/lifeCycle";
import { Cell, TableHeading } from "components";
import { Wrapper } from "../studentLifeCycle/style";

const Columns = () => {
  return [
    {
      title: (
        <TableHeading style={{ padding: "0 10px", textAlign: "left" }}>
          Date
        </TableHeading>
      ),
      dataIndex: "datetime",
      width: "100px",
      render: (value: any, record: any, index: number) => {
        const date = moment(value, DATE_FORMAT_CREATED_AT);
        const data = EventLifeCycle.find(
          (e) => e.action == record?.data?.action
        );
        const ActionIcon = data?.icon;
        return (
          <Cell>
            <div className="datetime">
              {!!ActionIcon && <ActionIcon width="18px" height="18px" />}
              <div>
                <p className="text-center">
                  {value && date.format(DATE_FORMAT_DD_MM_YYYY)}
                </p>
                <p className="text-center">
                  {value && date.format(DATE_FORMAT_HH_mm)}
                </p>
              </div>
            </div>
          </Cell>
        );
      },
    },
    {
      title: (
        <TableHeading
          style={{ width: "190px", textAlign: "center", padding: "0 10px" }}>
          Action
        </TableHeading>
      ),
      // accessor: "data.action",
      width:"100%",
      dataIndex: "description",
      render: (value: any, record: any, index: number) => {
        const data = EventLifeCycle.find(
          (e) => e.action == record?.data?.action
        );
        return (
          <Cell>
            <p className="text-center">
              {data?.text && (
                <>
                  {data?.text}
                  <br />{" "}
                </>
              )}{" "}
              {value}
            </p>
            {record?.record && (
              <Wrapper>
                <br />
                <audio controls>
                  <source src={record?.record} type="audio/mpeg" />
                </audio>
              </Wrapper>
            )}
          </Cell>
        );
      },
    },
    {
      title: (
        <TableHeading style={{ textAlign: "center", padding: "0 10px" }}>
          Staff
        </TableHeading>
      ),
      dataIndex: "createdBy",width:"120px",
      render: (value: any, record: any, index: number) => {
        return (
          <Cell>
            <p className="text-center">
              {value &&
                `${value?.userProfile?.firstname} ${value?.userProfile?.lastname}`}
            </p>
            <p className="text-center">
              {value?.rbacAssignment?.rbacRole?.name}
            </p>
          </Cell>
        );
      },
    },
  ];
};

export default Columns;
