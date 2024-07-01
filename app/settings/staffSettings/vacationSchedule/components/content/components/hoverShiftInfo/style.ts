import styled from "@emotion/styled";
import { Popover } from "antd";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { EVacationType } from "../departmentsSidebar/type";

export const Wrap = styled.div`
  display: flex;
  align-items: center;

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
  min-width: 440px;
  width: 500px;
  padding: 8px;
  border-radius: 6px;
  background-color: ${bgColors.black} !important;
  color: ${textColors.white};
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ChildrenWrapper = styled.div`
  display: grid;
  gap: 4px;
  grid-template-columns: 1fr 1fr;

  .card {
    border-radius: 6px;
    padding: 10px;
    background: ${bgColors.sceptreBlue};

    .note {
      font-family: "Space Grotesk", sans-serif !important;
      font-size: ${fontSizes.f14};
      font-weight: 600;
      color: ${textColors.sadet};
    }

    .card-body {
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 2px solid ${bgColors.blueGray};
      padding-bottom: 8px;

      .info {
        .fullName {
          font-size: ${fontSizes.f14};
          color: ${textColors.white};
          line-height: 16px;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .hiredDate {
          font-size: ${fontSizes.f12};
          color: ${textColors.sadet};
          line-height: 14px;
          font-weight: 500;
        }
      }
    }
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

export const Department = styled.div`
  padding: 8px;
  border-radius: 8px;
`;

export const Badge = styled.div`
  font-size: ${fontSizes.f10};
  border-radius: 40px;
  font-weight: 800;
  color: ${textColors.white} !important;
  background: ${bgColors.pop};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 16px;
  border: 1px solid transparent;
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

export const NoDataTabWrapper = styled.div``;

export const Full = styled.div`
  width: 100%;
`;

export const Staff = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  background-color: ${bgColors.blueGray};

  & .segmented-content-wrapper {
    margin-bottom: 8px;
  }

  & .ant-segmented,
  .ant-segmented-item {
    width: 100% !important;
  }

  .ant-segmented-item-selected {
    background: ${bgColors.primary} !important;
    box-shadow:
      0 4px 8px -4px #00000040,
      0 2px 0 0 #ffb32333 inset,
      0 -1px 1px 0 #0000000a inset !important;
    color: ${textColors.sceptreBlue} !important;

    & * {
      color: ${textColors.sceptreBlue};
    }

    &:hover {
      color: ${textColors.sceptreBlue} !important;
    }
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
`;

export const DateAndSlot = styled.div`
  .slot-info {
    display: flex;
    align-items: center;
  }

  .date-m {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: ${fontSizes.f12};
    font-weight: 700;
  }

  .free {
    font-size: ${fontSizes.f12};
    font-weight: 500;
    color: ${textColors.pepper};
  }
`;

export const RolesName = styled.div`
  padding: 2px 6px;
  border-radius: 40px;
  background: ${bgColors.sceptreBlue};
  color: ${textColors.white};
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 14px;
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

export const BadgeWrapper = styled.div<{ type?: string | number }>`
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
