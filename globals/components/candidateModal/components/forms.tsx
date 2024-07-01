import React, { useMemo } from "react";
import {
  BanWrapper,
  CVWrapper,
  FormWrapper,
  GenderWrapper,
  Label,
  SourceWrapper,
  UploadWrapper,
} from "../style";
import {
  AntdSwitch,
  DatePicker,
  FemaleSvg,
  Gender,
  Input,
  MaleSvg,
  MySelect,
  SourceSelect,
  UploadImage,
} from "components";
import { Col, Row } from "antd";
import { bgColors } from "styles/theme";
import { ICandidate, InitialDataHR } from "types";
import { useSelector } from "react-redux";
import { IStore } from "store";
import PhoneNumber from "./phoneNumber";
import BonusForm from "./bonus";
import { CandidateModalType } from "../type";
import MultipleFileUpload from "components/common/uploadFile/multipleUpload";
import { EDeleteProjectFile, EFileDirection } from "types/uploadFile";

const Forms = ({
  candidate,
  initialData,
  control,
  setValue,
  errors,
  watch,
  setError,
  clearErrors,
  getValues,
}: {
  candidate: ICandidate | undefined;
  initialData: InitialDataHR | undefined;
  control: any;
  watch: any;
  setValue: any;
  errors: any;
  setError: any;
  clearErrors: any;
  getValues: any;
}) => {
  const {
    candidateModal: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const type = data?.type;

  const vacancy = useMemo(() => {
    return initialData?.activeVacancyList
      ?.sort((a, b) => a.title.localeCompare(b.title))
      .map((item) => ({
        label: item.title,
        value: item.id.toString(),
      }));
  }, [initialData?.activeVacancyList]);

  const isBonusFor = useMemo(() => {
    const vacancy = initialData?.vacancyList?.find(
      (item) => item?.id == watch("root.vacancy_id")
    );
    return vacancy?.is_bonus_for;
  }, [watch("root.vacancy_id")]);

  return (
    <FormWrapper>
      <UploadWrapper>
        <UploadImage
          name="root.avatar_file_id"
          control={control}
          setValue={setValue}
          height="160px"
          fileDirection={EFileDirection.hrAvatar}
          deleteProjectFile={EDeleteProjectFile.hr}
          image={candidate?.candidateAvatar?.url}
        />
      </UploadWrapper>
      <Input
        control={control}
        name="root.first_name"
        label="First name"
        placeholder="First name"
        error={errors?.root?.first_name?.message}
      />
      <Input
        control={control}
        name="root.last_name"
        label="Last name"
        placeholder="Last name"
        error={errors?.root?.last_name?.message}
      />

      <GenderWrapper>
        <Label required={true}>Gender</Label>
        <Row gutter={14}>
          <Col span={12}>
            <Gender
              label="Male"
              value={1}
              name="root.gender"
              control={control}
              icon={(checked) => (
                <MaleSvg
                  color={checked ? bgColors.black : bgColors.brotherBlue}
                />
              )}
              error={errors?.root?.gender?.message}
              checkedColor={bgColors.primary}
            />
          </Col>
          <Col span={12}>
            <Gender
              label="Female"
              value={2}
              name="root.gender"
              control={control}
              icon={(checked) => (
                <FemaleSvg
                  color={checked ? bgColors.black : bgColors.brotherBlue}
                />
              )}
              error={errors?.root?.gender?.message}
              checkedColor={bgColors.primary}
            />
          </Col>
        </Row>
      </GenderWrapper>

      <DatePicker
        name="root.dob"
        label="Date of birth"
        control={control}
        error={errors?.root?.dob?.message}
        showToday={false}
      />

      <PhoneNumber
        control={control}
        errors={errors}
        watch={watch}
        setError={setError}
        initialData={initialData}
        candidate={candidate}
        setValue={setValue}
        clearErrors={clearErrors}
      />

      <MySelect
        control={control}
        name="root.vacancy_id"
        label="Vacancy"
        options={vacancy}
        placeholder="Select vacancy"
        error={errors?.root?.vacancy_id?.message}
      />
      <SourceWrapper>
        <SourceSelect
          control={control}
          name="root.source_id"
          size="medium"
          data={initialData?.sourceList as any[]}
          error={errors?.root?.source_id?.message}
          navigation
        />
      </SourceWrapper>

      <CVWrapper>
        <MultipleFileUpload
          name="root.documents"
          text="Upload file"
          label="CV & Documents"
          control={control}
          setValue={setValue}
          // uploadFile={data?.uploadFile}
          watch={watch}
          error={errors?.file_id?.message || errors?.file?.message}
          height="70px"
          fileDirection={EFileDirection.hrFile}
        />
      </CVWrapper>

      <Input
        type="textarea"
        control={control}
        name="root.description"
        label="Description"
        placeholder="Type here..."
        style={{
          minHeight: "72px",
        }}
      />

      {!!isBonusFor && (
        <BonusForm
          control={control}
          watch={watch}
          initialData={initialData}
          setValue={setValue}
          disabled={type !== CandidateModalType.CREATE}
        />
      )}
      {type !== CandidateModalType.EDIT && (
        <BanWrapper>
          <AntdSwitch name={"root.is_banned"} control={control} />
          <p>Ban candidate</p>
        </BanWrapper>
      )}
        {(type === CandidateModalType.TAKE ||
        type === CandidateModalType.CREATE) && (
        <BanWrapper>
          <AntdSwitch name={"root.notify_candidate"} control={control} />
          <p>Notify candidate</p>
        </BanWrapper>
      )}
    </FormWrapper>
  );
};

export default Forms;
