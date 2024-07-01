import React, { FC } from "react";
import { Arrow, Wrapper } from "./style";
import { useRouter } from "next/router";
import { AntdTable, Cell, CircleImage, ArrowSvg } from "components";
import { Progress } from "antd";
import { useTableExpand } from "hooks";
import { bgColors } from "styles/theme";
import { getRowNumber } from "utils/getRowNumber";
import { IRanking } from "types";
import Tabs, { teacherClassValues } from "./components/tabs";
import Link from "next/link";
import _ from "lodash";
import { fixedNumber } from "utils/functions/fixedNumber";
import Points from "../../../[staffId]/home/components/points";

interface IProps {
  counts: { [key: string]: number };
  data?: IRanking[];
}

const RankingTable: FC<IProps> = ({ data, counts }) => {
  const router = useRouter();
  const { onRowClick, expandedRowKeys } = useTableExpand({ expandKey: "id" });
  const classType = router.query.class || "100";
  const type = router.query.type || "100";
  const bool =
    router.query.type != "200" && !router.query.sort && !router.query.status;
  const addCount =
    !bool || router.query.status == "true"
      ? 0
      : type === "100"
        ? teacherClassValues.a == classType
          ? 0
          : classType == teacherClassValues.b
            ? counts?.[teacherClassValues.a]
            : counts?.[teacherClassValues.a] + counts?.[teacherClassValues.b]
        : 0;

  const init = (router.query.class as string) || "100";
  const field: string = (
    router.query.sort
      ? (router.query.sort.slice(1, router.query.sort.length) as string)
      : "overall"
  ) as keyof IRanking;
  const max = _.maxBy(data, (e) => +(e[field as keyof IRanking] || 0))?.[
    field as keyof IRanking
  ] as number;
  const renderRowSubComponent = React.useCallback(
    ({ row }: any) => (
      <div style={{ padding: "20px 24px" }}>
        <Points teacherId={row.original?.base_mentor_id} />
      </div>
    ),
    [],
  );

  return (
    <Wrapper isTabsVisible={!router.query.sort}>
      <Tabs init={init} counts={counts} />
      <AntdTable
        showHeader={false}
        columns={[
          {
            title: null,
            width: "15%",
            render: (value, record, index) => {
              const id = getRowNumber({
                index,
              });
              const isExpanded = expandedRowKeys?.includes(record?.id);
              return (
                <Cell style={{ display: "flex", paddingLeft: "14px" }}>
                  {addCount + id}
                  <Arrow isOpen={isExpanded}>
                    <ArrowSvg
                      color={bgColors.yourShadow}
                      width={12}
                      height={12}
                    />
                  </Arrow>
                  <CircleImage
                    count={record?.countObservations}
                    src={value?.avatar}
                  />
                  <Link
                    href={{
                      pathname: `/ranking/${record?.base_mentor_id}`,
                      query: {
                        year: router.query.year,
                        month: router.query.month,
                        type: router.query.type,
                      },
                    }}
                  >
                    {value?.fullName}
                  </Link>
                </Cell>
              );
            },
            dataIndex: ["mentor", "userProfile"],
          },
          {
            title: null,
            width: "92%",
            render: (value: any, record: IRanking) => {
              const percent = +(record[field as keyof IRanking] || 0);
              return (
                <Cell>
                  <Progress
                    percent={max ? (percent * 100) / max : 0}
                    strokeColor={
                      !!router.query.sort ||
                      router.query.type == "200" ||
                      classType == "100"
                        ? bgColors.midori
                        : classType == "200"
                          ? bgColors.primary
                          : bgColors.orange
                    }
                    strokeWidth={12}
                    format={() => (
                      <div className="percent">
                        {fixedNumber(percent)}%{" "}
                        <div className="ml">
                          {init == "100" && router.query.sort == "-exam_total"
                            ? record.exam_group_count > 1
                              ? `${record.exam_group_count} groups`
                              : `${record.exam_group_count} group`
                            : ""}
                        </div>
                      </div>
                    )}
                  />
                </Cell>
              );
            },
            dataIndex: [],
          },
        ]}
        dataSource={
          bool
            ? data
                ?.filter((e) => e.class == +init)
                .sort((a, b) => b.overall - a.overall)
            : router.query.sort == "-offence_total"
              ? _.sortBy(data, (e) => -e.offence_total)
              : router.query.sort == "-lost_total"
                ? _.sortBy(data, (e) => e.lost_total)
                : router.query.sort == "-exam_total"
                  ? _.sortBy(data, (e) => -e.exam_total)
                  : router.query.sort == "-progress_total"
                    ? _.sortBy(data, (e) => -e.progress_total)
                    : !router.query.sort && !router.query.status
                      ? data?.sort((a, b) => b.overall - a.overall)
                      : data
        }
        expandable={{
          expandedRowRender: (record: any) =>
            renderRowSubComponent({ row: { original: record } }),
          expandedRowKeys,
          expandIcon: () => null,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              onRowClick({ id: record?.id });
            },
          };
        }}
      />
    </Wrapper>
  );
};

export default RankingTable;
