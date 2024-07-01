import React, { useEffect } from "react";
import { Container, Text, Wrapper, Title, Inner } from "./style";
import Switch from "components/antd/switch";
import { useForm } from "react-hook-form";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { IOfficialCompany } from "types/company";

const RestrictAccess = ({ data }: { data: IOfficialCompany | undefined }) => {
  const { control, watch, setValue } = useForm();
  const dispatch = useDispatch();
  const handleOpen = ({ restrict_access }: { restrict_access: boolean }) => {
    dispatch(
      toggleModal({
        key: "restrictAccess",
        data: {
          data: {
            restrict_access,
          },
          open: true,
        },
      })
    );
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" && name == "restrict_access") {
        handleOpen({ restrict_access: value?.restrict_access });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, handleOpen]);

  useEffect(() => {
    setValue("restrict_access", data?.restrict_access);
  }, [data]);

  return (
    <Wrapper>
      <Container>
        <img
          src="/settings/companySettings/restrict.png"
          alt="restrict-access"
        />
        <Inner>
          <Title>Restrict access for all users</Title>
          <Text>
            If you enable the switch, all system staff users will be logged out
            of their personal account and will not be able to log in until you
            disable the switch
          </Text>
        </Inner>
      </Container>
      <form>
        <Switch name="restrict_access" control={control} label="Status" />
      </form>
    </Wrapper>
  );
};

export default RestrictAccess;
