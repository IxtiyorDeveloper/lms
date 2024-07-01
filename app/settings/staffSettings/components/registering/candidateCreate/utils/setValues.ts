import { MainPhone } from "constants/phoneTypes";
import { IStaffViewPageInfoData } from "types/staffSettings";

export const setValues = ({
  dataOneStaff,
  setValue,
}: {
  dataOneStaff: IStaffViewPageInfoData | undefined;
  setValue: any;
}) => {
  setValue("firstName", dataOneStaff?.userProfile?.firstname as any);
  setValue("lastName", dataOneStaff?.userProfile?.lastname as any);
  setValue("username", dataOneStaff?.username as any);
  setValue("secondName", dataOneStaff?.userProfile?.middlename as any);
  setValue("dob", dataOneStaff?.userProfile?.dob as any);
  setValue("avatar_file_id", dataOneStaff?.userProfile?.avatar.id as any);
  setValue(
    "passport_front_file_id",
    dataOneStaff?.passportFront?.file_storage_item_id as any
  );
  setValue(
    "passport_back_file_id",
    dataOneStaff?.passportBack?.file_storage_item_id as any
  );
  setValue("gender", dataOneStaff?.userProfile?.gender as any);
  setValue("born_address", dataOneStaff?.staff?.born_address as any);
  setValue("official_address", dataOneStaff?.staff?.official_address as any);
  setValue("live_address", dataOneStaff?.staff?.live_address as any);
  setValue("passport_number", dataOneStaff?.staff?.passport_number as any);
  setValue("citizenship", dataOneStaff?.staff?.citizenship as any);
  setValue("passport_given_by", dataOneStaff?.staff?.passport_given_by as any);
  setValue(
    "ielts_file_id",
    dataOneStaff?.ieltsFile?.file_storage_item_id as any
  );
  setValue("ielts_score", dataOneStaff?.staff?.ielts_score as any);
  setValue("family_status", dataOneStaff?.staff?.family_status as any);
  if (dataOneStaff?.staff?.nation_id) {
    setValue("nationality", String(dataOneStaff?.staff?.nation_id) as any);
  }
  setValue(
    "passport_given_date",
    dataOneStaff?.staff?.passport_given_date as any
  );
  setValue(
    "passport_expire_date",
    dataOneStaff?.staff?.passport_expire_date as any
  );

  let withDefault: any[] = [];

  dataOneStaff?.userPhones?.map((phone) => {
    withDefault.push({
      type: `${phone.type}`,
      phone_number: `+${phone.phone_number}` as any,
    });
  });

  withDefault = withDefault?.length
    ? withDefault
    : [
        {
          type: "",
          phone_number: undefined,
        },
      ];

  setValue("phone_numbers", withDefault);

  let dataForEducations = dataOneStaff?.userEducations.length
    ? dataOneStaff?.userEducations?.map((education) => {
        return {
          degree: education.degree,
          name: education.name,
          speciality: education.speciality,
          enterDate: education.enter_date,
          finishDate: education.graduate_date,
        };
      })
    : [
        {
          degree: undefined,
          name: undefined,
          speciality: undefined,
          enterDate: undefined,
          finishDate: undefined,
        },
      ];
  setValue("educations", dataForEducations as any);

  let dataForMember = dataOneStaff?.userFamilies.length
    ? dataOneStaff?.userFamilies?.map((member) => {
        return {
          degree: member.degree,
          fio: member.fio,
          work_place: member.work_place,
          position: member.position,
          phone_number: `+${member.phone_number}`,
        };
      })
    : [
        {
          degree: undefined,
          fio: undefined,
          work_place: undefined,
          position: undefined,
          phone_number: undefined,
        },
      ];
  setValue("family_members", dataForMember as any);

  let dataForExperience = dataOneStaff?.userExperiences.length
    ? dataOneStaff?.userExperiences?.map((experience) => {
        return {
          organization_name: experience.organization_name,
          position: experience.position,
          startDate: experience.start_date,
          finishDate: experience.end_date,
        };
      })
    : [
        {
          organization_name: undefined,
          position: undefined,
          startDate: undefined,
          finishDate: undefined,
        },
      ];
  setValue("work_experiences", dataForExperience as any);
};
