import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const BadgeWrapper = styled.div`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 5px;
  background-color: ${bgColors.rose};

  .status {
    padding: 0 6px;
  }
`;

export const BodySide = styled.div`
  .column {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    & * {
      padding: 0;
      margin: 0;
    }
  }
`;

export const ContentWrapper = styled.div`
  min-width: 355px;
  padding: 8px;
  border-radius: 6px;
  background-color: ${bgColors.black} !important;
  color: ${textColors.white};
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .full-name {
    font-size: ${fontSizes.f14};
    font-weight: 500;
  }

  .date-period {
    font-size: ${fontSizes.f12};
    font-weight: 500;
    color: ${textColors.sadet};
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .role-branch {
    text-align: right;
  }

  .role-name {
    margin-left: auto;
    width: fit-content;
    padding: 2px 6px;
    background-color: ${bgColors.blueGray};
    border-radius: 40px;
    font-size: ${fontSizes.f12};
    font-weight: 500;
    margin-bottom: 5px;
  }

  .branch-name {
    font-size: ${fontSizes.f12};
    font-weight: 500;
    color: ${textColors.soulfulBlue};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;

  .column {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    & * {
      padding: 0;
      margin: 0;
    }
  }
`;

export const Staff = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 6px;
  background-color: ${bgColors.blueGray};

  .flex {
    display: flex;
    gap: 8px;
  }

  .title-side {
    display: flex;
    align-items: center;
    gap: 4px;

    & span {
      font-size: ${fontSizes.f12};
      font-weight: 500;
      color: ${textColors.sadet};
    }
  }

  .name-f {
    font-family: "Space Grotesk", sans-serif !important;
    color: ${textColors.white};
    font-size: ${fontSizes.f12};
    font-weight: 700;
  }

  .flex-group-counts {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const RolesName = styled.div`
  padding: 2px 6px !important;
  border-radius: 40px;
  background: ${bgColors.sceptreBlue};
  color: ${textColors.white};
  font-weight: 500;
  font-size: ${fontSizes.f10};
  line-height: 14px;
`;
