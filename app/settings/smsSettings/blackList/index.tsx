import React, { useState } from "react";
import { ActionModal, AntdTable, DeleteSvg } from "components";
import Router, { useRouter } from "next/router";
import { useExclusions, useDeleteExclusion } from "hooks";
import { Spin } from "antd";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Columns from "./columns";
import { Wrapper } from "./style";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const ManualTemplates = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoading, data } = useExclusions();
  const { handleSubmit: handleDeleteSubmit, control: deleteControl } =
    useForm();
  const [modals, setModals] = useState<any>({
    deleteAction: {
      isOpen: false,
      data: null,
    },
  });

  const deleteMutation = useDeleteExclusion({
    onSuccess: () => {
      toast.success("Deleted");
      queryClient.invalidateQueries({ queryKey: [queryKeys.sms_exclusion] });
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const handleClose = () => {
    setModals({
      ...modals,
      deleteAction: {
        isOpen: false,
        id: null,
      },
    });
  };
  const onDeleteSubmit = () => {
    deleteMutation.mutate({
      query_params: {
        // id: modals.deleteAction.data?.id,
        project: modals.deleteAction.data?.project,
        user_id: modals.deleteAction.data?.user_id,
        type: modals.deleteAction.data?.type,
      },
    });
  };

  const handleOpenModal = (id?: number) => {
    router.replace({
      pathname: Router.pathname,
      query: { ...router.query, user_id: id, smsBlackList: "true" },
    });
  };

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <div className="title">Black list</div>
        <AntdTable
          columns={Columns(handleOpenModal, setModals, modals, data)}
          loading={isLoading}
          dataSource={data}
        />
        <ActionModal
          handleSubmit={handleDeleteSubmit}
          handleClose={() => handleClose()}
          open={modals.deleteAction.isOpen}
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
          buttonLoading={deleteMutation?.isLoading}
        />
      </Wrapper>
    </Spin>
  );
};

export default ManualTemplates;
