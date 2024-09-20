/*
 * UniversalLink
 * @module components/UniversalLink
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  flattenToAppURL,
  isInternalURL,
  URLUtils,
} from '@plone/volto/helpers/Url/Url';
import { matchPath } from 'react-router';

import config from '@plone/volto/registry';

const UniversalLink = ({
  href,
  item = null,
  openLinkInNewTab,
  download = false,
  isFileDownload = false,
  children,
  className = null,
  title = null,
  ...props
}) => {
  const token = useSelector((state) => state.userSession?.token);

  let url = href;

  if (isFileDownload) {
    url = `${url}/@@download/file`;
  }

  if (!href && item) {
    if (!item['@id']) {
      // eslint-disable-next-line no-console
      console.error(
        'Invalid item passed to UniversalLink',
        item,
        props,
        children,
      );
      url = '#';
    } else {
      //case: generic item
      url = flattenToAppURL(item['@id']);

      //case: item like a Link
      let remoteUrl = item.remoteUrl || item.getRemoteUrl;
      if (!token && remoteUrl) {
        url = remoteUrl;
      }

      //case: item of type 'File'
      if (config.settings.downloadableObjects.includes(item['@type'])) {
        url = `${url}/@@download/file`;
      }

      if (
        !token &&
        config.settings.viewableInBrowserObjects.includes(item['@type'])
      ) {
        url = `${url}/@@display-file/file`;
      }
    }
  }
  const isBlacklisted =
    (config.settings.externalRoutes ?? []).find((route) =>
      matchPath(flattenToAppURL(url), route.match),
    )?.length > 0;
  const isExternal = !isInternalURL(url) || isBlacklisted;
  const isInternalDownload = !isExternal && url.includes('@@download');
  const isDownload = (!isExternal && url.includes('@@download')) || download;
  const isDisplayFile =
    (!isExternal && url.includes('@@display-file')) || false;

  const isFile = config.settings.downloadableObjects.includes(item?.['@type'])
    ? true
    : false;

  const checkedURL = URLUtils.checkAndNormalizeUrl(url);

  url = checkedURL.url;

  let tag = (
    <Link
      to={flattenToAppURL(url)}
      target={openLinkInNewTab ?? false ? '_blank' : null}
      title={title}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );

  if (isExternal || isFile || isInternalDownload) {
    tag = (
      <a
        href={url}
        title={title}
        target={
          !checkedURL.isMail &&
          !checkedURL.isTelephone &&
          !(openLinkInNewTab === false)
            ? '_blank'
            : null
        }
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  } else if (isDownload) {
    tag = (
      <a
        href={flattenToAppURL(url)}
        download={true}
        title={title}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  } else if (isDisplayFile) {
    tag = (
      <a
        href={flattenToAppURL(url)}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }
  return tag;
};

UniversalLink.propTypes = {
  href: PropTypes.string,
  openLinkInNewTab: PropTypes.bool,
  download: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  item: PropTypes.shape({
    '@id': PropTypes.string.isRequired,
    remoteUrl: PropTypes.string, //of plone @type 'Link'
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default UniversalLink;
