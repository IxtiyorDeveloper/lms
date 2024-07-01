import React, { FC, forwardRef } from "react";
import { IGenerateMonths } from "../../../functions";
import HeaderSide from "../header";

interface IProps {
  mappableVersionOfPeriod: { year: number; months: IGenerateMonths[] }[];
  scrollPosition?: number;
  data?: any[];
  sidebarItems?: any[];
}

const TableSiteComponent = forwardRef((props: IProps, ref: any) => {
  const { mappableVersionOfPeriod, scrollPosition, data, sidebarItems } = props;

  return (
    <>
      {sidebarItems?.map((item, key) => {
        return (
          <div id={`part-${key}-${item?.id}`} key={`part-${key}-${item?.id}`}>
            {data?.map((tableData: any) => {
              const shift_id = tableData?.shift ? tableData?.shift?.id : 0;
              const part_id = `${tableData?.role?.id}_${shift_id}`;
              const id = `part-${part_id}`;
              const isDep = tableData?.department?.id == item?.id;

              return isDep ? (
                <HeaderSide
                  id={id}
                  key="sad"
                  part_id={part_id}
                  tableData={tableData}
                  period={mappableVersionOfPeriod}
                  yearsList={[213]}
                  slotsData={"as"}
                />
              ) : null;
            })}
          </div>
        );
      })}
    </>
  );
});

export default TableSiteComponent;
