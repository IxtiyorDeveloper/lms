export const calculatePoints = ({
  points,
  collected_points,
}: {
  points: number;
  collected_points: number;
}) => {
  if (points > 0) {
    if (collected_points / points > 1) {
      return `100%`;
    } else {
      return `${Math.floor((collected_points / points) * 100)}%`;
    }
  } else return "0%";
};
