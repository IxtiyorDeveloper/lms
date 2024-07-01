import React from "react";
import { LabelWrapper, Wrapper } from "./style";
import Cards from "./components/cards";
import Filter from "./components/filter";
import Freshman from "./components/freshman";
import { useFreshmanLost } from "hooks";
import { useRouter } from "next/router";
import Lost from "./components/lost";
import ByAmountAndMoney from "./components/cards/components/byAmountAndMoney";
import { Segmented } from "components";
import { AddUserSvg, StudentMinusSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import dayjs from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";

const FreshmanLost = () => {
  const router = useRouter();
  const date = dayjs();
  const { data } = useFreshmanLost({
    query_params: {
      ...router.query,
      fields: "freshman,lost",
      from_date: router.query?.from_date
        ? router.query?.from_date
        : date.startOf("month").format(DATE_FORMAT_YYYY_MM_DD),
      to_date: router.query?.to_date
        ? router.query?.to_date
        : date.format(DATE_FORMAT_YYYY_MM_DD),
    },
  });
  return (
    <>
      <Wrapper>
        <Filter />
        <Cards />
        <ByAmountAndMoney />
      </Wrapper>
      <Wrapper>
        <Segmented
          options={[
            {
              label: (
                <LabelWrapper>
                  <AddUserSvg color={bgColors.dark} /> Freshman
                </LabelWrapper>
              ),
              value: "freshman",
              children: <Freshman data={data} />,
            },
            {
              label: (
                <LabelWrapper>
                  <StudentMinusSvg
                    height={20}
                    width={20}
                    color={bgColors.dark}
                  />{" "}
                  Lost
                </LabelWrapper>
              ),
              value: "lost",
              children: <Lost data={data} />,
            },
          ]}
          initValue="freshman"
        />
      </Wrapper>
    </>
  );
};

export default FreshmanLost;
