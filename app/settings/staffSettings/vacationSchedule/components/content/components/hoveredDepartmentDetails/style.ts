import styled from "@emotion/styled";
import { Popover } from "antd";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { EVacationType } from "../departmentsSidebar/type";

export const Wrap = styled.div`
  .ant-popover .ant-popover-arrow::before,
  .ant-popover .ant-popover-arrow::after,
  .ant-popover-arrow {
    background: ${bgColors.black} !important;
    background-color: ${bgColors.black} !important;
  }

  .ant-popover {
    --antd-arrow-background-color: ${bgColors.black} !important;
    background-color: ${bgColors.black} !important;
  }

  .ant-popover .ant-popover-inner {
    background-color: ${bgColors.black} !important;
  }
`;

export const CustomPopover = styled(Popover)`
  .ant-popover .ant-popover-arrow::before,
  .ant-popover .ant-popover-arrow::after,
  .ant-popover-arrow {
    background: ${bgColors.black} !important;
  }

  .ant-popover {
    --antd-arrow-background-color: ${bgColors.black} !important;
    background-color: ${bgColors.black} !important;
  }

  .ant-popover .ant-popover-inner {
    background-color: ${bgColors.black} !important;
  }
`;

export const ContentWrapper = styled.div`
  min-width: 355px;
  width: 355px;
  padding: 8px;
  border-radius: 6px;
  background-color: ${bgColors.black} !important;
  color: ${textColors.white};
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

export const Department = styled.div`
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 8px 0;

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
  padding: 10px;
  border-radius: 6px;
  background-color: ${bgColors.blueGray};
  overflow-x: auto;

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

  .action_icon {
    border-radius: 4px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${bgColors.sceptreBlue};
  }
`;

export const BadgeWrapper = styled.div<{ type: string | number }>`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.type == EVacationType.early
      ? bgColors.rose
      : bgColors.midoriVacation};

  .status {
    padding: 0 6px;
  }
`;
