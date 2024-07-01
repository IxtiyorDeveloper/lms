import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .label-title {
    font-size: ${fontSizes.f12};
    color: ${textColors.sadet};
    font-weight: 500;
    padding: 0;
    margin: 0;
  }
`;

export const WrapperCustom = styled.div`
  padding: 10px 8px;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background: ${bgColors.wildSand};
  }
`;

export const Slots = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const SlotsCustom = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  .year {
    color: ${textColors.sadet};
  }
`;

export const SlotWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  .slot-name {
    font-size: ${fontSizes.f12};
    font-weight: 500;
    color: ${textColors.sceptreBlue};
  }
`;

export const PlaceBadge = styled.div`
  border-radius: 10px;
  padding: 3px 8px;
  font-size: ${fontSizes.f10};
  font-weight: 600;
  background-color: ${bgColors.spring};
  color: ${textColors.jade};
`;
