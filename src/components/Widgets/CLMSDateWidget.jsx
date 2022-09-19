import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import config from '@plone/volto/registry';

export const CLMSDateWidget = ({ value, children, className }) => {
  moment.locale(config.settings.dateLocale);
  return value ? (
    <span className={cx(className, 'date', 'widget')}>
      {children
        ? children(moment(value).format('ll'))
        : moment(value).format('DD.MM.YYYY')}
    </span>
  ) : (
    ''
  );
};
