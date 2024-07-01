import React, { useCallback, useMemo } from "react";
import {
  Wrapper,
  Element,
  Top,
  SwiperElement,
  Details,
  Container,
  TopDetails,
  FullName,
  Bars,
} from "./style";
import _ from "lodash";
import { Empty } from "antd";
import { CircleImage } from "components";
import { Swiper, SwiperSlide } from "swiper/react";

const BarChartV2 = ({
  data,
  chartBg,
}: {
  data:
    | {
        year: number;
        month: number;
        full_url: string;
        full_name: string;
        count: number;
        avatar: string;
        green_balance: number;
        total_balance: number;
        current_balance: number;
      }[]
    | undefined;
  chartBg?: string;
}) => {
  const sorted = data?.sort((a, b) => +b.total_balance - +a.total_balance);

  const max = useMemo(() => {
    const maxAverage = _.maxBy(data, (item) => parseFloat(`${item.count}`));
    return maxAverage ? parseFloat(`${maxAverage.count}`) : 0;
  }, [data]);

  const render = useCallback(() => {
    return (
      <Container>
        {_.chunk(sorted, 15).map((item, index) => {
          return (
            <SwiperSlide
              key={Math.random()}
              style={{
                height: "100%",
                alignSelf: "flex-end",
                marginTop: "auto!important",
                paddingTop: "auto",
              }}
            >
              <Bars>
                {item?.map((item, index) => {
                  return (
                    <Element key={Math.random()}>
                      <Details>
                        <TopDetails>
                          <CircleImage src={{ full_url: item.avatar }} />
                          <FullName>{item?.full_name}</FullName>
                        </TopDetails>
                        <Top>{item.count}</Top>
                      </Details>
                      <SwiperElement
                        chartBg={chartBg}
                        style={{
                          height: `${(+item.count * 180) / +max}px`,
                          minHeight: "3px",
                        }}
                      />
                    </Element>
                  );
                })}
              </Bars>
            </SwiperSlide>
          );
        })}
      </Container>
    );
  }, [data]);

  if (!!data?.length) {
    return (
      <Wrapper>
        <Swiper
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
        >
          <div className="swiper">{render()}</div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Empty />
      </Wrapper>
    );
  }
};

export default BarChartV2;
