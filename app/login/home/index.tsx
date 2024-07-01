import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TLoginForm } from "./type";
import auth from "api/auth";
import { useAuth } from "hooks";
import { toast } from "react-toastify";
import { setLogOut, setUser } from "store";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import lodash from "lodash";
import { useRouter } from "next/router";
import { Wrapper } from "./style";
import ImageSite from "./components/imageSite";
import FormSite from "./components/formSite";
import { validationErrorHandler } from "utils";

const Login: FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
  } = useForm<TLoginForm>({
    defaultValues: {
      iuytqwiqrtuwy1: "",
      kjbsldbdfjklsa2: "",
    },
  });
  const [cookies1, , remove] = useCookies();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_, setToken]: any = useAuth();
  const dispatch = useDispatch();

  const onSubmit = async (e: TLoginForm) => {
    try {
      setLoading(true);
      lodash.map(cookies1, (value, key) => remove(key));
      const data = await auth.login(e.iuytqwiqrtuwy1, e.kjbsldbdfjklsa2);
      const result = data.data.result;
      setToken(result.access_token);
      delete result.access_token;
      dispatch(
        setUser({
          ...result,
        })
      );
      dispatch(setLogOut(false));
      toast("Success", { type: "success" });
      setLoading(false);
      router.push({
        pathname: "/",
        query: {
          redirect: router.query?.redirect,
        },
      });
    } catch (err) {
      setLoading(false);
      validationErrorHandler({
        err,
        showToast: true,
        setError,
        formHookMainField: false,
      });
    }
  };

  // web browser passwordlarni saqlab qolish uchun nomini tanimaydigan qilingani sababli
  // backend qabul qiladigan field larga o'zgartirilmoqda
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setActive(
        (value.iuytqwiqrtuwy1 as string)?.length > 0 &&
          (value.kjbsldbdfjklsa2 as string)?.length > 0
      );
      if (name === "iuytqwiqrtuwy1") {
        clearErrors("login" as any);
      } else {
        clearErrors("password" as any);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Wrapper>
      <FormSite
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        getValues={getValues}
        errors={errors}
        active={active}
        loading={loading}
      />
      <ImageSite />
    </Wrapper>
  );
};

export default Login;
