import { Button } from "../index";
import React, { FC, Fragment, useEffect } from "react";
import { Col, Row } from "antd";
import { filterQuery } from "utils/filterQuery";
import { strOnlyNumbers } from "utils/textFormat";
import { resetQuery } from "utils/resetQuery";
import { Container, Content, Wrapper } from "./style";
import { useExclude } from "utils/useExclude";
import PermissionElement from "./permissionElement";
import FilterElement from "./element";
import { Interface } from "./type";
import FullWidthPermissionElement from "./fullWidthPermissionElement";
import FullWidthElement from "./fullWidthElement";
import { BLOCKED_STUDENT, BLOCKED_STUDENT_MOCK } from "../../../constants";
import { useRouter } from "next/router";

const Filters: FC<Interface> = ({
  activeElements,
  useExcludeArguments,
  resetQueryExceptions = [],
  methods,
  selects,
  isFieldsRequired = false,
  dateFormatDisabled = true,
  dates,
  deletedFields,
  isReplaceDefaultValueToRoute = false,
  defaultValues,
}) => {
  const router = useRouter();
  const { control, handleSubmit, getValues, setValue, watch, reset } = methods;
  const onSubmit = (data: any) => {
    const { phone_number, user_label_type, ...args } =
      data?.general || data || {};

    if (!user_label_type?.includes(BLOCKED_STUDENT_MOCK)) {
      filterQuery(
        {
          ...args,
          user_label_type,
          phone_number: strOnlyNumbers(phone_number),
        },
        dates,
        dateFormatDisabled,
        deletedFields,
        []
      );
    } else {
      filterQuery(
        {
          ...args,
          user_label_type: user_label_type?.filter(
            (item: string) => item != BLOCKED_STUDENT_MOCK && item
          ),
          user_status: BLOCKED_STUDENT,
          phone_number: strOnlyNumbers(phone_number),
        },
        dates,
        dateFormatDisabled,
        deletedFields,
        []
      );
    }
  };
  const onReset = () => {
    resetQuery(resetQueryExceptions);
    reset();
  };
  const isSuccess = selects?.args?.isSuccess;

  useExclude({
    ...useExcludeArguments,
    setValue,
    watch,
    isSuccess,
    deletedFields,
    dates,
  });

  useEffect(() => {
    if (isReplaceDefaultValueToRoute) {
      const data = getValues();
      onSubmit(data);
    }
  }, [isReplaceDefaultValueToRoute]);

  const { query } = router;

  useEffect(() => {
    if (!!defaultValues && isSuccess) {
      let a = {};
      Object.entries(defaultValues).map((r) => {
        if (!query.hasOwnProperty(r[0])) {
          setValue(r[0], r[1]);
          a = {
            ...a,
            [r[0]]: r[1],
          };
        }
      });
      router.replace({
        query: {
          ...query,
          ...a,
        },
      });
    }
  }, [isSuccess]);

  /**
   * barcha filter componentalarni bir yerda tartiblanga holda salash uchun va kodni qisqaroq bo'lishi uchun ishlaydi
   */
  const render = () => {
    return (
      <Fragment>
        {activeElements?.map((item, index) => {
          if (!item?.full_width) {
            if (!!item?.permission) {
              return (
                <PermissionElement
                  key={index}
                  control={control}
                  index={index}
                  item={item}
                  selects={selects}
                />
              );
            } else {
              return (
                <FilterElement
                  key={index}
                  control={control}
                  index={index}
                  item={item}
                  selects={selects}
                />
              );
            }
          } else {
            if (!!item?.permission) {
              return (
                <FullWidthPermissionElement
                  key={index}
                  control={control}
                  index={index}
                  item={item}
                  selects={selects}
                />
              );
            } else {
              return (
                <FullWidthElement
                  key={index}
                  control={control}
                  index={index}
                  item={item}
                  selects={selects}
                />
              );
            }
          }
        })}
      </Fragment>
    );
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className={isFieldsRequired ? "flex-start" : ""} gutter={[14, 14]}>
          {render()}
          <Col flex={1}>
            <Content>
              <Container>
                <Button
                  onClick={onReset}
                  style={{
                    width: "100%",
                  }}
                  className="reset"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  style={{ width: "100%" }}
                  className="submit"
                >
                  Search
                </Button>
              </Container>
            </Content>
          </Col>
        </Row>
      </form>
    </Wrapper>
  );
};
export default Filters;
