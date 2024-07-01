import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  border-radius: 12px;
  border: 0.5px solid var(--f-4-f-5-f-6, #f4f5f6);
  background: var(--fcfcfd, #fcfcfd);
  box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.02) inset;
  padding: 20px;
`;
export const Title = styled.p`
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.12px;
`;
