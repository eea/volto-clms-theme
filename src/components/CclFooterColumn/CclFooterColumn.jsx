import React from 'react';
import classNames from 'classnames';

function CclFooterColumn(props) {
  var { children, title, borderBottom = true } = props;
  let titleClass = classNames('ccl-footer-col-title', {
    'border-bottom': borderBottom,
  });
  return (
    <div className="ccl-footer-col">
      <div className={titleClass}>{title}</div>
      {children}
    </div>
  );
}

export default CclFooterColumn;
