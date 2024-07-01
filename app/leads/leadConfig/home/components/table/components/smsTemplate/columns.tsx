import React, { useMemo } from "react";
import { DeleteSvg, EditSvg, TableHeading } from "components";
import { getRowNumber } from "utils/getRowNumber";
import Router from "next/router";

const Columns = ({
  data,
  setDeleteAction,
}: {
  data: any;
  setDeleteAction: any;
}) => {
  return useMemo(() => {
    return [
      {
        title: <TableHeading padding>#</TableHeading>,
        dataIndex: "ac",
        width: "5%",
        render: (value: any, record: any, index: number) => {
          return <span>{getRowNumber({ index })}</span>;
        },
      },
      {
        title: <TableHeading>Scenario & Text</TableHeading>,
        dataIndex: "name",
        width: "87%",
        render: (value: any, record: any, index: number) => {
          return (
            <span className="text">
              <p className="title">{value}</p>
              <br />
              {record?.text}
            </span>
          );
        },
      },
      {
        title: <TableHeading className="center">Action</TableHeading>,
        dataIndex: "id",
        width: "12%",
        render: (value: any, record: any, index: number) => {
          return (
            <div className="actions">
              <div
                onClick={() =>
                  Router.push({
                    pathname: "/leads/lead-config/template",
                    query: {
                      type: "update",
                      id: value,
                    },
                  })
                }
                className="edit"
              >
                <EditSvg />
              </div>
              <div
                onClick={() => setDeleteAction({ isOpen: true, id: value })}
                className="edit"
              >
                <DeleteSvg />
              </div>
            </div>
          );
        },
      },
    ];
  }, [data]);
};

export default Columns;
