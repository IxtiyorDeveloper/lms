import React, { useMemo } from "react";
import { TableHeading } from "components";
import { Name } from "./style";

const Columns = () => {
  return useMemo(
    () => [
      {
        Header: <TableHeading>Name</TableHeading>,
        accessor: "key",
        Cell: (props: any) => {
          return <Name>{props.value}</Name>;
        },
      },
      {
        Header: <TableHeading>Name</TableHeading>,
        accessor: "value",
        Cell: (props: any) => {
          return <Name>{props.value ?? "-"}</Name>;
        },
      },
    ],
    []
  );
};
export default Columns;
