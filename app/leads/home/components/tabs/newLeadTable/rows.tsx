import { CellNameWrapper } from "./style";
import {
  Call,
  CallRequest,
  Cell,
  DeleteCircle,
  LifeCycleLabel,
  Mail,
  NotAnswered,
  NoteEditPopover,
  Paint,
  PhoneCell,
  TableHeading,
  Transfer,
} from "components";
import moment from "moment";
import { ACTION_CALL_BACK, ACTION_R_CALL } from "constants/lifeCycle";
import React, { useMemo } from "react";
import { TNewLeadTable } from "./type";
import { ILead, TLeadActions } from "types";
import { useForm } from "react-hook-form";
import {
  store,
  toggleLifecycleModal,
  toggleModal,
  useAppSelector,
} from "store";
import { Tooltip } from "antd";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MM_HH_mm,
  DATE_FORMAT_DD_MMM_YY_HH_mm,
} from "constants/dates";
import { getRowNumber } from "utils/getRowNumber";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { useDispatch } from "react-redux";
import { LeadTabEnums } from "constants/leadTabs";
import { PersonalInfoType } from "globals/components/studentSmsModal";
import { RowMark } from "components/common/useProfile/style";
import Responsible from "./components/responsible";
import { toast } from "react-toastify";
import env from "utils/env";
import { startCall } from "utils/call";

export const Columns = ({
  handleClickCallBack,
  onSubmitChangeColor,
  onSubmitChangeComment,
  leads,
}: TNewLeadTable) => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data: any, id: number, index: number) => {
    onSubmitChangeComment(id, data?.[`note_${id}`], index);
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
          <TableHeading
            isId
            style={{
              width: "180px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            Name
          </TableHeading>
        ),
        dataIndex: "name",
        render: (props: any, record: any, index: number) => {
          const data = record;
          const id = getRowNumber({
            index,
          });
          return (
            <CellNameWrapper
              style={{
                width: "180px",
              }}
            >
              <RowMark
                style={{
                  backgroundColor: data.real_color,
                }}
              />
              {/*<MarkCell color={"green"} />*/}
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
        title: (
          <TableHeading style={{ width: "120px" }}>Phone number</TableHeading>
        ),
        dataIndex: "main_phone",
        render: (value: any, record: any, index: number) => {
          return (
            <PhoneCell
              value={[
                { id: 1, is_confirmed: 1, phone_number: value, type: 100 },
                ...(record?.leadPhones &&
                  record.leadPhones.map((e: any) => {
                    return { ...e, phone_number: e.phone };
                  })),
              ]}
            />
          );
        },
      },
      {
        title: <TableHeading>Source</TableHeading>,
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
        title: <TableHeading>Note</TableHeading>,
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
        title: <TableHeading>Date & Time</TableHeading>,
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
        title: <TableHeading>Responsible</TableHeading>,
        dataIndex: "take_datetime",
        render: (value: any, record: ILead, index: number) => {
          return (
            <CellNameWrapper>
              <Responsible record={record} />
            </CellNameWrapper>
          );
        },
      },
      // {
      //   Index: <TableHeading>Lifecycle</TableHeading>,
      //   accessor: "leadActions",
      //   Footer: "Lifecycle",
      //   Cell: (props: any) => {
      //     let value = props.value || [];
      //     value = value?.[value.length - 1]?.action || 0;
      //     const data = EventLifeCycle.find((e) => e.action === value);
      //     return data ? (
      //       <EventBox
      //         text={data?.text || ""}
      //         icon={data?.icon}
      //         onClick={() => {
      //           store.dispatch(
      //             toggleLifecycleModal({ open: true, id: props.row.original?.id })
      //           );
      //         }}
      //         style={{
      //           backgroundColor: data?.color,
      //         }}
      //         textColor={data.textColor}
      //       />
      //     ) : (
      //       <div
      //         onClick={() =>
      //           store.dispatch(
      //             toggleLifecycleModal({ open: true, id: props.row.original?.id })
      //           )
      //         }
      //         style={{ width: "100%", cursor: "pointer" }}
      //       >
      //         -
      //       </div>
      //     );
      //   },
      // },
      {
        title: <TableHeading>Label</TableHeading>,
        dataIndex: "label",
        render: (value: any, record: any, index: any) => {
          const data = record;
          const id = data?.id || null;
          const isHaveColor = data?.color;
          const leadActions = data?.leadActions || [];
          const isCallBack = leadActions.find(
            (e: TLeadActions) => e.action === ACTION_CALL_BACK
          );
          const isNotAnswered = leadActions.find(
            (e: TLeadActions) => e.action === ACTION_R_CALL
          );
          return (
            <Cell display="flex" gap="25px">
              <CallRequest
                onChange={(date) =>
                  handleClickCallBack(id, ACTION_CALL_BACK, date, index)
                }
                size="small"
                label={
                  isCallBack &&
                  moment(isCallBack.datetime, DATE_FORMAT_CREATED_AT).format(
                    DATE_FORMAT_DD_MM_HH_mm
                  )
                }
                isOpen={isCallBack}
                defaultValue={isCallBack}
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
              <Paint
                size="small"
                isOpen={isHaveColor}
                onSubmit={(color: string) =>
                  onSubmitChangeColor(id, color, index)
                }
                defaultValue={isHaveColor}
              />
            </Cell>
          );
        },
      },
      isShowByPermission
        ? {
            title: <TableHeading>Actions</TableHeading>,
            dataIndex: "main_phone",
            render: (value: any, record: any, index: number) => {
              const data = record;
              return (
                <Cell display="flex" gap="20px">
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
                              type: LeadTabEnums.NEW_LEADS,
                            },
                            open: true,
                          },
                        })
                      );
                    }}
                  />
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
                </Cell>
              );
            },
          }
        : {
            title: <TableHeading>Actions</TableHeading>,
            dataIndex: "actions",
            render: () => <></>,
          },
    ];
  }, [leads]);
};
