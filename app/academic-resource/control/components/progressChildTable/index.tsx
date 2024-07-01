import React from "react";
import { IArsProgress, IArsUserProfile } from "types";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from "moment";
import Router, { useRouter } from "next/router";
import { Wrapper } from "./style";
import { useAcademicControlGroups } from "hooks/useAcademicControl";
import { Spin } from "antd/lib";
import { TYPE_SUPPORT } from "constants/teacher";

interface IProps {
  data: IArsUserProfile;
  width: number;
}

const ProgressChildTable = ({ data, width }: IProps) => {
  const maxWidth = `${width - 100}px`;
  const router = useRouter();
  const { data: groups, isLoading } = useAcademicControlGroups({
    query_params: {
      mode:
        router.query.teacherSupportKey != TYPE_SUPPORT ? "teacher" : "support",
      expand: "branch,parentLevel,level,lessonDay,lessonTime,group",
      year: router.query.year,
      month: router.query.month,
      teacher_id:
        router.query.teacherSupportKey != TYPE_SUPPORT ? data?.id : undefined,
      support_id:
        router.query.teacherSupportKey != TYPE_SUPPORT ? undefined : data?.id,
    },
  });
  return (
    <Spin spinning={isLoading}>
      <Wrapper className="groups" width={maxWidth}>
        <Swiper
          preventInteractionOnTransition
          slidesPerView={(width - 200) / 200}
          spaceBetween={14}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          style={{ padding: "10px" }}
        >
          {(groups || [])
            // .sort((a, b) =>
            //     moment(a?.group?.lessonTime?.time, "HH:mm:ss").diff(
            //         moment(b?.group?.lessonTime?.time, "HH:mm:ss")
            //     )
            // )
            ?.map((e, index) => {
              return (
                <SwiperSlide
                  className="item item-green"
                  key={index}
                  onClick={() => Router.push(`/groups/${e.group_id}`)}
                >
                  <div className="group-name">
                    <div className="title">{e.group?.name}</div>
                    <div className={`count ${e.progress >= 80 ? "" : "red"}`}>
                      {e.progress}%
                    </div>
                  </div>
                  <div className="divider" />
                  <div className="event-wrap">
                    <span className="day">{e?.lessonDay?.name}</span>
                    <span className="time">
                      {moment(e?.lessonTime?.time, "HH:mm:ss").format("HH:mm")}
                    </span>
                  </div>
                  <div className="level-wrap">
                    <div className="parent-level">{e?.parentLevel?.name}</div>
                    <div className="level">{e?.level?.name}</div>
                  </div>
                </SwiperSlide>
              );
            })}
          <SwiperSlide key="last_item"></SwiperSlide>

          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </Wrapper>
    </Spin>
  );
};

export default ProgressChildTable;
