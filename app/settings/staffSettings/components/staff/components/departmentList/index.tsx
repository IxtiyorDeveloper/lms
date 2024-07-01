import React, { FC, useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, Spin } from "antd";
import {
  Badge,
  AntPanel,
  HeaderPanel,
  StaffWrapper,
  StaffWrap,
  Wrapper,
} from "./style";
import { bgColors, fontSizes } from "styles/theme";
import {
  ActionModal,
  ArrowDownSvg,
  DeleteSvg,
  EditSvg,
  CircleImage,
  PlusEx,
} from "components";
import { useRouter } from "next/router";
import { IDepartmentList } from "./type";
import { useDepartmentList, useDeleteRole } from "hooks";
import DepartmentView from "./departmentView";
import {
  DIRECTOR_DEGREE,
  HEAD_DEGREE,
  STAFF_DEGREE,
} from "constants/department";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { queryKeys } from "constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { validationErrorHandler } from "utils";
import { convertToArray } from "utils/array";
import Link from "next/link";

export const panelStyle = {
  marginBottom: 10,
  background: bgColors.white,
  boxShadow: "none!important",
  borderRadius: "8px",
  padding: "8px 4px",
  color: bgColors.blueGray,
  fontSize: fontSizes.f14,
  fontWeight: 600,
};

export type DepartmentModalsType = "deleteMethod";

const DepartmentsList: FC<IDepartmentList> = (props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { handleOpen, status } = props;

  const { control, handleSubmit } = useForm();

  const [modals, setModals] = useState({
    deleteMethod: {
      isOpen: false,
      id: 0,
    },
  });
  const { age, search, gender, created_by, start_date, end_date, branch_id } =
    router.query;

  const { isLoading, data } = useDepartmentList({
    query_params: {
      status,
      start_date,
      end_date,
      gender,
      search,
      branch_id,
      age: convertToArray(age),
      created_by: convertToArray(created_by),
      expand:
        "rbacRoles.shifts,rbacAssignmentCount,rbacRoles.rbacAssignmentCount,file",
    },
  });

  const deleteRole = useDeleteRole({
    onSuccess: () => {
      toast.success("Role deleted");
      queryClient
        .invalidateQueries({
          queryKey: [queryKeys.department_list],
        })
        .then();
      handleClose("deleteMethod");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onDeleteSubmit = () => {
    deleteRole.mutate({ id: modals.deleteMethod.id });
  };

  const handleClose = (type: DepartmentModalsType) => {
    switch (type) {
      case "deleteMethod":
        return setModals({
          ...modals,
          deleteMethod: {
            isOpen: false,
            id: 0,
          },
        });
    }
  };

  const handleOpenModal = (type: DepartmentModalsType, id?: number) => {
    switch (type) {
      case "deleteMethod":
        return setModals({
          ...modals,
          deleteMethod: {
            isOpen: true,
            id: id || 0,
          },
        });
    }
  };

  const updateQuery = (query: {
    [x: string]: string | string[] | undefined;
  }) => {
    router
      .replace(
        {
          pathname: "/settings/staff-settings",
          query: query,
        },
        undefined,
        { scroll: false },
      )
      .then();
  };

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <Collapse
          accordion
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: bgColors.transparent }}
          destroyInactivePanel
          defaultActiveKey={router.query.open_department?.toString()}
        >
          {data?.list?.map((dep) => {
            let main: any[] = [];
            let head: any[] = [];
            let staff: any[] = [];
            dep.rbacRoles?.map((d) => {
              switch (+d.degree) {
                case DIRECTOR_DEGREE:
                  return main.push(d);
                case HEAD_DEGREE:
                  return head.push(d);
                case STAFF_DEGREE:
                  return staff.push(d);
              }
            });
            const currentDepartment = router.query.open_department?.toString();
            const newDepartment = dep.id.toString();

            return (
              <AntPanel
                header={
                  <HeaderPanel
                    onClick={() => {
                      if (currentDepartment === newDepartment) {
                        const { open_department, ...rest } = router.query;
                        updateQuery(rest);
                      } else {
                        updateQuery({
                          ...router.query,
                          open_department: newDepartment,
                        });
                      }
                    }}
                  >
                    <div className="flex">
                      <CircleImage src={dep?.file} width={32} height={32} />
                      {dep.name} <Badge>{dep.rbacAssignmentCount}</Badge>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "25px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Link
                        href={`/settings/staff-settings/create-role/${dep.id}`}
                      >
                        <div className="p4">
                          <PlusEx />
                        </div>
                      </Link>

                      <EditSvg
                        onClick={() =>
                          handleOpen("departmentModal", dep.id, "update", dep)
                        }
                      />
                      <DeleteSvg
                        onClick={() => handleOpen("deleteModal", dep.id)}
                        height={21}
                        width={21}
                      />
                    </div>
                  </HeaderPanel>
                }
                key={dep.id}
                style={panelStyle}
              >
                <div
                  style={{
                    overflowX: "auto",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      margin: "0 auto",
                      minWidth: "1400px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <StaffWrap style={{ border: "none" }}>
                      {main.map((headStaff) => {
                        return (
                          <StaffWrapper>
                            <DepartmentView
                              status={status}
                              id={dep.id}
                              staff={headStaff}
                              handleOpenModal={handleOpenModal}
                            />
                            {(head.length > 1 ||
                              (head.length === 0 && staff.length > 0)) && (
                              <ArrowDownSvg />
                            )}
                          </StaffWrapper>
                        );
                      })}
                    </StaffWrap>
                  </div>

                  <div
                    style={{
                      margin: "0 auto",
                      minWidth: "1400px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <StaffWrap>
                      {head.map((headStaff) => {
                        return (
                          <StaffWrapper
                            style={{
                              paddingTop: 0,
                              border: main.length === 0 ? "none" : undefined,
                            }}
                          >
                            {main.length > 0 && head.length > 0 && (
                              <ArrowDownSvg />
                            )}
                            <DepartmentView
                              status={status}
                              id={dep.id}
                              staff={headStaff}
                              handleOpenModal={handleOpenModal}
                            />
                            {head.length <= 1 && <ArrowDownSvg />}
                          </StaffWrapper>
                        );
                      })}
                    </StaffWrap>
                  </div>
                  <div
                    style={{
                      margin: "0 auto",
                      minWidth: "1400px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <StaffWrap
                      style={{
                        border:
                          main.length === 0 && head.length === 0
                            ? "none"
                            : undefined,
                      }}
                    >
                      {staff.map((headStaff) => {
                        return (
                          <StaffWrapper style={{ paddingTop: "0" }}>
                            {!(main.length === 0 && head.length === 0) &&
                              staff.length > 1 && <ArrowDownSvg />}
                            <DepartmentView
                              status={status}
                              id={dep.id}
                              staff={headStaff}
                              handleOpenModal={handleOpenModal}
                            />
                          </StaffWrapper>
                        );
                      })}
                    </StaffWrap>
                  </div>
                </div>
              </AntPanel>
            );
          })}
        </Collapse>

        <ActionModal
          handleSubmit={handleSubmit}
          handleClose={() => handleClose("deleteMethod")}
          open={modals.deleteMethod.isOpen}
          onSubmit={onDeleteSubmit}
          blurColor={bgColors.pop}
          label="Reason *"
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1), inset 0px 4px 6px #F87C84"
          icon={<DeleteSvg width={50} height={50} />}
          text={
            <div>
              <p>Are you sure?</p>
              <p>This property will be deleted for everyone</p>
            </div>
          }
          control={control}
        />
      </Wrapper>
    </Spin>
  );
};

export default DepartmentsList;
