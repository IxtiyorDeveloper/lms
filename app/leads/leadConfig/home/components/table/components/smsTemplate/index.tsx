import React, { FC, useState } from "react";
import { ActionModal, AntdTable, DeleteSvg } from "components";
import { Spin } from "antd";
import { ICompany, IFetchList } from "types";
import { Wrapper } from "./style";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useDeleteLeadConfig } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import Columns from "./columns";
import { validationErrorHandler } from "utils";

interface IProps {
  isLoading: boolean;
  data?: IFetchList<ICompany[]>;
}

const SmsTemplate: FC<IProps> = ({ isLoading, data }) => {
  const { control, handleSubmit, reset } = useForm();
  const [deleteAction, setDeleteAction] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  const queryClient = useQueryClient();
  const deleteMutation = useDeleteLeadConfig({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.lead_config_sms_template]);
      handleClose();
      reset();
      toast.success("Template deleted!");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const handleClose = () => {
    setDeleteAction({
      isOpen: false,
      id: null,
    });
  };
  const onDeleteSubmit = () => {
    deleteMutation.mutate({
      id: deleteAction.id,
    });
  };

  return (
    <Wrapper>
      <Spin spinning={isLoading}>
        <div style={{ padding: "10px" }}>
          <AntdTable
            columns={Columns({ data, setDeleteAction })}
            dataSource={data?.list || []}
            pagination={{
              current: data?.meta?.currentPage,
              total: data?.meta?.totalCount,
            }}
          />
        </div>
      </Spin>
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

export default SmsTemplate;
