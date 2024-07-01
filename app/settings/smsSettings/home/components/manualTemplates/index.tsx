import React, { useMemo, useState } from "react";
import { ActionModal, AntdTable, Button, DeleteSvg, PlusSvg } from "components";
import { useRouter } from "next/router";
import { useDeleteSmsTemplate, useSmsTemplates } from "hooks";
import { Spin } from "antd";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { CheckPermission } from "utils/guard";
import Columns from "./columns";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export enum smsSettingsModalType {
  Company = 500,
  System = 8400,
}

export enum smsType {
  Static = 200,
  Dynamic = 100,
}

const ManualTemplates = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isLoading, data } = useSmsTemplates({
    query_params: {
      page: router.query?.page,
      pageSize: router.query?.pageSize,
      project: router.query?.tabKey || "LMS",
      model_type: [smsSettingsModalType.Company, smsSettingsModalType.System],
    },
  });

  const { handleSubmit: handleDeleteSubmit, control: deleteControl } =
    useForm();
  const [modals, setModals] = useState<any>({
    deleteAction: {
      isOpen: false,
      id: null,
    },
  });

  const deleteMutation = useDeleteSmsTemplate({
    onSuccess: () => {
      toast.success("Template deleted");
      queryClient.invalidateQueries({ queryKey: [queryKeys.sms_template] });
      handleClose("");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const handleClose = (text: string) => {
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
      id: modals.deleteAction.id,
    });
  };

  const rows: any = useMemo(() => {
    return data?.list?.map((e) => {
      return {
        title: e.name,
        text: e.text,
        id: e.id,
        type: e.type,
      };
    });
  }, [data]);

  const handleOpenModal = (id?: number) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        createTemplateModal: "true",
        ...(id ? { createTemplateModalId: id } : {}),
      },
    });
  };

  return (
    <Spin spinning={isLoading}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_manage_sms_settings]}
        >
          <Button
            onClick={handleOpenModal}
            style={{ margin: "10px 0", padding: "5px 12px" }}
          >
            <PlusSvg />
            &nbsp;Template
          </Button>
        </CheckPermission>
      </div>
      <AntdTable
        columns={Columns({ handleOpenModal, setModals, modals })}
        dataSource={rows || []}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
      />
      <ActionModal
        handleSubmit={handleDeleteSubmit}
        handleClose={() => handleClose("deleteAction")}
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
    </Spin>
  );
};

export default ManualTemplates;
