import styled from "@emotion/styled";
import {bgColors, borders} from "styles/theme";

export const Wrapper = styled.div`
  padding: 0 40px;
`;
export const Inner = styled.div`
  background-color: ${bgColors.white};
  border-radius: ${borders.b8};
`;
export const ButtonWrapper = styled.div`
  width: 100%;
`;
export const Container = styled.div`
  width: 100%;
  background-color: ${bgColors.white};
  margin-top: 20px;
  border-radius: ${borders.b8};
  overflow: hidden;
`;
