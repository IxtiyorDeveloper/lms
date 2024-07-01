import { TooltipInner } from "../style";
import { useAdminFinanceCashFlowDifferences } from "hooks";
import { Spin } from "antd";
import moment from "moment";
import { DecreaseSvg, IncreaseSvg } from "@jasurbekyuldashov/lms-web-icons";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { FC } from "react";
import { useRouter } from "next/router";

interface IProps {
  record: any;
  without_avans: boolean;
}
const Info: FC<IProps> = ({ record, without_avans }) => {
  const router = useRouter();
  const { isFetching, data } = useAdminFinanceCashFlowDifferences({
    query_params: {
      id: record?.uniq,
      without_avans,
      key: record?.key,
      with_department: record?.with_department,
      year: router.query.year,
      month: router.query.month,
    },
  });

  const last1 = data?.[0];
  const last2 = data?.[1];
  const last3 = data?.[2];

  return (
    <Spin spinning={isFetching}>
      <TooltipInner>
        <div className="flex card">
          <div className="icon">
            {(last1?.difference || 0) > 0 ? <DecreaseSvg /> : <IncreaseSvg />}
          </div>
          <div className="info-container">
            <div className="text-1">
              {(last1?.difference || 0) > 0 ? "More" : "Less"} than{" "}
              {(last1
                ? moment(`${last1?.year}-${last1?.month}`, "YYYY-MM")
                : moment()
              ).format("MMMM")}
            </div>
            <div
              className={`text-2 ${(last1?.difference || 0) <= 0 ? "green" : ""}`}
            >
              <div>
                {(last1?.difference || 0) == 0
                  ? " "
                  : (last1?.difference || 0) > 0
                    ? "+"
                    : ""}
              </div>
              <div>{toCurrencyFormat(last1?.difference || 0)}</div>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="icon">
            {(last2?.difference || 0) > 0 ? <DecreaseSvg /> : <IncreaseSvg />}
          </div>
          <div className="info-container">
            <div className="text-1">
              {(last2
                ? moment(`${last2?.year}-${last2?.month}`, "YYYY-MM")
                : moment()
              ).format("MMMM")}
            </div>
            <div
              className={`text-2 ${(last2?.difference || 0) <= 0 ? "green" : ""}`}
            >
              <div>
                {(last2?.difference || 0) == 0
                  ? " "
                  : (last2?.difference || 0) > 0
                    ? "+"
                    : ""}
              </div>
              <div>{toCurrencyFormat(last2?.difference || 0)}</div>
            </div>
            <div className="divider" />
          </div>
        </div>

        <div className="flex">
          <div className="icon">
            {(last3?.difference || 0) > 0 ? <DecreaseSvg /> : <IncreaseSvg />}
          </div>
          <div className="info-container">
            <div className="text-1">
              {(last3
                ? moment(`${last3?.year}-${last3?.month}`, "YYYY-MM")
                : moment()
              ).format("MMMM")}
            </div>
            <div
              className={`text-2 ${(last3?.difference || 0) <= 0 ? "green" : ""}`}
            >
              <div>
                {(last3?.difference || 0) == 0
                  ? " "
                  : (last3?.difference || 0) > 0
                    ? "+"
                    : ""}
              </div>
              <div>{toCurrencyFormat(last3?.difference || 0)}</div>
            </div>
            <div className="divider" />
          </div>
        </div>
      </TooltipInner>
    </Spin>
  );
};

export default Info;
