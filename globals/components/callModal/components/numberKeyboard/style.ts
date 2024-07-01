import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div<{ isCollapsed: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px; /* optional */
  justify-content: space-between;
  margin-top: 10px;
  font-weight: 800;
  font-size: ${fontSizes.f16};
  line-height: 20px;
  letter-spacing: -0.01em;
  color: ${bgColors.whiteSmoke};
  background: ${bgColors.dark};
  border-radius: 20px;
  padding: ${(props) => (props.isCollapsed ? "10px" : "32px")} 10px;

  .item {
    display: grid;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    text-align: center;
    grid-gap: 6px;
    cursor: pointer;

    .desc {
      font-weight: 300;
      font-size: ${fontSizes.f12};
      line-height: 15px;
      letter-spacing: -0.01em;
      color: ${bgColors.yourShadow};
    }
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .call {
    width: 54px;
    height: 54px;
    background: ${bgColors.midori};
    box-shadow: inset 0 3.05px 6.1px ${bgColors.serengeti};
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin-left: 6px;
  }
`;
