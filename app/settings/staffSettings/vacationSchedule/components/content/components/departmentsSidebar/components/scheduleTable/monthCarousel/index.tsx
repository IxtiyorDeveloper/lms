import React from "react";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";

const YearMonthCarousel = () => {
  const generateDates = () => {
    const startDate = moment().subtract(5, "years");
    const endDate = moment();
    const dates = [];

    let currentDate = moment(startDate);

    while (currentDate.isSameOrBefore(endDate)) {
      dates.push(moment(currentDate));
      currentDate.add(1, "month");
    }

    return dates;
  };

  return (
    <div>
      <Swiper spaceBetween={10} slidesPerView={1}>
        {generateDates().map((date) => (
          <SwiperSlide key={date.format("YYYY-MM")}>
            <div>
              <h2>{date.format("MMMM YYYY")}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default YearMonthCarousel;
