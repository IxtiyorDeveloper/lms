import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  A11y,
  Autoplay,
  Controller,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper";
import Image from "next/image";
import { SourceType } from "./type";
import { Tooltip } from "antd";
import { Wrapper, Label, Content, Box, Inner } from "./style";

SwiperCore.use([
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
  Controller,
  A11y,
]);
const SourceSelect = ({ slug, data }: SourceType) => {
  return (
    <Wrapper>
      <Label>
        <div className="p">Source</div>
      </Label>

      <Content>
        <Swiper slidesPerView="auto" spaceBetween={25}>
          {data?.map((item, index) => {
            return (
              <SwiperSlide key={`source_select_${index}`}>
                <Inner>
                  <Box key={index}>
                    <div className="imageContainer">
                      <Image
                        src={item?.iconFile?.full_url || "/student/image.png"}
                        width={30}
                        height={30}
                        alt={`image_${index}`}
                      />
                    </div>
                    <Tooltip
                      destroyTooltipOnHide
                      title={`${slug}/${item.slug}`}
                      placement={"bottom"}
                    >
                      <p >{item.name}</p>
                    </Tooltip>
                  </Box>
                </Inner>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Content>
    </Wrapper>
  );
};
export default SourceSelect;
