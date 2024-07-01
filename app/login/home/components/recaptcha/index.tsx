import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React, { FC } from "react";

const RecaptchaComponent = (Component: any) => {
  const Recaptcha: FC<any> = ({ children }) => {
    return (
      <GoogleReCaptchaProvider reCaptchaKey="6Ld9OVglAAAAADLwXcHQpeFzkn89UsnrsE9TeB8r">
        {children}
      </GoogleReCaptchaProvider>
    );
  };
  return class Higher extends React.Component {
    render() {
      return (
        <Recaptcha>
          <Component {...this.props} />
        </Recaptcha>
      );
    }
  };
};
export default RecaptchaComponent;
