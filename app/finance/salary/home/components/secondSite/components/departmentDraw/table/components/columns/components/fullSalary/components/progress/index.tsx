import React from "react";
import {
  Top,
  Wrapper,
  Text,
  Amount,
  Content,
  Row,
  Info,
  SalaryAmount,
  Main,
} from "./style";
import { TAssignment } from "types";
import { generateType } from "./utils/generateType";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { SalaryGiveSvg } from "@jasurbekyuldashov/lms-web-icons";
import { useSalaryLastMonths } from "hooks";
import { getMonthAndYear } from "utils/getFormattedDate";
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";
import { bgColors } from "styles/theme";

const ProgressContent = ({ record }: { record: TAssignment }) => {
  const { type, text, icon } = generateType({ record });

  const { month, year } = getMonthAndYear();

  const { data, isLoading } = useSalaryLastMonths({
    query_params: {
      receiver_id: record?.receiver?.id,
      month,
      year,
    },
  });

  return (
    <Wrapper>
      <Main>
        <Top>
          {icon}
          <Text>{text} </Text>
        </Top>
        {+record?.difference_last_month_salary != 0 && (
          <Amount className={type}>
            {toCurrencyFormat(record?.difference_last_month_salary)}
          </Amount>
        )}
      </Main>
      <Content>
        {isLoading
          ? [1, 2, 3]?.map((item, index) => {
              return (
                <Skeleton
                  key={`skeleton_key_${index}`}
                  sx={{ bgcolor: bgColors.blueGray }}
                />
              );
            })
          : data?.map((item, index) => {
              return (
                <Row key={index}>
                  {/*<SalaryGiveSvg />*/}
                  <Info>
                    <Text>
                      {moment(item.month, "MM").format("MMMM")}
                      {item?.description && ` - ${item?.description}`}
                    </Text>
                    <SalaryAmount>
                      {toCurrencyFormat(+item.total_salary)}
                    </SalaryAmount>
                  </Info>
                </Row>
              );
            })}
      </Content>
    </Wrapper>
  );
};

export default ProgressContent;
