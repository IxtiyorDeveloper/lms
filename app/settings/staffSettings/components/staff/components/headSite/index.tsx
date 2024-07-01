import React, { FC } from "react";
import { HeadSiteCard } from "./style";
import { Button, PlusSvg } from "components";
import { IHeadSite } from "./type";
import Link from "next/link";

const HeadSite: FC<IHeadSite> = ({ handleOpen }) => {
  return (
    <HeadSiteCard>
      <Button onClick={() => handleOpen()} className="btn-primary">
        <PlusSvg /> Department
      </Button>
      <Link href="/settings/staff-settings/rewards">
        <Button className="btn-rewards">Rewards</Button>
      </Link>
      <Link href="/settings/staff-settings/vacation-schedule">
        <Button className="btn-vacation">Vacation schedule</Button>
      </Link>
    </HeadSiteCard>
  );
};

export default HeadSite;
