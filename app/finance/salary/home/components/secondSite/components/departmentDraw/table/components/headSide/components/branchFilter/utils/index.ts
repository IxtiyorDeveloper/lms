import _ from "lodash";

export const checkForFiltered = ({
  branches,
  current,
}: {
  branches: any;
  current: any;
}) => {
  return !!branches?.length && current !== null
    ? !_.isEqual(branches, current)
    : false;
};
