import React from "react";
import { Wrapper } from "./style";
import { CircleImage, PaymentInfo } from "../index";
import { IContacts } from "types/contact";
import { Call, Mail } from "../../elements";
import { toggleModal, useAppSelector } from "store";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import PhoneCell from "../tableCells/phoneCell";
import env from "utils/env";
import { startCall } from "utils/call";

const DetailedStudentCard = ({
  data,
  hasPaymentInfo = false,
}: {
  data: IContacts;
  hasPaymentInfo?: boolean;
}) => {
  const dispatch = useDispatch();

  const full_name = data?.user?.userProfile
    ? `${
        data?.user?.userProfile?.firstname +
        " " +
        data?.user?.userProfile?.lastname
      } (${data?.user?.userProfile?.age})`
    : "";
  const id = data?.id;
  const userId = data?.user_id ?? data?.user?.id;

  const onCallButtonPress = (phone_number: string) => {
    try {
      startCall(`sip:${phone_number as string}@${env.pbxUrl}`);
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Wrapper>
      <div className="image">
        <CircleImage
          src={data?.user?.userProfile?.avatar}
          alt="avatar"
          width={75}
          height={75}
          className="img"
        />
      </div>
      <div className="p-details">
        <p className="full-name">{full_name}</p>
        <p className="phone">
          <PhoneCell value={data?.user?.userPhones} />
        </p>
        {hasPaymentInfo && <PaymentInfo user={data} group={data?.group} />}
      </div>
      <div className="actions">
        <Call
          size="medium"
          key={`call_${userId}_key`}
          onClick={onCallButtonPress}
          value={data?.user?.userPhones || []}
        />
        <Mail
          key={`sms_${userId}_key`}
          size="medium"
          onClick={() => {
            dispatch(
              toggleModal({
                key: "selfSms",
                data: {
                  data: {
                    user_id: userId,
                    id,
                    filter: "contact",
                    sent_field_name: "id",
                  },
                  open: true,
                },
              })
            );
          }}
        />
      </div>
    </Wrapper>
  );
};

export default DetailedStudentCard;
