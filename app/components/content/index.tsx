import React from "react";
import { useRouter } from "next/router";
import { Wrapper } from "./style";
import RenderSecondComponents from "./components/secondPart";
import RenderFirstComponents from "./components/firstPart";
import RenderThirdComponent from "./components/third";

const Content = () => {
  const router = useRouter();
  const activeComponent = router.query?.component ?? "AbsMergedWithUnit";
  const components = {
    ...RenderFirstComponents(),
    ...RenderSecondComponents(),
    ...RenderThirdComponent(),
  };
  return (
    <Wrapper>{components[activeComponent as keyof typeof components]}</Wrapper>
  );
};

export default Content;
