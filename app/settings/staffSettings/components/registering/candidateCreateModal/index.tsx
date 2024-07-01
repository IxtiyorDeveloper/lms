import React from "react";
import {
  AntdModal,
  Button,
  CustomSelect,
  DatePicker,
  Gender,
  Input,
  MySelect,
  PhoneNumberInput,
  UploadImage,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import {
  Flex,
  InputsWrapper,
  ItemWrapper,
  PassportDetails,
  PDataInputs,
  Text,
  TextLabel,
  TopSide,
} from "./style";
import { DownloadSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors, textColors } from "styles/theme";
import { useFieldArray, useForm } from "react-hook-form";
import { FemaleSvg, MaleSvg } from "components";
import { MainPhone } from "constants/phoneTypes";
import { DeleteSvg, PlusSvg } from "components";
import { usePageDataMemo } from "hooks";

const CandidateCreateModal = () => {
  const dispatch = useDispatch();

  const {
    candidateCreate: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phones: [{ type: `${MainPhone}`, phone: undefined }],
    },
  });

  const handleCancel = () => {
    dispatch(
      toggleModal({
        key: "candidateCreate",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: "phones",
  });

  const selects = usePageDataMemo();

  return (
    <AntdModal padding="0" width={640} open={open} onCancel={handleCancel}>
      <TopSide>
        {/*<Title>Candidate form</Title>*/}
        <Button className="btn-info" style={{ padding: "0 8px" }}>
          <DownloadSvg color={textColors.white} height={14} /> Download details
        </Button>
      </TopSide>
      {/*<PersonalData>*/}
      <Text>Personal data</Text>
      <PDataInputs>
        {/*<UserAvatarSide>*/}
        <UploadImage
          height="275px"
          name="avatar"
          control={control}
          setValue={setValue}
        />
        {/*</UserAvatarSide>*/}
        <InputsWrapper>
          <Flex>
            <ItemWrapper>
              <Input
                name="firstName"
                control={control}
                placeholder="Type here..."
                label="First name"
              />
            </ItemWrapper>
            <ItemWrapper>
              <Input
                name="lastName"
                control={control}
                placeholder="Type here..."
                label="Last name"
              />
            </ItemWrapper>
          </Flex>
          <Flex>
            <ItemWrapper>
              <Input
                name="secondName"
                control={control}
                placeholder="Type here..."
                label="Second name"
              />
            </ItemWrapper>
          </Flex>
          <Flex>
            <ItemWrapper>
              <MySelect
                name="nationality"
                control={control}
                placeholder="Type here..."
                label="Nationality"
              />
            </ItemWrapper>
            <ItemWrapper>
              <DatePicker name="dob" control={control} label="Date of birth" />
            </ItemWrapper>
          </Flex>
          <TextLabel>Gender</TextLabel>
          <Flex>
            <ItemWrapper>
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
                checkedColor={bgColors.primary}
              />
            </ItemWrapper>
            <ItemWrapper>
              <Gender
                label="Female"
                value={0}
                name="root.gender"
                control={control}
                icon={(checked) => (
                  <FemaleSvg
                    color={checked ? bgColors.black : bgColors.brotherBlue}
                  />
                )}
                checkedColor={bgColors.primary}
              />
            </ItemWrapper>
          </Flex>
        </InputsWrapper>
      </PDataInputs>
      {/*</PersonalData>*/}
      <PassportDetails>
        <Text>Passport details</Text>
        <Flex>
          <ItemWrapper>
            <UploadImage
              height="200px"
              name="avatar"
              control={control}
              setValue={setValue}
              text="Passport / ID Card Front"
            />
          </ItemWrapper>
          <ItemWrapper>
            <UploadImage
              height="200px"
              name="avatar"
              control={control}
              setValue={setValue}
              text="Passport / ID Card Back"
            />
          </ItemWrapper>
        </Flex>
        <InputsWrapper>
          <Flex>
            <ItemWrapper>
              <Input
                name="passport"
                control={control}
                placeholder="Type here..."
                label="Passport / ID Card number"
              />
            </ItemWrapper>
            <ItemWrapper>
              <MySelect
                name="citizenship"
                control={control}
                placeholder="Select"
                label="Citizenship"
              />
            </ItemWrapper>
          </Flex>
          <Flex>
            <ItemWrapper>
              <DatePicker
                name="passportGivenDate"
                control={control}
                placeholder="Select date"
                label="Passport / ID Card given date"
              />
            </ItemWrapper>
            <ItemWrapper>
              <DatePicker
                name="passportExpireDate"
                control={control}
                placeholder="Select date"
                label="Passport / ID Card expire"
              />
            </ItemWrapper>
          </Flex>
          <Flex>
            <ItemWrapper>
              <MySelect
                name="passportGivenBy"
                control={control}
                placeholder="Type here..."
                label="Passport / ID Card given by"
              />
            </ItemWrapper>
          </Flex>
        </InputsWrapper>
      </PassportDetails>
      {/*<AddressDetails>*/}
      <Text className="text">Address</Text>
      <InputsWrapper>
        <Flex>
          <ItemWrapper>
            <MySelect
              name="bordAddress"
              control={control}
              placeholder="Select"
              label="Born address"
            />
          </ItemWrapper>
        </Flex>
        <Flex>
          <ItemWrapper>
            <Input
              name="officialAddress"
              control={control}
              placeholder="Type here..."
              label="Official address  (by registration)"
            />
          </ItemWrapper>
        </Flex>
        <Flex>
          <ItemWrapper>
            <Input
              name="liveAddress"
              control={control}
              placeholder="Type here..."
              label="Live address (where do you live?)"
            />
          </ItemWrapper>
        </Flex>
      </InputsWrapper>
      {/*</AddressDetails>*/}
      {/*<PhoneNumbers>*/}
      <Text className="text">Phone number</Text>
      <InputsWrapper>
        <Flex>
          <ItemWrapper>
            <MySelect
              name="phoneType"
              control={control}
              placeholder="Select"
              label="Type"
            />
          </ItemWrapper>
          <ItemWrapper>
            <PhoneNumberInput
              name="phoneNumber"
              control={control}
              label="Phone number"
            />
          </ItemWrapper>
        </Flex>
      </InputsWrapper>
      <Text className="text">Extra phone number</Text>
      {phoneFields?.map((item, index) => {
        const isErrorRow =
          errors?.phones?.[index]?.phone?.message ||
          // @ts-ignore
          errors?.phones?.[index]?.type?.message;
        return (
          <Flex>
            <ItemWrapper>
              <CustomSelect
                control={control}
                name={`phones[${index}].type`}
                label="Type"
                options={selects.phone}
                // @ts-ignore
                error={errors?.phones?.[index]?.type?.message}
              />
            </ItemWrapper>
            <ItemWrapper>
              <PhoneNumberInput
                label="Phone"
                name={`phones[${index}].phone`}
                control={control}
                placeholder="+998 (--) --- -- --"
                error={errors?.phones?.[index]?.phone?.message}
              />
            </ItemWrapper>
            {index === 0 ? (
              <ItemWrapper className={`button ${isErrorRow ? "eRow" : ""}`}>
                <Button
                  onClick={() =>
                    appendPhone({ type: `${MainPhone}`, phone: undefined })
                  }
                  icon={<PlusSvg />}
                  style={{
                    padding: "0 24px",
                    color: textColors.blueGray,
                  }}
                />
              </ItemWrapper>
            ) : (
              <ItemWrapper className={`button ${isErrorRow ? "eRow" : ""}`}>
                <Button
                  icon={<DeleteSvg width={20} height={20} />}
                  onClick={() => {
                    removePhone(index);
                  }}
                  style={{
                    padding: "0 24px",
                    color: textColors.blueGray,
                    backgroundColor: bgColors.pale,
                  }}
                />
              </ItemWrapper>
            )}
          </Flex>
        );
      })}
      {/*</PhoneNumbers>*/}
    </AntdModal>
  );
};

export default CandidateCreateModal;
