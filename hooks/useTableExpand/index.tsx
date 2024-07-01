import { useState } from "react";
import { TParams } from "types";

export type expandKeys = (string | number)[];

export interface ITableExpand {
  expandKey?: string;
}

export const useTableExpand = ({ expandKey = "id" }: ITableExpand = {}) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<expandKeys>([]);
  const onRowClick = (record: TParams) => {
    const newExpandedRowKeys = [...(expandedRowKeys || [])];
    if (newExpandedRowKeys.includes(record[expandKey])) {
      newExpandedRowKeys.splice(
        newExpandedRowKeys.indexOf(record[expandKey]),
        1,
      );
    } else {
      newExpandedRowKeys.push(record[expandKey]);
    }
    setExpandedRowKeys(newExpandedRowKeys);
  };

  return {
    onRowClick,
    setExpandedRowKeys,
    expandedRowKeys,
  };
};
