import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  height: 54px;
  padding-left: 20px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  width: 100%;
  justify-content: space-between;

  .left-content {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .item {
    background: ${bgColors.primary};
    box-shadow: inset 0 -1px 1px rgba(0, 0, 0, 0.04),
      inset 0 2px 2px rgba(255, 223, 63, 0.8);
    border-radius: 10px;
    width: 44px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .actions-side {
    display: flex;
    gap: 10px;

    .btn {
      background: ${bgColors.whiteSmoke};
    }
  }
`;
