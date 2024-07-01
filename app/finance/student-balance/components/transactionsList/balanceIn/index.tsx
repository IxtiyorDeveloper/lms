import React, { FC } from "react";
import { AmountWrapper, Wrapper } from "./style";
import { IStudentBalanceTransactionsList } from "types/finance/studentBalance";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { CircleDollarSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { AntdTable } from "components";
import { Columns } from "./columns";
import LeadLifeCycleModal from "globals/components/leadLifeCycle";

interface IProps {
  data?: IStudentBalanceTransactionsList;
  isLoading?: boolean;
}

const BalanceIn: FC<IProps> = (props) => {
  const { data, isLoading } = props;

  return (
    <Wrapper>
      <AmountWrapper>
        <p className="amount">
          {toCurrencyFormat(Number(data?.total_balance))}
        </p>
        <CircleDollarSvg color={bgColors.midori} />
      </AmountWrapper>
      <AntdTable
        columns={Columns()}
        dataSource={data?.list}
        loading={isLoading}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
      />
      <LeadLifeCycleModal />
    </Wrapper>
  );
};

export default BalanceIn;
