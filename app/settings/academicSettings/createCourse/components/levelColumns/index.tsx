import React, { useMemo } from "react";
import { Cell, DeleteSvg, EditSvg, TableHeading } from "components";
import { Wrapper, Flex } from "./style";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";

const levelColumns = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return [
      {
        Header: <TableHeading padding>Name</TableHeading>,
        accessor: "name",
        Cell: (props: any) => {
          return <Cell>{props?.value}</Cell>;
        },
        Footer: "name",
      },
      {
        Header: <TableHeading>Level</TableHeading>,
        accessor: "children",
        Cell: (props: any) => {
          return (
            <Flex>
              {props?.value?.map(
                (
                  item: {
                    name:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | React.ReactFragment
                      | React.ReactPortal
                      | null
                      | undefined;
                  },
                  index: React.Key | null | undefined
                ) => {
                  return (
                    <div key={index}>
                      {item?.name}
                      {props?.value?.length !== +(index || 0) + 1 ? "," : ""}
                    </div>
                  );
                }
              )}
            </Flex>
          );
        },
        Footer: "group_form",
      },
      {
        Header: <TableHeading>Total duration</TableHeading>,
        accessor: "duration",
        Cell: (props: any) => {
          return <Cell>{+props?.value / 30 / 86400 ?? 0} Month(s)</Cell>;
        },
        Footer: "name",
      },
      {
        Header: <TableHeading>Action</TableHeading>,
        accessor: "id",
        Cell: (props: any) => {
          return (
            <Wrapper>
              <div
                className="icon"
                onClick={() =>
                  dispatch(
                    toggleModal({
                      key: "levelModal",
                      data: {
                        data: {
                          levelId: props?.value,
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
                      key: "deleteLevel",
                      data: {
                        data: {
                          levelId: props?.value,
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
        Footer: "name",
      },
    ];
  }, []);
};

export default levelColumns;
