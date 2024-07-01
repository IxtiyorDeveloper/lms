import React, { useMemo } from "react";
import { Cell } from "components";
import { Flex, Wrapper } from "./style";
import moment from "moment/moment";
import { DATE_FORMAT_DD_MM_YYYY, DATE_FORMAT_HH_mm } from "constants/dates";

const Columns = ({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
}) => {
  return useMemo(
    () => [
      {
        title: "Date",
        dataIndex: "datetime",
        width: "100px",
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
        title: "Action",
        dataIndex: "description",
        width: "100%",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              {!!value ? value : "-"}{" "}
              {record?.record && (
                <Wrapper>
                  <br />
                  <audio controls id={`life-cycle-audio-${index}`}>
                    <source src={record?.record} type="audio/mpeg" />
                  </audio>
                </Wrapper>
              )}
            </Cell>
          );
        },
      },
      {
        title: "Staff",
        dataIndex: "createdBy",
        width: "120px",
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
    [audioRef]
  );
};

export default Columns;
