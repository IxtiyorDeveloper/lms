import React from "react";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const Observation = dynamic(
  () => import("app/academic-resource/observation/[id]"),
);

const ObservationPage = () => {
  return <Observation />;
};

export default withAuth(ObservationPage, []);
