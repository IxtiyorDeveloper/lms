import { CellWrapper } from "./style";
import { getRowNumber } from "utils/getRowNumber";
import React, { useMemo } from "react";
import { EXAM_PARTS, EXAM_PROCESS_STATUS } from "constants/exam";
import { CircleImage, TableHeading } from "components";

const Columns = (groupData: any) => {
  const getPercent = (propsComponents: any[], part: any) => {
    let a = 0;
    const examParts = groupData?.exam_parts?.filter(
      (exam: any) => exam.config.type === part
    )[0].config.components;
    propsComponents.map((m: any) => {
      examParts.map((n: any) => {
        if (m.id === n.id) {
          a += !isNaN(m.point) ? m.point : 0;
        }
      });
    });
    return Math.floor(a);
  };

  return useMemo(() => {
    return [
      {
        title: <TableHeading padding>#</TableHeading>,
        dataIndex: "name",
        render: (value: any, record: any, index: number) => {
          const id = getRowNumber({ index });
          return (
            <CellWrapper>
              <span className="index">{id}</span>
            </CellWrapper>
          );
        },
      },
      {
        title: <TableHeading>Full name</TableHeading>,
        dataIndex: ["user", "studentProfile"],
        render: (value: any, record: any, index: number) => {
          return (
            <CellWrapper>
              <div className="supervisor">
                <CircleImage height={24} width={24} src={value?.avatar} />
                <span>
                  {!!value?.first_name
                    ? value?.first_name + " " + value?.last_name
                    : "-"}
                </span>
              </div>
            </CellWrapper>
          );
        },
      },
      {
        dataIndex: "adasdasdas",
        title: <TableHeading>Main part</TableHeading>,
        render: (value: any, record: any, index: number) => {
          return (
            <CellWrapper>
              {getPercent(record.process.data.components, EXAM_PARTS.MAIN)}
            </CellWrapper>
          );
        },
      },
      {
        title: <TableHeading>Speaking part</TableHeading>,
        dataIndex: ["registeredBy", "userProfile"],
        render: (value: any, record: any, index: number) => {
          return (
            <CellWrapper>
              {getPercent(record.process.data.components, EXAM_PARTS.SPEAKING)}
            </CellWrapper>
          );
        },
      },
      {
        title: <TableHeading>Overall</TableHeading>,
        dataIndex: ["teacher", "userProfile"],
        render: (value: any, record: any, index: number) => {
          const overall =
            getPercent(record.process.data.components, EXAM_PARTS.MAIN) +
            getPercent(record.process.data.components, EXAM_PARTS.SPEAKING);
          return (
            <CellWrapper>
              <span className="name">{Math.floor(overall)}</span>
            </CellWrapper>
          );
        },
      },
      {
        title: <TableHeading>Status</TableHeading>,
        dataIndex: "process",
        render: (value: any, record: any, index: number) => {
          return (
            <CellWrapper>
              <span className="numbers">
                <span
                  className={`${
                    EXAM_PROCESS_STATUS[
                      value?.status?.toString() as keyof typeof EXAM_PROCESS_STATUS
                    ] as any
                  } max`}
                >
                  {
                    EXAM_PROCESS_STATUS[
                      value?.status?.toString() as keyof typeof EXAM_PROCESS_STATUS
                    ]
                  }
                </span>
              </span>
            </CellWrapper>
          );
        },
      },
    ];
  }, [groupData]);
};

export default Columns;
