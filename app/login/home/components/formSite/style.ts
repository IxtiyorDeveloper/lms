import styled from "@emotion/styled";
import { Button } from "components";

export const Wrapper = styled.div`
  max-width: 1660px;
  margin: 0 auto;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
`;

export const SelectSite = styled.div`
  padding: 40px;
  width: 50%;

  @media (max-width: 991px) {
    width: 100%;
  }

  .pointer {
    cursor: pointer;
  }
`;

export const Main = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;

  @media (max-width: 991px) {
    padding: 10px;
  }
`;

export const FormSide = styled.div`
  & .tab.student {
    background: #fff9cb;
    box-shadow: inset 0 0 3px #ffe866;
    border-radius: 12px;

    .svg * {
      stroke: #ffcf00;
    }
  }

  & .tab.staff {
    background: #fff9cb;
    box-shadow: inset 0 0 3px #ffe866;
    border-radius: 12px;

    .svg * {
      stroke: #ffcf00;
    }
  }

  & .tab {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    background: #f4f4f4;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 12px;
    transition: 0.4s;

    &:hover {
      background: #fff9cb;
      box-shadow: inset 0 0 3px #ffe866;
      border-radius: 12px;

      .svg * {
        stroke: #ffcf00;
      }
    }

    input {
      position: absolute;
      top: 15px;
      right: 15px;
    }

    input[type="radio"] {
      appearance: none;
      width: 20px;
      height: 20px;
      border: 1px solid #b1b5c4;
      border-radius: 50%;
      background-clip: content-box;
      padding: 3px;
    }

    input[type="radio"]:checked {
      background-color: #ffcf00;
      border: 1px solid #ffcf00;
    }
  }

  & h3 {
    font-size: 15px;
    font-weight: 600;
    margin: 0 0 7px 0;
  }

  .inline-text {
    font-size: 12px;
    font-weight: 500;
    color: #777e91;
    margin: 0;
  }
`;

export const FormButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100% !important;
  background: #f4f4f4;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 30px;
  border: none;
  padding: 16px 20px;

  & span {
    padding: 0 45%;
  }
`;

export const Title = styled.h1`
  margin: 0 0 24px 0;
  font-size: 42px;
  font-weight: 600;
  color: #1a1d1f;

  & + p {
    color: #777e91;
    font-size: 14px;
    line-height: 20px;
    margin: 0 0 84px 0;
  }
`;
