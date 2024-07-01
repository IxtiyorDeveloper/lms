import React, { FC, Fragment, useState } from "react";
import { ArrowSvg } from "components";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { PercentWrapper } from "../../../../style";
import { Arrow } from "app/ranking/home/components/table/style";
import ChildTable from "../../../../../cashflow/components/parentTable/component/table";

const Row: FC<{ index: number; item: any; total: number; color: string }> = ({
  item,
  total,
  color,
}) => {
  const [show, setShow] = useState(false);
  const value = (item.total * 100) / total;

  return (
    <Fragment>
      <tr className="items" onClick={() => setShow((p) => !p)}>
        <td>
          <PercentWrapper color={item.color} className="grotesk">
            {isNaN(value) ? 0 : value.toFixed(2)}%
          </PercentWrapper>
        </td>
        <td>{item.category_name}</td>
        <td>{toCurrencyFormat(item.mot)}</td>
        <td>{toCurrencyFormat(item.bank)}</td>
        <td>{toCurrencyFormat(item.total)}</td>
        <td>
          <Arrow isOpen={show}>
            <ArrowSvg />
          </Arrow>
        </td>
      </tr>
      {show && (
        <tr>
          <td colSpan={6}>
            <ChildTable row={{ original: item }} />
          </td>
        </tr>
      )}
    </Fragment>
  );
};

export default Row;
