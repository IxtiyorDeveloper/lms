import React, { Fragment, useCallback, useMemo } from "react";
import { Wrapper } from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import _ from "lodash";
import { fontSizes } from "styles/theme";
import { CircleImage } from "components";
import { Flex } from "antd";
import { IAbsentStudentByMentor } from "types/absentStudents";

const BarChartV2 = ({
  data,
  chartBg,
}: {
  data: IAbsentStudentByMentor[] | undefined;
  withLabel?: boolean;
  withAvatar?: boolean;
  chartBg?: string;
}) => {
  const max = useMemo(() => _.maxBy(data, "abs_count")?.abs_count || 0, [data]);

  const render = useCallback(() => {
    return (
      <Fragment key={Math.random()}>
        {_.chunk(data, 15).map((item, index) => {
          return (
            <SwiperSlide
              key={Math.random()}
              style={{
                height: "100%",
                alignSelf: "flex-end",
                marginTop: "auto!important",
                paddingTop: "auto",
              }}>
              <div className="flex" style={{ marginTop: "auto" }}>
                {item.map((item, index) => (
                  <div key={Math.random()} className="element">
                    <Flex vertical align="center" gap={6}>
                      <CircleImage src={item.user?.userProfile?.avatar} />
                      <div
                        style={{
                          fontWeight: 300,
                          fontSize: fontSizes.f10,
                          whiteSpace: "nowrap",
                          textAlign: "center",
                        }}>
                        {item?.user?.userProfile?.firstname}{" "}
                        {item?.user?.userProfile?.lastname?.slice(0, 1)}
                      </div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: fontSizes.f20,
                          lineHeight: "19px",
                          marginBottom: 8,
                        }}>
                        {item.abs_count}
                      </div>
                    </Flex>

                    <div
                      className="swiper_element"
                      style={{
                        height: `${(+item.abs_count * 50) / +max || 150}px`,
                        minHeight: "3px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </SwiperSlide>
          );
        })}
      </Fragment>
    );
  }, [data]);

  return (
    <Wrapper chartBg={chartBg}>
      <Swiper
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}>
        <div className="swiper">{render()}</div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </Wrapper>
  );
};

export default BarChartV2;
