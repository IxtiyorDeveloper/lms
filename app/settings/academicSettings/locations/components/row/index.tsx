import {
  Cell,
  CirclePlusSvg,
  DeleteSvg,
  EditSvg,
  TableHeading,
} from "components";
import { NameWrapper } from "../../style";
import { bgColors } from "styles/theme";
import React from "react";
import { IOpen } from "../branchModal";

interface IProps {
  handleOpen: (id: number) => void;
  handleOpenRegionEditModal: (id: number) => void;
  onClickSaveBranch: (data: IOpen) => void;
}
export const cols = (actions: IProps) => [
  {
    title: <TableHeading padding>Name</TableHeading>,
    dataIndex: "name",
    width: "30%",
    render: (value: any, record: any, index: number) => (
      <Cell>
        <NameWrapper>
          {/*<ArrowSelect180Svg*/}
          {/*  width={22}*/}
          {/*  style={{*/}
          {/*    transform: `rotate(${props?.row?.isExpanded ? "90deg" : "0deg"})`,*/}
          {/*  }}*/}
          {/*  height={22}*/}
          {/*/>*/}
          <img src="/Location%20Pin.png" alt="location" />
          <span
            className="main"
            onClick={(e) => {
              e.stopPropagation();
              // Router.push(
              //   `/settings/academic-settings/rooms/${props.column.original?.id}`
              // );
            }}
          >
            {value}
          </span>
        </NameWrapper>
      </Cell>
    ),
  },
  {
    title: <TableHeading>Branch</TableHeading>,
    dataIndex: "branch_count",
    width: "30%",
    render: (value: any, record: any, index: number) => {
      return <Cell>{value}</Cell>;
    },
  },
  {
    title: <TableHeading>Room</TableHeading>,
    dataIndex: "room_count",
    width: "30%",
    render: (value: any, record: any, index: number) => {
      return <Cell>{value}</Cell>;
    },
  },
  {
    title: <TableHeading>Action</TableHeading>,
    dataIndex: "action",
    width: "10%",
    render: (value: any, record: any, index: number) => (
      <NameWrapper onClick={(e) => e.stopPropagation()}>
        <div
          onClick={() =>
            actions.onClickSaveBranch({
              isOpen: true,
              regionId: record?.id,
            })
          }
        >
          <CirclePlusSvg height={16} width={16} color={bgColors.yourShadow} />
        </div>
        <EditSvg
          height={16}
          width={16}
          onClick={() => actions.handleOpenRegionEditModal(record?.id)}
        />
        <DeleteSvg
          height={20}
          width={20}
          onClick={() => actions.handleOpen(record?.id)}
        />
      </NameWrapper>
    ),
  },
];
