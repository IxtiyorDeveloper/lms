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
import { IMockExamDataTeacherData } from "types/exam/exam";
import { Swiper, SwiperSlide } from "swiper/react";

const BarChartV2 = ({
  data,
  chartBg,
}: {
  data: IMockExamDataTeacherData[] | undefined;
  chartBg?: string;
}) => {
  const sorted = data?.sort((a, b) => +b.average - +a.average);

  const max = useMemo(() => {
    const maxAverage = _.maxBy(data, (item) => parseFloat(item.average));
    return maxAverage ? parseFloat(maxAverage.average) : 0;
  }, [data]);

  const render = useCallback(() => {
    return (
      <Container>
        {_.chunk(sorted, 15).map((item, index) => {
          return (
            <SwiperSlide
              key={`main_sadasd${index}`}
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
                    <Element key={`child_sadasd${index}`}>
                      <Details>
                        <TopDetails>
                          <CircleImage src={{ full_url: item.avatar }} />
                          <FullName>{item?.name}</FullName>
                        </TopDetails>
                        <Top>{item.average}</Top>
                      </Details>
                      <SwiperElement
                        chartBg={chartBg}
                        style={{
                          height: `${(+item.average * 180) / +max}px`,
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
