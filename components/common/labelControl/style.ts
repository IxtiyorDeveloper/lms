import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;

export const Inner = styled.div``;

export const Label = styled.label<{ required: boolean }>`
  font-size: ${fontSizes.f12};
  position: relative;
  color: ${textColors.dark};
  margin-bottom: 9px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.01em;
`;
export const Content = styled.div`
  background: transparent;
  border-radius: ${borders.b6};
  overflow-y: auto;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  ::-webkit-scrollbar {
    width: 10px !important;
  }

  ::-webkit-scrollbar-track {
    background-color: ${bgColors.purpleCrystal};
    -webkit-border-radius: 10px !important;
    border-radius: 10px;
    cursor: pointer !important;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px !important;
    border-radius: 10px;
    background: ${bgColors.yourShadow};
    cursor: pointer !important;
  }
`;
export const Row = styled.div<{ active: boolean }>`
  padding: 10px 8px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  background: ${(props) => (props.active ? bgColors.primary : "transparent")};

  .check-icon {
    opacity: ${(props) => (props.active ? 1 : 0)};
  }

  &:hover {
    background: ${(props) =>
      props.active ? bgColors.primary : bgColors.purpleCrystal};

    .check-icon {
      opacity: 0.3;
    }
  }
`;
export const Title = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
`;
