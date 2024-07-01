import React from "react";
import { ArchiveAttendance as ArchiveAttendanceComp } from "components";
import { group } from "./data";

const ArchiveAttendance = () => {
  return (
    <div>
      <ArchiveAttendanceComp isLoading={false} group={group as any} />
    </div>
  );
};

export default ArchiveAttendance;
