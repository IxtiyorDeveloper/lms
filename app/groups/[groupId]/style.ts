import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const GroupInsideTableWrapper = styled.div``;
export const GroupInsideTableCard = styled.div`
  margin-top: 10px;
  background-color: ${bgColors.white};
  border-radius: ${borders.b12}!important;
  overflow: hidden;
  box-shadow:
    0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05),
    0 32px 48px -8px rgba(0, 0, 0, 0.1);
`;
export const LeftWrapper = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px;

  @media (max-width: 1100px) {
    gap: 5px;
  }

  .button {
    padding: 0;
  }
  .link {
    width: 100%;
    height: 100%;
    padding: 10px 16px;
  }
  .pointer {
    cursor: pointer;
  }
`;

export const GroupNoteTitle = styled.p`
  padding: 10px;
`;

export const GroupNote = styled.div`
  text-align: center;
  background: ${bgColors.wildSand};
  max-width: 550px;
  padding: 0 10px;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  color: ${textColors.paleSky};
  display: flex;
  align-items: center;
  border-radius: ${borders.b6};
  gap: 4px;

  .note {
    max-width: 100px;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .d-s {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 20px;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  gap: 7px;

  p {
    color: ${textColors.blueGray};
  }
  .text-w {
    color: ${textColors.white};
  }
  .text-n {
    @media (max-width: 1024px) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;
