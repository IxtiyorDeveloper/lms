import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  .ant-segmented {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px;
    gap: 4px;
    height: 100%;
    background: ${bgColors.white};
    border: 1px solid ${bgColors.purpleCrystal};
    border-radius: 10px;
  }

  .title {
    font-size: ${fontSizes.f12};
    font-weight: 600;
    line-height: 1.3;
  }

  .filter {
    display: flex;
    gap: 10px;

    .btn {
      min-width: 110px;
    }
  }
`;
