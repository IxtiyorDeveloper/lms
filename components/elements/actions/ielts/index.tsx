import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { useCreateTicketUrl } from "hooks";
import { useRouter } from "next/router";
import { IeltsSvg } from "components";
import { validationErrorHandler } from "utils";

const PracticumAction: FC<TIcon> = ({ size, clicked, userId }) => {
  const router = useRouter();
  const createSalaryComponent = useCreateTicketUrl({
    onSuccess: (data) => {
      router.replace(data?.data?.result);
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  return (
    <Wrapper
      size={size}
      clicked={!!clicked}
      onClick={() =>
        createSalaryComponent.mutate({
          query_params: {
            student_id: userId,
          },
        })
      }
    >
      <IeltsSvg />
    </Wrapper>
  );
};

export default PracticumAction;
