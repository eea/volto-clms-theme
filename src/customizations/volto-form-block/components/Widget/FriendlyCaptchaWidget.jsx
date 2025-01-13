import React, { useEffect, useRef, useState } from 'react';
import { Grid } from 'semantic-ui-react';

let FriendlyCaptchaModule;
if (typeof window !== 'undefined') {
  FriendlyCaptchaModule = require('friendly-challenge').WidgetInstance;
}

const FriendlyCaptcha = (props) => {
  const { sitekey, captchaToken, captchaRef } = props;
  const container = useRef();
  const widget = useRef();
  const [message, setMessage] = useState('');

  const doneCallback = (solution) => {
    setMessage(solution);
    captchaToken.current = solution;
  };

  const errorCallback = (err) => {
    setMessage(JSON.stringify(err));
  };

  useEffect(() => {
    if (!widget.current && container.current) {
      if (FriendlyCaptchaModule) {
        widget.current = new FriendlyCaptchaModule(container.current, {
          // startMode: 'auto',
          doneCallback: doneCallback,
          errorCallback: errorCallback,
        });

        captchaRef.current = { verify: doneCallback };
      }
    }

    return () => {
      if (widget.current !== undefined) widget.current.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);

  return (
    <>
      <div ref={container} className="frc-captcha" data-sitekey={sitekey} />
      <p>{message}</p>
    </>
  );
};
const FriendlyCaptchaWidget = ({
  id,
  id_check,
  title,
  captchaToken,
  sitekey,
  captchaRef,
}) => {
  const onVerify = (token) => {
    captchaToken.current = token;
  };

  const onLoad = () => {
    captchaRef.current.execute();
  };

  return (
    <Grid.Row key={'row-captcha'}>
      <Grid.Column>
        <FriendlyCaptcha
          id={id}
          id_check={id_check}
          title={title}
          captchaToken={captchaToken}
          sitekey={sitekey}
          captchaRef={captchaRef}
          onLoad={onLoad}
          onVerify={onVerify}
        />
      </Grid.Column>
    </Grid.Row>
  );
};

export default FriendlyCaptchaWidget;
