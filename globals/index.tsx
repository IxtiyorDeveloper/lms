import React, { useEffect, useState } from "react";
import { ConfigProvider, notification } from "antd";
import {
  ApproveCandidateModal,
  BanModal,
  CallNumber,
  CandidateSMSModal,
  ChangePasswordModal,
  ChangeStartDate,
  CheckListModal,
  MeetingCandidateModal,
  NewStudentsStoppingModal,
  PassedStudentsResultModal,
  PaymentV2Modal,
  PhoneNumberDownload,
  PodoModal,
  PrintBlackList,
  RejectCandidateModal,
  RewardApproveModal,
  RewardCancalModal,
  RewardGiveModal,
  RewardRestoreModal,
  SmsBlackList,
  StaffCancelDismassal,
  StaffCancelReposition,
  TaxModal,
  UserGlobal,
} from "./components";
import PaymentModal from "./components/paymentModal";
import StoppingModal from "./components/stoppingModal";
import TransferModal from "../components/modals/transferModal";
import ContinueModal from "../components/modals/continueModal";
import AttendModal from "./components/attendModal";
import TransferBackModal from "./components/transferBackModal";
import DeleteModal from "./components/deleteModal";
import FirstLesson from "./components/firstLesson";
import BlockModal from "./components/blockModal";
import BackToWaitingList from "./components/backToWaitingList";
import GroupSmsModal from "./components/groupSmsModal";
import { useRouter } from "next/router";
import SelfSmsModal from "./components/studentSmsModal";
import CreateTemplateModal from "./components/createTemplateModal";
import DeleteTransaction from "./components/deleteTransaction";
import DeleteExpense from "./components/deleteExpense";
import ExclusionModal from "./components/exclusionModal";
import CreateRegionModal from "./components/createRegion";
import { bgColors } from "styles/theme";
import UnbanModal from "./components/unban";
import UnblockModal from "./components/unblockModal";
import FirstEntrance from "./components/firstEntranceModal";
import en_GB from "antd/locale/en_GB";
import { setWindowIsActive, useAppSelector } from "store";
import dynamic from "next/dynamic";
import PaymentRequest from "./components/paymentRequest";
import MoveTransferModal from "./components/moveTransfer";
import ComplaintModal from "./components/complaint";
import CredentialsCheck from "./components/credentialsCheck";
import PrintGroupStudents from "./components/groupStudentsPrint";
import PrintDebtorsModal from "./components/debtorsPrint";
import ReturnMoneyCheck from "./components/returnMoneyCheck";
import AbsentModal from "./components/absentModal";
import PaymentIncomeCheck from "./components/paymentCheck";
import PaymentCheckAfterCreate from "./components/paymentCheckC";
import ProductCheckC from "./components/productCheckC";
import CreateExpenseModal from "./components/expenseModal";
import ArchiveLifeCycle from "./components/studentLifeCycle";
import CandidateLifecycleModal from "./components/candidateLifecycleModal";
import { useNotifications } from "./notifications/useNotifications";
import PotentialFailModal from "./components/potentialFail";
import AutoCallModal from "./components/autoCallModal";
import StudentExamResultModal from "app/academic-resource/exam-list/groupInside/components/studentResultModal";
import StudentMockExamResultModal from "app/academic-resource/exam-list/groupInside/components/studentResultModal/mock";

//@ts-ignore
import window from "global";
import { useDispatch } from "react-redux";

const VacancyConfigModal = dynamic(
  () => import("app/hr/config/components/vacancyConfigModal"),
  {
    ssr: false,
  }
);
const Sip = dynamic(() => import("./components/sip"), {
  ssr: false,
});
// const CallModal = dynamic(() => import("./components/callModal"), {
//   ssr: false,
// });

