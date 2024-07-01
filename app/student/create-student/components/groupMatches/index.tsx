import React, { FC } from "react";
import { Item, Wrapper } from "./style";
import { DoubleUserSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors, textColors } from "styles/theme";
import { useAdminStudentRecommendedGroups } from "hooks";
import { Spin } from "antd";

interface IProps {
  watch: any;
}

const GroupMatches: FC<IProps> = ({ watch }) => {
  const root = watch("root");
  const { data, isFetching } = useAdminStudentRecommendedGroups({
    query_params: {
      ...root,
      types: [100, 200],
      level_id: root.sub_level_id,
      sub_level_id: undefined,
      note: undefined,
    },
    enabled: !!root.sub_level_id,
  });
  const l100 = data?.["100"]?.length || 0;
  const l200 = data?.["200"]?.length || 0;
  const bool1 = l100 > 0;
  const bool2 = l200 > 0;

  return (
    <Spin spinning={isFetching}>
      <Wrapper>
        <Item
          textColor={textColors.white}
          opacity={bool1 ? 1 : 0.4}
          color={bgColors.midori}
          className="item"
        >
          <div className="info-box">
            <div className="index">{l100}</div>
            <div className="info midori">Fully match groups</div>
          </div>
          <div>
            <DoubleUserSvg color={bgColors.white} />
          </div>
        </Item>
        <Item
          opacity={bool2 ? 1 : 0.4}
          color={bgColors.primary}
          className="item"
        >
          <div className="info-box">
            <div className="index">{l200}</div>
            <div className="info">Partially match groups</div>
          </div>
          <div>
            <DoubleUserSvg />
          </div>
        </Item>
      </Wrapper>
    </Spin>
  );
};

export default GroupMatches;
