import React, { FC } from "react";
import { Wrapper, Box, Top } from "./style";
import { IDefinition } from "./type";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { getDifference } from "./components/getDifference";
import { CircleCorrectSvg, RiseUpSvg } from "@jasurbekyuldashov/lms-web-icons";
import { DownloadSvg } from "components";
import { bgColors } from "styles/theme";
const DetailedCard: FC<IDefinition> = ({ record, data, detailedData }) => {
  const unaffectedSalary = +record?.fixed_salary + +record?.kpi;

  const range = detailedData?.details?.range;

  const type = record?.amount_status;

  const difference = getDifference({ type, range, unaffectedSalary });

  return (
    <Wrapper>
      <Box className={`range-${type}`}>
        <Top>
          <CircleCorrectSvg />
          <p className="white">Salary (KPI + Fixed)</p>
        </Top>
        <p className="white grotesk">{toCurrencyFormat(unaffectedSalary)}</p>
      </Box>
      <Box className="ord">
        <Top>
          <RiseUpSvg />
          <p className="o-text">Difference</p>
        </Top>
        <p className={`mt8 t${type}-text grotesk`}>
          {toCurrencyFormat(difference)}
        </p>
      </Box>
      <Box className="ord">
        <Top>
          <DownloadSvg />
          <p className="o-text">Min salary</p>
        </Top>
        <p className="white mt8 grotesk">{toCurrencyFormat(range?.min)}</p>
      </Box>
      <Box className="ord">
        <Top>
          <DownloadSvg
            style={{ transform: "rotate(180deg)" }}
            color={bgColors.midori}
          />
          <p className="o-text">Max salary</p>
        </Top>
        <p className="white mt8 grotesk">{toCurrencyFormat(range?.max)}</p>
      </Box>
    </Wrapper>
  );
};

export default DetailedCard;
