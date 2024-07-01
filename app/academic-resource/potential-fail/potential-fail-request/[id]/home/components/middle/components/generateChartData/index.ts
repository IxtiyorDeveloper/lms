import { IChartData } from "./type";

export const generateChartData = ({ data }: IChartData) => {
  const done =
    data?.fallibleReviews?.reduce((acc, cur) => {
      return acc + (cur.doneReviewersCount || 0);
    }, 0) || 0;

  const allReviewersCount =
    data?.fallibleReviews?.reduce((acc, cur) => {
      return acc + (cur.allReviewersCount || 0);
    }, 0) || 0;
  const not_done = allReviewersCount - done;
  const done_percentage = (done * 100) / allReviewersCount;
  const not_done_percentage = (not_done * 100) / allReviewersCount;

  return [
    {
      percentage: done_percentage,
      color: "linear-gradient(270deg, #2AB44C 0%, #70D088 100%)",
      label: `Done ${`${done}`?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`,
    },
    {
      percentage: not_done_percentage,
      color: "linear-gradient(270deg, #E92857 0%, #F14852 100%)",
      label: `Not done ${`${not_done}`?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`,
    },
  ];
};
