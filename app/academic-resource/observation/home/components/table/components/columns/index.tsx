import { AntdUserProfile, TableHeading, ArrowSvg } from "components";
import React from "react";
import { bgColors } from "styles/theme";
import { Amount, Flex, StarWrapper, Text } from "./style";
import { SharpStarSvg } from "@jasurbekyuldashov/lms-web-icons";
import { IMainObservation } from "types/observation";
import { getOrdinalSuffix } from "utils/getOrdinalSuffix";
import PercentageSortHeader from "./percentage";
import RankingPlaceSortHeader from "./rankingPlace";
import ObservationCountSortHeader from "./observationCount";
import OverallScoreSortHeader from "./overallScore";
import { generateClass } from "./generateClass";

const Columns = ({
  expandedRowKeys,
  type,
}: {
  expandedRowKeys: (string | number)[];
  type: string;
}) => {
  return [
    {
      title: (
        <TableHeading isId padding>
          Name
        </TableHeading>
      ),
      dataIndex: ["user", "userProfile"],
      render: (value: any, record: IMainObservation, index: number) => {
        const abs = generateClass({ record });

        return (
          <AntdUserProfile
            disabled
            props={record}
            propsValue={value}
            index={index}
            abs={abs}
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
      title: <PercentageSortHeader />,
      dataIndex: "overall",
      render: (value: any, record: any, index: number) => {
        return <Amount>{value}%</Amount>;
      },
    },
    {
      title: <RankingPlaceSortHeader />,
      dataIndex: "order",
      render: (value: any, record: any, index: number) => {
        const result = !!value ? `${value} ${getOrdinalSuffix(value)}` : "-";
        return <Amount>{result}</Amount>;
      },
    },
    {
      title: <ObservationCountSortHeader />,
      dataIndex: "countObservations",
      render: (value: any, record: any, index: number) => {
        return <Amount>{value}</Amount>;
      },
    },
    {
      title: <OverallScoreSortHeader />,
      dataIndex: "averageObservationScore",
      render: (value: any, record: any, index: number) => {
        return (
          <Flex>
            <Text>{value || 0}</Text>
            <StarWrapper>
              <SharpStarSvg color={bgColors.primary} width={20} height={20} />
            </StarWrapper>
          </Flex>
        );
      },
    },
  ];
};

export default Columns;
