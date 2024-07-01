import React, { useMemo } from "react";
import { Cell, TableHeading } from "components";
import moment from "moment/moment";
import { DATE_FORMAT_DD_MM_YYYY, DATE_FORMAT_HH_mm } from "constants/dates";
import { Flex, Wrapper } from "../paymentTable/style";
import { DescriptionWrapper } from "./style";

const Columns = () => {
  return useMemo(
    () => [
      {
        title: <TableHeading padding>Date</TableHeading>,
        dataIndex: "datetime",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <Flex>
                <p> {moment(value).format(DATE_FORMAT_DD_MM_YYYY)}</p>
                <p className="hour">
                  {" "}
                  {moment(value).format(DATE_FORMAT_HH_mm)}
                </p>
              </Flex>
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Action</TableHeading>,
        dataIndex: "description",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <DescriptionWrapper>{!!value ? value : "-"} </DescriptionWrapper>
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
        title: <TableHeading>Staff</TableHeading>,
        dataIndex: "createdBy",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <Flex>
                <p> {value?.username}</p>
                <p className="hour">{value?.rbacAssignment?.rbacRole?.name} </p>
              </Flex>
            </Cell>
          );
        },
      },
    ],
    []
  );
};

export default Columns;
