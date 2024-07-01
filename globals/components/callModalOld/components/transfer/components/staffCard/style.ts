import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  height: 84px;
  background: ${bgColors.dark};
  border-radius: 6px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  gap: 12px;

  div:nth-of-type(2) {
    width: 100%;

    div:nth-of-type(1) {
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      letter-spacing: -0.01em;
      color: white;
    }

    div:nth-of-type(2) {
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      letter-spacing: -0.01em;
      color: #777e91;
    }

    div:nth-of-type(3) {
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      letter-spacing: -0.01em;
      color: #b1b5c4;
    }
  }

  .third {
    margin-top: auto;
    background: #6084ff;
    box-shadow: inset 0 -1px 4px #4663db, inset 0 2px 4px #87a5ff;
    border-radius: 6px;
    width: 60px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
  }
`;
