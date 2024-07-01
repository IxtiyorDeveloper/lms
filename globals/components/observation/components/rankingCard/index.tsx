import React from "react";
import {
  ClassWrapper,
  Content,
  CountBox,
  Counts,
  Details,
  ImageWrapper,
  Name,
  Position,
  PT,
  Wrapper,
} from "./style";
import { CircleImage } from "components";
import { IRankingCard } from "./type";
import { GROUP_FORM_GROUP, GROUP_FORM_INDIVIDUAL } from "constants/groupForms";
import { OverallSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { getOrdinalSuffix } from "utils/getOrdinalSuffix";
import { ranking_classes } from "../../../../../constants/ranking";

const RankingCard = ({ rankingData, groups }: IRankingCard) => {
  const fullName = rankingData?.mentor?.userProfile?.fullName;

  const groupCount =
    groups?.filter(
      (g) =>
        g.groupType?.group_form?.toString() === GROUP_FORM_GROUP?.toString(),
    )?.length || 0;
  const indCount =
    groups?.filter(
      (g) =>
        g.groupType?.group_form?.toString() ===
        GROUP_FORM_INDIVIDUAL?.toString(),
    )?.length || 0;

  const order = `${rankingData?.order}${getOrdinalSuffix(rankingData?.order)}`;

  return (
    <Wrapper>
      <Content>
        <ImageWrapper>
          <CircleImage
            width={75}
            height={75}
            src={rankingData?.mentor?.userProfile?.avatar}
          />
          <ClassWrapper>
            {
              ranking_classes[
                rankingData?.class as keyof typeof ranking_classes
              ]
            }
          </ClassWrapper>
        </ImageWrapper>

        <Details>
          <Name>{fullName}</Name>
          <Counts>
            {!!indCount && <CountBox>Individual: {indCount}</CountBox>}
            {!!groupCount && <CountBox>Group: {groupCount}</CountBox>}
          </Counts>
        </Details>
      </Content>
      <Position>
        <PT>
          <OverallSvg color={bgColors.primary} /> Ranking position: {order}
        </PT>
      </Position>
    </Wrapper>
  );
};

export default RankingCard;
