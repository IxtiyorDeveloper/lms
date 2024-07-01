import React, { FC } from "react";
import { Wrapper } from "./style";
import CreateModal from "./components/createDepartment";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import DepartmentsList from "./components/departmentList";
import DeleteModal from "./components/deleteModal";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteDepartment } from "hooks";
import { toast } from "react-toastify";
import { TModalType } from "types/modal";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { IStaffInitialData } from "types/staffSettings";
import FilterComponent from "../filter";

export type DepartmentModal = "departmentModal" | "deleteModal";

interface IProps {
  initialData: IStaffInitialData | undefined;
  loading: boolean;
  status: number;
  handleClose: (type: DepartmentModal) => void;
  handleOpen: (
    type: DepartmentModal,
    id?: number,
    modalType?: TModalType,
    data?: any,
  ) => void;
  modals: any;
  control: Control;
  handleSubmit: UseFormHandleSubmit<any>;
  errors: any;
}

const Staff: FC<IProps> = (props) => {
  const {
    initialData,
    loading,
    status,
    handleClose,
    handleOpen,
    modals,
    handleSubmit,
    control,
    errors,
  } = props;

  const queryClient = useQueryClient();

  const deleteDepartment = useDeleteDepartment({
    onSuccess: () => {
      toast.success("success");
      queryClient.invalidateQueries([queryKeys.department_list]).then();
      handleClose("deleteModal");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmit = () => {
    deleteDepartment.mutate({ id: modals.deleteModal?.id });
  };

  return (
    <Wrapper>
      <FilterComponent initialData={initialData} loading={loading} />
      <DepartmentsList status={status} handleOpen={handleOpen} />
      <CreateModal
        handleClose={() => handleClose("departmentModal")}
        open={modals.departmentModal.isOpen}
        data={modals.departmentModal}
      />
      <DeleteModal
        handleClose={() => handleClose("deleteModal")}
        open={modals.deleteModal.isOpen}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
      />
    </Wrapper>
  );
};

export default Staff;
