import React, { FC } from "react";
import { Card, Wrapper } from "./style";
import { bgColors } from "styles/theme";
import {
  FaultAllSvg,
  LostAllSvg,
  ProgressAllSvg,
  OverallSvg,
  LearningSvg,
  BackgroundTwoCircleSvg,
} from "components";
import { fixedNumber } from "utils/functions/fixedNumber";
import { useRouter } from "next/router";

const Avg: FC<{
  avg?: {
    progress_avg?: string;
    lost_avg?: string;
    offence_avg?: string;
    overall_avg?: string;
    exam_avg?: string;
  };
  count?: number;
}> = ({
  avg = {
    progress_avg: 0,
    lost_avg: 0,
    offence_avg: 0,
    overall_avg: 0,
    exam_avg: 0,
  },
  count = 0,
}) => {
  const router = useRouter();

  //cardlar bosilganda filter type ni o'zgartirish
  const onClickCard = (s?: string) => () => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          sort: s ? `-${s}` : undefined,
        },
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <Wrapper>
      <div className="flex">
        <Card
          background="linear-gradient(109deg, #6084FF 5.06%, #90A7F6 97.37%)"
          boxShadow="0 0 4px 0 #BAF7BC inset"
          onClick={onClickCard("progress_total")}
          isActive={router.query.sort == "-progress_total"}
        >
          <div className="info">
            <div>Student progress</div>
            <div className="child">
              <span className="number">{fixedNumber(avg?.progress_avg)}%</span>
            </div>
          </div>
          <div className="icons">
            <div className="back">
              <BackgroundTwoCircleSvg color={bgColors.deep} />
            </div>
            <div className="main">
              <ProgressAllSvg width={80} height={80} color={bgColors.white} />
            </div>
          </div>
        </Card>
        {router.query?.type == "200" && (
          <Card
            background="linear-gradient(99deg, #E92857 1.13%, #F87C84 99.13%)"
            boxShadow="0 0 4px 0 #FCADA9 inset"
            onClick={onClickCard("exam_total")}
            isActive={router.query.sort == "-exam_total"}
          >
            <div className="info">
              <div>Exam result</div>
              <div className="child">
                <span className="number">{fixedNumber(avg?.exam_avg)}%</span>
              </div>
            </div>
            <div className="icons">
              <div className="back">
                <BackgroundTwoCircleSvg color={bgColors.pop} />
              </div>
              <div className="main">
                <LearningSvg width={80} height={80} color={bgColors.white} />
              </div>
            </div>
          </Card>
        )}
        {router.query?.type != "200" && (
          <Card
            background="linear-gradient(99deg, #E92857 1.13%, #F87C84 99.13%)"
            boxShadow="0 0 4px 0 #FCADA9 inset"
            onClick={onClickCard("lost_total")}
            isActive={router.query.sort == "-lost_total"}
          >
            <div className="info">
              <div>Lost</div>
              <div className="child">
                <span className="number">{fixedNumber(avg?.lost_avg)}%</span>
              </div>
            </div>
            <div className="icons">
              <div className="back">
                <BackgroundTwoCircleSvg color={bgColors.pop} />
              </div>
              <div className="main">
                <LostAllSvg width={80} height={80} color={bgColors.white} />
              </div>
            </div>
          </Card>
        )}
        {router.query?.type != "200" && (
          <Card
            background="linear-gradient(98.55deg, #8928E9 1.13%, #AD63F8 99.13%)"
            boxShadow="0 0 4px 0 #FCADA9 inset"
            onClick={onClickCard("exam_total")}
            isActive={router.query.sort == "-exam_total"}
          >
            <div className="info">
              <div>Exam result</div>
              <div className="child">
                <span className="number">{fixedNumber(avg?.exam_avg)}%</span>
              </div>
            </div>
            <div className="icons">
              <div className="back">
                <BackgroundTwoCircleSvg color="#8C2DEB" />
              </div>
              <div className="main">
                <LearningSvg width={80} height={80} color={bgColors.white} />
              </div>
            </div>
          </Card>
        )}
        <Card
          background="linear-gradient(98deg, #FA791D 1.07%, #E4B08B 98.85%)"
          boxShadow="0 0 4px 0 #FA7A1F inset"
          onClick={onClickCard("offence_total")}
          isActive={router.query.sort == "-offence_total"}
        >
          <div className="info">
            <div>Fault</div>
            <div className="child">
              <span className="number">{-fixedNumber(avg?.offence_avg)}%</span>
            </div>
          </div>
          <div className="icons">
            <div className="back">
              <BackgroundTwoCircleSvg color="#EFAE7C" />
            </div>
            <div className="main">
              <FaultAllSvg width={80} height={80} color={bgColors.white} />
            </div>
          </div>
        </Card>
        <Card
          background="linear-gradient(97deg, #44B26B 3.03%, #70D088 99.6%)"
          boxShadow="0 0 4px 0 #BAF7BC inset"
          onClick={onClickCard()}
          isActive={router.query.sort == "" || !router.query.sort}
        >
          <div className="info">
            <div>Overall</div>
            <div className="child">
              <span className="number">{fixedNumber(avg?.overall_avg)}%</span>
            </div>
            <div className="mt-auto">
              <span className="number">{count}</span>{" "}
              {router.query?.type != "200" ? "teachers" : "supports"}
            </div>
          </div>
          <div className="icons">
            <div className="back">
              <BackgroundTwoCircleSvg />
            </div>
            <div className="main">
              <OverallSvg width={80} height={80} color={bgColors.white} />
            </div>
          </div>
        </Card>
      </div>
    </Wrapper>
  );
};

export default Avg;
