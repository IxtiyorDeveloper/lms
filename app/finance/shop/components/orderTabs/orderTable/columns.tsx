import { CircleImage, PhoneCell, TableHeading, TransferSvg } from "components";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import {
  AmountWrapper,
  CellNameWrapper,
  DateTimeWrapper,
  ProductWrapper,
  TransferWrapper,
} from "./style";
import React from "react";
import { IShop } from "types";
import { IUserPhone } from "types/userPhone";
import { bgColors } from "styles/theme";
import { getRowNumber } from "utils/getRowNumber";
import _ from "lodash";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MMM__HH_mm,
} from "constants/dates";

export const Columns = ({ setOpen }: any) => {
  const router = useRouter();
  let columns = [
    {
      title: (
        <TableHeading padding isId>
          <p>Student</p>
        </TableHeading>
      ),
      dataIndex: [],
      render: (value: any, record: IShop, index: number) => {
        const id = getRowNumber({ index });

        return (
          <CellNameWrapper style={{ padding: "13px 0 13px 8px" }}>
            {id}
            <CircleImage src={record?.customer?.profile?.avatar?.full_url} />
            {record.customer?.profile?.fullName}
          </CellNameWrapper>
        );
      },
    },
    {
      title: (
        <TableHeading>
          <p>Phone</p>
        </TableHeading>
      ),
      dataIndex: ["customer", "phones"],
      render: (value: IUserPhone[], record: IShop, index: number) => {
        return <PhoneCell value={value} />;
      },
    },
    {
      title: (
        <TableHeading>
          <p>Product</p>
        </TableHeading>
      ),
      dataIndex: [],
      render: (value: any, record: IShop, index: number) => {
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
                  {/*<div className="count">{e.count}</div>*/}
                </div>
              );
            })}
          </ProductWrapper>
        );
      },
    },
    {
      title: (
        <TableHeading>
          <p>Count</p>
        </TableHeading>
      ),
      dataIndex: [],
      render: (value: any, record: IShop, index: number) => {
        return (
          <AmountWrapper>{_.sumBy(record.items, (e) => e.count)}</AmountWrapper>
        );
      },
    },
    {
      title: (
        <TableHeading>
          <p>Amount</p>
        </TableHeading>
      ),
      dataIndex: [],
      render: (value: any, record: IShop, index: number) => {
        return (
          <AmountWrapper>
            {toCurrencyFormat(
              _.sumBy(record.items, (e) => e.price) || 0,
              undefined,
              ""
            )}{" "}
            <Image
              src="/student/coin.svg"
              alt="asdasd"
              width={16}
              height={16}
            />
          </AmountWrapper>
        );
      },
    },
    {
      title: (
        <TableHeading>
          <p>Ordered date & time</p>
        </TableHeading>
      ),
      dataIndex: [],
      render: (value: any, record: IShop, index: number) => {
        return (
          <AmountWrapper>
            {moment(record?.created?.created_at).format("DD MMM / HH:mm")}
          </AmountWrapper>
        );
      },
    },
    {
      title: (
        <TableHeading>
          <p>Pick up date</p>
        </TableHeading>
      ),
      dataIndex: [],
      render: (value: any, record: IShop, index: number) => {
        return (
          <AmountWrapper>
            {moment(record.can_pickup_from).format("DD MMM")}-
            {moment(record.can_pickup_to).format("DD MMM")}
          </AmountWrapper>
        );
      },
    },
  ];

  if (router.query.status == "100" || !router.query.status) {
    columns.push({
      title: (
        <TableHeading>
          <p>Actions</p>
        </TableHeading>
      ),
      dataIndex: [],
      render: (value: any, record: IShop, index: number) => {
        return (
          <DateTimeWrapper>
            {record?.buttonActions?.canGive && (
              <TransferWrapper
                onClick={() => setOpen({ open: true, id: record.id })}
              >
                <TransferSvg color={bgColors.deep} />
              </TransferWrapper>
            )}
          </DateTimeWrapper>
        );
      },
    });
  } else if (router.query.status == "200") {
    columns = [
      ...columns,
      {
        title: (
          <TableHeading>
            <p>Cancel by</p>
          </TableHeading>
        ),
        dataIndex: [],
        render: (value: any, record: IShop, index: number) => {
          return (
            <AmountWrapper>{record.cancel?.createdBy?.username}</AmountWrapper>
          );
        },
      },
      {
        title: (
          <TableHeading>
            <p>Cancel date</p>
          </TableHeading>
        ),
        dataIndex: [],
        render: (value: any, record: IShop, index: number) => {
          return (
            <AmountWrapper>
              {moment(
                record?.cancel?.created_at,
                DATE_FORMAT_CREATED_AT
              ).format(DATE_FORMAT_DD_MMM__HH_mm)}
            </AmountWrapper>
          );
        },
      },
    ];
  } else if (router.query.status == "300") {
    columns = [
      ...columns,
      {
        title: (
          <TableHeading>
            <p>Given by</p>
          </TableHeading>
        ),
        dataIndex: [],
        render: (value: any, record: IShop, index: number) => {
          return (
            <AmountWrapper>{record.given?.createdBy?.username}</AmountWrapper>
          );
        },
      },
      {
        title: (
          <TableHeading>
            <p>Given date</p>
          </TableHeading>
        ),
        dataIndex: [],
        render: (value: any, record: IShop, index: number) => {
          return (
            <AmountWrapper>
              {moment(record?.given?.created_at, DATE_FORMAT_CREATED_AT).format(
                DATE_FORMAT_DD_MMM__HH_mm
              )}
            </AmountWrapper>
          );
        },
      },
    ];
  }

  return columns;
};
