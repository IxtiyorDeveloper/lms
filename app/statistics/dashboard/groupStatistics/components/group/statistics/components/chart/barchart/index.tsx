import React, { useCallback, useMemo } from "react";
import {
  Wrapper,
  Element,
  Top,
  SwiperElement,
  Bottom,
  Container,
  Text,
} from "./style";
import _ from "lodash";
import { Empty, Flex } from "antd";
import { IGroupStatisticsData } from "types";

const BarChartV2 = ({
  data,
  chartBg,
}: {
  data: IGroupStatisticsData[];
  withLabel?: boolean;
  withAvatar?: boolean;
  chartBg?: string;
}) => {
  const max = useMemo(
    () => _.maxBy(data, "num_groups")?.num_groups || 0,
    [data],
  );

  const render = useCallback(() => {
    return (
      <Container>
        {data?.map((item, index) => {
          return (
            <Element key={Math.random()}>
              <Flex vertical align="center" gap={6}>
                <Top>{item.num_groups}</Top>
              </Flex>
              <SwiperElement
                chartBg={chartBg}
                style={{
                  height: `${(+item.num_groups * 180) / +max || 150}px`,
                  minHeight: "3px",
                  maxHeight: `${85 - index * 3}%`,
                }}
              />
              <Bottom>
                <Text>{item.num_students}</Text>
                <Text>
                  {item.num_students === null ? (
                    <pre>Full & +</pre>
                  ) : (
                    "students"
                  )}
                </Text>
              </Bottom>
            </Element>
          );
        })}
      </Container>
    );
  }, [data]);

  if (!!data?.length) {
    return <Wrapper>{render()}</Wrapper>;
  } else {
    return (
      <Wrapper>
        <Empty />
      </Wrapper>
    );
  }
};

export default BarChartV2;
