import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div<{ width: string; height: string }>`
  .avatar_wrap_container {
    height: ${(props) => props.height};
  }

  .avatar {
    position: relative;
    height: ${(props) => props.width};
    height: ${(props) => props.height};
    top: -${(props) => props.height};
    z-index: 1;
    //box-shadow: -4px 0 20px 4px rgba(233, 40, 87, 0.6),
    //  8px 0 20px 0 rgba(0, 0, 0, 0.7);
    box-shadow: -6px 0 14px 2px #e92857, 6px 0 14px 2px #000;
    border-radius: 50%;
  }

  .container {
    display: block;
    position: absolute;
    height: ${(props) => props.width};
    height: ${(props) => props.height};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 999;
    border-radius: 100%;
    text-align: center;
  }
  .container:before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    bottom: -2px;
    right: -2px;
    border-radius: 100%;
    border-right: 2px solid #202325;
    border-bottom: 2px solid #202325;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    transform: rotate(-45deg);
  }
  .container:after {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    bottom: -2px;
    right: -2px;
    border-radius: 100%;
    border-left: 2px solid ${bgColors.pop};
    border-top: 2px solid ${bgColors.pop};
    border-bottom: 2px solid transparent;
    border-right: 2px solid transparent;
    transform: rotate(-45deg);
  }

  .red {
    border-radius: 50%;
    border: 2px solid ${bgColors.pop};
    //box-shadow: 0 2px 12px 4px rgba(233, 40, 87, 0.5);
    box-shadow: 0 2px 16px 4px #e92857;
  }
  .black {
    border-radius: 50%;
    border: 2px solid #202325;
    //box-shadow: 0 2px 12px 4px rgba(3, 9, 25, 0.68);
    box-shadow: 0 2px 16px 4px #000;
  }
`;
