import React, { FC, useState } from "react";
import { ActionModal, AntdTable, RedBadgeTitle, TransferSvg } from "components";
import { Columns } from "./columns";
import { IFetchList, IShop } from "types";
import { PaddingWrapper, Wrapper } from "../productAndService/style";
import { usePageDataMemo, useShopGive } from "hooks";
import { useRouter } from "next/router";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";

const OrdersTable: FC<{
  data: IFetchList<IShop> | undefined;
  isLoading: boolean;
}> = ({ data, isLoading }) => {
  const queryClient = useQueryClient();
  const selects = usePageDataMemo();
  const router = useRouter();
  const [open, setOpen] = useState<{ open: boolean; id: number | null }>({
    open: false,
    id: null,
  });

  const { handleSubmit, control } = useForm();

  const transfer = useShopGive({
    onSuccess: () => {
      handleClose();
      toast.success("Order given!");
      queryClient.invalidateQueries([queryKeys.admin_order_index]);
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleClose = () => {
    setOpen({
      open: false,
      id: null,
    });
  };

  const onSubmit = () => {
    transfer.mutate({
      query_params: {
        id: open.id,
      },
    });
  };

  return (
    <Wrapper divideRowNumbers={[]}>
      <PaddingWrapper>
        <div className="badge">
          <RedBadgeTitle
            title={
              router.query.status == "300"
                ? "Given orders"
                : router.query.status == "200"
                  ? "Cancelled orders"
                  : "New orders"
            }
            count={data?.meta?.totalCount}
          />
        </div>
      </PaddingWrapper>
      <AntdTable
        columns={Columns({ setOpen })}
        dataSource={data?.list ?? []}
        loading={isLoading || selects.args.isLoading}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
      />
      <ActionModal
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        open={open.open}
        onSubmit={onSubmit}
        blurColor={bgColors.deep}
        label="Reason *"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px ##6084FF"
        icon={<TransferSvg width={50} height={50} color={bgColors.deep} />}
        text={
          <div>
            <p>Are you sure to give this product?</p>
          </div>
        }
        control={control}
        cancelButtonText="No"
        submitButtonText="Yes"
        buttonStyles={{ background: bgColors.primary, color: textColors.black }}
        buttonLoading={transfer?.isLoading}
      />
    </Wrapper>
  );
};

export default OrdersTable;
