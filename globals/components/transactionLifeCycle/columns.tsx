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
        title: "IP address",
        dataIndex: "ip_address",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <Flex>
                <p> {value}</p>
              </Flex>
            </Cell>
          );
        },
      },
      {
        title: "Scenario",
        dataIndex: "scenario",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <Flex>
                <p> {value}</p>
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
