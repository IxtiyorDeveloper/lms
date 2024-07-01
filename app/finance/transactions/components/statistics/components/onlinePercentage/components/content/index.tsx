import React, { useState } from "react";
import { Details, Info, Label, Pr, Wrapper } from "./style";
import moment from "moment/moment";
import { SelectMonth } from "components";
import { DATE_FORMAT_MMMM_YYYY_MONTH_SELECT } from "constants/dates";
import { useFinanceStatisticsOnlinePayment } from "hooks";
import { useRouter } from "next/router";
import { separateToYearMonth } from "utils/separateToYearMonth";
import { Progress, Spin } from "antd";
import { bgColors } from "styles/theme";
import { WalletSvg } from "@jasurbekyuldashov/lms-web-icons";

const Content = () => {
  const [selectMonth, setSelectMonth] = useState<string>(
    moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT)
  );

  const { year, month } = separateToYearMonth({ dateString: selectMonth });

  const router = useRouter();

  const { data, isLoading, isPreviousData } = useFinanceStatisticsOnlinePayment(
    {
      query_params: {
        ...router?.query,
        year,
        month,
        income_id: undefined,
        paymentIncomeCheck: undefined,
      },
    }
  );

  const percent = +(data || 0);

  return (
    <Wrapper>
      <SelectMonth
        initValue={selectMonth}
        onChange={(e) => {
          setSelectMonth(e);
        }}
        className="month"
      />
      <Spin spinning={isLoading || isPreviousData}>
        <Info>
          <Progress
            type="circle"
            format={() => <WalletSvg color={bgColors.sadet} />}
            percent={percent}
            size={48}
            trailColor={bgColors.sceptreBlue}
            strokeColor={bgColors.midori}
            strokeWidth={6}
          />
          <Details>
            <Label>Online payment percent</Label>
            <Pr>{percent}%</Pr>
          </Details>
        </Info>
      </Spin>
    </Wrapper>
  );
};

export default Content;
