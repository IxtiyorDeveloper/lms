import React, { FC } from "react";
import { UploadImage, CircleCheckSvg, ErrorLabel } from "components";
import { Item, Wrapper } from "./style";
import { EDeleteProjectFile } from "types/uploadFile";
import { EFileDirection } from "types/uploadFile";
import { useWatch } from "react-hook-form";
import _ from "lodash";
import { bgColors } from "styles/theme";

interface IProps {
  control: any;
  setValue: any;
  error?: any;
  setIndex: any;
  mainIndex: any;
  setError: any;
  clearErrors: any;
  photos: any[];
}
const Photos: FC<IProps> = ({
  control,
  setValue,
  error,
  setIndex,
  mainIndex,
  clearErrors,
  photos,
}) => {
  const watch = useWatch({ control, exact: true })?.photo;
  return (
    <>
      <Wrapper>
        {_.map(watch, (value, key) => {
          const isMain = mainIndex == key;
          return (
            <Item key={key} className="item" isMain={isMain}>
              <UploadImage
                name={`photo.${key}`}
                control={control}
                setValue={(name: string, value: string) => {
                  let a = 0;
                  let b = 0;
                  _.map(watch, (value, key) => {
                    ++b;
                    if (!!value) {
                      ++a;
                    }
                  });
                  clearErrors("files");
                  if (!!value && b - 1 <= a)
                    setValue("photo", {
                      ...watch,
                      [`a${b}`]: null,
                    });
                  setValue(name, value);
                }}
                fileDirection={EFileDirection.stock}
                deleteProjectFile={EDeleteProjectFile.stock}
                height="100px"
                image={
                  photos?.find(
                    (e, index) => index.toString() == key.replaceAll("a", "")
                  )?.fullUrl
                }
              />
              <div className="absolute">
                {typeof value == "number" &&
                  (!isMain ? (
                    <div
                      onClick={() => {
                        clearErrors("files");
                        setIndex(key);
                      }}
                    >
                      <CircleCheckSvg />
                    </div>
                  ) : (
                    <div className="cover">
                      <CircleCheckSvg color={bgColors.white} /> Cover
                    </div>
                  ))}
                {/*<div>*/}
                {/*  <DeleteSvg width={20} height={20} />*/}
                {/*</div>*/}
              </div>
            </Item>
          );
        })}

        {/*<Item className="item">*/}
        {/*  <UploadImage*/}
        {/*    name="photo.a1"*/}
        {/*    control={control}*/}
        {/*    setValue={setValue}*/}
        {/*    fileDirection={EFileDirection.stock}*/}
        {/*    deleteProjectFile={EDeleteProjectFile.stock}*/}
        {/*    height="100px"*/}
        {/*  />*/}
        {/*  <div className="absolute">*/}
        {/*    <div>*/}
        {/*      <CircleCheckSvg />*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      <DeleteSvg width={22} height={22} />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</Item>*/}
        {/*<Item className="item">*/}
        {/*  <UploadImage*/}
        {/*    name="photo.a2"*/}
        {/*    control={control}*/}
        {/*    setValue={setValue}*/}
        {/*    fileDirection={EFileDirection.stock}*/}
        {/*    deleteProjectFile={EDeleteProjectFile.stock}*/}
        {/*    height="100px"*/}
        {/*  />*/}
        {/*  <div className="absolute">*/}
        {/*    <div>*/}
        {/*      <CircleCheckSvg />*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      <DeleteSvg width={22} height={22} />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</Item>*/}
      </Wrapper>
      <div style={{ width: "100%" }}>
        <ErrorLabel error={error} />
      </div>
    </>
  );
};

export default Photos;
