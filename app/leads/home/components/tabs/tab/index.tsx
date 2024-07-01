import React, { FC, useMemo } from "react";
import { Buttons, Wrapper, TableWrapper } from "./style";
import { Button, FilledSmsSvg, PlusSvg, SettingsSvg } from "components";
import { bgColors, textColors } from "styles/theme";
import { Type } from "./type";
import { useRouter } from "next/router";
import { LeadTabEnums } from "constants/leadTabs";
import NewLeadTable from "../newLeadTable";
import ProcessingLeadTable from "../processingLeadTable";
import RegisteredTable from "../registeredTable";
import DeletedLeadTable from "../deletedLeadTable";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { CheckPermission } from "../../../../../../utils";
import { COMPONENTS_VIEWS } from "../../../../../../constants/permissions";
import { CallSvg, ReferralStudentSvg } from "@jasurbekyuldashov/lms-web-icons";
import Link from "next/link";

const LeadTabContent: FC<Type> = ({
  tableType,
  leads,
  isLoading,
  isCreatedTabs = false,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const tables = useMemo(() => {
    return {
      [LeadTabEnums.NEW_LEADS]: (
        <NewLeadTable leads={leads} isLoading={isLoading} />
      ),
      [LeadTabEnums.PROCESSING_LEADS]: (
        <ProcessingLeadTable
          leads={leads}
          isLoading={isLoading}
          isCreatedTabs={isCreatedTabs}
        />
      ),
      [LeadTabEnums.REGISTERED_LEADS]: (
        <RegisteredTable leads={leads} isLoading={isLoading} />
      ),
      [LeadTabEnums.DELETED_LEADS]: (
        <DeletedLeadTable leads={leads} isLoading={isLoading} />
      ),
    };
  }, [leads?.tabs, isLoading, isCreatedTabs, leads?.list]);

  return (
    <Wrapper>
      <Buttons>
        <div className="left">
          <Button
            onClick={() =>
              dispatch(
                toggleModal({
                  key: "addLead",
                  data: {
                    data: {},
                    open: true,
                  },
                }),
              )
            }
            icon={<PlusSvg />}
            style={{
              padding: "0 24px",
              color: textColors.blueGray,
              fontWeight: 700,
              borderRadius: 10,
              lineHeight: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            Create Lead
          </Button>
        </div>
        <div className="right">
          {/* <Button
            icon={<SettingsSvg />}
            style={{
              padding: "0 24px",
              color: textColors.yourShadow,
              backgroundColor: bgColors.wildSand,
              fontWeight: 700,
              borderRadius: 10,
              lineHeight: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
            onClick={() => router.push("/leads/lead-config")}
          >
            Config
          </Button> */}
          <CheckPermission
            permission={[COMPONENTS_VIEWS.admin_can_see_student_referrals]}
          >
            <Link href="/leads/referrals">
              <Button
                icon={
                  <ReferralStudentSvg
                    width={20}
                    height={20}
                    color={bgColors.white}
                  />
                }
                style={{
                  backgroundColor: bgColors.deep,
                }}
              >
                <span style={{ color: textColors.white }}>Referral</span>
              </Button>
            </Link>
          </CheckPermission>
          <Button
            icon={<FilledSmsSvg />}
            style={{
              padding: "0 24px",
              color: textColors.blueGray,
              fontWeight: 700,
              borderRadius: 10,
              lineHeight: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
            onClick={() => {
              dispatch(
                toggleModal({
                  key: "groupSms",
                  data: {
                    data: {
                      extra: {
                        status: tableType,
                      },
                      filter: "lead",
                    },
                    open: true,
                  },
                }),
              );
            }}
          />
          <CheckPermission permission={[COMPONENTS_VIEWS.can_call_user]}>
            <Button
              icon={<CallSvg width={20} height={20} color={bgColors.white} />}
              style={{
                backgroundColor: bgColors.midori,
              }}
              onClick={() => {
                dispatch(
                  toggleModal({
                    key: "autoCall",
                    data: {
                      data: {
                        filter: "lead",
                        search: router.query,
                        extra: {
                          status: tableType,
                        },
                      },
                      open: true,
                    },
                  }),
                );
              }}
            />
          </CheckPermission>
        </div>
      </Buttons>

      <TableWrapper>{tables[tableType]}</TableWrapper>
    </Wrapper>
  );
};

export default LeadTabContent;