notification.config({
  duration: 1000,
  rtl: false,
  maxCount: 6,
});
const GlobalComponents = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { passedStudents } = useAppSelector((state) => state.modals);
  const modals = useAppSelector((state) => state.modals);
  const createExpenseOpen = useAppSelector(
    (state) => state.modals?.createExpense.open
  );
  useNotifications();

  function handleActivity(forcedFlag: any) {
    if (typeof forcedFlag === "boolean") {
      return forcedFlag
        ? dispatch(setWindowIsActive(true))
        : dispatch(setWindowIsActive(false));
    }

    return document.hidden
      ? dispatch(setWindowIsActive(false))
      : dispatch(setWindowIsActive(true));
  }

  useEffect(() => {
    const handleActivityFalse = () => handleActivity(false);
    const handleActivityTrue = () => handleActivity(true);

    document.addEventListener("visibilitychange", handleActivity);
    document.addEventListener("blur", handleActivityFalse);
    window.addEventListener("blur", handleActivityFalse);
    window.addEventListener("focus", handleActivityTrue);
    document.addEventListener("focus", handleActivityTrue);

    return () => {
      window.removeEventListener("blur", handleActivity);
      document.removeEventListener("blur", handleActivityFalse);
      window.removeEventListener("focus", handleActivityFalse);
      document.removeEventListener("focus", handleActivityTrue);
      document.removeEventListener("visibilitychange", handleActivityTrue);
    };
  }, []);

  return (
    <ConfigProvider
      locale={en_GB}
      theme={{
        token: { colorPrimary: bgColors.primary },
        components: {
          Select: {
            controlItemBgActive: bgColors.primary,
          },
          Notification: {},
        },
      }}
    >
      <ArchiveLifeCycle />
      <ChangeStartDate />
      <UnbanModal />
      <BanModal />
      <UnblockModal />
      <UserGlobal />
      <PaymentModal />
      <ReturnMoneyCheck />
      {passedStudents.open && <PassedStudentsResultModal />}
      <PrintBlackList />
      <PrintGroupStudents />
      <PrintDebtorsModal />
      <StoppingModal />
      <TransferModal />
      <ContinueModal />
      <MoveTransferModal />
      <AttendModal />
      {createExpenseOpen && <CreateExpenseModal />}
      <TransferBackModal />
      <DeleteModal />
      <PodoModal />
      <BlockModal />
      <BackToWaitingList />
      <ChangePasswordModal />
      <NewStudentsStoppingModal />
      <CallNumber />
      <GroupSmsModal />
      <PaymentRequest />
      <ComplaintModal />
      <AbsentModal />
      {router.query?.smsBlackList === "true" ? <SmsBlackList /> : null}
      <SelfSmsModal />
      {router.query?.createTemplateModal === "true" ? (
        <CreateTemplateModal />
      ) : null}
      <DeleteTransaction />
      <DeleteExpense />
      {router.query.paymentIncomeCheck === "true" ? (
        <PaymentIncomeCheck />
      ) : null}
      {router.query.paymentCheckAfterCreate === "true" ? (
        <PaymentCheckAfterCreate />
      ) : null}
      {router.query.productIncomeCheck === "true" ? <ProductCheckC /> : null}
      {router.query.firstEntrance === "true" ? <FirstEntrance /> : null}
      {router.query.firstLesson === "true" ? <FirstLesson /> : null}
      {router.query.credentialsCheck === "true" ? <CredentialsCheck /> : null}
      {router.query.editExclusion === "true" ? <ExclusionModal /> : null}

      {router.query.createRegion === "true" ? <CreateRegionModal /> : null}
      <PhoneNumberDownload />
      {children}
      <VacancyConfigModal />
      <RejectCandidateModal />
      <MeetingCandidateModal />
      <ApproveCandidateModal />
      <CandidateLifecycleModal />
      <CheckListModal />
      <CandidateSMSModal />
      <RewardCancalModal />
      {modals.rewardGive?.open && <RewardGiveModal />}
      <RewardRestoreModal />
      <RewardApproveModal />
      <StaffCancelDismassal />
      <StaffCancelReposition />
      <TaxModal />
      <PotentialFailModal />
      <PaymentV2Modal />
      <AutoCallModal />
      {/* <Sip /> */}
      <StudentExamResultModal />
      <StudentMockExamResultModal />
    </ConfigProvider>
  );
};

export default GlobalComponents;
