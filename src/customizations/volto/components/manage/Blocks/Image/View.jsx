/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import { withBlockExtensions } from '@plone/volto/helpers';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

const toImageUrl = (data) => {
  // Note: isInternalURL is a misleading, it returns true even for urls such as localhost:3000 (since seamless mode)
  let url;
  if (isInternalURL(data.url)) {
    if (data.size === 'l')
      url = `${flattenToAppURL(data.url)}/@@images/image/huge`;
    else if (data.size === 'm')
      url = `${flattenToAppURL(data.url)}/@@images/image/preview`;
    else if (data.size === 's')
      url`${flattenToAppURL(data.url)}/@@images/image/mini`;
    else {
      // never return full image
      url = `${flattenToAppURL(data.url)}/@@images/image/huge`;
    }
    return url;
  }
  return data.url;
};

/**
 * View image block class.
 * @class View
 * @extends Component
 */
export const View = ({ data = {}, detached, className }) => {
  const href = data?.href?.[0]?.['@id'] || '';
  const image = (
    <img
      className={cx({
        'full-width': data.align === 'full',
        large: data.size === 'l',
        medium: data.size === 'm',
        small: data.size === 's',
      })}
      src={toImageUrl(data)}
      alt={data.alt || ''}
      loading="lazy"
    />
  );

  return (
    <p
      className={cx(
        'block image align',
        {
          center: !Boolean(data.align),
          detached,
        },
        data.align,
        className,
      )}
    >
      {data.url &&
        (href ? (
          <UniversalLink href={href} openLinkInNewTab={data.openLinkInNewTab}>
            {image}
          </UniversalLink>
        ) : (
          image
        ))}
    </p>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withBlockExtensions(View);
