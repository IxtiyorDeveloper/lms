import React, { FC } from "react";
import ArrivalModal from "./components/arrival";
import ChangeModal from "./components/change";
import TransferModal from "./components/transfer";
import DepartureModal from "./components/departure";

export interface IPropsStockActionModal {
  shouldBeInvalidateKeys?: string[];
}
const Actions: FC<IPropsStockActionModal> = ({ shouldBeInvalidateKeys }) => {
  return (
    <div>
      <ArrivalModal shouldBeInvalidateKeys={shouldBeInvalidateKeys} />
      <ChangeModal shouldBeInvalidateKeys={shouldBeInvalidateKeys} />
      <TransferModal shouldBeInvalidateKeys={shouldBeInvalidateKeys} />
      <DepartureModal shouldBeInvalidateKeys={shouldBeInvalidateKeys} />
    </div>
  );
};

export default Actions;
