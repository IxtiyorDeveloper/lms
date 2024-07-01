// import { StudentRecommendation } from "app";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const StudentRecommendation = dynamic(
  () => import("app/groups/[groupId]/recommendation")
);

function GroupInside() {
  return <StudentRecommendation />;
}

export default withAuth(GroupInside);
