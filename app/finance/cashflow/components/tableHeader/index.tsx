import React, { FC } from "react";
import { SortControl } from "components";

interface IProps {
  control: any;
}
const TableHeader: FC<IProps> = ({ control }) => {
  return (
    <div className="flex-table-header">
      <div className="item">%</div>
      <div className="item">Category name</div>

      <div className="item">
        <SortControl
          control={control}
          name="sort"
          field="mot"
          label="MOT"
          innerContainerClassname="item-innner"
        />
      </div>
      <div className="item">
        <SortControl
          control={control}
          name="sort"
          field="bank"
          label="Bank"
          innerContainerClassname="item-innner"
        />
      </div>
      <div className="item">
        <SortControl
          control={control}
          name="sort"
          field="total"
          label="Total"
          innerContainerClassname="item-innner"
        />
      </div>
      <div className="item"></div>
    </div>
  );
};

export default TableHeader;
