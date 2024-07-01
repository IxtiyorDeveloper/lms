import React from "react";
import { AntdTable } from "components";
import { TableWrapper } from "../../style";
import Columns from "./components/columns";
import { useRouter } from "next/router";
import { Type } from "./type";

const Table = ({ observations, isLoading, type }: Type) => {
  const router = useRouter();

  return (
    <TableWrapper>
      <AntdTable
        columns={Columns({ type })}
        dataSource={observations}
        loading={isLoading}
        rowClassName="custom-row"
        onRow={(record) => {
          return {
            onClick: (event) => {
              const newURL = `/academic-resource/observation/${record?.id}`;

              router.push(newURL);
            }, // click row
          };
        }}
      />
    </TableWrapper>
  );
};

export default Table;
