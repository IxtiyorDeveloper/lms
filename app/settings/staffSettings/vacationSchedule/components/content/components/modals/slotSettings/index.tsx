import React from "react";
import { Button, Segmented, SelectYear } from "components";
import {
  CustomAntModal,
  Identification,
  ModalBody,
  ModalFooter,
  ModalHeader,
  MonthTab,
  TitleModal,
} from "./style";
import { useRouter } from "next/router";
import { handleNavigateYear } from "utils/handleNavigateYear";
import moment from "moment";
import { useForm } from "react-hook-form";
import { MonthSlotChildren } from "./components";
import dayjs from "dayjs";
import { useCreateVacationSlot, useGetSlotsByPeriod } from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { changeVacationSlots } from "utils/adaptors/vacationAdaptor";
import { queryKeys } from "constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { toggleModal, useAppSelector } from "store";
import { useDispatch } from "react-redux";

const SlotSettingsModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    slotCreateModal: { open, data: modalData },
  } = useAppSelector((state) => state.modals);

  const handleClose = () => {
    delete router.query?.modalM;
    delete router.query?.yearM;
    router.replace(
      {
        query: {
          ...router.query,
        },
      },
      undefined,
      {
        scroll: false,
      },
    );
    dispatch(
      toggleModal({
        key: "slotCreateModal",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      slots: [] as any,
    },
  });

  const { data: slotsData } = useGetSlotsByPeriod({
    query_params: {
      role_id: modalData?.role_id,
      role_shift_id: modalData?.role_shift_id,
      branch_id: null,
      year: router.query?.yearM,
    },
  });

  const listOfSlots = changeVacationSlots(slotsData as any);

  const monthsShort = moment.monthsShort();
  const monthsList = monthsShort.map((month, index) => {
    // @ts-ignore
    const monthIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
    const yearIndex = router.query?.year || moment(new Date()).format("YYYY");
    return {
      name: month,
      number: monthIndex,
      availability:
        listOfSlots.filter(
          (item) => item.month === monthIndex && item.year === yearIndex,
        ).length > 0,
    };
  });

  const currentMonthIndex = moment(router.query?.year).month();

  const monthOptions = monthsList.map((month, index) => {
    return {
      label: (
        <MonthTab>
          {month.availability ? (
            <Identification className="identification" />
          ) : null}{" "}
          {month.name}
        </MonthTab>
      ),
      value:
        index + 1 < 10 ? `0${(index + 1).toString()}` : (index + 1).toString(),
      children: (
        <MonthSlotChildren
          listOfSlots={listOfSlots}
          slotsData={slotsData as any}
          setValue={setValue}
          control={control}
          errors={errors}
        />
      ),
    };
  });

  const queryClient = useQueryClient();

  const createSlot = useCreateVacationSlot({
    onSuccess: async () => {
      toast.success("Slot(s) created!");
      queryClient.invalidateQueries([queryKeys.get_vacation_slots]).then();
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        callBackSetError: (err: any) => {
          Object.keys(err.message).map((objKey) => {
            err.message[objKey]?.map(
              (obj: { field: string; message: string }) => {
                toast.error(obj.message);
              },
            );
          });
        },
      });
    },
  });

  const onSubmit = (result: any) => {
    const data = result?.slots?.map((item: any) => {
      let dR = {
        from_date: dayjs(item?.period[0]).format("YYYY-MM-DD"),
        to_date: dayjs(item?.period[1]).format("YYYY-MM-DD"),
        place: +item?.place,
      };

      if (!!item?.id) {
        // @ts-ignore
        dR.id = item.id;
      }

      return dR;
    });

    createSlot.mutate({
      body: {
        role_id: modalData?.role_id,
        role_shift_id: modalData?.role_shift_id,
        year: router.query?.yearM || router.query?.year,
        month: router.query?.modalM ? router.query?.modalM : modalData.month,
        slots: data,
      },
    });
  };

  return (
    <CustomAntModal
      onCancel={handleClose}
      open={open}
      width={542}
      destroyOnClose
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <TitleModal>
            <span>Slot settings</span> <span>{modalData?.role_name}</span>
          </TitleModal>
          <SelectYear
            onChange={(e) =>
              handleNavigateYear({ e, router, queryKey: ["yearM"] })
            }
            nextYearsCount={20}
          />
        </ModalHeader>
        <ModalBody>
          <Segmented
            routerKey="modalM"
            options={monthOptions}
            initValue={
              modalData?.month
                ? modalData.month
                : router.query?.modalM
                  ? Array.isArray(router.query?.modalM)
                    ? router.query?.modalM[0]
                    : router.query?.modalM
                  : currentMonthIndex + 1 < 10
                    ? `0${currentMonthIndex + 1}`
                    : `${currentMonthIndex + 1}`
            }
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose} className="btn-secondary">
            Close
          </Button>
          <Button buttonLoading={createSlot.isLoading} type="submit">
            Save
          </Button>
        </ModalFooter>
      </form>
    </CustomAntModal>
  );
};

export default SlotSettingsModal;
