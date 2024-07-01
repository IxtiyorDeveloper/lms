import styled from "@emotion/styled";
import { bgColors, borders, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 340px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  padding: 20px;
  background: ${bgColors.white};
  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0px 32px 48px -8px rgba(0, 0, 0, 0.1);
  border-radius: ${borders.b10};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .button {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    &.eRow {
      padding-bottom: 24px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;

  .cancel {
    height: 44px;
    color: ${textColors.yourShadow};
    background-color: ${bgColors.wildSand};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: 8px;
    font-weight: 700;
  }

  .delete {
    box-shadow: inset 0 4px 6px ${bgColors.peach};
    color: ${textColors.white};
    background-color: ${bgColors.pop};
    border-radius: 8px;
    font-weight: 700;
  }
`;
export const Grid = styled.div`
  width: 100%;
`;

export const BackDropWrapper = styled.div`
  background: ${bgColors.pop};
  filter: blur(40px);
  height: 50px;
  width: 50px;
`;

export const TextDeleteWrapper = styled.div`
  font-weight: 500;
  padding-top: 35px;
  text-align: center;
`;

export const TrashWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;

  .relative {
    position: relative;

    .absolute {
      position: absolute;
      top: 5px;
    }
  }
`;
