import React, { FC, useEffect, useState } from "react";
import { Button, DebounceSelect, Input, MyDateRangePicker } from "components";
import {
  Control,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ButtonsWrapper, FormWrapper } from "./style";
import CustomLabel from "./customLabel";
import {
  fetchSearchVacationSlot,
  slotOptionCreator,
} from "utils/functions/fetchSearchFields";
import {
  useCreateVacation,
  useGetSlotsByPeriod,
  useUpdateVacation,
} from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import dayjs from "dayjs";
import { useAppSelector } from "store";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { VacationModalType } from "../..";
import moment from "moment";

interface IProps {
  control: Control<any>;
  watch: UseFormWatch<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  handleCancel: () => void;
  errors: any;
  role_id?: string | number;
  role_shift_id?: string | number;
  data: any;
  setValue: UseFormSetValue<any>;
}

const FormSide: FC<IProps> = (props) => {
  const {
    control,
    role_shift_id,
    role_id,
    watch,
    setValue,
    handleCancel,
    handleSubmit,
    errors,
    data,
  } = props;
  const queryClient = useQueryClient();

  const {
    createVacationModal: { data: modalData },
  } = useAppSelector((state) => state.modals);

  const createVacation = useCreateVacation({
    onSuccess: () => {
      toast.success("Vacation successfully created!");
      queryClient.invalidateQueries([queryKeys.get_user_vacation_details]);
      queryClient.invalidateQueries([queryKeys.get_main_schedule_data]);
      queryClient.invalidateQueries([queryKeys.get_active_vacations]);
      queryClient.invalidateQueries([queryKeys.get_vacation_slots]);
      handleCancel();
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const updateVacation = useUpdateVacation({
    onSuccess: () => {
      toast.success("Vacation successfully updated!");
      queryClient.invalidateQueries([queryKeys.get_user_vacation_details]);
      queryClient.invalidateQueries([queryKeys.get_main_schedule_data]);
      queryClient.invalidateQueries([queryKeys.get_active_vacations]);
      queryClient.invalidateQueries([queryKeys.get_vacation_slots]);
      handleCancel();
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const customDatePeriod = watch()?.custom;

  const onSubmit = (result: any) => {
    const from_date = !!result?.custom_date
      ? dayjs(result?.custom_date[0]).format("YYYY-MM-DD")
      : null;
    const to_date = !!result?.custom_date
      ? dayjs(result?.custom_date[1]).format("YYYY-MM-DD")
      : null;

    let body: any = {
      user_id: modalData?.user_id,
      note: result?.note,
      slot_id: result?.slot,
    };

    if (!!from_date && !!to_date) {
      body = {
        ...body,
        from_date,
        to_date,
        slot_id: null,
      };
    }
    if (modalData.type !== VacationModalType.UPDATE) {
      createVacation.mutate({
        body,
      });
    } else {
      updateVacation.mutate({
        body,
        query_params: {
          id: modalData?.id,
        },
      });
    }
  };

  const { data: slotData } = useGetSlotsByPeriod({
    query_params: {
      role_id: data?.role_id || role_id,
      role_shift_id: data?.role_shift_id || role_shift_id,
      recommended_date: data?.recommended_date,
    },
  });

  const [defaultOptValue, setDefaultOptValue] = useState<any[]>([]);

  useEffect(() => {
    const val = slotOptionCreator(
      slotData,
      moment(data?.recommended_date).subtract(5, "years").format("YYYY-MM-DD"),
    )?.filter((f) => f.value == data?.vacation_slot_id);

    setValue("slot", val[0]?.value);
    setValue("note", modalData?.note);
    setDefaultOptValue(val);

    if (modalData?.slot_id) {
      setValue("slot", modalData?.slot_id);
      setDefaultOptValue([
        {
          value: modalData?.slot_id,
          label: modalData?.slot_option,
        },
      ]);
    }
  }, [slotData, data, modalData]);

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <CustomLabel
            control={control}
            hideCheckBox={modalData.type === VacationModalType.UPDATE}
          />
          {customDatePeriod || data?.vacation_slot_id === null ? (
            <MyDateRangePicker
              className="date-picker"
              name="custom_date"
              control={control}
              error={errors?.custom_date?.message}
            />
          ) : (
            <DebounceSelect
              showSearch
              value={defaultOptValue}
              onChange={(e) => {
                setValue("slot", e);
                setDefaultOptValue(
                  slotOptionCreator(slotData, data?.recommended_date)?.filter(
                    (f) => f.value == e,
                  ),
                );
              }}
              placeholder="Select..."
              fetchOptions={async (searchString) => {
                return fetchSearchVacationSlot({
                  search: !!searchString ? searchString : null,
                  role_id: data?.role_id || role_id,
                  role_shift_id: data?.role_shift_id || role_shift_id,
                  recommended_date:
                    modalData?.type === VacationModalType.UPDATE
                      ? moment(data?.recommended_date).subtract(10, "years")
                      : data?.recommended_date,
                });
              }}
              name="slot"
              control={control}
              error={errors?.slot?.message}
            />
          )}
          <br />
          <Input
            rows={3}
            name="note"
            control={control}
            type="textarea"
            placeholder="Type here..."
            label="Note"
            error={errors?.note?.message}
          />
        </div>
        <ButtonsWrapper>
          <Button onClick={handleCancel} className="secondary">
            Cancel
          </Button>
          <Button
            buttonLoading={createVacation.isLoading || updateVacation.isLoading}
            type="submit"
          >
            Save
          </Button>
        </ButtonsWrapper>
      </form>
    </FormWrapper>
  );
};

export default FormSide;
