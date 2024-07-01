import { CellWrapper } from "./style";
import { getRowNumber } from "utils/getRowNumber";
import { TableHeading } from "components";
import React, { useMemo } from "react";
import moment from "moment";
import { usePageDataMemo } from "hooks";
import { EXAM_PARTS } from "constants/exam";

const Columns = () => {
  const { level, days } = usePageDataMemo();

  const levelIds = (levels: any) => {
    let ids: any = {};
    levels?.map((lev: any) => {
      ids[lev.value] = lev.label;
      lev?.subLevel?.map((sub: any) => {
        ids[sub?.value] = lev.label;
      });
    });
    return ids;
  };

  const dateFormat = "DD MMM YYYY";
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
        title: <TableHeading>Level group</TableHeading>,
        dataIndex: ["keyStorageItem", "name"],
        render: (value: any, record: any, index: number) => {
          return <CellWrapper>{value}</CellWrapper>;
        },
      },
      {
        title: <TableHeading>Levels</TableHeading>,
        dataIndex: ["keyStorageItem", "levelIds"],
        render: (value: any, record: any, index: number) => {
          let text = "";
          const res = levelIds(level.options);
          value?.map((id: string, index: number) => {
            text += res[id] + (value?.length - 1 !== index ? ", " : "");
          });
          text = text?.replace("ner", "");
          text = text?.replace("entary", "");
          text = text?.replace("ermediate", "");
          text = text?.replace("mediate", "");
          text = text?.replace("mediate", "");
          return (
            <CellWrapper>{text.includes("undefined") ? "-" : text}</CellWrapper>
          );
        },
      },
      {
        title: <TableHeading>Day type</TableHeading>,
        dataIndex: "group_type_id",
        render: (value: any, record: any, index: number) => {
          const day = days?.filter((d: any) => d?.value === String(value))[0];
          return <CellWrapper>{day?.label || "-"}</CellWrapper>;
        },
      },
      {
        title: <TableHeading>Year</TableHeading>,
        dataIndex: "year",
        render: (value: any, record: any, index: number) => {
          return <CellWrapper>{value}</CellWrapper>;
        },
      },
      {
        dataIndex: "month",
        title: <TableHeading>Month</TableHeading>,
        render: (value: any, record: any, index: number) => {
          return (
            <CellWrapper>
              {moment()
                .month(value - 1)
                .format("MMMM")}
            </CellWrapper>
          );
        },
      },
      {
        title: <TableHeading>Main</TableHeading>,
        dataIndex: "data",
        render: (value: any, record: any, index: number) => {
          const date = value?.dates[EXAM_PARTS.MAIN];
          return <CellWrapper>{moment(date).format(dateFormat)}</CellWrapper>;
        },
      },
      {
        title: <TableHeading>Speaking</TableHeading>,
        dataIndex: ["data", "dates"],
        render: (value: any, record: any, index: number) => {
          const date = value[EXAM_PARTS.SPEAKING];
          return <CellWrapper>{moment(date).format(dateFormat)}</CellWrapper>;
        },
      },
    ];
  }, [level]);
};

export default Columns;
