import { FC } from "react";
import { RTCSession } from "jssip/lib/RTCSession";
import IncomeSessionCall from "../incomeSession";

interface IProps {
  session: RTCSession;
}

const SessionService: FC<IProps> = ({ session }) => {
  return <IncomeSessionCall rtcSession={session} key={Math.random()} />;
};

export default SessionService;
