import React from "react";
import { Wrapper } from "./style";
import cn from "classnames";
import Image from "next/image";
import { LeadTabEnums } from "constants/leadTabs";

interface Props {
  today: number;
  this_month: number;
  type: LeadTabEnums.NEW_LEADS | LeadTabEnums.REGISTERED_LEADS;
}
const CountCard = ({ type, this_month, today }: Props) => {
  const is_new_leads = type == LeadTabEnums.NEW_LEADS;
  const countMonth = cn({
    new_month: is_new_leads,
    registered_month: !is_new_leads,
  });
  const countToday = cn({
    new_today: is_new_leads,
    registered_today: !is_new_leads,
  });
  const description = cn("desc", {
    new_desc: is_new_leads,
    registered_desc: !is_new_leads,
  });

  return (
    <Wrapper type={type}>
      <div className="count">
        <h2 className={countMonth}>{this_month}</h2>
        <h2 className={countToday}>+ {today}</h2>
      </div>
      <p className={description}>
        {type == LeadTabEnums.NEW_LEADS ? "New" : "Registered"} leads for this
        month and today
      </p>
      <div className="blur">
        <Image src="/blur.svg" alt="" width={183} height={166} />
      </div>
    </Wrapper>
  );
};

export default CountCard;
