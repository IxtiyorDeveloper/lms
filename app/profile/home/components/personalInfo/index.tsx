import React from "react";
import { ImageContainer, Tick, Wrapper } from "./style";
import { CircleImage, PhoneCell, TickSvg } from "components";
import { bgColors } from "styles/theme";
import { useSelector } from "react-redux";
import { IStore } from "store";

const PersonalInfo = () => {
  const user = useSelector((state: IStore) => state.user.user);
  const full_name = user?.userProfile
    ? user?.userProfile?.firstname + " " + user?.userProfile?.lastname
    : "-";
  return (
    <Wrapper>
      <ImageContainer>
        <CircleImage
          src={user?.userProfile?.avatar}
          alt="main-image"
          width={140}
          height={140}
          className="image"
          originalAlways
        />
      </ImageContainer>
      <div className="info">
        <p className="p-full_name">{full_name}</p>
        <div className="ph-row">
          <PhoneCell value={user?.userPhones} />
        </div>
        <div className="role">
          <Tick>
            <TickSvg color={bgColors.white} />
          </Tick>
          <p className="name">{user?.rbacAssignment?.rbacRole?.name}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default PersonalInfo;
