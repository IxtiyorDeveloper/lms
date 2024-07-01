import React from "react";
import { CellWrapper } from "./style";
import { getRowNumber } from "utils/getRowNumber";
import { MyLink, TableHeading } from "components";
import { useRouter } from "next/router";
import moment from "moment";

const Columns = () => {
  const router = useRouter();
  const date = !!router.query.date
    ? moment(router.query.date, "YYYY-MM")
    : moment();

  return [
    {
      title: (
        <TableHeading padding isId>
          #
        </TableHeading>
      ),
      dataIndex: "name",
      width: "0%",
      render: (value: any, record: any, index: number) => {
        const id = getRowNumber({ index });
        return (
          <CellWrapper style={{ textAlign: "center" }}>
            <span className="index">{id}</span>
          </CellWrapper>
        );
      },
    },
    {
      title: <TableHeading>Group</TableHeading>,
      dataIndex: "name",
      width: "8%",
      render: (value: any, record: any, index: number) => {
        const original = record;
        return (
          <CellWrapper>
            <MyLink
              onClick={(e) => e.stopPropagation()}
              href={{
                pathname: `/academic-resource/exam-list/mock/${record?.id}`,
                query: {
                  year: date.format("YYYY"),
                  month: date.format("MM"),
                },
              }}>
              {value}
            </MyLink>
          </CellWrapper>
        );
      },
    },
    {
      title: <TableHeading>Teacher</TableHeading>,
      dataIndex: ["teacher", "userProfile"],
      width: "20%",
      render: (value: any, record: any, index: number) => {
        const userProfile = record?.support?.userProfile;
        return (
          <CellWrapper>
            <span className="name">
              <span className="teacher">T.</span>{" "}
              {!!value?.firstname
                ? value?.firstname + " " + value?.lastname
                : "-"}
            </span>
            <span className="name">
              <span className="support">S.</span>{" "}
              {!!userProfile?.firstname
                ? userProfile?.firstname + " " + userProfile?.lastname
                : "-"}
            </span>
          </CellWrapper>
        );
      },
    },
    {
      title: <TableHeading>Time</TableHeading>,
      dataIndex: "groups",
      width: "8%",
      render: (value: any, record: any, index: number) => {
        return (
          <CellWrapper>
            <span className="name one-line">
              {record?.lessonDay.name.split(" ").join(" ")}
            </span>
            <span className="name">{record?.lessonTime.time.slice(0, 5)}</span>
          </CellWrapper>
        );
      },
    },
    {
      title: <TableHeading>Students count</TableHeading>,
      dataIndex: ["mockStats", "total_students"],
      width: "8%",
      render: (value: any, record: any, index: number) => {
        return (
          <CellWrapper>
            <span className="name one-line">{value}</span>
          </CellWrapper>
        );
      },
    },
    {
      title: <TableHeading>Pass</TableHeading>,
      dataIndex: ["mockStats", "passed_students"],
      width: "13%",
      render: (value: any, record: any, index: number) => {
        return (
          <CellWrapper>
            <div className="numbers">
              <span className="box pass">{value}</span>
            </div>
          </CellWrapper>
        );
      },
    },
    {
      title: <TableHeading>Fail</TableHeading>,
      dataIndex: ["mockStats", "failed_students"],
      width: "13%",
      render: (value: any, record: any, index: number) => {
        return (
          <CellWrapper>
            <div className="numbers">
              <span className="box fail">{value}</span>
            </div>
          </CellWrapper>
        );
      },
    },
    {
      title: <TableHeading>In progress</TableHeading>,
      dataIndex: ["mockStats", "processing_count"],
      width: "13%",
      render: (value: any, record: any, index: number) => {
        return (
          <CellWrapper>
            <div className="numbers">
              <span className="box progress">{value}</span>
            </div>
          </CellWrapper>
        );
      },
    },
    {
      title: <TableHeading>Not done</TableHeading>,
      dataIndex: ["mockStats", "not_done_students"],
      width: "13%",
      render: (value: any, record: any, index: number) => {
        return (
          <CellWrapper>
            <div className="numbers">
              <span className="box not-started">{value}</span>
            </div>
          </CellWrapper>
        );
      },
    },
  ];
};

export default Columns;
