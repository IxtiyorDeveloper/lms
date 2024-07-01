import React from "react";
import { ContactActions as ContactActionsComp } from "components";

const ContactActions = () => {
  return (
    <div>
      <ContactActionsComp activeActions={{ call: true, stop: true }} />
    </div>
  );
};

export default ContactActions;
