import { Alert, Col, Row } from "antd";
import {
  Button,
  CircleSuccessSvg,
  CustomSelect,
  DeleteSvg,
  ErrorLabel,
  PhoneNumberInput,
  PlusSvg,
} from "components";
import { bgColors, textColors } from "styles/theme";
import { useFieldArray } from "react-hook-form";
import { MainPhone } from "constants/phoneTypes";
import { FieldsWrapper, PhoneNumberWrapper, SuccessWrapper } from "../../style";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "utils/debounce";
import { useCheckPhoneNumberApplicant } from "hooks";
import { validationErrorHandler } from "utils";
import { ICandidate, ICheckCandidatePhoneNumber, InitialDataHR } from "types";
import { CandidateStatus } from "constants/hr";
import ShareVacancy from "../shareVacancy";
import { IStore } from "store";
import { useSelector } from "react-redux";
import Alerts from "./alert";
import { separatePhoneNumber } from "utils/phoneNumberFormatter";

const PhoneNumber = ({
  candidate,
  control,
  watch,
  errors,
  setError,
  initialData,
  setValue,
  clearErrors,
}: {
  control: any;
  watch: any;
  errors: any;
  setError: any;
  setValue: any;
  clearErrors: any;
  candidate: ICandidate | undefined;
  initialData: InitialDataHR | undefined;
}) => {
  const {
    candidateModal: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const [checkValidation, setCheckValidation] = useState<
    (ICheckCandidatePhoneNumber & { phone: string })[]
  >([]);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "root.phone_numbers",
  });

  const validate = useCheckPhoneNumberApplicant({
    onSuccess: (data) => {},
    onError: (err) => {},
  });

  const check = useCallback(
    debounce((r: any, index: number) => {
      validate.mutate(
        {
          query_params: {
            phone: r.phone_number,
          },
        },
        {
          onSuccess: (data) => {
            setValue("is_disabled", data?.status && r.type === MainPhone);
            setCheckValidation((prev) => {
              const newData = [...prev];
              newData[index] = { ...data, phone: r.phone_number };
              return newData;
            });
          },
          onError: (err) => {
            validationErrorHandler({
              err,
              showToast: false,
              setError,
              formHookMainField: false,
            });
          },
        }
      );
    }, 1000),
    []
  );

  useEffect(() => {
    const subscription = watch((value: any, { name, type }: any) => {
      let i = name?.slice?.(name.indexOf("[") + 1, name.indexOf("]"));
      if (candidate?.status == CandidateStatus.APPLICANT) {
        i = i === "root.phone_number" ? 0 : i;
      }

      const item = value?.root?.phone_numbers?.find?.(
        (r: any, index: number) => index == i
      );

      if (item?.phone_number?.length >= 13) {
        clearErrors(`root.phone_numbers`);
        check(item, i);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, open, candidate]);

  useEffect(() => {
    if (candidate?.candidatePhoneNumbers?.length) {
      candidate?.candidatePhoneNumbers?.map((item, index) => {
        update(index, {
          type: item.type,
          phone_number: `+${item.phone_number}`,
        });
      });
    }
    return () => {
      candidate?.candidatePhoneNumbers?.map((item, index) => {
        remove(index);
      });
      setCheckValidation([]);
    };
  }, [candidate?.candidatePhoneNumbers, candidate?.own_phone_number]);

  const stageList = initialData?.stageList;

  return (
    <>
      {fields?.map((item, index) => {
        const isErrorRow =
          errors?.phone_numbers?.[index]?.phone?.message ||
          errors?.phone_numbers?.[index]?.type?.message;
        const phone = watch(`root.phone_numbers[${index}].phone_number`);
        const field = checkValidation?.find((r) => r?.phone == phone);
        const status = field?.status;
        const candidates = field?.candidates;

        return (
          <FieldsWrapper key={index}>
            <Row gutter={10} align="bottom">
              <Col span={9}>
                <CustomSelect
                  label="Type"
                  control={control}
                  options={initialData?.candidatePhoneType}
                  name={`root.phone_numbers[${index}].type`}
                  error={errors?.phone_numbers?.[index]?.type?.message}
                />
              </Col>
              <Col span={9}>
                <PhoneNumberInput
                  label="Phone"
                  control={control}
                  placeholder="+998 (--) --- -- --"
                  name={`root.phone_numbers[${index}].phone_number`}
                />
              </Col>
              <Col span={3}>
                <ShareVacancy
                  vacancy={initialData?.activeVacancyList}
                  phone={watch(`root.phone_numbers[${index}].phone_number`)}
                />
              </Col>
              {index === 0 ? (
                <Col span={3} className={`button ${isErrorRow ? "eRow" : ""}`}>
                  <Button
                    onClick={() =>
                      append({ type: MainPhone, phone_number: undefined })
                    }
                    icon={<PlusSvg />}
                    style={{
                      minWidth: 50,
                      padding: "0 16px",
                      color: textColors.blueGray,
                    }}
                  />
                </Col>
              ) : (
                <Col span={3} className={`button ${isErrorRow ? "eRow" : ""}`}>
                  <Button
                    icon={<DeleteSvg width={20} height={20} />}
                    onClick={() => {
                      remove(index);
                    }}
                    style={{
                      minWidth: 50,
                      padding: "0 16px",
                      color: textColors.blueGray,
                      backgroundColor: bgColors.pale,
                    }}
                  />
                </Col>
              )}
            </Row>

            <ErrorLabel error={(errors as any)?.root?.phone_numbers?.message} />

            {checkValidation?.[index] && !status && phone?.length === 13 && (
              <SuccessWrapper>
                <Alert
                  message={
                    <PhoneNumberWrapper className="phone" type="success">
                      {separatePhoneNumber(phone)}
                    </PhoneNumberWrapper>
                  }
                  description={
                    <PhoneNumberWrapper type="success">
                      This phone number is <b>New Contact</b>
                    </PhoneNumberWrapper>
                  }
                  type="success"
                  showIcon
                  icon={<CircleSuccessSvg width={34} height={34} />}
                />
              </SuccessWrapper>
            )}

            {candidates?.map((candidate) => {
              const order =
                candidate?.status == CandidateStatus.CANDIDATE
                  ? candidate.stage
                  : candidate?.vacancy?.id;
              return (
                <Alerts
                  status={status}
                  candidate={candidate}
                  order={order}
                  phone={phone}
                  stage={
                    stageList?.find((item) => item?.value === candidate?.stage)
                      ?.label
                  }
                />
              );
            })}
          </FieldsWrapper>
        );
      })}
    </>
  );
};

export default PhoneNumber;
