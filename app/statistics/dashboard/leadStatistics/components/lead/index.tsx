import React, { FC } from "react";
import { StudentWrapper } from "./style";
import {
  LeadsByCurrentStatusesCard,
  LeadsBySourcesCard,
  LeadsRegisteredByAdminsCard,
  LeadsRegisteredByLevelCard,
  LeadsTakenByAdminsCard,
  NewLeadsToRegisteredCard,
  LeadsRegisteredByBranchCard,
} from "./cards";

const LeadList = () => {
  return (
    <StudentWrapper>
      <NewLeadsToRegisteredCard />
      <LeadsBySourcesCard />
      <LeadsByCurrentStatusesCard />
      <LeadsTakenByAdminsCard />
      <LeadsRegisteredByAdminsCard />
      <LeadsRegisteredByLevelCard />
      <LeadsRegisteredByBranchCard />
    </StudentWrapper>
  );
};

export default LeadList;
