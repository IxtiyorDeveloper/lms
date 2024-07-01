import { useGetDispersion } from "hooks";
import { Row, Wrapper } from "./style";
import { Spin } from "antd";
import moment from "moment/moment";
import { DATE_FORMAT_MMMM_YYYY } from "constants/dates";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import React from "react";

const BalanceInfo = ({ original }: { original: any }) => {
  const { data, isFetching } = useGetDispersion({
    query_params: {
      user_id: original?.user_id,
    },
  });
  return (
    <Wrapper>
      <Spin spinning={isFetching}>
        {data?.map?.((item, key) => {
          return (
            <Row key={key}>
              <p className="date">
                {moment(`${item?.year}-${item?.month}`, "YYYY-MM").format(
                  DATE_FORMAT_MMMM_YYYY
                )}
              </p>
              <div className="box">{toCurrencyFormat(item?.sum)}</div>
            </Row>
          );
        })}
      </Spin>
    </Wrapper>
  );
};
export default BalanceInfo;
