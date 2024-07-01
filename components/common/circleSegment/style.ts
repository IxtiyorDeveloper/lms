import styled from "@emotion/styled";
import { Segmented } from "antd";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div<{ tabPlace: "left" | "right" }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: ${(props) =>
    props.tabPlace === "left" ? "row" : "row-reverse"};
`;
export const StyledSegment = styled(Segmented)`
  border-radius: 20px !important;
  background: ${bgColors.wildSand} !important;
  padding: 3px 2px;
  border: 0.5px solid ${bgColors.purpleCrystal};

  .ant-segmented-group {
    gap: 5px;
  }

  .ant-segmented-item {
    border-radius: 50% !important;
    width: 30px;
    height: 30px;
  }

  .ant-segmented-thumb {
    border-radius: 50% !important;
    width: 30px;
    height: 30px;
    background: white !important;
  }

  .ant-segmented-item-label {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50% !important;
    width: 30px;
    height: 30px;
  }

  .ant-segmented-item-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
