import React, { useMemo } from "react";
import { PhoneCell, TableHeading } from "components";
import { CellNameWrapper } from "app/leads/home/components/tabs/deletedLeadTable/style";
import { getRowNumber } from "utils/getRowNumber";
import { Tooltip } from "antd";

const Columns = () => {
  return useMemo(
    () => [
      {
        title: <TableHeading padding>Name</TableHeading>,
        dataIndex: "name",
        render: (value: any, record: any, index: number) => {
          const data = record;
          const id = getRowNumber({
            index,
          });
          return (
            <CellNameWrapper
              style={{
                textAlign: "left",
                padding: "16px 0",
              }}
            >
              <span className="index">{id}</span>
              <Tooltip
                destroyTooltipOnHide
                placement="bottomRight"
                title={data.name}
              >
                <div className="name text">{data.name}</div>
              </Tooltip>
            </CellNameWrapper>
          );
        },
      },
      {
        title: <TableHeading>Phone number</TableHeading>,
        dataIndex: "main_phone",
        Footer: "Phone",
        render: (value: any, record: any, index: number) => {
          return (
            <PhoneCell
              value={[
                {
                  id: 1,
                  is_confirmed: 1,
                  phone_number: value,
                  type: 100,
                },
                ...(record?.leadPhones &&
                  record?.leadPhones.map((e: any) => {
                    return { ...e, phone_number: e.phone };
                  })),
              ]}
            />
          );
        },
      },
    ],
    []
  );
};

export default Columns;
