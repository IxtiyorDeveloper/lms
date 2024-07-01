import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";
import { HolidayType } from "types";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .icon {
    padding: 10px;
    cursor: pointer;
  }
`;
export const BoxGrid = styled.div`
  display: flex;
  gap: 10px;
`;
export const BoxType = styled.div<{ type?: HolidayType }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 3px 8px;
  gap: 10px;
  background: ${(props) =>
    props.type == HolidayType?.active ? bgColors.serengeti : bgColors.pepper};
  border-radius: ${borders.b10};
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  color: ${textColors.brilliance};
  width: fit-content;
`;
export const BoxStatus = styled.div<{ type?: HolidayType }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 3px 8px;
  gap: 10px;
  background: ${bgColors.transparentGreen};
  border-radius: ${borders.b10};
  font-weight: 600;
  font-size: ${fontSizes.f10};
  line-height: 1.2;
  color: ${textColors.eucalyptus};
  width: fit-content;
`;
export const Content = styled.div`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
  .d-flex {
    display: flex;
    .hyphen {
      margin: 0 5px;
    }
  }
`;
