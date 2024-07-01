import React, { FC, useEffect } from "react";
import { Wrapper } from "./style";
import {
  CirclePlusSvg,
  CreateNoteSvg,
  DeleteSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { AntdRate, Input, MySelect, Quill } from "components";
import { useRouter } from "next/router";
import { usePageData } from "hooks";
import { UseFormWatch } from "react-hook-form";

interface IProps {
  control: any;
  index: number;
  append: any;
  remove: any;
  setValue: any;
  watch: UseFormWatch<{ root: any }>;
}

const Feedbacks: FC<IProps> = ({
  control,
  append,
  setValue,
  watch,
  index,
  remove,
}) => {
  const router = useRouter();
  const { data } = usePageData();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === `root.reviews.${index}.department_id`) {
        setValue(`root.reviews.${index}.role_id`, null);
        setValue(`root.reviews.${index}.user_id`, null);
      } else if (name === `root.reviews.${index}.role_id`) {
        setValue(`root.reviews.${index}.user_id`, null);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const department_id = watch(`root.reviews.${index}.department_id`);
  const role_id = watch(`root.reviews.${index}.role_id`);
  const rate = watch(`root.reviews.${index}.rate`);
  return (
    <Wrapper>
      <div className="flex">
        <p className="title">Feedback №{index + 1}</p>
        {index == 0 ? (
          <div className="btn" onClick={() => append({})}>
            <CirclePlusSvg />
          </div>
        ) : (
          <div className="btn" onClick={() => remove(index)}>
            <DeleteSvg width={20} height={20} />
          </div>
        )}
      </div>

      <div className="inputs">
        {router.query.type == "100" ? (
          <div className="flex gap">
            <MySelect
              name={`root.reviews.${index}.department_id`}
              control={control}
              placeholder="Select"
              label="Department"
              options={data?.departments?.map((e) => {
                return {
                  label: e.name,
                  value: `${e.id}`,
                };
              })}
            />
            <MySelect
              name={`root.reviews.${index}.role_id`}
              control={control}
              placeholder="Select"
              label="Role"
              options={(department_id
                ? data?.roles.filter((e) => e.department_id == department_id)
                : data?.roles
              )?.map((e) => {
                return {
                  label: e.name,
                  value: `${e.id}`,
                };
              })}
              disabled={!department_id}
            />
            <MySelect
              name={`root.reviews.${index}.user_id`}
              control={control}
              placeholder="Select"
              label="Staff"
              options={(role_id
                ? data?.staffs?.filter((e) => e.rbac_role_id == role_id)
                : data?.staffs
              )?.map((e) => {
                return {
                  label: e.firstname + " " + e.lastname,
                  value: `${e.id}`,
                };
              })}
              disabled={!role_id}
              defaultValue={rate}
            />
          </div>
        ) : (
          <div>
            <Input
              name={`root.reviews.${index}.role_name`}
              control={control}
              placeholder="Enter"
              label="Role"
            />
          </div>
        )}
      </div>

      <div>
        <div className="flex info-quil">
          <div className="info">
            <CreateNoteSvg />
            <p>Comment & Rate</p>
          </div>
          <div className="rate-container">
            <AntdRate
              name={`root.reviews.${index}.rate`}
              control={control}
              allowClear
              allowHalf
            />
          </div>
        </div>
        <Quill name={`root.reviews.${index}.comment`} control={control} />
      </div>
    </Wrapper>
  );
};

export default Feedbacks;
