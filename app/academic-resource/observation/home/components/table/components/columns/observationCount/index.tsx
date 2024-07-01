import React from "react";
import { TableHeading, SortSvg } from "components";
import { TimeSortWrapper } from "./style";
import { useRouter } from "next/router";

const ObservationCountSortHeader = () => {
  const router = useRouter();
  const status = !router.query.sort
    ? "none"
    : router.query.sort === "averageObservationScore"
      ? "asc"
      : "desc";
  const handleClick = () => {
    router.replace({
      query: {
        ...router.query,
        sort:
          router.query.sort === "averageObservationScore"
            ? "-averageObservationScore"
            : "averageObservationScore",
      },
    });
  };

  return (
    <TimeSortWrapper status={status} onClick={handleClick}>
      <TableHeading className="heading">
        Observation count
        <div className="arrow">
          <SortSvg />
        </div>
      </TableHeading>
    </TimeSortWrapper>
  );
};

export default ObservationCountSortHeader;
