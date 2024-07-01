import Image from "next/image";
import { Skeleton } from "antd";
import { TParams } from "types/common";
import { ANALYTICS } from "./type";
import { CircleImageBlackRedList, PotentialFailSvg } from "components";
import { InfoCard } from "./style";

export type StudentsInfoCardProps = {
  title: string;
  type:
    | ANALYTICS.NEW
    | ANALYTICS.ATTENDED
    | ANALYTICS.LOST
    | ANALYTICS.ABSENT
    | ANALYTICS.RED_LIST
    | ANALYTICS.BLACK_LIST
    | ANALYTICS.POTENTIAL_FAIL;
  value: number;
  isLoading?: boolean;
  extra?: TParams;
};

const StudentsInfoCard = ({
  title,
  type,
  value,
  isLoading,
  extra,
}: StudentsInfoCardProps) => {
  return (
    <InfoCard>
      {type === ANALYTICS.NEW && extra?.next_day_students_count && (
        <div className="abs">{extra?.next_day_students_count}</div>
      )}
      {type === ANALYTICS.RED_LIST || type === ANALYTICS.BLACK_LIST ? (
        <CircleImageBlackRedList
          value={value}
          width={40}
          height={40}
          isPreview={false}
          isBlack={type === ANALYTICS.BLACK_LIST}
          isRed={type === ANALYTICS.RED_LIST}
          src={"https://www.w3schools.com/howto/img_avatar.png"}
        />
      ) : (
        <div className="img">
          <Image
            alt="avatar"
            width={37}
            height={37}
            src={`/students/${type}.svg`}
          />
          {type === ANALYTICS.POTENTIAL_FAIL && (
            <div className="bg">
              <PotentialFailSvg color="black" />
            </div>
          )}
        </div>
      )}
      <div className="row">
        <p className="title">{title}</p>
        {isLoading ? (
          <Skeleton.Button active size="small" />
        ) : (
          <div className="value">{value}</div>
        )}
      </div>
    </InfoCard>
  );
};

export default StudentsInfoCard;
