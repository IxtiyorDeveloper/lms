import React, { FC } from "react";
import { Button, PlusSvg, RedBadgeTitle, AntdTable } from "components";
import { Columns } from "./columns";
import { IFetchList } from "types";
import { ITransactionIncome } from "types/finance/transactionIncome";
import { PaddingWrapper, Wrapper } from "./style";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import ProductCheck from "globals/components/productCheckModal";
import { queryKeys } from "constants/queryKeys";
import { useAdminProducts } from "hooks";
import { Spin } from "antd";

const ProductAndServiceTable: FC<{
  data: IFetchList<ITransactionIncome> | undefined;
  isLoading: boolean;
}> = ({ data, isLoading }) => {
  const dispatch = useDispatch();
  const handleToggleModal = () => {
    dispatch(
      toggleModal({
        key: "createTransaction",
        data: {
          data: {
            action: "create",
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

  const handleToggleModal1 = () => {
    dispatch(
      toggleModal({
        key: "newTransaction",
        data: {
          data: {
            action: "create",
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
  const { data: products, isLoading: isAdminLoading } = useAdminProducts({
    query_params: {
      expand: "createdBy,variation.options,count,price,coverFile.resolutions",
    },
  });

  return (
    <Wrapper divideRowNumbers={[]}>
      <PaddingWrapper>
        <div className="badge">
          <RedBadgeTitle
            title="Product and Service"
            count={data?.meta?.totalCount}
          />
        </div>
        <Button onClick={handleToggleModal1}>
          <PlusSvg />
          &nbsp; Transaction
        </Button>
      </PaddingWrapper>
      <ProductCheck />
      <Spin spinning={isAdminLoading}>
        <div className="table-wrapper">
          <AntdTable
            columns={Columns({ products })}
            dataSource={data?.list ?? []}
            loading={isLoading}
            pagination={{
              current: data?.meta?.currentPage,
              total: data?.meta?.totalCount,
            }}
          />
        </div>
      </Spin>
    </Wrapper>
  );
};

export default ProductAndServiceTable;
