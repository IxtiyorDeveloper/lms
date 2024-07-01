import { useRef } from "react";
import { useRouter } from "next/router";
import { CandidateStages, CandidateStatus } from "constants/hr";
import { CandidateModal } from "globals/components";
import {
  useGetApplicantMain,
  useGetApplicantList,
  useGetHRInitialData,
} from "hooks";
import TopForm from "./components/topForm";
import { FilterForm, FilterTab, MainTable } from "./components";
import {  TopContainer, Wrapper } from "./style";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { AddStudentSvg, FloatButton } from "components";
import { CandidateModalType } from "globals/components/candidateModal/type";

const HRPage = () => {
  const filterRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    data: initialData,
    isLoading: intialDataLoading,
    isSuccess,
  } = useGetHRInitialData({
    enabled: true,
  });

  const {
    age,
    vacancy_id,
    created_by,
    start_date,
    end_date,
    meeting_start_date,
    meeting_end_date,
    search,
    meeting_responsible_id,
    vacancy,
    banned_type,
    rejection_type,
    page,
    pageSize,
    id,
    updated_by,
    source,
    ceo_approved,
  } = router.query;

  const st = Number(
    router.query?.status ??
      initialData?.userFirstMeeting?.status ??
      CandidateStatus.CANDIDATE
  );
  const isCandidate = st === CandidateStatus.CANDIDATE;

  const vacancyId = isCandidate ? vacancy : vacancy_id;

  const stage = Number(
    router.query.stage ??
      initialData?.userFirstMeeting?.stage ??
      CandidateStages.NEW
  );

  const isStatusPageSize =
    st === CandidateStatus.HIRED ||
    st === CandidateStatus.REJECTED ||
    st === CandidateStatus.BANNED ||
    st === CandidateStatus.APPLICANT ||
    st === CandidateStatus.RESERVED;

  const isPageSize =
    stage === CandidateStages.NEW ||
    stage === CandidateStages.REGISTRATION ||
    isStatusPageSize;

  const queries = {
    id,
    age,
    status: st,
    count_type: isCandidate ? "stage" : undefined,
    created_by,
    updated_by,
    start_date,
    end_date,
    meeting_responsible_id,
    banned_type,
    rejection_type,
    meeting_start_date,
    meeting_end_date,
    vacancy_id: vacancyId,
    search,
    source,
    ceo_approved: ceo_approved ? 1 : 0,
  };
  const { data: applicantList, isLoading: applicantLoading } =
    useGetApplicantList({
      query_params: queries,
    });

  const { data, isLoading } = useGetApplicantMain(
    {
      stage: isCandidate ? stage : undefined,
      page: isPageSize ? page : undefined,
      pageSize: isPageSize ? pageSize : undefined,
      ...queries,
    },
    !!applicantList
  );


  const handleOpenCandidateModal = () => {
     dispatch(
      toggleModal({
        key: "candidateModal",
        data: {
          data: {
            title: "Create",
            type: CandidateModalType.CREATE,
          },
          open: true,
        },
      })
    );
  }

  return (
    <Wrapper>
      <TopContainer>
        <TopForm />
        <FilterTab
          loading={applicantLoading}
          data={applicantList?.statusList}
          resetForm={() => (filterRef?.current as any)?.reset?.()}
        />
      </TopContainer>

      <FilterForm
        ref={filterRef}
        initialData={initialData}
        loading={intialDataLoading}
        isSuccess={isSuccess}
      />

      <MainTable
        data={data}
        initialData={initialData}
        isLoading={isLoading || intialDataLoading}
        counts={applicantList?.countList}
      />


      <FloatButton
        onClick={handleOpenCandidateModal}
        icon={<AddStudentSvg width={27} height={24} />}
      />

      <CandidateModal />
    </Wrapper>
  );
};

export default HRPage;
