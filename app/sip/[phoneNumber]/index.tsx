import CallModal from "globals/components/callModal";
import Sip from "globals/components/sip";
import { CallDialer } from "layout/header/components/call";
import { Wrapper } from "./style";

export default function SipService() {
  return (
    <Wrapper>
      <CallModal />
      <CallDialer />
      <Sip />
    </Wrapper>
  );
}
