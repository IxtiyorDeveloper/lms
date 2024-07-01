import React, { useMemo } from "react";
import { Cell, DeleteSvg, EditSvg, TableHeading } from "components";
import { Wrapper } from "./style";
import { Flex } from "../levelColumns/style";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";

const dayColumns = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return [
      {
        title: <TableHeading padding>Name</TableHeading>,
        dataIndex: "name",
        width: "20%",
        render: (value: any, record: any, index: number) => {
          return <Cell>{value}</Cell>;
        },
      },
      {
        title: <TableHeading>Days</TableHeading>,
        dataIndex: "lessonWeeks",
        width: "70%",
        render: (value: any, record: any, index: number) => {
          return (
            <Flex>
              {value?.map(
                (
                  item: {
                    week_day: number | string;
                  },
                  index: React.Key | null | undefined
                ) => {
                  return (
                    <div key={index}>
                      {item?.week_day}
                      {value?.length !== +(index || 0) + 1 ? "," : ""}
                    </div>
                  );
                }
              )}
            </Flex>
          );
        },
      },
      {
        title: <TableHeading>Action</TableHeading>,
        dataIndex: "id",
        width: "10%",
        render: (value: any, record: any, index: number) => {
          return (
            <Wrapper>
              <div
                className="icon"
                onClick={() =>
                  dispatch(
                    toggleModal({
                      key: "dayModal",
                      data: {
                        data: {
                          type: "update",
                          dayId: value,
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
                      key: "deleteLessonDay",
                      data: {
                        data: {
                          lessonDayId: value,
                        },
                        open: true,
                      },
                    })
                  )
                }
              >
                <DeleteSvg />
              </div>
            </Wrapper>
          );
        },
      },
    ];
  }, []);
};

export default dayColumns;
