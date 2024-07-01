import { CellNameWrapper, HeaderCell } from "./style";
import {
  Call,
  DeleteCircle,
  Mail,
  NoteEditPopover,
  PhoneCell,
  TableHeading,
  Transfer,
} from "components";
import moment from "moment";
import React, { useMemo } from "react";
import { TNewLeadTable } from "./type";
import { ILead, IUser } from "types";
import { useForm } from "react-hook-form";
import { Tooltip } from "antd";

import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MMM_YY_HH_mm,
} from "constants/dates";
import { getRowNumber } from "utils/getRowNumber";
import { toggleModal, useAppSelector } from "store";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { LeadTabEnums } from "constants/leadTabs";
import { PersonalInfoType } from "globals/components/studentSmsModal";
import { RowMark } from "components/common/useProfile/style";
import { useChangeCommentLead } from "hooks";
import { toast } from "react-toastify";
import { updateList } from "utils/updateList";
import ProcessingLabels from "./labels";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { validationErrorHandler } from "utils";
import env from "utils/env";
import { startCall } from "utils/call";

export const Columns = ({ tabs, isCreatedTabs }: TNewLeadTable) => {
  const { control, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const changeComment = useChangeCommentLead({
    onSuccess: (newData: ILead) => {
      toast.success("Lead comment changed");
      updateList({
        apiKey: "lead-list",
        newData,
        queryClient,
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmitChangeComment = (id: number, comment: string) => {
    changeComment.mutate({ id, comment });
  };
  const onSubmit = (data: any, id: number, index: number) => {
    onSubmitChangeComment(id, data?.[`note_${id}`]);
  };
  const isShowByPermission = funcCheckPermission([
    COMPONENTS_VIEWS.can_manage_lead,
  ]);

  const onCallButtonPress = (phone_number: string) => {
    try {
      startCall(`sip:${phone_number as string}@${env.pbxUrl}`);
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  return useMemo(() => {
    return [
      {
        title: (
          <HeaderCell
            style={{
              width: "180px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            Name
          </HeaderCell>
        ),
        dataIndex: "name",
        render: (value: any, record: any, index: number) => {
          const data = record;
          const id = getRowNumber({ index });

          return (
            <CellNameWrapper
              style={{
                width: "200px",
              }}
            >
              <RowMark
                style={{
                  backgroundColor: data.real_color,
                }}
              />
              <span className="index">{id}</span>
              <Tooltip
                destroyTooltipOnHide
                placement="bottomRight"
                title={data.name}
              >
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
                { id: 1, is_confirmed: 1, phone_number: value, type: 100 },
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
        Footer: "source",
        render: (value: any, record: any, index: number) => {
          return (
            <CellNameWrapper>
              <span className="name">{value?.name || "-"}</span>
            </CellNameWrapper>
          );
        },
      },
      {
        title: <HeaderCell>Note</HeaderCell>,
        dataIndex: "comment",
        render: (value: any, record: any, index: number) => {
          const id = record?.id || null;
          return (
            <NoteEditPopover
              control={control}
              note={value}
              defaultValue={value}
              handleSubmit={handleSubmit}
              onSubmit={(data: any) => onSubmit(data, id, index)}
              id={id}
            />
          );
        },
      },
      {
        title: <HeaderCell>Date & Time</HeaderCell>,
        dataIndex: "take_datetime",
        render: (value: any, record: any, index: number) => {
          return (
            <CellNameWrapper>
              <span className="name">
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
      {
        title: <HeaderCell>Created By</HeaderCell>,
        dataIndex: "createdBy",
        render: (value: any, record: any, index: number) => {
          const user: IUser = record?.user;
          const fullName = user?.userProfile
            ? user?.userProfile?.firstname + " " + user?.userProfile?.lastname
            : user?.username;
          return (
            <CellNameWrapper>
              <span className="name">{fullName}</span>
            </CellNameWrapper>
          );
        },
      },
      {
        title: <HeaderCell>Label</HeaderCell>,
        dataIndex: "id",
        render: (value: any, record: any, index: number) => {
          return <ProcessingLabels record={record} />;
        },
      },
      isShowByPermission
        ? {
            title: <TableHeading>Actions</TableHeading>,
            dataIndex: "main_phone",
            render: (value: any, record: any, index: number) => {
              const data = record;
              return (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                  key={index}
                >
                  <Call
                    size="small"
                    value={[
                      {
                        id: 1,
                        is_confirmed: 1,
                        phone_number: value,
                        type: 100,
                      },
                      ...(record?.leadPhones &&
                        record.leadPhones.map((e: any) => {
                          return { ...e, phone_number: e.phone };
                        })),
                    ]}
                    onClick={(e) => {
                      onCallButtonPress(e);
                    }}
                  />
                  <Mail
                    onClick={() => {
                      dispatch(
                        toggleModal({
                          key: "selfSms",
                          data: {
                            data: {
                              id: data?.id,
                              filter: "lead",
                              sent_field_name: "id",
                              type: PersonalInfoType.lead,
                            },
                            open: true,
                          },
                        })
                      );
                    }}
                    size="small"
                  />
                  {tabs && tabs?.length > 0 && (
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
                                isCreatedTabs,
                                type: LeadTabEnums.PROCESSING_LEADS,
                              },
                              open: true,
                            },
                          })
                        );
                      }}
                    />
                  )}
                  <DeleteCircle
                    size="small"
                    onClick={() =>
                      dispatch(
                        toggleModal({
                          key: "deleteLead",
                          data: {
                            data: {
                              id: data?.id,
                            },
                            open: true,
                          },
                        })
                      )
                    }
                  />
                </div>
              );
            },
          }
        : {
            title: <TableHeading>Actions</TableHeading>,
            dataIndex: "actions",
            render: () => <></>,
          },
    ];
  }, [tabs]);
};
