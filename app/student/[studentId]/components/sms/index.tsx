import React from "react";
import { Box, Wrapper } from "./style";
import { useStudentSms } from "hooks";
import { useRouter } from "next/router";
import moment from "moment";
import formatPhoneNumber from "utils/phoneNumberFormatter";
import { Empty, Spin } from "antd";
import { DATE_FORMAT_CREATED_AT } from "constants/dates";

const Sms = () => {
  const router = useRouter();
  const { data, isInitialLoading, isPreviousData } = useStudentSms({
    user_id: router?.query?.id,
  });

  return (
    <Spin spinning={isInitialLoading || isPreviousData}>
      {!data ? <Empty /> : null}
      <Wrapper>
        {data?.list?.map((item, key) => {
          return (
            <Box key={key}>
              <p className="number">{formatPhoneNumber(item?.phone_number)}</p>
              <p className="text">{item?.text}</p>
              <p className="date">
                {moment(item?.created_at).format(DATE_FORMAT_CREATED_AT)}
              </p>
            </Box>
          );
        })}
      </Wrapper>
    </Spin>
  );
};

export default Sms;
