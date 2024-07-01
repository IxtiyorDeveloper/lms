import React from "react";
import { ThroughSvg, BackgroundTwoCircleSvg } from "components";
import { Wrapper } from "./style";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import Link from "next/link";
import { bgColors, textColors } from "styles/theme";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { StaffMotivationCardSvg } from "@jasurbekyuldashov/lms-web-icons";
import Icon from "./components/incon";

export default function StaffMotivationCard({
  period = "0",
  today = "0",
}: {
  period?: string;
  today?: number | string;
}) {
  return (
    <Link
      href={
        funcCheckPermission([
          COMPONENTS_VIEWS.can_see_dashboard_own_branch_staff_motivation,
        ])
          ? "/statistics/dashboard/staff-motivation"
          : "/statistics/dashboard"
      }>
      <Wrapper>
        <div className="head-card" style={{ color: textColors.sceptreBlue }}>
          <p className="title-card">Staff motivation</p>
          <ThroughSvg color={bgColors.white} />
        </div>

        <p className="grotesk kpi textFont">
          {toCurrencyFormat(+period)}{" "}
          <sup className="green grotesk textFont">
            {toCurrencyFormat(+today)}
          </sup>
        </p>
        <div className="icon">
          <StaffMotivationCardSvg />
        </div>
        <div className="bg-img-left">
          <Icon />
        </div>
        <div className="bg-img-right">
          <BackgroundTwoCircleSvg color="#28412D" />
        </div>
      </Wrapper>
    </Link>
  );
}
