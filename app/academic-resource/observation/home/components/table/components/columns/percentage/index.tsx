import React from "react";
import { TableHeading, SortSvg } from "components";
import { TimeSortWrapper } from "./style";
import { useRouter } from "next/router";

const PercentageSortHeader = () => {
  const router = useRouter();
  const status = !router.query.sort
    ? "none"
    : router.query.sort === "overall"
      ? "asc"
      : "desc";
  const handleClick = () => {
    router.replace({
      query: {
        ...router.query,
        sort: router.query.sort === "overall" ? "-overall" : "overall",
      },
    });
  };

  return (
    <TimeSortWrapper status={status} onClick={handleClick}>
      <TableHeading className="heading">
        Ranking percentage
        <div className="arrow">
          <SortSvg />
        </div>
      </TableHeading>
    </TimeSortWrapper>
  );
};

export default PercentageSortHeader;
