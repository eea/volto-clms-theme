import React from 'react';
import { Grid } from 'semantic-ui-react';
import classNames from 'classnames';

import './CclFooterBlock.less';

function CclFooterBlock(props) {
  var { children, title, borderBottom = true } = props;
  let titleClass = classNames({
    'footer-clms-col-title': true,
    'border-bottom': borderBottom,
  });
  return (
    <div className={'footer-clms-col'}>
      <div className={titleClass}>
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default CclFooterBlock;
