import React from "react";
import { Button } from "components";
import { ButtonWrapper, Wrapper } from "./style";
import TableComponent from "./table";
import { RequestConfirmModal } from "./requestConfirmModal";
import CreateStaffModal from "./createStaffModal";
import CandidateCreateModal from "./candidateCreateModal";
import DocumentCreateModal from "./documentCreateModal";
import {
  IStaffInitialData,
  ITypeStaffWorkingStatus,
} from "types/staffSettings";
import FilterComponent from "../filter";
import Link from "next/link";

const RegisteringChild = ({
  initialData,
  loading,
}: {
  initialData: IStaffInitialData | undefined;
  loading: boolean;
}) => {
  return (
    <Wrapper>
      <FilterComponent
        initialData={initialData}
        loading={loading}
        tab={ITypeStaffWorkingStatus.REGISTERING}
      />
      <TableComponent />
      <RequestConfirmModal />
      <CreateStaffModal />
      <CandidateCreateModal />
      <DocumentCreateModal />
    </Wrapper>
  );
};

export default RegisteringChild;
