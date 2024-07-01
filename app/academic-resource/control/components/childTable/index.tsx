import React from "react";
import { IAcademicControl, IControlAttendanceData } from "types";
import { useAcademicControlRedItemGroup } from "hooks/useAcademicControl";
import { Swiper, SwiperSlide } from "swiper/react";
import Router from "next/router";
import { Wrapper } from "./style";

interface IProps {
  data: IControlAttendanceData | IAcademicControl;
  width: number;
}

const ChildTable = ({ data, width }: IProps) => {
  const { data: groupList } = useAcademicControlRedItemGroup({
    query_params: {
      teacher_id: (data as IAcademicControl).user_id,
    },
    enabled: !(data as IControlAttendanceData).groups,
  });
  const maxWidth = `${width - 100}px`;
  const groupListData =
    groupList || (data as IControlAttendanceData)?.groups || [];
  return (
    <Wrapper className="groups" width={maxWidth}>
      <Swiper
        slidesPerView={(width - 200) / 200}
        spaceBetween={14}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        style={{ padding: "10px" }}
      >
        {groupListData.map((e, index) => {
          return (
            <SwiperSlide
              onClick={() => Router.push(`/groups/${e.group_id}`)}
              className="item"
              key={index}
            >
              <div className="group-name">
                <div className="title">{e.name}</div>
                <div className="count red">{e.count}</div>
              </div>
              <div className="divider" />
              <div className="level-wrap">
                <div className="parent-level">{e.parent_level}</div>
                <div className="level">{e.level}</div>
              </div>
            </SwiperSlide>
          );
        })}
        <SwiperSlide key="last_item"></SwiperSlide>

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </Wrapper>
  );
};

export default ChildTable;
