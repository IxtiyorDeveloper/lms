import React, { useMemo } from "react";
import { Cell, DeleteSvg, EditSvg, TableHeading } from "components";
import { ActionWrapper, Active, NameWrapper, NotActive } from "../../style";
import { ROOM_STATUS_ACTIVE, RoomTypes } from "constants/room";
import { getRowNumber } from "utils/getRowNumber";
import { store, toggleModal } from "store";
import { queryKeys } from "constants/queryKeys";

interface IProps {
  setOpen: (data: any) => void;
}
export const Cols = ({ setOpen }: IProps) => {
  return useMemo(() => {
    return [
      {
        Header: <TableHeading isId>Room name</TableHeading>,
        accessor: "name",
        Cell: (props: any) => (
          <Cell>
            <NameWrapper>
              <span className="count">{getRowNumber(props)}</span>
              <img src="/door-open.png" className="img" alt="door-open" />
              <span className="name">{props.value}</span>
            </NameWrapper>
          </Cell>
        ),
      },
      {
        Header: <TableHeading>Branch</TableHeading>,
        accessor: "branch.name",
        Cell: (props: any) => <Cell>{props.value}</Cell>,
      },
      {
        Header: <TableHeading>Room type</TableHeading>,
        accessor: "type",
        Cell: (props: any) => (
          <Cell>{RoomTypes?.[props.value as keyof typeof RoomTypes]}</Cell>
        ),
      },
      {
        Header: <TableHeading>Capacity</TableHeading>,
        accessor: "capacity",
        Cell: (props: any) => <Cell>{props.value || "-"}</Cell>,
      },
      {
        Header: <TableHeading>Status</TableHeading>,
        accessor: "status",
        Cell: (props: any) => {
          return (
            <Cell>
              {props?.value == ROOM_STATUS_ACTIVE ? (
                <Active>Active</Active>
              ) : (
                <NotActive>Not active</NotActive>
              )}
            </Cell>
          );
        },
      },
      {
        Header: <TableHeading>Action</TableHeading>,
        accessor: "action",
        Cell: (props: any) => (
          <ActionWrapper>
            <EditSvg
              style={{ cursor: "pointer" }}
              onClick={() =>
                store.dispatch(
                  toggleModal({
                    key: "createRoom",
                    data: {
                      data: {
                        type: "update",
                        id: props.row.original.id,
                        queryKeys: [queryKeys.rooms_list],
                      },
                      open: true,
                    },
                  })
                )
              }
            />
            <DeleteSvg
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpen({
                  open: true,
                  data: {
                    id: props.row.original.id,
                    queryKeys: [queryKeys.rooms_list],
                  },
                });
              }}
            />
          </ActionWrapper>
        ),
      },
    ];
  }, []);
};
