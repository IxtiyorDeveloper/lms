import React, { FC, Fragment, useEffect, useMemo } from "react";
import { SameCard } from "components";
import { GridContainer, SwiperWrapper, GridChildWrapper } from "./style";
import { IGridChild } from "./type";
import { SwiperSlide } from "swiper/react";
import SwiperCore, { Scrollbar, Navigation, Mousewheel } from "swiper";

import "swiper/swiper.min.css";

SwiperCore.use([Scrollbar, Navigation, Mousewheel]);
const GridChild: FC<IGridChild> = ({
  groups,
  main,
  setOpen,
  search,
  setCount,
}) => {
  const filteredGroups = useMemo(() => {
    const filtered = groups?.filter((e: any) => {
      // let a = `${e.name} ${e.status} ${e.teacher} ${e.note} ${e.branch} ${e.subLevelName}`;
      let a = `${e.name}`;
      return search?.length > 0
        ? a.toLowerCase().includes(search.toLowerCase())
        : true;
    });
    return filtered;
  }, [groups, search]);

  useEffect(() => {
    setCount?.(filteredGroups?.length ?? 0);
  }, [filteredGroups?.length]);

  return (
    <GridChildWrapper style={!main ? { overflow: "unset" } : {}}>
      <GridContainer
        style={
          main
            ? {}
            : {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              }
        }
      >
        {main ? (
          <SwiperWrapper
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            scrollbar={{ draggable: true, dragSize: 24 }}
            slidesPerView={5}
            spaceBetween={15}
            breakpoints={{
              100: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1260: {
                slidesPerView: 4,
              },
              1530: {
                slidesPerView: 5,
              },
            }}
            style={{ padding: "15px 0" }}
            mousewheel={{ forceToAxis: true }}
          >
            {filteredGroups?.map((group) => {
              return (
                <SwiperSlide style={{ paddingBottom: "15px" }}>
                  <SameCard setOpen={setOpen} group={group} />
                </SwiperSlide>
              );
            })}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </SwiperWrapper>
        ) : (
          <Fragment>
            {filteredGroups?.map((group) => {
              return <SameCard setOpen={setOpen} group={group} />;
            })}
          </Fragment>
        )}
      </GridContainer>
    </GridChildWrapper>
  );
};

export default GridChild;
