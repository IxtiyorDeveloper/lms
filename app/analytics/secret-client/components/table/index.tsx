import React, { useState } from "react";
import { ActionModal, AntdTable } from "components";
import { Wrapper } from "./style";
import { useAdminV1SecretClientCycleDelete, useTableExpand } from "hooks";
import { columns } from "./columns";
import { IFetchList, ISecretClient } from "types";
import ChildTable from "./childTable";
import { bgColors } from "styles/theme";
import { DeleteSvg } from "components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { useRouter } from "next/router";

interface IProps {
  data?: IFetchList<ISecretClient>;
  isFetching: boolean;
}

const PageTable = ({ data, isFetching }: IProps) => {
  const router = useRouter();
  const { onRowClick, expandedRowKeys } = useTableExpand({
    expandKey: "id",
  });
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm();

  const [deleteAction, setDeleteAction] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  const deleteMutation = useAdminV1SecretClientCycleDelete({
    onError: (err) => {
      validationErrorHandler({ err });
    },
    onSuccess: () => {
      toast.success("Success");
      reset({});
      handleClose();
      queryClient.invalidateQueries([
        queryKeys.admin_finance_salary_cover_page_data,
      ]);
    },
  });

  const renderRowSubComponent = React.useCallback(({ row: rowData }: any) => {
    return <ChildTable row={rowData} />;
  }, []);

  const handleClose = () => {
    setDeleteAction({ isOpen: false, id: null });
  };

  const onDeleteSubmit = () => {
    deleteMutation.mutate({
      query_params: {
        id: deleteAction.id,
      },
    });
  };

  return (
    <Wrapper>
      <AntdTable
        columns={columns({ expandedRowKeys, setDeleteAction, router })}
        dataSource={data?.list || []}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
        loading={isFetching}
        expandable={{
          expandedRowRender: (record: any) =>
            renderRowSubComponent({ row: { original: record } }),
          expandedRowKeys,
          expandIcon: () => null,
        }}
        onRow={(record) => {
          return {
            onClick: (event) => {
              onRowClick({ id: record?.id });
            }, // click row
          };
        }}
      />
      <ActionModal
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        open={deleteAction.isOpen}
        onSubmit={onDeleteSubmit}
        blurColor={bgColors.pop}
        label="Reason *"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
        icon={<DeleteSvg width={50} height={50} />}
        text={
          <div>
            <p>Are you sure?</p>
            <p>This property will be deleted for everyone</p>
          </div>
        }
        control={control}
        buttonLoading={deleteMutation?.isLoading}
      />
    </Wrapper>
  );
};

export default PageTable;
