import React, { FC } from "react";
import { AntdTable, Button, PlusSvg, RedBadgeTitle } from "components";
import { Columns } from "./columns";
import { IFetchList } from "types";
import { ITransactionIncome } from "types/finance/transactionIncome";
import { PaddingWrapper, Wrapper } from "../productAndService/style";
import { usePageDataMemo } from "hooks";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { queryKeys } from "constants/queryKeys";

const EducationTable: FC<{
  data: IFetchList<ITransactionIncome> | undefined;
  isLoading: boolean;
}> = ({ data, isLoading }) => {
  const dispatch = useDispatch();

  const handleToggleModalV2 = () => {
    dispatch(
      toggleModal({
        key: "paymentV2",
        data: {
          data: {
            queryKeys: [
              queryKeys.admin_finance_income_index,
              queryKeys.admin_finance_statistic,
            ],
          },
          open: true,
        },
      })
    );
  };

  const selects = usePageDataMemo();

  return (
    <Wrapper divideRowNumbers={[]}>
      <PaddingWrapper>
        <div className="badge">
          <RedBadgeTitle
            title="Education transactions"
            count={data?.meta?.totalCount}
          />
        </div>
        <Button onClick={handleToggleModalV2}>
          <PlusSvg />
          &nbsp; Payment
        </Button>
      </PaddingWrapper>
      <AntdTable
        columns={Columns({ selects })}
        dataSource={data?.list ?? []}
        loading={isLoading || selects.args.isLoading}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
      />
    </Wrapper>
  );
};

export default EducationTable;
