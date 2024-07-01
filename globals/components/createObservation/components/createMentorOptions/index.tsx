import { IMainObservation } from "types/observation";
import SearchLabel from "../searchLabel";

export const createMentorOptions = ({
  mentors,
}: {
  mentors: IMainObservation[] | undefined;
}) => {
  if (mentors) {
    return mentors?.map((item, index) => {
      return {
        value: item.base_mentor_id,
        label: <SearchLabel item={item} />,
        extra: item?.user?.userProfile?.fullName,
      };
    });
  } else {
    return [];
  }
};
