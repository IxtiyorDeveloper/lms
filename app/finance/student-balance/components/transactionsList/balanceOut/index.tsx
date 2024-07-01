import React, { FC, useEffect } from "react";
import { AmountWrapper, Wrapper } from "./style";
import { IStudentBalanceTransactionsList } from "types/finance/studentBalance";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { CircleDollarSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { AntdTable, MySelect } from "components";
import { Columns } from "./columns";
import LeadLifeCycleModal from "globals/components/leadLifeCycle";
import { useForm } from "react-hook-form";
import { studentBalanceTypeOptions } from "../../../../../../constants/studentBalance";
import { useRouter } from "next/router";

interface IProps {
  data?: IStudentBalanceTransactionsList;
  isLoading?: boolean;
}

const BalanceOut: FC<IProps> = (props) => {
  const router = useRouter();
  const { data, isLoading } = props;

  const { control, watch } = useForm();

  useEffect(() => {
    router.replace(
      {
        query: {
          ...router.query,
          actions: watch("actions"),
        },
      },
      undefined,
      { scroll: false },
    );
  }, [watch("actions")]);

  return (
    <Wrapper>
      <div className="main-wrapper">
        <AmountWrapper>
          <p className="amount">
            {toCurrencyFormat(Number(data?.total_balance))}
          </p>
          <CircleDollarSvg color={bgColors.pepper} />
        </AmountWrapper>
        <div className="select">
          <MySelect
            name="actions"
            control={control}
            options={studentBalanceTypeOptions}
            mode="multiple"
            maxTagCount={1}
            placeholder="Select"
          />
        </div>
      </div>
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

export default BalanceOut;
