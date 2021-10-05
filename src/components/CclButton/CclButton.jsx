import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function CclButton(props) {
  let {
    url = '#',
    disabled = false,
    download = false,
    mode = 'default',
    children,
    ...opts
  } = props;

  let buttonClass = classNames('ccl-button', {
    'ccl-button-green': mode === 'filled',
    'ccl-button--default': mode === 'default',
  });

  return (
    <Link
      to={url}
      className={buttonClass}
      disabled={disabled}
      download={download}
      {...opts}
    >
      {children}
    </Link>
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
