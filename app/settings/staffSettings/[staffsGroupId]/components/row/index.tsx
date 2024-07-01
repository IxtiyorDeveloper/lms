import {
  CellImageWrapper,
  CellNameWrapper,
  HeaderCell,
  StaffStatusIcon,
} from "../../style";
import {
  BadgeStarSvg,
  BanUserSvg,
  CircleImage,
  PhoneCell,
  RedBadgeTitle,
  TableHeading,
} from "components";
import React, { useMemo } from "react";
import moment from "moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MMM_YYYY,
  DATE_FORMAT_SHOW_MMM_YYYY,
  DATE_FORMAT_YYYY_MM_DD,
} from "constants/dates";
import { getRowNumber } from "utils/getRowNumber";
import { toast } from "react-toastify";
import { IAssignment } from "types";
import { Tooltip } from "antd";
import StaffActions from "../staffActions";
import { bgColors } from "styles/theme";
import { StatusTypeStaff } from "constants/settings";
import { getYearDifference } from "../../../../../../utils/getYearDiff";
import { IUserPhone } from "../../../../../../types/userPhone";
import { ITypeStaffWorkingStatus } from "types/staffSettings";

interface IProps {
  status: ITypeStaffWorkingStatus;
}

export const COLUMNS = ({ status }: IProps) => {
  const icons = {
    [StatusTypeStaff.STATUS_REGISTERING]: (
      <div className="new">
        <p>New</p>
        <BadgeStarSvg width={24} height={24} />,
      </div>
    ),
    [StatusTypeStaff.STATUS_STOPPING]: (
      <div className="rejected">
        <BanUserSvg width={16} height={16} color={bgColors.white} />
      </div>
    ),
    [StatusTypeStaff.STATUS_WORKING]: "",
  };

  return useMemo(
    () =>
      [
        {
          hide: false,
          title: (
            <HeaderCell
              style={{
                textAlign: "left",
                padding: "20px 0 20px 24px",
              }}
            >
              <span>Image</span>
              <span style={{ marginLeft: "80px" }}>Full name</span>
            </HeaderCell>
          ),
          dataIndex: ["user", "userProfile"],
          render: (value: any, record: any, index: number) => {
            const id = getRowNumber({ index });
            const archivedDate = record?.lastStaffFlow?.end_date;

            const { years, months } = getYearDifference({
              dateTimeString: record?.staff?.hired_date,
              archivedDate: archivedDate,
            });

            return (
              <CellImageWrapper onClick={(e) => e.stopPropagation()}>
                <div className="imageWrapper">
                  <div className="index">{id}</div>
                  <StaffStatusIcon>
                    <div className="icon">
                      {icons[record.staff.status as keyof typeof icons]}
                    </div>
                    <CircleImage
                      abs={
                        years > 0 ? (
                          <div className="absn">
                            <BadgeStarSvg />
                            <p className="num">{years}</p>
                          </div>
                        ) : record?.isHiredDateThisMonth ? (
                          <div className="absn">
                            <BadgeStarSvg />
                            <p className="num_new">New</p>
                          </div>
                        ) : null
                      }
                      onClick={(e) => e.stopPropagation()}
                      src={{
                        children: value?.avatar?.children,
                        full_url: value?.avatar?.full_url,
                      }}
                      width={50}
                      height={50}
                    />
                  </StaffStatusIcon>
                </div>
                <div className="name">
                  {value
                    ? `${value?.firstname} ${value?.lastname}`
                    : record?.user?.username}{" "}
                  ({record?.user?.age})
                </div>
              </CellImageWrapper>
            );
          },
        },
        {
          hide: false,
          title: (
            <TableHeading style={{ minWidth: "80px", width: "90px" }}>
              Phone
            </TableHeading>
          ),
          dataIndex: ["user", "userPhones"],
          render: (value: IUserPhone[], record: any, index: number) => {
            return <PhoneCell value={value} />;
          },
        },
        {
          hide: false,
          dataIndex: ["user", "username"],
          title: (
            <HeaderCell
              style={{
                width: "125px",
                textAlign: "left",
              }}
            >
              Username
            </HeaderCell>
          ),
          render: (value: any) => {
            return (
              <CellNameWrapper
                style={{
                  width: "100px",
                  textAlign: "left",
                }}
                onClick={() =>
                  navigator.clipboard
                    .writeText(value)
                    .then(() => {
                      toast.info("Copied to clipboard");
                    })
                    .catch((err) => {
                      toast.error(err.message);
                    })
                }
              >
                <span className="name">{value}</span>
              </CellNameWrapper>
            );
          },
        },
        {
          hide: false,
          dataIndex: "rbacRoleShift",
          title: (
            <HeaderCell
              style={{
                width: "100px",
                textAlign: "left",
              }}
            >
              Shift
            </HeaderCell>
          ),
          render: (value: any) => {
            return (
              <CellNameWrapper
                style={{
                  width: "100px",
                  textAlign: "left",
                }}
              >
                <span className="name">{value?.name || "-"}</span>
              </CellNameWrapper>
            );
          },
        },
        {
          hide: false,
          dataIndex: "rbacRoleShift1",
          title: (
            <HeaderCell
              style={{
                width: "100px",
                textAlign: "left",
              }}
            >
              Branches
            </HeaderCell>
          ),
          render: (value: any, record: any) => {
            const rbacBranches =
              (record?.rbacAssignmentBranches as IAssignment["rbacAssignmentBranches"]) ||
              [];
            return (
              <CellNameWrapper>
                <Tooltip
                  destroyTooltipOnHide
                  title={
                    <div>
                      {rbacBranches.map((item) => {
                        return (
                          <div className="name">{`${item.branch?.name} `}</div>
                        );
                      })}
                    </div>
                  }
                >
                  <div style={{ display: "flex", gap: "8px" }}>
                    {rbacBranches.slice(0, 2).map((item, index) => {
                      return (
                        <span className="name">{`${item.branch?.name} ${
                          index === 1 && rbacBranches.length > 2 ? "..." : ""
                        }`}</span>
                      );
                    })}
                    <RedBadgeTitle count={rbacBranches.length || 0} />
                  </div>
                </Tooltip>
              </CellNameWrapper>
            );
          },
        },
        {
          hide: false,
          dataIndex: ["user", "created_at"],
          title: (
            <HeaderCell
              style={{
                width: "100px",
                textAlign: "left",
              }}
            >
              Create date
            </HeaderCell>
          ),
          render: (value: any) => {
            return (
              <CellNameWrapper
                style={{
                  width: "100px",
                  textAlign: "left",
                }}
              >
                <span className="name">
                  {moment(value, DATE_FORMAT_CREATED_AT).format(
                    DATE_FORMAT_DD_MMM_YYYY
                  )}
                </span>
              </CellNameWrapper>
            );
          },
        },
        {
          hide: false,
          dataIndex: ["staff", "hired_date"],
          title: (
            <HeaderCell
              style={{
                width: "100px",
                textAlign: "left",
              }}
            >
              Hired date
            </HeaderCell>
          ),
          render: (value: any) => {
            return (
              <CellNameWrapper
                style={{
                  width: "100px",
                  textAlign: "left",
                }}
              >
                <span className="name">
                  {value
                    ? moment(value, DATE_FORMAT_CREATED_AT).format(
                        DATE_FORMAT_DD_MMM_YYYY
                      )
                    : "-"}
                </span>
              </CellNameWrapper>
            );
          },
        },
        {
          hide: false,
          dataIndex: "staff",
          title: (
            <HeaderCell
              style={{
                width: "100px",
                textAlign: "left",
              }}
            >
              Experience
            </HeaderCell>
          ),
          render: (value: any, record: any) => {
            const archivedDate = record?.lastStaffFlow?.end_date;
            const months = (
              !!archivedDate
                ? moment(archivedDate, DATE_FORMAT_YYYY_MM_DD)
                : moment()
            ).diff(moment(value?.hired_date, DATE_FORMAT_CREATED_AT), "month");
            return (
              <CellNameWrapper
                style={{
                  width: "100px",
                  textAlign: "left",
                }}
              >
                <span className="name">
                  {value
                    ? !isNaN(months)
                      ? `${Math.floor(months / 12)} year ${months % 12} month`
                      : "-"
                    : "-"}
                </span>
              </CellNameWrapper>
            );
          },
        },
        {
          hide: status !== ITypeStaffWorkingStatus.ARCHIVED,
          key: "archived_date",
          dataIndex: ["lastStaffFlow", "end_date"],
          title: (
            <HeaderCell
              style={{
                width: "100px",
                textAlign: "left",
              }}
            >
              Archived date
            </HeaderCell>
          ),
          render: (value: any, record: any) => {
            return (
              <CellNameWrapper
                style={{
                  width: "100px",
                  textAlign: "left",
                }}
              >
                <span className="name">
                  {value
                    ? moment(value, DATE_FORMAT_CREATED_AT).format(
                        DATE_FORMAT_SHOW_MMM_YYYY
                      )
                    : "-"}
                </span>
              </CellNameWrapper>
            );
          },
        },
        {
          hide: false,
          title: () => (
            <HeaderCell style={{ minWidth: "200px" }}>Action</HeaderCell>
          ),
          dataIndex: "action",
          render: (value: any, record: any) => {
            return (
              <div>
                <StaffActions
                  status={status}
                  data={record}
                  activeActions={record.actionPermissions}
                />
              </div>
            );
          },
        },
      ].filter((item) => !item.hide),
    [status]
  );
};
