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
import { TSelectMonth } from "../selectMonth/type";
import { ArrowSelect180Svg, ArrowSelectSvg } from "../../elements";
import { textColors } from "styles/theme";
import "moment/locale/en-gb";

moment.locale("en-gb");

const n = 120;
const MonthCard = forwardRef((props: TSelectMonth, ref) => {
  const { initValue, onChange } = props;

  const [currentMonthIndex, setCurrentMonthIndex] = useState(n);

  const months: string[] = [];
  const swiperRef = useRef<SwiperType>(null);

  const nextMonthsCount = props?.nextMonthsCount || 0;

  const params = useMemo(() => {
    let currentDate = moment();
    let nextDate = nextMonthsCount
      ? moment(currentDate).add(nextMonthsCount, "month")
      : currentDate;

    for (let i = 0; i < n; i++) {
      months.unshift(nextDate.format("MMMM YYYY"));
      nextDate = nextDate.subtract(1, "months");
    }
    return {
      centeredSlides: true,
      initialSlide:
        months?.findIndex(
          (month) =>
            moment(month, "MMMM YYYY").diff(
              moment(initValue, "MMMM YYYY"),
              "months"
            ) === 0
        ) ?? currentMonthIndex,
    };
  }, [months, currentMonthIndex]);
  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };
  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const init = () => {
    swiperRef.current?.slideTo(
      months?.findIndex(
        (month) =>
          moment(month, "MMMM YYYY").diff(
            moment(initValue, "MMMM YYYY"),
            "months"
          ) === 0
      )
    );
  };

  useEffect(() => {
    if (initValue) {
      init();
    }
  }, [initValue]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      initValue ? init() : setCurrentMonthIndex(n);
    },
  }));

  return (
    <Wrapper style={props.style} className={props.className}>
      <Previous onClick={handlePrev}>
        <ArrowSelectSvg />
      </Previous>
      <Swiper
        spaceBetween={0}
        slidesPerView="auto"
        modules={[Navigation]}
        className="unit_card_carousel_swiper"
        onSlideChange={(swiper) => {
          setCurrentMonthIndex(swiper?.realIndex);
          onChange?.(months[swiper.realIndex]);
        }}
        onBeforeInit={(swiper: any) => {
          // @ts-ignore
          swiperRef.current = swiper;
        }}
        {...params}
      >
        {months.map((item, index) => (
          <SwiperSlide key={index} className="swiper_element">
            <div className="month">
              <p>{item}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Next onClick={handleNext}>
        <ArrowSelect180Svg
          color={
            currentMonthIndex === n - 1 ? textColors.brotherBlue : undefined
          }
        />
      </Next>
    </Wrapper>
  );
});

export default MonthCard;
const date = moment(moment.utc() || new Date());
MonthCard.defaultProps = {
  initValue: moment(`${date.year()} ${date.month() + 1}`, "YYYY MM").format(
    "MMMM YYYY"
  ),
};
