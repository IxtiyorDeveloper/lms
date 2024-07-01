import React from "react";
import { Wrapper, SegmentWrapper } from "./style";
import { Segmented } from "components";
import { useRouter } from "next/router";
import { ETabType } from "./type";
import ManualCall from "./components/manualCall";
import AutoCall from "./components/autoCall";

const TemplateTabs = () => {
  const router = useRouter();

  const menu = [
    {
      label: "Auto call",
      value: ETabType.auto_call,
    },
    {
      label: "Manual call",
      value: ETabType.manual_call,
    },
  ];

  const initValue = router.query?.call_tab?.toString() || ETabType.auto_call;

  const content = {
    [ETabType.auto_call]: <AutoCall />,
    [ETabType.manual_call]: <ManualCall />,
  };
  return (
    <Wrapper>
      <SegmentWrapper>
        <Segmented options={menu} routerKey="call_tab" initValue={initValue} />
      </SegmentWrapper>
      {content[initValue as keyof typeof content]}
    </Wrapper>
  );
};

export default TemplateTabs;
