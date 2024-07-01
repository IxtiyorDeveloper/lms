import React from "react";
import { StatisticsCollapse, Wrapper } from "./style";
import { LeadTabs, Filter } from "./components";
import TransferLeadModal from "globals/components/transferLeadModal";
import DeleteLeadTab from "globals/components/deleteLeadTab";
import AddLeadTab from "globals/components/addLeadTab";
import DeleteLead from "globals/components/deleteLead";
import AddLead from "globals/components/addLead";
import Chart from "./components/chart";
import { useOverallLeadStatistics, usePageDataMemo } from "hooks";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";

const Home = () => {
  const router = useRouter();
  const query = router.query;
  const today = dayjs();
  const startOfMonth = dayjs().startOf("month");
  const selects = usePageDataMemo();

  const { data } = useOverallLeadStatistics({
    query_params: {
      expand: "lead_register_count,userProfile.avatar",
      start_date: startOfMonth.format(DATE_FORMAT_YYYY_MM_DD),
      end_date: today.format(DATE_FORMAT_YYYY_MM_DD),
      ...query,
    },
  });

  return (
    <Wrapper>
      <DeleteLeadTab />
      <AddLeadTab />
      <TransferLeadModal />
      <DeleteLead />
      <AddLead />
      <div className="lead-filter">
        <Filter selects={selects} />
      </div>
      <StatisticsCollapse>
        <Chart data={data} />
      </StatisticsCollapse>
      <LeadTabs selects={selects} />
    </Wrapper>
  );
};

export default Home;
