import React from "react";
import { Wrapper } from "./style";
import { Segmented } from "components";
import { Menu } from "./menu";
import TableActions from "./action";
import { IObservationStatistics } from "types/observation";

const TableTop = ({
  type,
  data,
}: {
  type: string;
  data: IObservationStatistics | undefined;
}) => {
  return (
    <Wrapper>
      <Segmented
        routerKey="tab"
        initValue={type}
        options={Menu({ type, data })}
        action={<TableActions />}
      />
    </Wrapper>
  );
};

export default TableTop;
