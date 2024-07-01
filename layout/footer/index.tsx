import React from "react";
import Image from "next/image";
import { useGetMe } from "hooks";
import { validationErrorHandler } from "utils";
import { RbacRoleDocumentEnum } from "constants/role";
import { Wrapper, LeftContent, RightContent } from "./style";

const Footer = () => {
  const getMe = useGetMe({
    onSuccess: (data) => {
      const file = data?.result?.rbacAssignment?.rbacRole.documents?.find(
        (i: any) => i?.type == RbacRoleDocumentEnum.PRIVACY_POLICY
      );
      !!file ? window.open(file?.fileStorageItem?.full_url) : null;
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleClickPP = () => {
    getMe.mutate({});
  };

  return (
    <Wrapper>
      <LeftContent>
        <div className="text" onClick={handleClickPP}>
          Privacy policy
        </div>
        <div className="text">FAQ</div>
      </LeftContent>
      <RightContent>
        <Image
          src="/logo/footerLogo.svg"
          width={105}
          height={24}
          alt="footerLogo"
        />
      </RightContent>
    </Wrapper>
  );
};

export default Footer;
