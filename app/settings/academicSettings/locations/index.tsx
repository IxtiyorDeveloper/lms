import React, { FC, useRef, useState } from "react";
import { ActionModal, AntdTable, DeleteSvg } from "components";
import { useTableExpand } from "hooks";
import { ExpandWrapper } from "./style";
import { useAllRegions, useDeleteBranch, useDeleteRegion } from "hooks";
import { useRouter } from "next/router";
import { IRegion } from "types";
import Index from "./components/branch";
import { cols } from "./components/row";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import CreateBranchModal, { IOpen } from "./components/branchModal";
import { Empty } from "antd";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

interface IProps {
  handleOpenRegionEditModal: (id: number) => void;
}

const Locations: FC<IProps> = ({ handleOpenRegionEditModal }) => {
  const router = useRouter();
  const ref = useRef<{ open: (data: IOpen) => void; close: () => void }>();
  const [open, setOpen] = useState<{ isOpen: boolean; data: any }>({
    isOpen: false,
    data: null,
  });
  const [branchOpen, setBranchOpen] = useState<{ isOpen: boolean; data: any }>({
    isOpen: false,
    data: null,
  });
  const { isLoading, data } = useAllRegions(router.query);
  const { handleSubmit, control } = useForm();
  const { handleSubmit: branchHandleSubmit, control: branchControl } =
    useForm();
  const queryClient = useQueryClient();

  const { onRowClick, expandedRowKeys } = useTableExpand();

  const handleOpen = (id: number) => {
    setOpen({
      isOpen: true,
      data: id,
    });
  };
  const handleClose = () => {
    setOpen({
      isOpen: false,
      data: null,
    });
  };

  const branchHandleOpen = (id: string) => {
    setBranchOpen({
      isOpen: true,
      data: id,
    });
  };
  const branchHandleClose = () => {
    setBranchOpen({
      isOpen: false,
      data: null,
    });
  };

  const deleteRegion = useDeleteRegion({
    onSuccess: () => {
      toast.success("Region deleted");
      queryClient.invalidateQueries({ queryKey: [queryKeys.regions_list] });
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onDeleteSubmit = () => {
    deleteRegion.mutate({
      query_params: {
        id: open.data,
      },
    });
  };
  const deleteBranch = useDeleteBranch({
    onSuccess: () => {
      toast.success("Branch deleted");
      queryClient.invalidateQueries({ queryKey: [queryKeys.regions_list] });
      branchHandleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onDeleteBranchSubmit = () => {
    deleteBranch.mutate({
      query_params: {
        id: branchOpen.data,
      },
    });
  };
  const onClickSaveBranch = (data: IOpen) => {
    ref.current?.open(data);
  };

  const renderRowSubComponent = React.useCallback(
    ({ row: { original } }: { row: { original: IRegion } }) => (
      <ExpandWrapper>
        {original.branches?.length! <= 0 ? (
          <Empty />
        ) : (
          original.branches?.map((e) => {
            return (
              <Index
                style={{
                  cursor: "pointer",
                  width: original.branches?.length == 1 ? "50%" : "100%",
                }}
                branchHandleOpen={branchHandleOpen}
                e={e}
                original={original}
                onClickSaveBranch={onClickSaveBranch}
              />
            );
          })
        )}
      </ExpandWrapper>
    ),
    []
  );

  return (
    <div>
      <AntdTable
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onRowClick({ id: record?.id });
            }, // click row
          };
        }}
        expandable={{
          expandedRowRender: (record: any) =>
            renderRowSubComponent({ row: { original: record } }),
          expandedRowKeys,
          expandIcon: () => null,
        }}
        columns={cols({
          handleOpen,
          handleOpenRegionEditModal,
          onClickSaveBranch,
        })}
        dataSource={data ? data.list : []}
        loading={isLoading}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
      />
      <ActionModal
        handleSubmit={handleSubmit}
        handleClose={() => handleClose()}
        open={open.isOpen}
        onSubmit={onDeleteSubmit}
        blurColor={bgColors.pop}
        label="Reason *"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
        icon={<DeleteSvg width={50} height={50} />}
        text={
          <div>
            <p>Are you sure ?</p>
            <p>This property will be deleted for everyone</p>
          </div>
        }
        control={control}
        buttonLoading={deleteRegion.isLoading}
      />
      <CreateBranchModal ref={ref} />
      <ActionModal
        handleSubmit={branchHandleSubmit}
        handleClose={() => branchHandleClose()}
        open={branchOpen.isOpen}
        onSubmit={onDeleteBranchSubmit}
        blurColor={bgColors.pop}
        label="Reason *"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
        icon={<DeleteSvg width={50} height={50} />}
        text={
          <div>
            <p>Are you sure ?</p>
            <p>This property will be deleted for everyone</p>
          </div>
        }
        control={branchControl}
        buttonLoading={deleteBranch.isLoading}
      />
    </div>
  );
};

export default Locations;
