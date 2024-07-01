import React, { useMemo } from "react";
import { AntdSwitch, DeleteSvg, EditSvg, TableHeading } from "components";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { Wrapper, BoxType, Content, BoxStatus, BoxGrid } from "./style";
import { HolidayType } from "types";
import moment from "moment";
import { DATE_FORMAT_MMMM_D_ddd } from "constants/dates";
import { useForm } from "react-hook-form";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";

export interface Interface {
  companyEnumsHolidayTypes: { value: string; label: string }[];
  groupContactEnumsStatusesAll: { value: string; label: string }[];
}

const Columns: ({
  companyEnumsHolidayTypes,
  groupContactEnumsStudyStatuses,
}: {
  companyEnumsHolidayTypes: any;
  groupContactEnumsStudyStatuses: any;
}) => (
  | {
      dataIndex: string;
      title: JSX.Element;
      render: (value: any, record: any, index: number) => JSX.Element;
    }
  | {
      dataIndex: string[];
      title: JSX.Element;
      render: (value: any, record: any, index: number) => JSX.Element | string;
    }
)[] = ({ companyEnumsHolidayTypes, groupContactEnumsStudyStatuses }) => {
  const { control } = useForm();
  const dispatch = useDispatch();
  return useMemo(() => {
    return [
      {
        title: <TableHeading padding>Name</TableHeading>,
        dataIndex: "name",
        render: (value: any, record: any, index: number) => {
          return <Content>{value}</Content>;
        },
      },
      {
        title: <TableHeading>Type</TableHeading>,
        dataIndex: "type",
        render: (value: any, record: any, index: number) => {
          const box = companyEnumsHolidayTypes.find(
            (type: { value: any }) => type?.value == value
          );
          return (
            <BoxType type={box?.value as unknown as HolidayType}>
              {box?.label}
            </BoxType>
          );
        },
      },
      {
        title: <TableHeading>Date</TableHeading>,
        dataIndex: "dates",
        render: (value: any, record: any, index: number) => {
          const dates = value;
          return (
            <Content>
              {value?.length > 1 ? (
                <div className="d-flex">
                  <p>{moment(dates?.[0]).format(DATE_FORMAT_MMMM_D_ddd)}</p>
                  <p className="hyphen">-</p>
                  <p>
                    {moment(dates?.[dates?.length - 1]).format(
                      DATE_FORMAT_MMMM_D_ddd
                    )}
                  </p>
                </div>
              ) : (
                <p>{moment(dates?.[0]).format(DATE_FORMAT_MMMM_D_ddd)}</p>
              )}
            </Content>
          );
        },
      },
      {
        title: <TableHeading>Notify (SMS)</TableHeading>,
        dataIndex: "grouped_notify_type",
        render: (value: any, record: any, index: number) => {
          return (
            <Content>
              <CheckPermission
                permission={[COMPONENTS_VIEWS.can_manage_holiday_settings]}
              >
                <AntdSwitch
                  disabled
                  defaultValue={value}
                  control={control}
                  name={`general.days_${record?.id}`}
                />
              </CheckPermission>
            </Content>
          );
        },
      },
      {
        title: <TableHeading>Delivery to</TableHeading>,
        dataIndex: ["data", "delivery_statuses"],
        render: (value: any, record: any, index: number) => {
          const statuses: string[] = Array.isArray(value)
            ? value?.map((item: string) => {
                return groupContactEnumsStudyStatuses?.find(
                  (status: { value: string }) => status.value == item
                )?.label;
              })
            : groupContactEnumsStudyStatuses?.find(
                (status: { value: any }) => status.value == value
              )?.label;
          return Array.isArray(value) ? (
            <BoxGrid>
              {statuses?.map((st, index) => {
                return <BoxStatus key={index}>{st}</BoxStatus>;
              })}
            </BoxGrid>
          ) : statuses ? (
            <BoxStatus>{statuses}</BoxStatus>
          ) : (
            "-"
          );
        },
      },
      {
        title: <TableHeading>Action</TableHeading>,
        dataIndex: "id",
        render: (value: any, record: any, index: number) => {
          return (
            <Wrapper>
              <CheckPermission
                permission={[COMPONENTS_VIEWS.can_manage_holiday_settings]}
              >
                <>
                  <div
                    className="icon"
                    onClick={() =>
                      dispatch(
                        toggleModal({
                          key: "holiday",
                          data: {
                            data: {
                              type: "update",
                              holiday_id: value,
                              holiday_group_id: record?.group_id,
                            },
                            open: true,
                          },
                        })
                      )
                    }
                  >
                    <EditSvg />
                  </div>
                  <div
                    className="icon"
                    onClick={() =>
                      dispatch(
                        toggleModal({
                          key: "deleteHoliday",
                          data: {
                            data: {
                              holiday_id: value,
                            },
                            open: true,
                          },
                        })
                      )
                    }
                  >
                    <DeleteSvg />
                  </div>
                </>
              </CheckPermission>
            </Wrapper>
          );
        },
      },
    ];
  }, [companyEnumsHolidayTypes, groupContactEnumsStudyStatuses]);
};

export default Columns;
