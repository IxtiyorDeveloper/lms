import React, { FC } from "react";
import { UserWrapper, Wrapper } from "./style";
import { CallSvg, CircleImage } from "components";
import { UserStatus, statusNames } from "../userCard";
import { PhoneTypes } from "constants/phoneTypes";

interface IProps {
  returnToBig: () => void;
  call: any;
  users: any;
  rtcSession: any;
  acceptCall: any;
  cancelCall: any;
}

const SpeakingLittle: FC<IProps> = ({
  returnToBig,
  call,
  users,
  rtcSession,
  acceptCall,
  cancelCall,
}) => {
  const len = users.length;
  return (
    <Wrapper
      onClick={(e) => {
        e.stopPropagation();
        returnToBig();
      }}
      // count={users.length}
      // user={users}
      about=""
    >
      <div className="flex">
        <div className="w-100">
          {users && users.length > 0 ? (
            <div className="items">
              {users.map(
                (user: {
                  fullName: string;
                  type: UserStatus;
                  groupName: string;
                  groupId: string;
                  studentId: string;
                  url: string;
                  status: number;
                  numberType: 100 | 600 | 400 | 500;
                  statusColor: string;
                  numberColor: string;
                }) => {
                  return (
                    <UserWrapper count={len} user={user} className="child">
                      <div>
                        <CircleImage height={80} width={80} src={user.url} />
                      </div>
                      <div>
                        <div className="fullName">
                          {user?.fullName || "Full name"}
                        </div>
                        <div className="status">
                          {user?.status
                            ? statusNames[
                                user?.status as keyof typeof statusNames
                              ] || "_"
                            : "User status"}
                        </div>
                        <div className="numberType">
                          {user?.numberType
                            ? PhoneTypes[user?.numberType]
                            : "Number type"}
                        </div>
                      </div>
                    </UserWrapper>
                  );
                }
              )}
            </div>
          ) : (
            <UserWrapper
              count={len}
              user={{
                fullName: "",
                groupId: "",
                groupName: "",
                numberColor: "",
                numberType: 100,
                status: "",
                statusColor: "",
                studentId: "",
                type: "Lead",
                url: "",
              }}
              className="child"
            >
              <div>
                <CircleImage height={80} width={80} />
              </div>
              <div>
                <div className="fullName">Full name</div>
                <div className="status">User status</div>
                <div className="numberType">Number type</div>
              </div>
            </UserWrapper>
          )}
        </div>
        <div>
          {call.isTalking === "ringing" &&
          rtcSession.direction === "incoming" ? (
            <div className="buttons">
              <div className="answer1" onClick={acceptCall}>
                <CallSvg />
              </div>
              <div className="cancel1" onClick={cancelCall}>
                <CallSvg style={{ transform: "rotate(135deg)" }} />
              </div>
            </div>
          ) : (
            <div className="buttons">
              <div className="cancel1" onClick={cancelCall}>
                <CallSvg style={{ transform: "rotate(135deg)" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default SpeakingLittle;
