import React, { FC, useEffect, useState } from "react";
import { Title, Wrapper } from "./style";
import { IStore } from "store";
import { fetchSearchFields, funcCheckPermission } from "utils";
import { useSelector } from "react-redux";
import { IContacts } from "types/contact";
import { CircleImage, DebounceSelect, WalletSvg } from "components";
import StudentSearchLabel, {
  StudentSearchLabelForOther,
} from "./components/selectedStudent";
import { IOption } from "components/common/select/type";
import { getOneStudent } from "hooks";
import lodash from "lodash";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { fetchSearchFieldsForStudentBalance } from "../../../../../../../utils/functions/fetchSearchFields";
import { OneStudent } from "../../../../../../../types/student";

const PayFromAnotherBalance: FC<{
  control: any;
  setValue: any;
  errors: any;
}> = ({ control, setValue, errors }) => {
  const [options, setOptions] = useState<IOption[]>([]);
  const [url, setUrl] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const data = useSelector((state: IStore) => state.modals.paymentV2.data);

  useEffect(() => {
    return () => {
      setOptions([]);
      setUrl(undefined);
      setAmount(undefined);
      setValue("given_balance_user_id", undefined);
      setValue("tools.otherStudentPhone", undefined);
      setValue("tools.otherStudentBalance", undefined);
    };
  }, []);

  return (
    <Wrapper>
      <Title>Select payer student</Title>
      <div className="flex">
        <div>
          <CircleImage src={url} width={75} height={75} />
        </div>
        <div className="student">
          <div>
            <DebounceSelect
              isValue
              showSearch
              control={control}
              name="given_balance_user_id"
              placeholder="At least 3 letters"
              // disabled={!!data?.user?.user}
              defaultUserId={data?.user?.user?.id}
              defaultOption={!!data?.user?.user ? options : undefined}
              fetchOptions={async (searchString) => {
                const options: IOption[] =
                  await fetchSearchFieldsForStudentBalance({
                    search: searchString,
                    expand:
                      "user.userProfile.avatar,user.userPhones,dividedBalance,currentGroupContact,branch",
                    "per-page": 500,
                    labelShow: (active: OneStudent) => {
                      return <StudentSearchLabelForOther props={active} />;
                    },
                  });
                setOptions(options);
                return options;
              }}
              onSelect={(e) => {
                getOneStudent({
                  id: e,
                  type: "update",
                  expand:
                    "dividedBalance,user.userProfile.avatar,user.userPhones",
                }).then((r) => {
                  const amount = funcCheckPermission([
                    COMPONENTS_VIEWS.can_use_red_balance,
                  ])
                    ? lodash.sumBy(r.dividedBalance?.green, "actual_balance") +
                      lodash.sumBy(r.dividedBalance?.yellow, "actual_balance") +
                      lodash.sumBy(r.dividedBalance?.red, "actual_balance")
                    : lodash.sumBy(r.dividedBalance?.green, "actual_balance") +
                      lodash.sumBy(r.dividedBalance?.yellow, "actual_balance");

                  setUrl(r.user?.userProfile?.avatar?.full_url);
                  setValue(
                    "tools.otherStudentPhone",
                    r.user?.userPhones?.find((e) => e.is_confirmed)
                      ?.phone_number,
                  );
                  setValue("tools.otherStudentBalance", amount);
                  setAmount(amount);
                });
              }}
              error={(errors as any)?.general?.user_id?.message}
              optionLabelProp="labelShow"
            />
          </div>
          <div className="balance">
            <div className="flex">
              <WalletSvg />
              Student balance
            </div>
            <div className="amount">
              {amount ? toCurrencyFormat(amount) : "-"}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PayFromAnotherBalance;
