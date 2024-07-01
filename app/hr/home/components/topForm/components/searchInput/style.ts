import { Row } from "antd";
import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const ContentWrapper = styled.div`
  padding: 10px;
`;
export const ListWrapper = styled.div`
  min-width: 360px;
  height: 430px;
  overflow-y: auto;
`;

export const CandidateWrapper = styled(Row)`
  padding: 2px 0;
  .candidate_name {
    &:hover {
      color: ${textColors.sceptreBlue} !important;
      text-decoration: underline;
    }
  }
`;

export const ColorWrapper = styled.div<{
  bgColor: string;
}>`
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: 600;
  font-size: ${fontSizes.f10};
  background-color: ${(props) => props.bgColor};
`;

export const VacancyRole = styled.div`
  padding: 1px 8px;
  border-radius: 10px;
  font-size: ${fontSizes.f10};
  font-weight: 700;
  background-color: rgb(244, 244, 244);
  color: rgb(119, 126, 145);
  height: 20px;
`;

export const FormWrapper = styled.form`
  .ant-select-single {
    min-width: 340px;
  }
`;
