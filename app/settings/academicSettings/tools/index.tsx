import React from "react";
import { Wrapper } from "./style";
import { Button } from "components";
import { bgColors, textColors } from "styles/theme";
import { useRouter } from "next/router";
import { usePageData } from "hooks";
import moment from "moment";
import Modals from "./components/modals";
import RestudyModal from "globals/components/restudy";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";

const Tools = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDeleteNotes = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, deleteNote: "true", notes: "all" },
    });
  };

  const handleOpenChangeDate = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, changeDate: "true" },
    });
  };

  const handleChangeRedListLessonLimit = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, redListLessonLimit: "true" },
    });
  };
  const handleChangeWaitingListConfig = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, waitingListConfig: "true" },
    });
  };
  const handleChangeRankingConfig = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, changeRankingConfig: "true" },
    });
  };
  const handleChangeReferralCoins = () => {
    router
      .replace({
        pathname: router.pathname,
        query: { ...router.query, changeReferralCoins: "true" },
      })
      .then();
  };

  const handleRestudy = () => {
    dispatch(
      toggleModal({
        key: "restudyConfig",
        data: {
          data: {},
          open: true,
        },
      }),
    );
  };

  const handleOpenChangeGroupDate = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, changeGroupDate: "true" },
    });
  };

  const handleMock = () => {
    dispatch(
      toggleModal({
        key: "mockConfig",
        data: {
          data: {},
          open: true,
        },
      }),
    );
  };

  const { data } = usePageData();

  return (
    <Wrapper>
      <div className="card">
        <div className="text-side">
          <p className="title-card">Set level recommendation for future</p>
          <p className="title-date">
            {moment(data?.levelRecommendationConstant || 21, "DD").format(
              "Do ",
            )}
            day of month
          </p>
          <Button onClick={handleOpenChangeDate}>Change date</Button>
        </div>
        <div className="img-side">
          <img src="/calendar-upgrade.png" alt="date" />
        </div>
      </div>
      <div className="card">
        <div className="text-side">
          <p className="title-card">Group notes</p>
          <Button
            onClick={handleDeleteNotes}
            bgColor={bgColors.pop}
            textColor={textColors.white}
          >
            Delete
          </Button>
        </div>
        <div className="img-side">
          <img src="/file-failed 1.png" alt="date" />
        </div>
      </div>
      <div className="card">
        <div className="text-side">
          <p className="title-card">Red List</p>
          <p className="title-date">
            {data?.redListCountConstant} homework & more
          </p>
          <Button
            onClick={handleChangeRedListLessonLimit}
            bgColor={bgColors.deep}
            textColor={textColors.white}
          >
            Change
          </Button>
        </div>
        <div className="img-side">
          <img src="/Ellipse 2420.png" width={120} alt="date" />
        </div>
      </div>
      <div className="card">
        <div className="text-side">
          <p className="title-card">Ranking config</p>
          <Button
            onClick={handleChangeRankingConfig}
            bgColor="#9655CD"
            textColor={textColors.white}
          >
            Change
          </Button>
        </div>
        <div className="img-side">
          <img src="/ranking-config.png" width={120} alt="date" />
        </div>
      </div>
      <div className="card">
        <div className="text-side">
          <p className="title-card">Referral config</p>
          <Button onClick={handleChangeReferralCoins}>Change</Button>
        </div>
        <div className="img-side">
          <img
            src="/money-bundle-stack%20(1).png"
            style={{ margin: "20px" }}
            width={90}
            alt="date"
          />
        </div>
      </div>
      <div className="card">
        <div className="text-side">
          <p className="title-card">Restudy config</p>
          <Button onClick={handleRestudy}>Change</Button>
        </div>
        <div className="img-side">
          <img
            src="/settings/restudy.png"
            style={{ margin: "20px" }}
            width={80}
            alt="date"
          />
        </div>
      </div>
      <div className="card">
        <div className="text-side">
          <p className="title-card">Waiting list</p>
          <Button onClick={handleChangeWaitingListConfig}>Change</Button>
        </div>
        <div className="img-side">
          <img
            src="/settings/waiting-list.png"
            style={{ margin: "20px" }}
            width={80}
            alt="date"
          />
        </div>
      </div>
      <div className="card">
        <div className="text-side">
          <p className="title-card">Mock exam config</p>
          <Button onClick={handleMock}>Change</Button>
        </div>
        <div className="img-side">
          <img
            src="/settings/mock.png"
            style={{ margin: "20px" }}
            width={80}
            alt="date"
          />
        </div>
      </div>
      <Modals />
      <RestudyModal />
    </Wrapper>
  );
};

export default Tools;
