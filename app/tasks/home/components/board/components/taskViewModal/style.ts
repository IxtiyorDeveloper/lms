import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const CardWrapper = styled.div``;

export const CardHeader = styled.div`
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  padding: 10px 0;
`;

export const Title = styled.h2`
  font-size: ${fontSizes.f24};
  font-style: normal;
  font-weight: 700;
  line-height: 1.5;
`;

export const CardBody = styled.div`
  display: flex;
  padding: 10px 0 0 0;
`;

export const Hr = styled.div`
  min-height: 500px;
  height: 100%;
  width: 1px;
  background: ${bgColors.whiteSmoke};
`;

export const CardFooter = styled.div``;
