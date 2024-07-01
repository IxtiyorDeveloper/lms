import React from "react";
import { Amount, Period, Title } from "../../style";
import { toCurrencyFormat } from "../../../../../utils/toCurrencyFormat";

const Columns = () => {
  return [
    {
      title: "Group",
      dataIndex: "name",
      key: "name",
      render: (props: any) => {
        return <Title>{props}</Title>;
      },
      align: "center",
    },
    {
      title: "Period",
      dataIndex: "period",
      key: "period",
      render: (props: any) => {
        return <Period>{props}</Period>;
      },
      align: "center",
    },
    {
      title: "Lesson",
      dataIndex: "lesson",
      key: "lesson",
      render: (props: any) => {
        return <Title>{props}</Title>;
      },
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (props: any) => {
        return <Amount>- {toCurrencyFormat(props)}</Amount>;
      },
      align: "center",
    },
  ];
};

export default Columns;
