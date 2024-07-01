import React from "react";
import { Wrapper } from "./style";
import { data, ProfileActionTypes } from "./data";
import { ChevronRightSvg, LogOutSvg } from "components";
import { bgColors } from "styles/theme";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { useGetMe } from "hooks";
import { validationErrorHandler } from "utils";
import { RbacRoleDocumentEnum } from "constants/role";

const Action = () => {
  const dispatch = useDispatch();

  const getMe = useGetMe({
    onSuccess: (data) => {
      const file = data?.result?.rbacAssignment?.rbacRole.documents?.find(
        (i: any) => i?.type == RbacRoleDocumentEnum.RULES_AND_CONTRACTS
      );
      !!file ? window.open(file?.fileStorageItem?.full_url) : null;
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleClick = ({ type }: { type: ProfileActionTypes }) => {
    if (type == ProfileActionTypes.PASSWORD) {
      dispatch(
        toggleModal({
          key: "changePassword",
          data: {
            data: {},
            open: true,
          },
        })
      );
    }
    if (type == ProfileActionTypes.RULES) {
      getMe.mutate({});
    }
  };
  return (
    <Wrapper>
      <p className="title">More action</p>
      <div className="rows">
        {data?.map((item, index) => {
          return (
            <div
              className="row"
              key={index}
              onClick={() => handleClick({ type: item.type })}>
              <div className="left">
                {item.svg}
                <p className="inner-title">{item.title}</p>
              </div>
              <div className="right">
                <ChevronRightSvg />
              </div>
            </div>
          );
        })}
        <div className="row">
          <div
            className="log-out"
            onClick={() =>
              dispatch(
                toggleModal({
                  key: "confirmLogout",
                  data: {
                    data: {},
                    open: true,
                  },
                })
              )
            }>
            <div>
              <LogOutSvg color={bgColors.pop} />
            </div>
            <p className="l-title">Log Out</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Action;
