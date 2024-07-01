import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
import { TIcon } from "types";

export const Wrapper = styled.div<{
  clicked?: string | boolean;
  size: TIcon["size"];
}>`
  width: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  background: ${bgColors.orange};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid ${bgColors.purpleCrystal};

  // &:hover {
  //   background: ${bgColors.anakiwa};
  //   border-color: ${bgColors.anakiwa};
  // }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
