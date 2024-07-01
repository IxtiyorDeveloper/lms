import React, { useMemo } from "react";
import { InputNumber, TableHeading } from "components";
import { GeneralParams, ICourse } from "types";
import { Control } from "react-hook-form";
import { InputWrapper, StyledFirstHeader } from "./style";

interface Interface {
  course: ICourse | undefined;
  id: number | undefined | string;
  control: Control<GeneralParams, any>;
}

const Columns: ({ course, id, control }: Interface) => {
  title: JSX.Element;
  dataIndex: string;
  render: (value: any, record: any, index: number) => JSX.Element;
}[] = ({ course, id, control }) => {
  return useMemo(() => {
    let array: any = [];
    if (course?.groupTypes)
      for (let i = 0; i < course?.groupTypes?.length; i++) {
        const groupType = course?.groupTypes[i];
        array = [
          ...array,
          {
            title: (
              <TableHeading padding style={{ paddingLeft: "10px" }}>
                {groupType?.name}
              </TableHeading>
            ),
            dataIndex: `id${i}`,
            render: (value: any, record: any, index: number) => {
              const branch_id = record?.id;
              return (
                <InputWrapper>
                  <InputNumber
                    className="input"
                    control={control}
                    name={`general.amount_groupType${groupType?.id}_branch${branch_id}_level${id}`}
                    suffix={<div>UZS</div>}
                  />
                </InputWrapper>
              );
            },
          },
        ];
      }
    return [
      {
        title: <StyledFirstHeader>Branches</StyledFirstHeader>,
        dataIndex: "name",
        render: (value: any, record: any, index: number) => {
          return <StyledFirstHeader>{value}</StyledFirstHeader>;
        },
      },
      ...array,
    ];
  }, [course, id]);
};

export default Columns;
