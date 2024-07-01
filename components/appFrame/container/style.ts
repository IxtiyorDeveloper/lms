import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Content = styled.div`
  padding-top: 72px;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 100vh;
  width: 100%;

  .sidebarContainer {
    width: 220px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: ${bgColors.dark};
    color: ${textColors.white};
    /* z-index: 999; */

    .scrollHide {
      ::-webkit-scrollbar {
        width: 0; /* Remove scrollbar space */
        background: transparent; /* Optional: just make scrollbar invisible */
      }
      /* Optional: show position indicator in red */
      ::-webkit-scrollbar-thumb {
        background: transparent;
      }
    }
  }

  .mainBlock {
    width: calc(100% - 220px);
    left: 220px;
    position: relative;
    background-color: ${bgColors.dark};

    .childContent {
      background-color: ${bgColors.hat};
      min-height: 100vh;
      border-radius: 40px 0 0 40px;
      position: relative;
      padding-bottom: 100px;
      display: flex;
    }
  }
`;
