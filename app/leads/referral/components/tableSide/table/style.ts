import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .tabs > li {
    background-color: ${bgColors.white} !important;
  }

  .tabs > li .tab {
    background-color: ${bgColors.white} !important;
  }

  .tabs > li > .tab::before,
  .tabs > li > .tab::after {
    background-color: transparent !important;
  }

  .tabs > li.active::before,
  .tabs > li.active::after {
    background-color: transparent !important;
  }

  .tabs > li:first-of-type > .tab > .button {
    background-color: ${bgColors.primary}70 !important;
    color: ${textColors.yourShadow};
  }

  .tabs > li.active:first-of-type > .tab > .button {
    background-color: ${bgColors.primary} !important;
    color: ${textColors.dark};
  }

  .tabs > li:nth-of-type(2) > .tab > .button {
    background-color: ${bgColors.ginger}70 !important;
    color: ${textColors.yourShadow};
  }

  .tabs > li.active:nth-of-type(2) > .tab > .button {
    background-color: ${bgColors.ginger} !important;
    color: ${textColors.dark};
  }

  .tabs > li:nth-of-type(3) > .tab > .button {
    background-color: ${bgColors.deep}70 !important;
    color: ${textColors.yourShadow};
  }

  .tabs > li.active:nth-of-type(3) > .tab > .button {
    background-color: ${bgColors.deep} !important;
    color: ${textColors.white};
  }

  .tabs > li:nth-of-type(4) > .tab > .button {
    background-color: ${bgColors.midori}70 !important;
    color: ${textColors.yourShadow};
  }

  .tabs > li.active:nth-of-type(4) > .tab > .button {
    background-color: ${bgColors.midori} !important;
    color: ${textColors.white};
  }

  .tabs > li:nth-of-type(5) > .tab > .button {
    background-color: ${bgColors.pepper}70 !important;
    color: ${textColors.yourShadow};
  }

  .tabs > li.active:nth-of-type(5) > .tab > .button {
    background-color: ${bgColors.pepper} !important;
    color: ${textColors.white};
  }

  li.active .button {
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);
  }
`;

export const TabWrapper = styled.div`
  padding: 10px;
  font-size: ${fontSizes.f12};
  font-weight: 600;
  line-height: 1.2;
`;

export const ArrowCol = styled.div`
  background-color: ${bgColors.whiteSmoke};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ColWrap = styled.div`
  display: flex;
  padding: 10px 0;
  font-size: ${fontSizes.f12};
  font-weight: 600;

  .payment-amount {
    background-color: ${bgColors.midori};
    color: ${textColors.white};
    padding: 0 4px;
    border-radius: 4px;
  }

  .group_info {
    width: 220px;
  }

  .payment-amount-gray {
    background-color: ${bgColors.purpleCrystal};
    color: ${textColors.white};
    padding: 0 4px;
    border-radius: 4px;
  }

  .d-wrap {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .name_cell {
    font-size: ${fontSizes.f12};
    font-weight: 600;
  }

  .number_index {
    padding-left: 8px;
    width: 35px;
    align-self: center;
  }

  .referred_date {
    font-size: ${fontSizes.f12};
    font-weight: 600;
  }

  .gap {
    display: flex;
    gap: 8px;
  }
`;

export const ReferredByWrapper = styled.div`
  display: flex;
  gap: 10px;

  .first_name {
    font-size: ${fontSizes.f12};
    font-weight: 600;
    margin-bottom: 4px;

    &:hover {
      color: ${textColors.dark};
      text-decoration: underline;
    }
  }
`;
