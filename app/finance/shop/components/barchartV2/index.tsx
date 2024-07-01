import React, { Fragment, useCallback, useMemo } from "react";
import { CustomTooltip, TooltipTitleWrapper, Wrapper } from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import _ from "lodash";
import { bgColors, fontSizes } from "styles/theme";
import { AntdBadge, CircleImage } from "components";
import { Empty, Flex, Tooltip } from "antd";
import { IStockCategory } from "types";

const BarChartV2 = ({
  data,
  chartBg,
}: {
  data?: IStockCategory[];
  withLabel?: boolean;
  withAvatar?: boolean;
  chartBg?: string;
}) => {
  const products = data?.[0]?.products;

  const max: number = useMemo(
    () => _.maxBy(products, "count")?.count || 0,
    [data]
  );

  const render = useCallback(() => {
    return (
      <Fragment key={Math.random()}>
        {_.chunk(
          _.sortBy(products, (e) => -e.count),
          15
        ).map((item, index) => {
          return (
            <SwiperSlide
              key={"slide" + index}
              style={{
                height: "100%",
                alignSelf: "flex-end",
                marginTop: "auto!important",
                paddingTop: "auto",
              }}
            >
              <div className="flex" style={{ marginTop: "auto" }}>
                {item.map((item, index) => (
                  <CustomTooltip
                    key={"item_key_" + index}
                    title={
                      <TooltipTitleWrapper>
                        <div className="card">
                          <div>
                            <CircleImage src={item.cover_photo} />
                          </div>
                          <div className="w-100">
                            <div className="name">{item.name}</div>
                            <div className="category">{data?.[0]?.name}</div>
                          </div>
                          <div>
                            <AntdBadge content={item.count} showZero />
                          </div>
                        </div>
                        {item.variations?.length > 0 && (
                          <div>
                            <div className="options">Product options</div>
                            <div className="cards">
                              {item.variations.map((e) => {
                                return (
                                  <div className="card">
                                    <div className="container">
                                      {e?.optionsValue?.map((option) => {
                                        return (
                                          <div className="item">
                                            <div>{option.property}:</div>
                                            <div className="white">
                                              {option.option}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div>
                                      <AntdBadge content={e.count} showZero />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </TooltipTitleWrapper>
                    }
                    placement="right"
                    color={bgColors.black}
                    destroyTooltipOnHide
                    overlayInnerStyle={{
                      width: "273px",
                    }}
                  >
                    <div key={Math.random()} className="element">
                      <Flex vertical align="center" gap={6}>
                        <CircleImage src={item.cover_photo} />
                        <Tooltip title={<div>{item.name}</div>}>
                          <div className="title">{item.name}</div>
                        </Tooltip>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: fontSizes.f20,
                            lineHeight: "19px",
                            marginBottom: 8,
                          }}
                        >
                          {item.count}
                        </div>
                      </Flex>
                      <div
                        className="swiper_element"
                        style={{
                          height: `${(+item.count * 180) / +max || 0.0}px`,
                          minHeight: "3px",
                        }}
                      />
                    </div>
                  </CustomTooltip>
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
        }}
      >
        <div className="swiper">
          {(products?.length || 0) > 0 ? (
            render()
          ) : (
            <Empty style={{ marginTop: "50px" }} />
          )}
        </div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </Wrapper>
  );
};

export default BarChartV2;
