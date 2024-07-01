import React, { FC } from "react";
import { Wrapper, TextView } from "./style";
import { bgColors, textColors } from "styles/theme";
import { CircleImage } from "components";

interface IProps {
  createdBy?: string;
  profilePic: any;
}

const CreatedByView: FC<IProps> = (props) => {
  return (
    <Wrapper>
      <div>
        <TextView>Created by</TextView>
        <TextView color={textColors.inDark}>{props.createdBy}</TextView>
      </div>
      <div>
        {props.profilePic === undefined ||
        typeof props.profilePic === "string" ? (
          <CircleImage
            src={props.profilePic}
            width={40}
            color={bgColors.primary}
          />
        ) : (
          <CircleImage
            src={{
              full_url:
                props.profilePic?.length && props.profilePic[0]?.full_url,
              children: props.profilePic,
            }}
            color={bgColors.primary}
            width={40}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default CreatedByView;
