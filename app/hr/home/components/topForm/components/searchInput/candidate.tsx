import { Flex } from "antd";
import { CircleImageBlackRedList, PhoneCell } from "components";
import { CandidateStatus } from "constants/hr";
import { ICandidate } from "types";
import { fontSizes, textColors } from "styles/theme";
import { CandidateWrapper, VacancyRole } from "./style";
import { StatusIdentify } from "./status";
import { useRouter } from "next/router";

const CandidateItem = ({
  data,
  value,
}: {
  data?: ICandidate;
  value?: string;
}) => {
  const router = useRouter();
  const { status, stage, vacancy_id, roundedTabIndex } = router.query;

  const handleClick = () => {
    const order =
      data?.status === CandidateStatus.CANDIDATE
        ? data?.stage
        : data?.vacancy?.id;
    const index = !!value?.search ? order : roundedTabIndex;

    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        id: data?.id,
        status: data?.status ?? status,
        stage: data?.stage ?? stage,
        roundedTabIndex: index,
        vacancy_id: data?.vacancy?.id ?? vacancy_id,
      },
    });
  };
  
  return (
    <CandidateWrapper
      align="middle"
      justify="space-between"
      wrap={false}
      onClick={handleClick}>
      <Flex align="center" gap={10} wrap="nowrap">
        <CircleImageBlackRedList
          width={32}
          height={32}
          src={data?.candidateAvatar?.url ?? "/user.svg"}
          isRed={data?.status === CandidateStatus.BANNED}
          color={data?.status === CandidateStatus.BANNED ? textColors.pop : ""}
        />
        <div>
          {data?.first_name + " " + data?.last_name}
          <Flex gap={4} align="center" wrap="nowrap">
            <PhoneCell
              overlayStyle={{
                zIndex: 9999,
              }}
              style={{
                fontSize: fontSizes.f10,
                color: textColors.yourShadow,
              }}
              value={data?.candidatePhoneNumbers}
            />

            <VacancyRole>{data?.vacancy?.title}</VacancyRole>
          </Flex>
        </div>
      </Flex>
      <StatusIdentify stage={data?.stage!} status={data?.status!} />
    </CandidateWrapper>
  );
};

export default CandidateItem;
