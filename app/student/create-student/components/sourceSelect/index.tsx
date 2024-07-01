import { ChevronLeftSvg, ChevronRightSvg, ErrorLabel } from "components/index";
import React, { FC } from "react";
import { Wrapper, Label, Content, Box, Inner } from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  A11y,
  Autoplay,
  Controller,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper";
import { Controller as FormController } from "react-hook-form";
import { TSourceSelect } from "./type";
import Image from "next/image";
import { Flex, Radio } from "antd";
import { bgColors } from "styles/theme";

SwiperCore.use([
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
  Controller,
  A11y,
]);
const SourceSelect: FC<TSourceSelect> = ({
  control,
  name,
  error,
  data,
  size,
  navigation,
}) => {
  const swiperRef = React.useRef<any>(null);

  const handlePrev = () => {
    swiperRef?.current?.slidePrev();
  };
  const handleNext = () => {
    swiperRef?.current?.slideNext();
  };

  return (
    <Wrapper>
      <Flex justify="space-between">
        <Label>
          <div className="p">Source</div>
          <div className="num">{data?.length}</div>
        </Label>
        {navigation && (
          <Flex gap={10}>
            <div className="icon" onClick={handlePrev}>
              <ChevronLeftSvg width={16} height={16} color={bgColors.slate} />
            </div>
            <div className="icon" onClick={handleNext}>
              <ChevronRightSvg
                width={16}
                height={16}
                // color={bgColors.sadet}
              />
            </div>
          </Flex>
        )}
      </Flex>
      <FormController
        control={control}
        render={({ field }) => {
          return (
            <Content>
              <Swiper
                ref={swiperRef}
                slidesPerView="auto"
                spaceBetween={14}
                modules={[Navigation]}
                onBeforeInit={(swiper: any) => {
                  if (swiperRef?.current) {
                    // @ts-ignore
                    swiperRef.current = swiper;
                  }
                }}
              >
                {data?.map((item, index) => {
                  const active = field.value == item.id;
                  return (
                    <SwiperSlide
                      key={`source_select_${index}`}
                      onClick={() => field?.onChange(item.id)}
                    >
                      <Inner>
                        <Box
                          active={active}
                          key={index}
                          size={size}
                          className="box"
                        >
                          <div className="imageContainer">
                            <Image
                              src={
                                item?.iconFile?.full_url || "/group/image.png"
                              }
                              width={32}
                              height={32}
                              alt={`image_${index}`}
                            />
                          </div>
                          <p>{item.title || item.name}</p>
                        </Box>
                        {/* {active && (
                          // <div
                          //   style={{
                          //     position: "absolute",
                          //     right: "10px",
                          //     top: "10px",
                          //   }}
                          // >
                          //   <ComeSvg
                          //     width={size == "small" ? 16 : 16}
                          //     height={size == "small" ? 16 : 26}
                          //   />
                          // </div> */}
                        <div
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "10px",
                          }}
                        >
                          <Radio checked={active} />
                        </div>
                        {/* )} */}
                      </Inner>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Content>
          );
        }}
        name={name}
      />
      {error && <ErrorLabel error={error} />}
    </Wrapper>
  );
};
export default SourceSelect;
