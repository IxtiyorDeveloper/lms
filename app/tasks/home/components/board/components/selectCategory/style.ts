import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  margin: 20px 0;
`;

export const GridContainer = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const GridItem = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  padding: 16px;
  border-radius: 12px;

  .image {
    height: 24px;
    width: 24px;
    margin-bottom: 10px;
  }

  .imageAbs {
    position: absolute;
    top: -12px;
    right: -10px;
    opacity: 0.15;
    height: 78px;
    width: 78px;
  }
`;

export const CategoryTitle = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${bgColors.white};
  font-weight: 500;

  .selected {
    display: flex;
    align-items: center;
    gap: 3px;
  }
`;
