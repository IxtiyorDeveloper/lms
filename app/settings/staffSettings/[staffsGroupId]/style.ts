import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const StaffGroupWrapper = styled.div`
  td {
    cursor: pointer !important;
  }
  .actions {
    display: flex;
    gap: 8px;
    align-items: center;

    svg {
      cursor: pointer;
    }
  }

  .newStaffRow {
    background-color: ${bgColors.lemon};
  }

  .stoppingStaffRow {
    background-color: ${bgColors.pale};
  }
`;

export const NoShift = styled.div`
  padding: 5px;
  background-color: ${bgColors.white};

  .area {
    border-radius: 8px;
    padding: 4px;
    text-align: center;
    font-size: ${fontSizes.f12};
    font-weight: 500;
    color: ${textColors.yourShadow};
    background-color: ${bgColors.wildSand};
  }
`;

export const Auto = styled.div`
  background-color: ${bgColors.white};
  border-radius: 8px 8px 0 0;
  overflow: auto;

  .segmented-content-container {
    padding: 5px;
    width: 100% !important;

    .ant-segmented {
      width: 100%;

      & label {
        width: 100%;
      }
    }
  }
`;

export const CellImageWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 0;
  padding: 5px 0;

  .imageWrapper {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100px;

    .index {
      padding: 0 0 0 8px;
      width: 35px;
    }
  }

  .name {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;
export const StaffStatusIcon = styled.div`
  position: relative;
  .icon {
    z-index: 100;
    position: absolute;
    top: -10px;
    right: -6px;
  }
  .new {
    position: relative;
    width: 24px;
    height: 24px;
    p {
      font-weight: 600;
      font-size: 7px;
      color: #23262f;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .rejected {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 4px;
    background-color: ${bgColors.pop};
    box-shadow: -4px 0px 4px 0px rgba(253, 136, 143, 0.7) inset,
      4px 0px 4px 0px rgba(253, 136, 143, 0.7) inset;
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
  }
`;

export const HeaderCell = styled.p`
  text-align: center;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.paleSky};
  width: 100%;
`;

export const CellNameWrapper = styled.div`
  display: flex;
  color: ${textColors.sceptreBlue} !important;

  .divider {
    background: ${bgColors.primary};
    border-radius: 0 5px 5px 0;
    width: 3px;
    margin-left: -13px;
    margin-right: 13px;
  }

  .index {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .image {
    margin-left: 21px;
  }

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin-left: 7px;
    align-self: center;
    white-space: nowrap;
  }
`;

export const NewImg = styled.div`
  position: absolute;
  top: -6px;
  left: 0;
`;

export const NewImgBan = styled.div`
  position: absolute;
  top: -6px;
  left: 0;
  background: ${bgColors.pop};
  height: 24px;
  width: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
