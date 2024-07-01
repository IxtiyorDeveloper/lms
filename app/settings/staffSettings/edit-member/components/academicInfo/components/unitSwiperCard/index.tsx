import { useEffect, useMemo } from "react";
import { Skeleton } from "antd";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { UnitSwiper } from "./style";
import { ChevronLeftSvg, ChevronRightSvg } from "components";
import { IArsTeacher } from "types/ars/teacher";

type Props = {
  units: IArsTeacher[] | undefined;
  level?: any;
  loading?: boolean;
  currentUnit?: IArsTeacher;
  month?: string;
};

const UnitSwiperCard = ({
  units,
  level,
  currentUnit,
  loading,
  month,
}: Props) => {
  const router = useRouter();
  const { unit, group_id, lesson_day_id } = router.query;
  const swiperUnitCardRef = useRef<any>(null);
  const isCurrentMonth = new Date().getMonth() + 1 == Number(month);

  const unitData = units
    ?.map((item) =>
      item?.units.map((unit) => ({
        id: unit?.group_unit_id,
        title: unit?.level?.name,
        date: item?.date,
        unit: `${unit?.parent_unit?.order}.${unit?.order}`,
      }))
    )
    .flat();

  const lastUnit = currentUnit?.units.at(-1);

  const selectedCurrentUnit = useMemo(() => {
    return (
      unitData?.find((item: any) => item.id == lastUnit?.group_unit_id) ??
      unitData?.[isCurrentMonth ? 0 : unitData?.length - 1]
    );
  }, [lastUnit?.group_unit_id, isCurrentMonth, unit, unitData]);

  let currentIndex = unitData?.findIndex(
    (item: any) => item.id === selectedCurrentUnit?.id
  );

  const handlePrev = () => {
    swiperUnitCardRef?.current?.slidePrev();
  };
  const handleNext = () => {
    swiperUnitCardRef?.current?.slideNext();
  };

  useEffect(() => {
    if (currentIndex && !loading) {
      swiperUnitCardRef?.current?.slideTo(currentIndex);
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            unit: unitData?.[currentIndex]?.id,
            unit_date: unitData?.[currentIndex]?.date,
          },
        },
        undefined,
        { scroll: false }
      );
    }
  }, [loading, group_id, lesson_day_id]);

  return (
    <UnitSwiper>
      <span onClick={handlePrev} className="prev">
        <ChevronLeftSvg width={12} height={12} />
      </span>
      <Swiper
        navigation={false}
        slidesPerView={1}
        ref={swiperUnitCardRef}
        className="unit_card_carousel_swiper"
        initialSlide={currentIndex}
        onSwiper={(swiper) => {
          swiperUnitCardRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          router.push(
            {
              pathname: router.pathname,
              query: {
                ...router.query,
                unit: unitData?.[swiper?.activeIndex]?.id,
                unit_date: unitData?.[swiper?.activeIndex]?.date,
              },
            },
            undefined,
            { scroll: false }
          );
        }}>
        {loading ? (
          <div className="swiper_element_skeleton">
            <Skeleton
              active
              paragraph={{ rows: 0 }}
              title={{
                width: 10,
              }}
            />
          </div>
        ) : (
          unitData?.map((item: any, index: number) => (
            <SwiperSlide key={index} className="swiper_element">
              <div className="unit_card">
                <div className="unit_card_title">
                  <p>
                    {level?.parent?.name}: {level?.name}
                  </p>
                </div>
                <h4 className="unit_card_unit">Unit {item.unit}</h4>
              </div>
            </SwiperSlide>
          ))
        )}

        {!loading && !unitData?.length && (
          <SwiperSlide className="swiper_element">
            <div className="unit_card">
              <div className="unit_card_title">
                {level?.parent?.name}. {level?.name}
              </div>
              <div className="unit_card_unit">No unit</div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      <span onClick={handleNext} className="next">
        <ChevronRightSvg width={12} height={12} />
      </span>
    </UnitSwiper>
  );
};

export default UnitSwiperCard;
