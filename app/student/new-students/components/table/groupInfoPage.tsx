import React from "react";
import { TableHeading, ThinArrowRight } from "components";
import { HeaderWrapper } from "./style";
import { useRouter } from "next/router";

const GroupInfoHeader = () => {
  const router = useRouter();
  const status = !router.query.sort
    ? "none"
    : router.query.sort === "lesson_time.time"
    ? "asc"
    : "desc";
  const handleClick = () => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        sort:
          router.query.sort === "lesson_time.time"
            ? "-lesson_time.time"
            : "lesson_time.time",
      },
    });
  };

  return (
    <HeaderWrapper status={status} onClick={handleClick}>
      <TableHeading className="heading">
        Group info
        <div className="arrow">
          <ThinArrowRight />
        </div>
      </TableHeading>
    </HeaderWrapper>
  );
};

export default GroupInfoHeader;
