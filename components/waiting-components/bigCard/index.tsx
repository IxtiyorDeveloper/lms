import React, { FC, useEffect } from "react";
import {
  CardWrapper,
  PaddingWrapper,
  FlexWrapper,
  TopPaddingWrapper,
} from "./style";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { IBigCard } from "./type";
import { useRouter } from "next/router";
import { RedBadgeTitle } from "components";

const BigCard: FC<IBigCard> = ({ ndChild, gridChild, title, count }) => {
  const router = useRouter();
  const { watch, setValue } = useForm();

  useEffect(() => {
    setValue("search", router.query?.custom_search);
  }, [router.query?.custom_search]);

  return (
    <CardWrapper>
      {title && (
        <TopPaddingWrapper
          style={{ borderBottom: `1px solid ${bgColors.whiteSmoke}` }}
        >
          <RedBadgeTitle title={title} count={count} />
          {ndChild}
        </TopPaddingWrapper>
      )}
      <PaddingWrapper>
        <FlexWrapper>
        </FlexWrapper>
        {gridChild(watch("search"))}
      </PaddingWrapper>
    </CardWrapper>
  );
};

export default BigCard;
