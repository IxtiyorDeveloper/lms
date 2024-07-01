import React from "react";
import { TableHeading, SortSvg } from "components";
import { TimeSortWrapper } from "./style";
import { useRouter } from "next/router";

const RankingPlaceSortHeader = () => {
  const router = useRouter();

  const status = !router.query.sort
    ? "none"
    : router.query.sort === "order"
      ? "asc"
      : "desc";
  const handleClick = () => {
    router.replace({
      query: {
        ...router.query,
        sort: router.query.sort === "order" ? "-order" : "order",
      },
    });
  };

  return (
    <TimeSortWrapper status={status} onClick={handleClick}>
      <TableHeading className="heading">
        Ranking place
        <div className="arrow">
          <SortSvg />
        </div>
      </TableHeading>
    </TimeSortWrapper>
  );
};

export default RankingPlaceSortHeader;
