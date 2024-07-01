import React from "react";
import { Cell, TableHeading, CircleImage, ArrowSvg } from "components";
import { AmountW, Arrow } from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { IProductAndServiceStatistics } from "types/finance/transactionIncome";
import { Badge } from "antd";
import { getRowNumber } from "utils/getRowNumber";
import { bgColors } from "styles/theme";
import { generateName } from "./components/generateName";
import { useAdminProducts, usePageDataMemo } from "hooks";

interface IProps {
  expandedRowKeys: (string | number)[];
}

const Columns = ({ expandedRowKeys }: IProps) => {
  const selects = usePageDataMemo();
  const { data: products, isLoading } = useAdminProducts();

  return [
    {
      title: (
        <TableHeading isId padding>
          Name
        </TableHeading>
      ),
      dataIndex: "name",
      width: "80%",
      render: (
        value: IProductAndServiceStatistics["origin_id"],
        record: IProductAndServiceStatistics,
        index: number,
      ) => {
        const isExpanded = expandedRowKeys?.includes(record?.origin_id);
        const id = getRowNumber({ index });

        const name = generateName({
          type: record.type,
          selects,
          products,
          record,
        });

        return (
          <Cell>
            <div className="name">
              <div className="index">{id}</div>
              <Arrow isOpen={isExpanded}>
                <ArrowSvg width={14} height={14} color={bgColors.yourShadow} />
              </Arrow>
              {/*<CircleImage src={record.iconFile} />*/}
              <div className="title">{name}</div>
              <Badge count={record.count} overflowCount={10000} />
            </div>
          </Cell>
        );
      },
    },

    {
      title: (
        <TableHeading style={{ textAlign: "center" }}>
          Total amount
        </TableHeading>
      ),
      dataIndex: "amount",
      width: "20%",
      render: (value: IProductAndServiceStatistics["amount"]) => (
        <AmountW className="grotesk">
          <div className="amounts">{toCurrencyFormat(Math.round(+value))}</div>
        </AmountW>
      ),
    },
  ];
};
export default Columns;
