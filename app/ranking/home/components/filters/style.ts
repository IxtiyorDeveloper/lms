import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  background: ${bgColors.wildSand};
  padding: 4px;
  gap: 2px;
  overflow-x: auto;
  //min-width: 70vw;

  .item {
    border-radius: 7.059px;
    display: flex;
    padding: 4.706px 9.412px;
    justify-content: center;
    align-items: center;
    gap: 7.059px;
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f12};
    font-weight: 700;
    line-height: 1.96;
    letter-spacing: -0.12px;
    flex-wrap: nowrap;
    white-space: nowrap;
  }

  .item.active {
    background: ${bgColors.primary};
    box-shadow: 0 4.70588px 9.41177px -4.70588px rgba(0, 0, 0, 0.25),
      0 2.35294px 0 0 rgba(255, 179, 35, 0.2) inset,
      0 -1.17647px 1.17647px 0 rgba(0, 0, 0, 0.04) inset;
  }

  .item:hover {
    background: ${bgColors.purpleCrystal};
    box-shadow: 0 4.70588px 9.41177px -4.70588px ${bgColors.purpleCrystal},
      0 2.35294px 0 0 ${bgColors.purpleCrystal} inset,
      0 -1.17647px 1.17647px 0 ${bgColors.purpleCrystal} inset;
    transition: 0.3s;
  }

  .item.active:hover {
    background: ${bgColors.primary};
    box-shadow: 0 4.70588px 9.41177px -4.70588px rgba(0, 0, 0, 0.25),
      0 2.35294px 0 0 rgba(255, 179, 35, 0.2) inset,
      0 -1.17647px 1.17647px 0 rgba(0, 0, 0, 0.04) inset;
  }
`;
export const Opacity = styled.div<{ isActive: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transition: 0.3s;
`;
