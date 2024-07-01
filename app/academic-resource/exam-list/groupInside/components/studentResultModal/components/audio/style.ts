import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 26px 12px;
  background: ${bgColors.skyLighter};
  border-radius: 16px;
  position: relative;
  div:nth-of-type(2) {
    width: calc(100% - 100px);
    position: relative;
  }
  .laoding {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
  }
  .play_pause_btn {
    max-width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${bgColors.primary};
    border-radius: 8px;
    padding: 6px;
    cursor: pointer;
  }
  .wavesurver {
    width: 246px;
  }
`;
