import React, { FC, useState } from "react";
import { Wrapper } from "./style";
import { ActionModal, AntdTable, DeleteSvg } from "components";
import AntdBadge from "components/common/antdBadge";
import { columns } from "./columns";
import { useAdminActionDelete, useStockProductActions } from "hooks";
import { useRouter } from "next/router";
import { IStockPage, IStockProduct } from "types";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";

interface IProps {
  pageData?: IStockPage;
  product?: IStockProduct;
}
const Table: FC<IProps> = ({ pageData, product }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState({ open: false, id: null });
  const { data, isLoading } = useStockProductActions({
    query_params: {
      ...router.query,
      product_id: router.query.productId,
      expand: "createdBy,variation.options,buttonActions",
      "per-page": router.query.pageSize,
      pageSize: undefined,
      statistics_location_id: undefined,
      statistics_year: undefined,
      statistics_month: undefined,
    },
  });

  const deleteTransaction = useAdminActionDelete({
    onSuccess: () => {
      toast.success("Deleted!");
      queryClient.invalidateQueries([queryKeys.admin_product_view]);
      queryClient.invalidateQueries([queryKeys.admin_product_actions]);
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleClose = () => {
    setOpen({ open: false, id: null });
  };

  const onSubmit = () => {
    deleteTransaction.mutate({ query_params: { id: open.id } });
  };

  return (
    <Wrapper>
      <div className="header">
        Transactions
        <AntdBadge content={data?.meta?.totalCount} />
      </div>
      <AntdTable
        style={{ marginTop: "2px" }}
        columns={columns({ data: pageData, product, setOpen })}
        dataSource={data?.list}
        loading={isLoading}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
      />
      <ActionModal
        control={control}
        handleSubmit={handleSubmit}
        handleClose={() => handleClose()}
        open={open.open}
        onSubmit={onSubmit}
        blurColor={bgColors.pop}
        label="Reason *"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
        icon={<DeleteSvg width={50} height={50} />}
        buttonLoading={deleteTransaction.isLoading}
        text={
          <div>
            <p>Are you sure?</p>
            <p>This property will be deleted for everyone</p>
          </div>
        }
        errors={errors}
      />
    </Wrapper>
  );
};

export default Table;
