import React, { FC } from "react";
import { CircleImage, PhoneCell } from "components";
import { ReferredByWrapper } from "./style";
import Link from "next/link";

interface IProps {
  value: any;
}

const ReferredByUser: FC<IProps> = (props) => {
  const userProfile = props?.value?.userProfile || props?.value;

  return (
    <ReferredByWrapper>
      {!!userProfile?.avatar && (
        <CircleImage
          width={42}
          height={42}
          src={{
            full_url: userProfile?.avatar?.full_url,
            children: userProfile?.avatar?.children,
          }}
        />
      )}
      <div>
        {!!userProfile?.user_id ? (
          <Link
            href={`/student/${userProfile?.user_id}`}
            className="first_name"
          >
            {userProfile?.firstname} {userProfile?.lastname} {userProfile?.name}
          </Link>
        ) : (
          <p className="first_name">
            {userProfile?.firstname} {userProfile?.lastname} {userProfile?.name}
          </p>
        )}
        <PhoneCell
          value={[
            props?.value?.confirmedPhone || {
              id: userProfile?.id,
              type: 300,
              phone_number: props?.value?.main_phone,
              is_confirmed: 2,
            },
          ]}
        />
      </div>
    </ReferredByWrapper>
  );
};

export default ReferredByUser;
