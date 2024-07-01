import React, { Fragment } from "react";
import ChangeRedListLessonCount from "./changeRedListLessonCount";
import DeleteNotes from "./deleteNotes";
import ChangeDateModal from "./changeDateModal";
import ChangeRankingConfig from "./changeRankingConfig";
import ChangeReferralCoins from "./changeReferralCoins";
import RestudyModal from "globals/components/restudy";
import MockConfigModal from "globals/components/mockConfig";
import ChangeWaitingListConfig from "./changeWaitingListConfig";
import { useRouter } from "next/router";

const Modals = () => {
  const router = useRouter();
  return (
    <Fragment>
      {router.query?.changeReferralCoins ? <ChangeReferralCoins /> : null}
      <ChangeRankingConfig />
      <ChangeRedListLessonCount />
      <DeleteNotes />
      <ChangeDateModal />
      <RestudyModal />
      <MockConfigModal />
      <ChangeWaitingListConfig />
    </Fragment>
  );
};

export default Modals;
