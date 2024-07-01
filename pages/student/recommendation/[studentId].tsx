import React from "react";
import { Recommendations } from "app";
import withAuth from "utils/guard";
import { useRouter } from "next/router";
import { Box } from "@mui/system";

const RecommendationsPage = () => {
  const router = useRouter();
  const studentId = router.query.studentId;
  return (
    <Box mx="40px">
      <Recommendations studentId={studentId} />
    </Box>
  );
};

export default withAuth(RecommendationsPage);
