import { Col, Row, Spin } from "antd";
import { Button } from "components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Forms } from "./components/forms";
import { InitialDataHR } from "types";
import { useExclude } from "utils/useExclude";
import { forwardRef, useImperativeHandle } from "react";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { CandidateStages, CandidateStatus } from "constants/hr";

import { Container, Content, FormWrapper } from "./style";

const FilterForm = forwardRef(
  (
    {
      initialData,
      loading,
      isSuccess,
    }: {
      initialData: InitialDataHR | undefined;
      loading: boolean;
      isSuccess: boolean;
    },
    ref: any
  ) => {
    const router = useRouter();
    const query = router.query;
    const { search, phone_number } = query;
    const status = Number(query.status ?? CandidateStatus.CANDIDATE);
    const stage = Number(query.stage ?? CandidateStages.NEW);
    const tabIndex = Number(query.roundedTabIndex ?? 0);

    const { control, handleSubmit, getValues, setValue, watch, reset } =
      useForm();

    const onSubmit = (data: { [key: string]: string | number | any }) => {
      const filter = Object.entries(data).reduce((acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      }, {} as { [key: string]: string | number });

      const date = data.date;
      const meetingDate = data.meeting_date;

      const dateStart = date && date[0].format(DATE_FORMAT_YYYY_MM_DD);
      const dateEnd = date && date[1].format(DATE_FORMAT_YYYY_MM_DD);

      const meetingDateStart =
        meetingDate && meetingDate[0].format(DATE_FORMAT_YYYY_MM_DD);
      const meetingDateEnd =
        meetingDate && meetingDate[1].format(DATE_FORMAT_YYYY_MM_DD);

      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...filter,
            status,
            stage,
            roundedTabIndex: tabIndex,
            ...(!!query.vacancy_id ? { vacancy_id: query.vacancy_id } : {}),

            ...(search ? { search } : {}),
            ...(phone_number ? { phone_number } : {}),
            ...(date ? { start_date: dateStart } : {}),
            ...(date ? { end_date: dateEnd } : {}),
            ...(meetingDate ? { meeting_start_date: meetingDateStart } : {}),
            ...(meetingDate ? { meeting_end_date: meetingDateEnd } : {}),
          },
        },
        undefined,
        { scroll: false }
      );
    };

    const onReset = () => {
      router.replace(
        {
          pathname: router.pathname,
          query: {
            status,
            stage,
            search,
            phone_number,
            roundedTabIndex: tabIndex,
            ...(!!query.vacancy_id ? { vacancy_id: query.vacancy_id } : {}),
          },
        },
        undefined,
        { scroll: false }
      );
      reset();
    };

    useExclude({
      array: ["page", "pageSize"],
      setValue,
      watch,
      isSuccess,
      dates: [
        {
          enterFieldsName: "date",
          firstFieldName: "start_date",
          secondFieldName: "end_date",
        },
        {
          enterFieldsName: "meeting_date",
          firstFieldName: "meeting_start_date",
          secondFieldName: "meeting_end_date",
        },
      ],
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          reset() {
            onReset();
          },
        };
      },
      []
    );

    return (
      <FormWrapper>
        <Spin spinning={loading}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="flex-start" gutter={[14, 14]} align="bottom">
              {Forms({
                control,
                initialData,
              })}

              <Col flex={1}>
                <Content>
                  <Container>
                    <Button
                      onClick={onReset}
                      style={{
                        width: "100%",
                      }}
                      className="reset">
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      style={{ width: "100%" }}
                      className="submit">
                      Search
                    </Button>
                  </Container>
                </Content>
              </Col>
            </Row>
          </form>
        </Spin>
      </FormWrapper>
    );
  }
);

export default FilterForm;
