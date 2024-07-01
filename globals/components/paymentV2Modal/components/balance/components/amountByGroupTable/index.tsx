import React, { FC, useMemo } from "react";
import { TableHeader, Wrapper } from "./style";
import { AntdTable } from "components";
import { ICalculation } from "types/ICalculation";
import { useGetOneStudent } from "hooks";
import { expand } from "app/student/[studentId]/expand";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { generateData } from "../../../../../paymentModal/components/generateData";

interface IProps {
  calculation?: ICalculation;
  watch: any;
}

const AmountByGroupTable: FC<IProps> = ({ calculation, watch }) => {
  const user_id = watch("tools.student.value");
  const { data: studentData } = useGetOneStudent({
    expand,
    id: user_id,
    type: "update",
  });
  const user = studentData?.currentGroupContact;

  //generate Debtor group list data for table
  const debtorGroupList = useMemo(() => {
    return generateData({ calculation, group: user?.group, user });
  }, [user, calculation?.student?.debt]);

  if (debtorGroupList.length == 0) return null;

  return (
    <Wrapper>
      <AntdTable
        columns={[
          {
            title: <TableHeader>Group</TableHeader>,
            dataIndex: "name",
            render: (value, record, index) => {
              return <div className="group">{value}</div>;
            },
          },
          {
            title: <TableHeader>Period</TableHeader>,
            dataIndex: "period",
            render: (value, record, index) => {
              return <div className="period">{value}</div>;
            },
          },
          {
            title: <TableHeader>Lesson</TableHeader>,
            dataIndex: "lesson",
            render: (value, record, index) => {
              return <div className="lesson">{value}</div>;
            },
          },
          {
            title: (
              <TableHeader style={{ textAlign: "right", marginRight: "4px" }}>
                Amount
              </TableHeader>
            ),
            dataIndex: "amount",
            render: (value: string, record, index) => {
              return (
                <div className="amount">
                  -{toCurrencyFormat(parseInt(parseInt(value).toFixed(0)))}
                </div>
              );
            },
          },
        ]}
        dataSource={debtorGroupList}
        pagination={false}
        className="table"
        rowClassName="row"
        bordered={false}
      />
    </Wrapper>
  );
};

export default AmountByGroupTable;
