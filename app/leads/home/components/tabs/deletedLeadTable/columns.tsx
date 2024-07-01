import React, { useMemo } from "react";
import { CellNameWrapper, HeaderCell } from "./style";
import { getRowNumber } from "utils/getRowNumber";
import {
  LifeCycleLabel,
  MarkCell,
  NotAnswered,
  Paint,
  PhoneCell,
  Transfer,
} from "components";
import { Tooltip, tooltipClasses } from "@mui/material";
import moment from "moment/moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MM_HH_mm,
  DATE_FORMAT_DD_MMM_YY_HH_mm,
} from "constants/dates";
import theme from "styles/theme";
import { store, toggleLifecycleModal, toggleModal } from "store";
import { ILead, TLeadActions } from "types";
import { funcCheckPermission } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { Flex } from "antd";
import { useDispatch } from "react-redux";
import { LeadTabEnums } from "constants/leadTabs";
import { ACTION_R_CALL } from "constants/lifeCycle";

const Columns = ({
  onSubmitChangeColor,
  handleClickCallBack,
}: {
  onSubmitChangeColor: (id: number, color: string, index?: number) => void;
  handleClickCallBack: (
    id: number,
    action: number,
    date: Date,
    index?: number
  ) => void;
}) => {
  const dispatch = useDispatch();

  const isShowByPermission = funcCheckPermission([
    COMPONENTS_VIEWS.can_manage_lead,
  ]);

  return useMemo(() => {
    return [
      {
        title: (
          <HeaderCell
            style={{
              width: "100px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            Date
          </HeaderCell>
        ),
        dataIndex: "created_at",
        render: (value: any, record: any, index: number) => {
          const id = getRowNumber({ index });
          return (
            <CellNameWrapper
              style={{
                width: "180px",
              }}
            >
              <MarkCell color="transparent" />
              <span className="index">{id}</span>
              <Tooltip
                title={moment(value, DATE_FORMAT_CREATED_AT).format(
                  DATE_FORMAT_DD_MMM_YY_HH_mm
                )}
              >
                <span className="name" style={{ marginLeft: "20px" }}>
                  {moment(value, DATE_FORMAT_CREATED_AT).format(
                    DATE_FORMAT_DD_MMM_YY_HH_mm
                  )}
                </span>
              </Tooltip>
            </CellNameWrapper>
          );
        },
      },
      {
        title: (
          <HeaderCell
            style={{
              width: "180px",
            }}
          >
            Name
          </HeaderCell>
        ),
        dataIndex: "name",
        render: (value: any, record: any, index: number) => {
          const data = record;
          return (
            <CellNameWrapper
              style={{
                width: "180px",
              }}
            >
              <Tooltip title={data.name}>
                <div className="name">{data.name}</div>
              </Tooltip>
            </CellNameWrapper>
          );
        },
      },
      {
        title: <HeaderCell style={{ width: "120px" }}>Phone number</HeaderCell>,
        dataIndex: "main_phone",
        render: (value: any, record: any, index: number) => {
          return (
            <PhoneCell
              value={[
                {
                  id: 1,
                  is_confirmed: 1,
                  phone_number: value,
                  type: 100,
                },
                ...(record.leadPhones &&
                  record.leadPhones.map((e: any) => {
                    return { ...e, phone_number: e.phone };
                  })),
              ]}
            />
          );
        },
      },
      {
        title: <HeaderCell>Source</HeaderCell>,
        dataIndex: "source",
        render: (value: any, record: any, index: number) => {
          return (
            <CellNameWrapper>
              <span className="name">{value?.name || "-"}</span>
            </CellNameWrapper>
          );
        },
      },
      {
        title: <HeaderCell>Created by</HeaderCell>,
        dataIndex: ["user", "username"],
        render: (value: any, record: any, index: number) => {
          return (
            <CellNameWrapper>
              <span className="name">{value}</span>
            </CellNameWrapper>
          );
        },
      },
      {
        title: <HeaderCell>Note</HeaderCell>,
        dataIndex: "comment",
        render: (value: any, record: any, index: number) => {
          return (
            <CellNameWrapper style={{ maxWidth: "120px" }}>
              <Tooltip
                placement="left"
                title={
                  <div>
                    <span className="name">{value}</span>
                  </div>
                }
                sx={{
                  [`& .${tooltipClasses.tooltip}`]: {
                    backgroundColor: "#f5f5f9",
                    color: "rgba(0, 0, 0, 0.87)",
                    maxWidth: 220,
                    fontSize: theme.typography.pxToRem(12),
                    border: "1px solid #dadde9",
                  },
                  textOverflow: "ellipsis",
                }}
                children={
                  <span
                    className="name"
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      maxWidth: "150px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {value}
                  </span>
                }
              />
            </CellNameWrapper>
          );
        },
      },
      {
        title: <HeaderCell>Category</HeaderCell>,
        dataIndex: "comment",
        render: (value: any, record: ILead, index: number) => {
          return (
            <CellNameWrapper style={{ maxWidth: "120px" }}>
              <span className="name">
                {" "}
                {record?.leavingCategory?.name.startsWith("Republic")
                  ? "R. Karakalpakstan Nuk."
                  : record?.leavingCategory?.name || "-"}
              </span>
            </CellNameWrapper>
          );
        },
      },
      {
        title: <HeaderCell>Label</HeaderCell>,
        dataIndex: "label",
        render: (value: any, record: any, index: number) => {
          const data = record;
          const id = data?.id || null;
          const isHaveColor = data?.color;
          const leadActions = data?.leadActions || [];
          const isNotAnswered = leadActions.find(
            (e: TLeadActions) => e.action === ACTION_R_CALL
          );
          return (
            <div
              style={{
                display: "flex",
                gap: "20px",
              }}
            >
              <LifeCycleLabel
                onClick={() => {
                  store.dispatch(
                    toggleLifecycleModal({
                      open: true,
                      id: record?.id,
                    })
                  );
                }}
                size="small"
              />
              <NotAnswered
                size="small"
                label={
                  isNotAnswered &&
                  moment(isNotAnswered.datetime, DATE_FORMAT_CREATED_AT).format(
                    DATE_FORMAT_DD_MM_HH_mm
                  )
                }
                isOpen={isNotAnswered}
                onClick={() =>
                  handleClickCallBack(id, ACTION_R_CALL, new Date(), index)
                }
                defaultValue={isNotAnswered}
              />
              <Paint
                size="small"
                isOpen={isHaveColor}
                onSubmit={(color: string) =>
                  onSubmitChangeColor(id, color, index)
                }
                defaultValue={isHaveColor}
              />
            </div>
          );
        },
      },
      isShowByPermission
        ? {
            title: <HeaderCell>Actions</HeaderCell>,
            dataIndex: "actions",
            render: (value: any, record: any, index: number) => {
              const data = record;
              return (
                <Flex gap={20}>
                  <Transfer
                    size="small"
                    onClick={() => {
                      dispatch(
                        toggleModal({
                          key: "transferLead",
                          data: {
                            data: {
                              id: data?.id,
                              oldData: data,
                              type: LeadTabEnums.DELETED_LEADS,
                            },
                            open: true,
                          },
                        })
                      );
                    }}
                  />
                </Flex>
              );
            },
          }
        : {
            title: <HeaderCell>Actions</HeaderCell>,
            dataIndex: "actions",
            render: () => <></>,
          },
      {
        title: (
          <HeaderCell
            style={{
              width: "100px",
            }}
          >
            Date (Deleted)
          </HeaderCell>
        ),
        dataIndex: "deleted_at",
        render: (value: any, record: any, index: number) => {
          return (
            <CellNameWrapper
              style={{
                width: "100px",
              }}
            >
              <span className="name" style={{ marginLeft: "20px" }}>
                {value
                  ? moment(value, DATE_FORMAT_CREATED_AT).format(
                      DATE_FORMAT_DD_MMM_YY_HH_mm
                    )
                  : "-"}
              </span>
            </CellNameWrapper>
          );
        },
      },
    ];
  }, []);
};

export default Columns;
