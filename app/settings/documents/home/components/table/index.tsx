import React, { FC, useState } from "react";
import { ActionModal, AntdTable, DeleteSvg } from "components";
import { useDeleteCompanyFile } from "hooks";
import Columns from "./columns";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { ICompanyFile, IFetchList } from "types";
import { toast } from "react-toastify";
import { queryKeys } from "constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { validationErrorHandler } from "utils";

interface IProps {
  data?: IFetchList<ICompanyFile>;
  isLoading: boolean;
}
const TableC: FC<IProps> = ({ data, isLoading }) => {
  const { control: deleteControl, handleSubmit: handleDeleteSubmit } =
    useForm();
  const [modals, setModals] = useState<{ [key: string]: any }>({
    isOpen: false,
    data: null,
  });
  const queryClient = useQueryClient();
  const deleteFile = useDeleteCompanyFile({
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries([queryKeys.company_files]);
      queryClient.invalidateQueries([queryKeys.admin_company_file_category]);
      toast.success("Success");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onDeleteSubmit = () => {
    deleteFile.mutate({
      query_params: {
        id: modals.data.id,
      },
    });
  };

  const handleClose = () => {
    setModals({
      isOpen: false,
      data: null,
    });
  };
  const handleOpen = (data: ICompanyFile) => {
    setModals({
      isOpen: true,
      data,
    });
  };
  return (
    <div>
      <AntdTable
        columns={Columns({ handleOpen })}
        dataSource={data?.list || []}
        loading={isLoading}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
          pageSize: 100,
        }}
        rowKey="id"
      />
      <ActionModal
        handleSubmit={handleDeleteSubmit}
        handleClose={() => handleClose()}
        open={modals.isOpen}
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
        control={deleteControl}
        buttonLoading={deleteFile?.isLoading}
      />
    </div>
  );
};

export default TableC;
