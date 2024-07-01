import React, { FC, useMemo, useState } from "react";
import { AntdTable, Segmented } from "components";
import { Auto, StaffGroupWrapper } from "./style";
import { useAssignmentList, useDeleteAssignment } from "hooks/useAssignment";
import { useRouter } from "next/router";
import { useGetOneRole } from "hooks/useRole";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { COLUMNS } from "./components/row";
import { useForm } from "react-hook-form";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import FilterComponent from "../components/filter";
import TitleSection from "./components/titleSection";
import { handleClose, onRowClick } from "./functions";
import ActionModalComponent from "./components/actionModal";
import {
  DismissModal,
  DocumentCreateModal,
  RepositionModal,
} from "./components";
import DocumentGenerate from "./components/modals/documentGenerate";
import { useInitialData } from "hooks";
import CreateStaffModal from "../components/registering/createStaffModal";
import moment from "moment/moment";
import { StatusTypeStaff } from "../../../../constants/settings";
import { ITypeStaffWorkingStatus } from "../../../../types/staffSettings";

const StaffGroup: FC<any> = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: initialData } = useInitialData();

  const [modals, setModals] = useState({
    deleteModal: {
      isOpen: false,
      id: 0,
    },
  });

  const { isLoading: isLoadingView, data: dataView } = useGetOneRole(
    router.query
  );
  const { isLoading, data, isPreviousData } = useAssignmentList({
    ...router.query,
    created_by:
      !!router.query?.created_by && Array.isArray(router.query?.created_by)
        ? router.query?.created_by.map((m) => Number(m))
        : router.query?.created_by !== undefined
          ? [Number(router.query?.created_by)]
          : null,
    status: router.query?.status,
    isLoading: isLoadingView,
    shift_id: router.query.shift_id || dataView?.shifts?.[0]?.id,
  });

  const deleteAssignment = useDeleteAssignment({
    onSuccess: () => {
      toast.success("success");
      queryClient.invalidateQueries([queryKeys.assignment_list]).then();
      handleClose(setModals);
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const menu = useMemo(() => {
    return (
      data?.shifts?.map((item) => {
        return {
          label: `${item.name} (${item.count ? item.count : 0})`,
          children: <></>,
          value: `${item.id ? item.id : ""}`,
        };
      }) || []
    );
  }, [dataView, data]);

  const onDeleteSubmit = () => {
    deleteAssignment.mutate({
      id: modals.deleteModal.id,
    });
  };

  const { control: deleteControl, handleSubmit: handleDeleteSubmit } =
    useForm();

  return (
    <StaffGroupWrapper>
      <FilterComponent
        tab={Number(router.query?.status) as ITypeStaffWorkingStatus}
        initialData={initialData}
        loading={isLoading}
      />
      <TitleSection dataView={dataView} />
      <Auto>
        {menu.length > 0 && (
          <Segmented
            options={menu}
            routerKey="shift_id"
            initValue={
              router.query?.shift_id?.toString() || dataView?.shifts[0]?.id
            }
          />
        )}
        <AntdTable
          columns={COLUMNS({
            status: Number(
              router.query?.status ?? ITypeStaffWorkingStatus.REGISTERING
            ),
          })}
          dataSource={data?.data?.list || []}
          loading={isLoading || isPreviousData}
          rowClassName={(record) => {
            const isNewStaff = moment(record?.staff?.hired_date).isSame(
              new Date(),
              "month"
            );
            const isStoppingStaff =
              record?.staff?.status === StatusTypeStaff.STATUS_STOPPING;

            return isNewStaff
              ? "newStaffRow"
              : isStoppingStaff
                ? "stoppingStaffRow"
                : "";
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                onRowClick(record, router as any);
              },
            };
          }}
          pagination={{
            current: data?.data?.meta?.currentPage,
            total: data?.data?.meta?.totalCount,
          }}
        />
        <ActionModalComponent
          modals={modals}
          setModals={setModals}
          handleDeleteSubmit={handleDeleteSubmit}
          deleteControl={deleteControl}
          handleClose={handleClose}
          onDeleteSubmit={onDeleteSubmit}
        />
      </Auto>
      <DismissModal />
      <RepositionModal />
      <DocumentCreateModal />
      <CreateStaffModal />
      <DocumentGenerate />
    </StaffGroupWrapper>
  );
};

export default StaffGroup;
