import React from "react";
import { Wrapper } from "./style";
import DeleteTemplate from "globals/components/deleteTemplate";
import CallTemplateModal from "globals/components/callTemplateModal";
import TemplateTabs from "./tabs";

const Template = () => {
  return (
    <Wrapper>
      <CallTemplateModal />
      <DeleteTemplate />
      <TemplateTabs />
    </Wrapper>
  );
};

export default Template;
