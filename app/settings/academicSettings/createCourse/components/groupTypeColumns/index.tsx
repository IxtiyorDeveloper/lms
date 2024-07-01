import React, { useMemo } from "react";
import { Cell, DeleteSvg, EditSvg, TableHeading } from "components";
import { Wrapper } from "./style";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";

export interface Interface {
  groupForms: { value: string; label: string }[];
}

const groupTypeColumns: ({ groupForms }: Interface) => {
  dataIndex: string;
  title: JSX.Element;
  render: (value: any, record: any, index: number) => JSX.Element;
}[] = ({ groupForms }) => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return [
      {
        title: <TableHeading padding>Name</TableHeading>,
        dataIndex: "name",
        render: (value: any, record: any, index: number) => {
          return <Cell>{value}</Cell>;
        },
      },
      {
        title: <TableHeading>Group form</TableHeading>,
        dataIndex: "group_form",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              {groupForms?.find((form) => form?.value == value)?.label ?? "-"}
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Max count of students</TableHeading>,
        dataIndex: "max_count",
        render: (value: any, record: any, index: number) => {
          return <Cell>{value}</Cell>;
        },
      },
      {
        title: <TableHeading>Min count of students</TableHeading>,
        dataIndex: "min_count",
        render: (value: any, record: any, index: number) => {
          return <Cell>{value}</Cell>;
        },
      },
      {
        title: <TableHeading>Max age</TableHeading>,
        dataIndex: "max_age",
        render: (value: any, record: any, index: number) => {
          return <Cell>{value}</Cell>;
        },
      },
      {
        title: <TableHeading>Min age</TableHeading>,
        dataIndex: "min_age",
        render: (value: any, record: any, index: number) => {
          return <Cell>{value}</Cell>;
        },
      },
      {
        title: <TableHeading>Additional seats</TableHeading>,
        dataIndex: "additional_seat",
        render: (value: any, record: any, index: number) => {
          return <Cell>{value}</Cell>;
        },
      },
      {
        title: <TableHeading>Action</TableHeading>,
        dataIndex: "id",
        render: (value: any, record: any, index: number) => {
          return (
            <Wrapper>
              <div
                className="icon"
                onClick={() =>
                  dispatch(
                    toggleModal({
                      key: "groupTypeModal",
                      data: {
                        data: {
                          groupTypeId: value,
                          type: "update",
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
                      key: "deleteGroupType",
                      data: {
                        data: {
                          groupTypeId: value,
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
  }, [groupForms]);
};

export default groupTypeColumns;
