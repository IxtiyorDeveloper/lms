import React from "react";
import { TableHeading, ThinArrowRight } from "components";
import { TimeSortWrapper } from "./style";
import { useRouter } from "next/router";

const TimSortHeader = () => {
  const router = useRouter();
  const status = !router.query.sort
    ? "none"
    : router.query.sort === "time"
      ? "asc"
      : "desc";
  const handleClick = () => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          sort: router.query.sort === "time" ? "-time" : "time",
        },
      },
      undefined,
      { scroll: false },
    );
  };

  return (
    <TimeSortWrapper status={status} onClick={handleClick}>
      <TableHeading className="heading">
        Day & Time
        <div className="arrow">
          <ThinArrowRight />
        </div>
      </TableHeading>
    </TimeSortWrapper>
  );
};

export default TimSortHeader;
