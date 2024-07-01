import React, { FC } from "react";
import { ItemWrapper, Text } from "../../style";
import { IELTSWrapper } from "./style";
import { MySelect, UploadImage } from "components";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ieltsOptions } from "../../defaultValue";
import { IStaffViewPageInfoData } from "types/staffSettings";

interface IProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  dataOneStaff: IStaffViewPageInfoData | undefined;
  errors: any;
}

const IELTSForm: FC<IProps> = (props) => {
  const { dataOneStaff, control, setValue, watch, errors } = props;

  return (
    <IELTSWrapper>
      <Text className="text">IELTS</Text>
      <ItemWrapper>
        <UploadImage
          name="ielts_file_id"
          height="140px"
          image={dataOneStaff?.ieltsFile?.fileStorageItem?.full_url}
          filename={dataOneStaff?.ieltsFile?.fileStorageItem?.name}
          control={control}
          setValue={setValue}
          error={errors?.ielts_file_id?.message}
        />
      </ItemWrapper>
      <ItemWrapper>
        <MySelect
          name="ielts_score"
          control={control}
          options={ieltsOptions}
          placeholder="Select"
          label="Score"
          error={errors?.ielts_score?.message}
        />
      </ItemWrapper>
    </IELTSWrapper>
  );
};

export default IELTSForm;
