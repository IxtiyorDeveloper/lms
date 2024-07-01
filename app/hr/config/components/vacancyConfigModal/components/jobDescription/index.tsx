import { Input, UploadImage, MySelect } from 'components';
import { IVacancy } from "types";
import { Content } from "./style";
import { EDeleteProjectFile, EFileDirection } from "types/uploadFile";
import Description from "./description";
import { EApplicantStatus } from "constants/hr";

const JobDescription = ({
  data,
  control,
  errors,
  setValue,
  role_name,
}: {
  data?: IVacancy;
  control: any;
  errors: any;
  setValue: any;
  role_name?: string;
}) => {
  return (
    <div>
      <Content>
        <Input
          label="Job title"
          name="root.title"
          control={control}
          placeholder="Type here..."
          error={errors?.root?.title?.message}
        />
        <Description control={control} />
        <Input
          label="Slug"
          name="root.slug"
          control={control}
          placeholder="Type here..."
          error={errors?.root?.slug?.message}
        />
        <Input
          label="Vacancy"
          name="vacancy"
          control={control}
          disabled
          placeholder="Type here..."
          error={errors?.vacancy?.message}
          value={role_name}
        />

        <UploadImage
          name="root.file_storage_item_id"
          label="Image"
          control={control}
          setValue={setValue}
          text={"Upload image"}
          height={"96px"}
          image={data?.image?.full_url}
          deleteProjectFile={EDeleteProjectFile.hr}
          fileDirection={EFileDirection.hrFile}
        />

        <MySelect
          label="Sending application"
          name="root.application_status"
          placeholder="Select"
          control={control}
          options={[
            {
              label: "Active",
              value: EApplicantStatus.ACTIVE,
            },
            {
              label: "Not active",
              value: EApplicantStatus.NOT_ACTIVE,
            },
          ]}
          error={errors?.application_status?.message}
        />
        <Input
          label="Job description link"
          name="root.vacancy_url"
          control={control}
          placeholder="url..."
          error={errors?.link?.message}
        />
        <Input
          label="Order"
          name="root.order"
          control={control}
          placeholder="Type here..."
          error={errors?.root?.order?.message}
        />
      </Content>
    </div>
  );
};

export default JobDescription;
