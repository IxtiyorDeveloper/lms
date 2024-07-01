import React from "react";
import { Content, Wrapper, SegmentedWrapper, Line } from "./style";
import { Segmented } from "components";
import { useRouter } from "next/router";
import Operator from "./components/operator";
import Template from "./components/templates";
import { ECallSettingsTab } from "./type";

const menu = [
  {
    label: "Templates",
    value: ECallSettingsTab.templates,
  },
  {
    label: "Operators",
    value: ECallSettingsTab.operators,
  },
];
const CallSettings = () => {
  const router = useRouter();

  const initValue =
    router.query?.activeTab?.toString() || ECallSettingsTab.templates;

  const content = {
    [ECallSettingsTab.templates]: <Template />,
    [ECallSettingsTab.operators]: <Operator />,
  };

  return (
    <Wrapper>
      <Content>
        <SegmentedWrapper>
          <Segmented
            options={menu}
            routerKey="activeTab"
            initValue={initValue}
          />
        </SegmentedWrapper>
        <Line />
        {content[initValue as keyof typeof content]}
      </Content>
    </Wrapper>
  );
};

export default CallSettings;
