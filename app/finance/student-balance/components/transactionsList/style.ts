import styled from "@emotion/styled";
import {bgColors, textColors} from "styles/theme";

export const Wrapper = styled.div`
    ul.tabs li.active:first-of-type .button {
        background-color: ${bgColors.midori} !important;
        color: ${textColors.white};
    }


    ul.tabs li.active:last-of-type .button {
        background-color: ${bgColors.pop} !important;
        color: ${textColors.white};
    }

    ul.tabs li:first-of-type .button {
        background-color: ${bgColors.pearl} !important;
        color: ${textColors.white};
    }


    ul.tabs li:last-of-type .button {
        background-color: ${bgColors.fond} !important;
        color: ${textColors.white};
    }


    ul.tabs li .button {
        position: relative !important;
        z-index: 9 !important;
    }

`;


export const TitleWrapper = styled.div`
    padding: 10px;
`;

export const ChildrenWrapper = styled.div`
    background-color: ${bgColors.white};
`;
