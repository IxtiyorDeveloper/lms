import React from "react";
import { IAcademicControl, IControlAttendanceData } from "types";
import { useAdminAcademicFallibleGetByGroup } from "hooks/useAcademicControl";
import { Swiper, SwiperSlide } from "swiper/react";
import Router, { useRouter } from "next/router";
import { Wrapper } from "./style";
import { TYPE_TEACHER } from "constants/teacher";
import { Spin } from "antd";
import { usePageDataMemo } from "hooks";

interface IProps {
  data: IControlAttendanceData | IAcademicControl;
  width: number;
}

const ChildTable = ({ data, width }: IProps) => {
  const router = useRouter();
  const selects = usePageDataMemo();
  const subLevelsNames = ["starts", "middles", "finals"];

  const getSubLevels = (label: "Start" | "Middle" | "Final") => {
    return selects.level.options?.map((r) => {
      return r.subLevel?.filter((l) => l.label === label)[0].value;
    });
  };

  const obj = {
    starts: getSubLevels("Start"),
    middles: getSubLevels("Middle"),
    finals: getSubLevels("Final"),
  };

  const getMultiLevel = (str?: string | string[]) => {
    if (!isNaN(Number(str))) {
      return str;
    }

    if (Array.isArray(str)) {
      let isAvailable = false;
      subLevelsNames.forEach((subLevel) => {
        if (str.includes(subLevel)) {
          isAvailable = true;
        }
      });

      if (isAvailable) {
        const sum = str.map((st) => {
          return obj[st as keyof typeof obj];
        });

        return sum.reduce((acc, curr) => acc?.concat(curr || []), []);
      }

      return str;
    }

    if (subLevelsNames.includes(str || "")) {
      return obj[str as keyof typeof obj];
    }
  };

  const { data: groupList, isLoading } = useAdminAcademicFallibleGetByGroup({
    query_params: {
      mentor_id: (data as IAcademicControl).user_id,
      mentor_type: router.query.mentor_type ?? TYPE_TEACHER,
      sub_level_id: getMultiLevel(router.query.sub_level_id) || "",
    },
    enabled: true,
    // enabled: !(data as IControlAttendanceData).groups,
  });
  const maxWidth = `${width - 100}px`;

  const groupListData =
    groupList || (data as IControlAttendanceData)?.groups || [];

  return (
    <Spin spinning={isLoading}>
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
    </Spin>
  );
};

export default ChildTable;
