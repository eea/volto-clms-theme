import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

function CclButton(props) {
  let {
    url = '#',
    disabled = false,
    download = false,
    mode = 'default',
    children,
    isButton = false,
    ...opts
  } = props;

  let buttonClass = classNames('ccl-button', {
    'ccl-button-green': mode === 'filled',
    'ccl-button--default': mode === 'default',
  });

  const flattern_url = flattenToAppURL(url);

  function hasProtocol(url) {
    return url.startsWith('https://') || url.startsWith('http://')
      ? true
      : false;
  }
  let RenderElement = Link;
  if (isButton) {
    RenderElement = 'button';
  } else {
    RenderElement = hasProtocol(url) ? 'a' : Link;
  }
  return hasProtocol(url) ? (
    <RenderElement
      href={flattern_url}
      className={buttonClass}
      disabled={disabled}
      download={download}
      {...opts}
    >
      {children}
    </RenderElement>
  ) : (
    <RenderElement
      to={flattern_url}
      className={buttonClass}
      disabled={disabled}
      download={download}
      {...opts}
    >
      {children}
    </RenderElement>
  );
}

CclButton.propTypes = {
  url: PropTypes.string,
  disabled: PropTypes.bool,
  download: PropTypes.bool,
  mode: PropTypes.string,
  children: PropTypes.node,
};
export default CclButton;
