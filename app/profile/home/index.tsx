import React from "react";
import { Wrapper } from "./style";
import Image from "next/image";
import PersonalInfo from "./components/personalInfo";
import Cards from "./components/cards";
import Feedback from "./components/feedback";
import Action from "./components/action";
import ProfileSalaryModal from "globals/components/profileSalary";
import RegisteredLead from "globals/components/registeredLead";
import FreshmanForProfile from "globals/components/freshmanForProfile";
import ConfirmLogout from "globals/components/confirmLogout";

const Profile = () => {
  return (
    <Wrapper>
      <ConfirmLogout />
      <RegisteredLead />
      <FreshmanForProfile />
      <ProfileSalaryModal />
      <div className="container">
        <div className="top">
          <Image src="/logo/mainLogo.svg" alt="logo" width={175} height={44} />
        </div>
        <div className="content">
          <PersonalInfo />
          <Cards />
          <Feedback />
          <Action />
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
