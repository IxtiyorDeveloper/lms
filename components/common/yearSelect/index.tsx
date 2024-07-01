import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType, Navigation } from "swiper";
import { Next, Previous, Wrapper } from "./style";
import moment from "moment";
import { ArrowSelect180Svg, ArrowSelectSvg } from "../../elements";
import { textColors } from "styles/theme";
import "moment/locale/en-gb";
import { TSelectYear } from "./type";

moment.locale("en-gb");

const n = 120;
const YearCard = forwardRef((props: TSelectYear, ref) => {
  const { initValue, onChange } = props;

  const [currentYearIndex, setCurrentYearIndex] = useState(n);

  const years: string[] = [];
  const swiperRef = useRef<SwiperType>(null);

  const nextYearsCount = props?.nextYearsCount || 0;

  const params = useMemo(() => {
    let currentYear = moment().year();
    let nextYear = nextYearsCount ? currentYear + nextYearsCount : currentYear;

    for (let i = 0; i < n; i++) {
      years.unshift(nextYear.toString());
      nextYear--;
    }
    return {
      centeredSlides: true,
      initialSlide:
        years?.findIndex((year) => year === initValue) ?? currentYearIndex,
    };
  }, [years, currentYearIndex, initValue, nextYearsCount]);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const init = () => {
    swiperRef.current?.slideTo(years?.findIndex((year) => year === initValue));
  };

  useEffect(() => {
    if (initValue) {
      init();
    }
  }, [initValue]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      initValue ? init() : setCurrentYearIndex(n);
    },
  }));

  return (
    <Wrapper isDouble={props.isDouble} style={props.style}>
      <Previous onClick={handlePrev}>
        <ArrowSelectSvg />
      </Previous>
      <Swiper
        spaceBetween={0}
        slidesPerView="auto"
        modules={[Navigation]}
        className="unit_card_carousel_swiper"
        onSlideChange={(swiper) => {
          setCurrentYearIndex(swiper?.realIndex);
          onChange?.(years[swiper.realIndex]);
        }}
        onBeforeInit={(swiper: any) => {
          // @ts-ignore
          swiperRef.current = swiper;
        }}
        {...params}
      >
        {years.map((item, index) => (
          <SwiperSlide key={index} className="swiper_element">
            <div className="year">
              <p>{props.isDouble ? `${+item - 1}-${item}` : item}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Next onClick={handleNext}>
        <ArrowSelect180Svg
          color={
            currentYearIndex === n - 1 ? textColors.brotherBlue : undefined
          }
        />
      </Next>
    </Wrapper>
  );
});

export default YearCard;

const date = moment.utc();
YearCard.defaultProps = {
  initValue: date.year().toString(),
  isDouble: false,
};
