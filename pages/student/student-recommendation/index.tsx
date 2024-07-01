import React from "react";
import { StudentRecommendation } from "app";
import withAuth from "utils/guard";
import { Box } from "@mui/system";

const StudentRecommendationPage = () => {
  return (
    <Box>
      <StudentRecommendation />
    </Box>
  );
};

export default withAuth(StudentRecommendationPage);
