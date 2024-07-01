import React, { FC, useState } from "react";
import { ThroughSvg, SendingSmsSvg, Button } from "components";
import { bgColors, textColors } from "styles/theme";
import { Wrapper } from "./style";
import Link from "next/link";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";

interface IProps {
  thisMonth?: string | number;
  lastMonth?: string | number;
  today?: string | number;
}

const SMSCard: FC<IProps> = ({ thisMonth = 0, today = 0, lastMonth = 0 }) => {
  const [isMonth, setIsMonth] = useState<boolean>(true);

  return (
    <Link
      href={
        funcCheckPermission([COMPONENTS_VIEWS.can_see_dashboard_own_sms])
          ? "/statistics/sms"
          : "/statistics/dashboard"
      }
    >
      <Wrapper>
        <div className="head-card" style={{ color: textColors.sceptreBlue }}>
          <p className="title-card">Sms</p>
          <ThroughSvg color="#343945" />
        </div>

        <div
          className="body-sms-card"
          onClick={(e: any) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          style={{ marginLeft: "20px" }}
        >
          <div className="btns">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsMonth(true);
              }}
              className={`this-month ${isMonth ? "active" : ""}`}
            >
              This month
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsMonth(false);
              }}
              className={`this-month ${!isMonth ? "active" : ""}`}
            >
              Last month
            </Button>
          </div>
        </div>
        <p className="grotesk kpi number">
          {isMonth ? (
            <>
              {thisMonth}
              <sup className="green groteskFont">+{today}</sup>
            </>
          ) : (
            <p>{isMonth ? thisMonth : lastMonth}</p>
          )}
          <p className="month">This month</p>
        </p>
        <div className="icon">
          <SendingSmsSvg />
        </div>
      </Wrapper>
    </Link>
  );
};

export default SMSCard;
