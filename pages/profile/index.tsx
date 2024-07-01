import React from "react";
// import { ProfilePage } from "app";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const ProfilePage = dynamic(() => import("app/profile/home"));
const Profile = () => {
  return <ProfilePage />;
};

export default withAuth(Profile, []);
