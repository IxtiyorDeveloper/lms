import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { AvatarWrapper } from "./style";
import { CircleImage } from "components";
import { asUserNames } from "utils/textFormat";
import Link from "next/link";

const Profile = () => {
  const user = useSelector((state: IStore) => state.user.user);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <AvatarWrapper>
        <div>
          <CircleImage
            src={user?.userProfile?.avatar}
            alt="search"
            width="32px"
            height="32px"
          />
        </div>
        <Link href="/profile">
          <div className="name-with-arrow">
            <div>
              <Typography style={{ cursor: "pointer" }} className="username">
                {`${asUserNames(user?.userProfile?.firstname)} ${asUserNames(
                  user?.userProfile?.lastname
                )}`}
              </Typography>
            </div>
          </div>
          <div>
            <Grid item sm={9}>
              <Typography className="role">
                {user?.rbacAssignment?.rbacRole?.name}
              </Typography>
            </Grid>
          </div>
        </Link>
      </AvatarWrapper>
    </div>
  );
};

export default Profile;
