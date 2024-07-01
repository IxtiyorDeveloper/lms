import React from "react";
import { HRConfigPage } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const HRConfig = () => {
    return <HRConfigPage />;
};

export default withAuth(HRConfig);