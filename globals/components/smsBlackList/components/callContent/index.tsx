import React, { FC } from "react";
import {
  ContentWrapper,
  PhoneTypes,
} from "../../../../../app/settings/documents/home/components/addFile/style";
import PhoneTypeC from "../phoneType";
import {
  Control,
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { OneStudent } from "types/student";
import { useGetOneCallExclusion, useGetOneExclusion } from "hooks";
import { expand } from "../../../../../app/student/[studentId]/expand";
import { useRouter } from "next/router";

interface IProps {
  data?: OneStudent;
  reset: UseFormReset<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  control: Control;
}

const CallContent: FC<IProps> = (props) => {
  const router = useRouter();
  const { data, reset, watch, setValue, getValues, control } = props;

  const { data: modalData = {} } = useGetOneCallExclusion({
    expand,
    user_id: router.query.user_id,
    type: 200,
    project: "LMS",
  });

  return (
    <ContentWrapper>
      <div className="content-d">
        <p className="title">Auto SMS</p>
        <PhoneTypes>
          {data?.user?.userPhones?.map((phone) => {
            return (
              <PhoneTypeC
                reset={reset}
                key={phone.id}
                pageView={
                  // @ts-ignore
                  modalData?.config?.filter(
                    (p: any) => p.phone_number === phone.phone_number,
                  )[0]
                }
                watch={watch}
                setValue={setValue}
                getValues={getValues}
                phone={phone}
                control={control}
              />
            );
          })}
        </PhoneTypes>
      </div>
      <div className="content-d">
        <p className="title">Manual SMS</p>
        <PhoneTypes>
          {data?.user?.userPhones?.map((phone) => {
            return (
              <PhoneTypeC
                reset={reset}
                key={phone.id}
                pageView={
                  // @ts-ignore
                  modalData?.config?.filter(
                    (p: any) => p.phone_number === phone.phone_number,
                  )[0]
                }
                watch={watch}
                setValue={setValue}
                getValues={getValues}
                phone={phone}
                control={control}
              />
            );
          })}
        </PhoneTypes>
      </div>
    </ContentWrapper>
  );
};

export default CallContent;
