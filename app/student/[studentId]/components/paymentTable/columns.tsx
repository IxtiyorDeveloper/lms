import React, { useMemo } from "react";
import { Cell, TableHeading } from "components";
import { Flex } from "./style";
import moment from "moment";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { textColors } from "styles/theme";
import { DATE_FORMAT_DD_MM_YYYY, DATE_FORMAT_HH_mm } from "constants/dates";
import { usePageDataMemo } from "hooks";
import { generatePaymentType } from "./utils/generatePaymentType";

const Columns = () => {
  const selects = usePageDataMemo();
  return useMemo(() => {
    return [
      {
        title: <TableHeading padding>Date</TableHeading>,
        dataIndex: "date",
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
        title: <TableHeading>Amount</TableHeading>,
        dataIndex: "amount",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <Flex
                style={{
                  color: value > 0 ? textColors.midori : textColors.pop,
                }}
              >
                {toCurrencyFormat(value)}
              </Flex>
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Payment Type</TableHeading>,
        dataIndex: "payment_type",
        render: (value: any, record: any, index: number) => {
          const paymentType = generatePaymentType({ selects, value, record });
          return (
            <Cell>
              <Flex>{paymentType}</Flex>
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Cashier</TableHeading>,
        dataIndex: "full_name",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <Flex>
                <p> {value}</p>
                <p className="hour">{record?.role}</p>
              </Flex>
            </Cell>
          );
        },
      },
    ];
  }, [selects]);
};

export default Columns;
