import { bgColors } from "styles/theme";
import { useRouter } from "next/router";
import {
  ApplicantSvg,
  CandidateSvg,
  HiredSvg,
  RejectedSvg,
  ReservedSvg,
} from "components";
import { IAppicationStatus } from "types";
import { LabelCount, OptionWrapper } from "./style";
import { CandidateStatus } from "constants/hr";

export const FilterTabIcons = (value: CandidateStatus) => {
  const router = useRouter();
  const status = Number(router.query.status || CandidateStatus.CANDIDATE);
  const obj = {
    [CandidateStatus.APPLICANT]: (
      <ApplicantSvg
        secondColor={
          status == CandidateStatus.APPLICANT
            ? bgColors.pumpkin
            : bgColors.soulfulBlue
        }
        color={
          status == CandidateStatus.APPLICANT
            ? bgColors.fluorescent
            : bgColors.soulfulBlue
        }
      />
    ),
    [CandidateStatus.CANDIDATE]: (
      <CandidateSvg
        color={
          status == CandidateStatus.CANDIDATE
            ? bgColors.fluorescent
            : bgColors.soulfulBlue
        }
      />
    ),
    [CandidateStatus.RESERVED]: (
      <ReservedSvg
        color={
          status == CandidateStatus.RESERVED
            ? bgColors.fluorescent
            : bgColors.soulfulBlue
        }
      />
    ),
    [CandidateStatus.BANNED]: (
      <RejectedSvg
        color={
          status == CandidateStatus.REJECTED
            ? bgColors.fluorescent
            : bgColors.soulfulBlue
        }
        secondColor={
          status == CandidateStatus.REJECTED
            ? bgColors.pop
            : bgColors.soulfulBlue
        }
      />
    ),
    [CandidateStatus.REJECTED]: (
      <RejectedSvg
        color={
          status == CandidateStatus.REJECTED
            ? bgColors.fluorescent
            : bgColors.soulfulBlue
        }
        secondColor={
          status == CandidateStatus.REJECTED
            ? bgColors.pop
            : bgColors.soulfulBlue
        }
      />
    ),
    [CandidateStatus.HIRED]: (
      <HiredSvg
        color={
          status == CandidateStatus.HIRED
            ? bgColors.fluorescent
            : bgColors.soulfulBlue
        }
        secondColor={
          status == CandidateStatus.HIRED
            ? bgColors.midori
            : bgColors.soulfulBlue
        }
      />
    ),
  };
  return obj[value];
};

export const TabOptions = ({
  data,
  reset,
}: {
  data?: IAppicationStatus[];
  reset: () => void;
}) => {
  const router = useRouter();
  const { status, phone_number, search } = router.query;
  const statusValue = Number(status ?? CandidateStatus.CANDIDATE);
  const activeIndex =
    data?.findIndex((item) => item.value === statusValue) || 0;

  const options =
    data?.map((item, index) => {
      return {
        label: (
          <OptionWrapper
            onClick={() => reset()}
            href={{
              pathname: "/hr",
              query: { status: item.value, phone_number, search },
            }}
            className={
              index + 1 === data?.length || activeIndex - 1 === index
                ? ""
                : "item"
            }>
            <div className="col_left">
              {FilterTabIcons(item.value as CandidateStatus)}
              <h4>{item.label}</h4>
            </div>
            <LabelCount className="count">{item.count}</LabelCount>
          </OptionWrapper>
        ),
        value: `${item.value}`,
      };
    }) || [];

  return options;
};
