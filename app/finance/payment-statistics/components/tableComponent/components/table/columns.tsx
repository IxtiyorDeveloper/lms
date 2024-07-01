import React, { useMemo } from "react";
import { AntdUserProfile, TableHeading } from "components";
import { AmountW } from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { usePageDataMemo } from "hooks";
import { IContactDetail } from "types/finance/paymentStatistics";
import { GROUP_MENTOR_100 } from "constants/groupMentors";
import { GROUP_FORM_GROUP } from "constants/groupForms";

interface IProps {
  total1: 0;
  total2: 0;
  total3: 0;
}

const Columns = (props: IProps) => {
  const { staffEnumsGroupForms } = usePageDataMemo();
  return useMemo(
    () => [
      {
        title: (
          <TableHeading isId padding>
            Name
          </TableHeading>
        ),
        dataIndex: "user",
        width: "45%",
        render: (value: any, record: any, index: number) => {
          return (
            <AntdUserProfile
              props={record}
              propsValue={value}
              index={index}
              isStudent={false}
              count={record?.group_count}
            />
          );
        },
      },
      {
        title: (
          <TableHeading>
            Individual total ({toCurrencyFormat(props.total1)})
          </TableHeading>
        ),
        dataIndex: "groupCountDetail",
        width: "15%",
        render: (value: any, record: any, index: number) => {
          const currentValue =
            value?.find(
              (i: IContactDetail) => i?.group_form == GROUP_MENTOR_100
            )?.total ?? 0;
          return (
            <span className="grotesk">
              {toCurrencyFormat(Math.round(currentValue))}
            </span>
          );
        },
      },
      {
        title: (
          <TableHeading>
            Group total ({toCurrencyFormat(props.total2)})
          </TableHeading>
        ),
        dataIndex: ["group", "total"],
        width: "15%",
        render: (value: any, record: any, index: number) => {
          const currentValue =
            record?.groupCountDetail?.find(
              (i: IContactDetail) => i?.group_form == GROUP_FORM_GROUP
            )?.total ?? 0;
          return (
            <span className="grotesk">
              {toCurrencyFormat(Math.round(currentValue))}
            </span>
          );
        },
      },
      {
        title: (
          <TableHeading>
            Teacher total ({toCurrencyFormat(props.total3)})
          </TableHeading>
        ),
        dataIndex: "total_amount",
        width: "25%",
        render: (value: any, record: any, index: number) => (
          <AmountW className="grotesk">
            {toCurrencyFormat(Math.round(value))}
          </AmountW>
        ),
      },
    ],
    [staffEnumsGroupForms]
  );
};
export default Columns;
