import React, { useMemo } from "react";
import { CellNameWrapper, HeadCell } from "./style";
import { getRowNumber } from "utils/getRowNumber";
import { AntdUserProfile, PhoneCell } from "components";
import { IRegisteringRbacRole, IRegisteringStaff } from "types/staffSettings";
import moment from "moment";
import { StaffAction } from "../../index";

const Columns = () => {
  return useMemo(() => {
    return [
      {
        title: (
          <HeadCell
            style={{
              width: "250px",
              paddingTop: "15px",
              paddingLeft: "20px",
              paddingBottom: "15px",
            }}>
            Name
          </HeadCell>
        ),
        dataIndex: "created_at",
        render: (value: any, record: any, index: number) => {
          const id = getRowNumber({ index });
          return (
            <CellNameWrapper
              style={{
                width: "180px",
              }}>
              <AntdUserProfile
                disabled
                index={id - 1}
                isAge
                props={record}
                isStudent={false}
              />
            </CellNameWrapper>
          );
        },
        width: "28%",
      },
      {
        title: <HeadCell style={{ width: "120px" }}>Phone number</HeadCell>,
        dataIndex: ["user", "userPhones"],
        render: (value: any) => {
          return <PhoneCell value={value} />;
        },
        width: "18%",
      },
      {
        title: <HeadCell>Vacancy</HeadCell>,
        dataIndex: ["rbacRole"],
        render: (value: IRegisteringRbacRole) => {
          return (
            <CellNameWrapper>
              <span className="name">{value.name}</span>
            </CellNameWrapper>
          );
        },
        width: "14%",
      },
      {
        title: <HeadCell>Created by</HeadCell>,
        dataIndex: ["staff", "createdBy", "username"],
        render: (value: string | null) => {
          return (
            <CellNameWrapper>
              <span className="name">{value ? value : "-"}</span>
            </CellNameWrapper>
          );
        },
        width: "14%",
      },
      {
        title: <HeadCell>Created date</HeadCell>,
        dataIndex: ["staff"],
        render: (value: IRegisteringStaff) => {
          return (
            <CellNameWrapper>
              <span className="name">
                {moment(value.datetime).format("DD.MMM YYYY")}
              </span>
            </CellNameWrapper>
          );
        },
        width: "14%",
      },
      {
        title: <HeadCell>Action</HeadCell>,
        dataIndex: ["user", "username"],
        render: (value: any, record: any) => {
          return (
            <CellNameWrapper>
              <StaffAction
                data={record}
                activeActions={{
                  share_file: true,
                  call: true,
                  mail: true,
                  create_staff: true,
                }}
              />
            </CellNameWrapper>
          );
        },
        width: "12%",
      },
    ];
  }, []);
};

export default Columns;
