import React, { useMemo } from "react";
import { BWrapper, CreatedBy, Name, TText } from "./style";
import { Progress, Tooltip } from "antd";
import { AntdUserProfile, Cell, SortControl, TableHeading } from "components";
import { bgColors } from "styles/theme";
import { ArrowSvg } from "components";
import { IPodoReview } from "types/statistics/podoRequest";
import Image from "next/image";
import { usePageDataMemo } from "hooks";

const Columns = ({
  expandedRowKeys,
  control,
}: {
  expandedRowKeys: any;
  control: any;
}) => {
  const selects = usePageDataMemo();

  return useMemo(() => {
    return [
      {
        title: (
          <TableHeading isId padding>
            Progress
          </TableHeading>
        ),
        dataIndex: "progress",
        render: (value: any, record: IPodoReview, index: number) => {
          return (
            <AntdUserProfile
              disabled
              props={record}
              propsValue={{
                avatar: record?.reviewer?.userProfile?.avatar,
                fullName: `${record?.reviewer?.userProfile?.firstname} ${record?.reviewer?.userProfile?.lastname}`,
              }}
              index={index}
              // count={record?.average ?? record?.count ?? 0}
              middleRow={
                <div>
                  <ArrowSvg
                    width={16}
                    height={16}
                    color={bgColors.yourShadow}
                    style={{
                      transform: `rotate(${
                        expandedRowKeys?.includes(record?.id) ? 0 : -90
                      }deg)`,
                      transition: "0.3s",
                    }}
                  />
                </div>
              }
            />
          );
        },
      },
      {
        title: <TableHeading>Branch</TableHeading>,
        dataIndex: "createdBy",
        render: (value: any, record: IPodoReview, index: number) => {
          const showedBranchId = record?.reviewer?.branchIds?.[0]
            ? record?.reviewer?.branchIds?.[0]
            : "No branch";
          const branch = selects?.branch;
          const showedBranch = branch?.find(
            (b) => b?.value == showedBranchId,
          )?.label;
          const l = record?.reviewer?.branchIds?.length;
          return (
            <Cell>
              <Tooltip
                destroyTooltipOnHide
                title={() => {
                  return (
                    <div>
                      {record?.reviewer?.branchIds?.map((item, index) => {
                        return (
                          <TText key={index}>
                            {branch?.find((b) => b?.value == item)?.label}
                          </TText>
                        );
                      })}
                    </div>
                  );
                }}
              >
                <BWrapper>
                  <Image
                    src="/Location Pin.png"
                    alt="Location"
                    width={34}
                    height={34}
                  />
                  <div className="branch">{showedBranch}</div>
                  {l > 1 ? "..." : ""}
                </BWrapper>
              </Tooltip>
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Progress</TableHeading>,
        dataIndex: "createdBy",
        render: (value: any, record: IPodoReview, index: number) => {
          const percentage =
            (record?.doneReviewersCount * 100) / record?.allReviewersCount;
          return (
            <CreatedBy>
              <Progress
                type="circle"
                percent={percentage}
                format={() =>
                  `${record?.doneReviewersCount}/${record?.allReviewersCount}`
                }
                size={48}
                strokeWidth={7}
              />
            </CreatedBy>
          );
        },
      },
      {
        title: (
          <SortControl
            control={control}
            name="sort"
            field="percentage"
            label="In percent"
            className="column"
          />
        ),
        dataIndex: "createdBy",
        render: (value: any, record: any, index: number) => {
          const percentage = Number(
            (
              (record?.doneReviewersCount * 100) /
              record?.allReviewersCount
            ).toFixed(2),
          );
          return (
            <CreatedBy>
              <Name>{percentage}%</Name>
            </CreatedBy>
          );
        },
      },
    ];
  }, [selects]);
};

export default Columns;
