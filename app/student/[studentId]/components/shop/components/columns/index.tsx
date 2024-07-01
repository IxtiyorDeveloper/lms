import { AntTableProps } from "components/common/antdTable/type";
import { Cell, TableHeading, CircleImage } from "components";
import React from "react";
import moment from "moment";
import { IStudentOrder } from "types/student";
import Image from "next/image";
import { DATE_FORMAT_CREATED_AT } from "constants/dates";
import { IShop } from "types";
import { ProductWrapper } from "app/finance/shop/components/orderTabs/orderTable/style";

export const orderColumns: AntTableProps["columns"] = [
  {
    dataIndex: ["created", "created_at"],
    title: (
      <TableHeading style={{ padding: "16px 0 16px 16px" }}>Date</TableHeading>
    ),
    render: (value: any, record: IStudentOrder, index: number) => {
      const date = moment(value, DATE_FORMAT_CREATED_AT);
      return (
        <Cell style={{ padding: "16px 14px" }}>
          <div className="date1">{date.format("DD.MM.YYYY")}</div>
          <div className="date2">{date.format("HH:ss")}</div>
        </Cell>
      );
    },
  },
  {
    dataIndex: [],
    title: <TableHeading>Title</TableHeading>,
    render: (value: any, record: IShop) => {
      return (
        <ProductWrapper>
          {record?.items?.map((e) => {
            return (
              <div className="flex">
                <CircleImage src={e?.variation?.product?.cover_photo} />
                <div className="info">
                  <div className="name">{e.variation?.product?.name}</div>
                  {e?.variation?.optionsValue?.map((i) => {
                    return (
                      <div className="item">
                        <div className="property">{i.property}: </div>
                        <div className="option">{i.option}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </ProductWrapper>
      );
    },
  },
  {
    dataIndex: ["items", "0"],
    title: <TableHeading>Coin</TableHeading>,
    render: (value: any) => {
      return (
        <Cell>
          <div className="flex coin">
            <Image src="/student/coin.svg" alt="coin" width={30} height={30} />-
            {value?.price}
          </div>
        </Cell>
      );
    },
  },
  {
    dataIndex: ["given", "createdBy", "username"],
    title: <TableHeading>Staff</TableHeading>,
    render: (value: any, record: IStudentOrder, index: number) => {
      return <Cell>{value || "-"}</Cell>;
    },
  },
  {
    dataIndex: "status",
    title: <TableHeading>Status</TableHeading>,
    render: (value: string) => {
      return (
        <Cell>
          <div className={value == "300" ? "green" : "red"}>
            {value == "300"
              ? "Received"
              : value === "200"
                ? "Canceled"
                : "Not received"}
          </div>
        </Cell>
      );
    },
  },
];
