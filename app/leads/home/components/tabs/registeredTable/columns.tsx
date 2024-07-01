import React, { useMemo } from "react";
import moment from "moment";
import { Tooltip } from "antd";
import { useForm } from "react-hook-form";

import {
  ArrowBigSvg,
  CircleImage,
  MarkCell,
  NoteEditPopover,
  PhoneCell,
} from "components";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MMM_YY_HH_mm,
} from "constants/dates";
import { MainPhone } from "constants/phoneTypes";
import { getRowNumber } from "utils/getRowNumber";
import { CellNameWrapper, HeaderCell } from "../deletedLeadTable/style";
import RegisteredLabels from "./labels";

const Columns = () => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any, id: number) => {};

  return useMemo(() => {
    return [
      {
        title: (
          <HeaderCell
            style={{
              width: "100px",
              textAlign: "left",
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
          const id = getRowNumber({
            index,
          });
          return (
            <CellNameWrapper
              style={{
                textAlign: "left",
              }}
            >
              <MarkCell color={data.color} />
              <span className="index">{id}</span>
              <Tooltip
                destroyTooltipOnHide
                placement="bottomRight"
                title={data.name}
              >
                <div className="name text">{data.name}</div>
              </Tooltip>
            </CellNameWrapper>
          );
        },
      },
      {
        title: (
          <HeaderCell style={{ width: "100px", textAlign: "left" }}>
            Phone number
          </HeaderCell>
        ),
        dataIndex: "main_phone",
        Footer: "Phone",
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
                ...(record?.leadPhones &&
                  record?.leadPhones.map((e: any) => {
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
        title: (
          <HeaderCell style={{ textAlign: "left" }}>Created by</HeaderCell>
        ),
        dataIndex: ["user", "userProfile"],
        render: (value: any, record: any, index: number) => {
          return (
            <CellNameWrapper style={{ textAlign: "left" }}>
              <span className="name">
                {!!value?.firstname
                  ? value?.firstname + " " + value?.lastname
                  : "-"}
              </span>
            </CellNameWrapper>
          );
        },
      },
      {
        title: <HeaderCell style={{ textAlign: "left" }}>Note</HeaderCell>,
        dataIndex: "comment",
        render: (value: any, record: any, index: number) => {
          const id = record?.id || null;
          return (
            <NoteEditPopover
              control={control}
              note={value}
              defaultValue={value}
              handleSubmit={handleSubmit}
              onSubmit={(data: any) => onSubmit(data, id)}
              id={id}
              disabled
            />
          );
        },
      },
      {
        title: (
          <HeaderCell
            style={{
              width: "100px",
              textAlign: "left",
              background: "transparent",
            }}
          >
            Date
          </HeaderCell>
        ),
        dataIndex: "created_at",
        render: (value: any, record: any, index: number) => {
          return (
            <CellNameWrapper>
              <span className="name">
                {value
                  ? moment(value, DATE_FORMAT_CREATED_AT).format(
                      DATE_FORMAT_DD_MMM_YY_HH_mm,
                    )
                  : "-"}
              </span>
            </CellNameWrapper>
          );
        },
      },
      {
        title: <HeaderCell />,
        dataIndex: "divide",
        render: () => {
          return (
            <CellNameWrapper
              style={{
                width: "40px",
                display: "flex",
                alignSelf: "center",
                justifySelf: "center",
              }}
            >
              <ArrowBigSvg width={40} height={40} />
            </CellNameWrapper>
          );
        },
      },
      {
        title: (
          <HeaderCell
            style={{
              width: "150px",
              textAlign: "left",
            }}
          >
            Name
          </HeaderCell>
        ),
        dataIndex: ["register", "name"],
        render: (value: any, record: any, index: number) => {
          return (
            <CellNameWrapper>
              <Tooltip
                destroyTooltipOnHide
                placement="bottomRight"
                title={value}
              >
                <div className="flex">
                  <CircleImage
                    src={record?.register?.avatar}
                    width={40}
                    height={40}
                  />
                  <p className="name text">{value}</p>
                </div>
              </Tooltip>
            </CellNameWrapper>
          );
        },
      },
      {
        dataIndex: "register",
        title: (
          <HeaderCell style={{ width: "100px", textAlign: "left" }}>
            Phone number
          </HeaderCell>
        ),
        render: (value: any, record: any, index: number) => {
          return (
            <PhoneCell
              value={
                value?.phones?.map?.((e: any) => {
                  return {
                    ...e,
                    phone_number: e.phone_number,
                    is_confirmed: e.type === MainPhone ? 1 : undefined,
                  };
                }) || []
              }
            />
          );
        },
      },
      {
        title: (
          <HeaderCell style={{ textAlign: "left" }}>Created by</HeaderCell>
        ),
        dataIndex: ["registeredBy", "userProfile"],
        render: (value: any, record: any, index: number) => {
          return (
            <CellNameWrapper style={{ textAlign: "left" }}>
              <span className="name">
                {!!value?.firstname
                  ? value?.firstname + " " + value?.lastname
                  : "-"}
              </span>
            </CellNameWrapper>
          );
        },
      },
      {
        title: (
          <HeaderCell
            style={{
              width: "100px",
              textAlign: "left",
            }}
          >
            Date
          </HeaderCell>
        ),
        dataIndex: ["register", "date"],
        render: (value: any, record: any, index: number) => {
          return (
            <CellNameWrapper
              style={{
                width: "100px",
                textAlign: "left",
              }}
            >
              <span className="name">
                {moment(value, DATE_FORMAT_CREATED_AT).format(
                  DATE_FORMAT_DD_MMM_YY_HH_mm,
                )}
              </span>
            </CellNameWrapper>
          );
        },
      },
      {
        title: <HeaderCell>Label</HeaderCell>,
        dataIndex: "id",
        render: (value: any, record: any, index: number) => {
          return <RegisteredLabels record={record} />;
        },
      },
    ];
  }, []);
};

export default Columns;
