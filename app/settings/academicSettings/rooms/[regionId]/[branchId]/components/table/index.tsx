import React, { useEffect, useState } from "react";
import { TableWrapper } from "./style";
import { Button, DraggableTable, PlusSvg } from "components";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { Cols } from "./components/rows";
import RoomModal from "../roomModal";
import { useAllRooms, useChangeRoomOrder } from "hooks";
import { useRouter } from "next/router";
import DeleteModal from "../deleteModal";
import { IRoom } from "types";
import { toast } from "react-toastify";
import { queryKeys } from "constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

const TableSide = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoading, data } = useAllRooms({
    query_params: {
      ...router.query,
      branch_id: router.query?.branchId,
      region_id: router.query.regionId,
      id: undefined,
      pageSize: 100,
    },
  });
  const handleOpenCreateModal = () => {
    dispatch(
      toggleModal({
        key: "createRoom",
        data: {
          data: {},
          open: true,
        },
      })
    );
  };

  const [open, setOpen] = useState<{ open: boolean; data: any }>({
    data: undefined,
    open: false,
  });

  const [list, setList] = useState<IRoom[]>([]);

  useEffect(() => {
    !!data?.list && setList(data?.list);
  }, [data]);

  const changeRoomOrder = useChangeRoomOrder({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.rooms_list] });
      toast.info(`Changed`);
    },
    onError: () => {},
  });

  const handleChangeOrder = (changedList: IRoom[]) => {
    setList(changedList);
    changeRoomOrder.mutate({
      body: {
        ids: changedList.map((e) => e.id),
      },
    });
  };

  return (
    <TableWrapper>
      <div className="head-side">
        <h2 className="title-list">List of rooms</h2>
        <Button onClick={handleOpenCreateModal}>
          <PlusSvg />
          &nbsp;Room
        </Button>
      </div>
      <div className="table-side">
        <DraggableTable
          isLoading={isLoading}
          data={list}
          setData={handleChangeOrder}
          // hasPagination
          // pageCount={data?.meta?.pageCount}
          // currentPage={data?.meta?.currentPage}
          columns={Cols({ setOpen })}
        />
      </div>
      <RoomModal />
      <DeleteModal open={open.open} data={open.data} setOpen={setOpen} />
    </TableWrapper>
  );
};

export default TableSide;
