import { Moment } from "moment";

export const checkIsRecommended = ({monthFormatted, nextRecommendedPeriod}: {
  monthFormatted: Moment;
  nextRecommendedPeriod: string
}) => {
  return monthFormatted.isSameOrAfter(nextRecommendedPeriod);
}
