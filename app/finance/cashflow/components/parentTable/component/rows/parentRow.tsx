import React from "react";
import { bgColors, textColors } from "styles/theme";
import { TableHeading, ArrowSvg } from "components";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

import { Arrow } from "../parentTable/style";
import Difference from "../../../difference";
import { CategoryName, PercentWrapper } from "../../../../style";

export const ParentRow = (
  item: any,
  total: number,
  expandedRowKeys: (string | number)[],
  without_avans: boolean,
) => {
  const getValue = (a: number, b: number) => {
    const value = (a * 100) / (b || 0);
    return isNaN(value) ? 0 : value.toFixed(2);
  };
  return [
    {
      title: (
        <TableHeading className="grotesk" color={textColors.white}>
          <PercentWrapper color="blue">
            {getValue(item.total, total)}%
          </PercentWrapper>
        </TableHeading>
      ),
      dataIndex: "total1",
      width: "10%",
      render: (current: any, record: any, index: number) => {
        const value = (record?.total * 100) / total;
        return (
          <PercentWrapper
            // style={{ width: "25%" }}
            color={record?.color}
            className="grotesk"
          >
            {isNaN(value) ? 0 : value.toFixed(2)}%
          </PercentWrapper>
        );
      },
    },
    {
      title: (
        <TableHeading
          className="grotesk"
          // style={{ fontWeight: 500, textTransform: "uppercase", width: "100%" }}
          color={textColors.white}
        >
          <Difference
            main
            record={item}
            children={item.category_name}
            without_avans={without_avans}
          />
        </TableHeading>
      ),
      dataIndex: "category_name",
      width: "30%",
      render: (current: string, record: any, index: number) => (
        <CategoryName>
          <Difference
            record={record}
            children={current?.toUpperCase()}
            without_avans={without_avans}
          />
        </CategoryName>
      ),
    },
    {
      title: (
        <TableHeading
          className="grotesk"
          // style={{ fontWeight: 400 }}
          color={textColors.white}
        >
          {toCurrencyFormat(item.mot)}
        </TableHeading>
      ),
      dataIndex: "mot",
      width: "20%",
      render: (current: any, record: any, index: number) => {
        return (
          <CategoryName className="grotesk">
            {toCurrencyFormat(current)}
          </CategoryName>
        );
      },
    },
    {
      title: (
        <TableHeading className="grotesk" color={textColors.white}>
          {toCurrencyFormat(item.bank)}
        </TableHeading>
      ),
      dataIndex: "bank",
      width: "20%",
      render: (current: any, record: any, index: number) => (
        <CategoryName className="grotesk">
          {toCurrencyFormat(current)}
        </CategoryName>
      ),
    },
    {
      title: (
        <TableHeading
          className="grotesk"
          style={{
            fontWeight: 400,
            // width: "20%",
            whiteSpace: "nowrap",
            flexWrap: "nowrap",
          }}
          color={textColors.white}
        >
          {toCurrencyFormat(item.total)}
        </TableHeading>
      ),
      dataIndex: "total",
      width: "15%",
      render: (current: any, record: any, index: number) => (
        <CategoryName className="grotesk">
          {toCurrencyFormat(current)}
        </CategoryName>
      ),
    },
    {
      title: (
        <TableHeading
          className="grotesk"
          style={{
            fontWeight: 400,
            // width: "20%",
            whiteSpace: "nowrap",
            flexWrap: "nowrap",
          }}
          color={textColors.white}
        >
          {/*{toCurrencyFormat(item.total)}*/}
        </TableHeading>
      ),
      dataIndex: "total",
      width: "5%",
      render: (current: any, record: any, index: number) => {
        const isExpanded = expandedRowKeys?.includes(record?.id);

        return (
          <div>
            <Arrow isOpen={isExpanded}>
              <ArrowSvg color={bgColors.yourShadow} width={12} height={12} />
            </Arrow>
          </div>
        );
      },
    },
  ];
};
