import React, { FC, useMemo, useState } from "react";
import { Button, ThroughSvg } from "components";
import { bgColors, textColors } from "styles/theme";
import { Wrapper } from "./style";
import Link from "next/link";
import { IMainCard } from "types";
import { ECallTab } from "./type";
import { ECallType } from "types/statistics/call";

interface IProps {
  data: IMainCard | undefined;
}

const CallCard: FC<IProps> = ({ data }) => {
  const call = data?.call;
  const [isActive, setIsActive] = useState<ECallTab>(ECallTab.total);

  const totals = useMemo(() => {
    const inbound = call?.byDirection?.find(
      (f) => f.direction == ECallType.inbound,
    );
    const outbound = call?.byDirection?.find(
      (f) => f.direction == ECallType.outbound,
    );
    const today_inbound = call?.todayByDirection?.find(
      (f) => f.direction == ECallType.inbound,
    );
    const today_outbound = call?.todayByDirection?.find(
      (f) => f.direction == ECallType.outbound,
    );

    return {
      [ECallTab.total]: {
        count: call?.period,
        sup: call?.today,
      },
      [ECallTab.inbound]: {
        count: inbound?.count,
        sup: today_inbound?.count,
      },
      [ECallTab.outbound]: {
        count: outbound?.count,
        sup: today_outbound?.count,
      },
    };
  }, [call]);

  const current = totals?.[isActive];

  return (
    <Link
      href={
        // funcCheckPermission([COMPONENTS_VIEWS.can_see_dashboard_own_sms])
        //   ? "/statistics/sms"
        //   :
        "/statistics/call"
      }
    >
      <Wrapper>
        <div className="head-card" style={{ color: textColors.sceptreBlue }}>
          <p className="title-card">Calls</p>
          <ThroughSvg color={bgColors.white} />
        </div>

        <div
          className="body-sms-card"
          onClick={(e: any) => {
            e.stopPropagation();
          }}
          style={{ marginLeft: "20px" }}
        >
          <div className="btns">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsActive(ECallTab.total);
              }}
              className={`this-month ${isActive == ECallTab.total ? "active" : ""}`}
            >
              Total call
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsActive(ECallTab.inbound);
              }}
              className={`this-month ${isActive == ECallTab.inbound ? "active" : ""}`}
            >
              Incall
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsActive(ECallTab.outbound);
              }}
              className={`this-month ${isActive == ECallTab.outbound ? "active" : ""}`}
            >
              Outcall
            </Button>
          </div>
        </div>
        <p className="grotesk kpi number">
          {current?.count || 0}
          <sup className="green groteskFont">+{current?.sup || 0}</sup>
          <p className="month">This month</p>
        </p>
        <div className="icon">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M36.18 43.8074C32.28 39.9074 29.34 35.5407 27.3867 31.1107C26.9733 30.174 27.2167 29.0774 27.94 28.354L30.67 25.6274C32.9067 23.3907 32.9067 20.2274 30.9533 18.274L27.04 14.3607C24.4367 11.7574 20.2167 11.7574 17.6133 14.3607L15.44 16.534C12.97 19.004 11.94 22.5674 12.6067 26.1007C14.2533 34.8107 19.3133 44.3474 27.4767 52.5107C35.64 60.674 45.1767 65.734 53.8867 67.3807C57.42 68.0474 60.9833 67.0174 63.4533 64.5474L65.6233 62.3774C68.2267 59.774 68.2267 55.554 65.6233 52.9507L61.7133 49.0407C59.76 47.0874 56.5933 47.0874 54.6433 49.0407L51.6333 52.054C50.91 52.7774 49.8133 53.0207 48.8767 52.6074C44.4467 50.6507 40.08 47.7074 36.18 43.8074Z"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </Wrapper>
    </Link>
  );
};

export default CallCard;
