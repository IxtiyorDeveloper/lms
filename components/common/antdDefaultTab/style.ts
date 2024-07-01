import styled from "@emotion/styled";
import { Tabs } from "antd";

export const Wrapper = styled.div<{ tabPlace: "left" | "right" }>`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: ${(props) =>
    props.tabPlace === "left" ? "row" : "row-reverse"};

  .mainTabs {
    flex: 1;
  }
  .action {
    position: absolute;
    right: 0;
  }
`;

export const StyledTabs = styled(Tabs)``;
