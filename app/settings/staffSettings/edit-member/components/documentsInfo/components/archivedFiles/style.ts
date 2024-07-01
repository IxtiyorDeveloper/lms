import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  .title {
    font-size: ${fontSizes.f14};
    font-weight: 600;
    margin: 10px 20px;
  }
`;

export const FlexWrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const FileWrapper = styled.div`
  min-width: 180px;
  width: 180px;
`;
