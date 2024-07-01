import React from "react";
import { Circle, Wrapper } from "./style";
import { Collapse } from "antd";
import { ChevronLeftSvg, SettingsSvg } from "@jasurbekyuldashov/lms-web-icons";
import { RedBadgeTitle } from "components";
import Content from "./components/content";
import { IType } from "./type";
import { getDayLength } from "./components/getDayLength";

const PotentialGroups = ({
  data,
  day_id,
  potentialGroups,
  initValue,
  isLoading,
}: IType) => {
  const length = getDayLength({ potentialGroups, day_id });
  return (
    <Wrapper>
      <Collapse
        defaultActiveKey={["1"]}
        ghost
        items={[
          {
            key: "1",
            label: <RedBadgeTitle title="Potential groups" count={length} />,
            children: (
              <Content
                data={data}
                day_id={day_id}
                potentialGroups={potentialGroups}
                initValue={initValue}
                isLoading={isLoading}
              />
            ),
            extra: <SettingsSvg />,
          },
        ]}
        expandIcon={({ isActive }) => (
          <Circle isActive={isActive}>
            <ChevronLeftSvg width={16} height={10} />
          </Circle>
        )}
      />
    </Wrapper>
  );
};

export default PotentialGroups;
