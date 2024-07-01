import React from "react";
import { StudentWrapper } from "./style";
import {
  ByActiveStudentAbsCard,
  ByActiveStudentStatusCard,
  ByBranchCard,
  ByDaysCard,
  ByGender,
  ByGroupFormCard,
  ByGroupPoDoCard,
  ByGroupTypeCard,
  ByLevelCard,
  ByMonthCard,
  ByNativeLanguage,
  BySourceCard,
  ByStudentTypeCard,
  ByTimeCard,
} from "./cards";

const Student = () => {
  return (
    <StudentWrapper>
      <ByMonthCard />
      <ByStudentTypeCard />
      <ByActiveStudentStatusCard />
      <ByTimeCard />
      <ByBranchCard />
      <ByActiveStudentAbsCard />
      <ByDaysCard />
      <ByLevelCard />
      <BySourceCard />
      <ByGroupFormCard />
      <ByGroupTypeCard />
      <ByGroupPoDoCard />
      <ByNativeLanguage />
      <ByGender />
    </StudentWrapper>
  );
};

export default Student;
