import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { SkeletonWrapper } from "./style";
import Stack from "@mui/material/Stack";
const TableSkeleton = () => {
  const array = Array.from(Array(10).keys());
  return (
    <SkeletonWrapper>
      <Stack spacing={1}>
        {array?.map((item, key) => {
          return <Skeleton key={`skeleton_key_${key}`} />;
        })}
      </Stack>
    </SkeletonWrapper>
  );
};

export default TableSkeleton;
