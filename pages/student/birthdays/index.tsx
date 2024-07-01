import React from "react";
// import { Birthdays } from "app";
import dynamic from "next/dynamic";

const Birthdays = dynamic(() => import("app/student/birthdays"));
const BirthdaysPage = () => {
  return <Birthdays />;
};

export default BirthdaysPage;
