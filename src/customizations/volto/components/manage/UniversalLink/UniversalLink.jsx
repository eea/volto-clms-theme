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
  file_field = 'file',
  ...props
}) => {
  const token = useSelector((state) => state.userSession?.token);

  let url = href;

  // fixing url, just in case it's a download and it doesn't have the @@download in URL
  if (isFileDownload && !url.includes('@@download/')) {
    url = `${url}/@@download/${file_field}`;
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
        url = `${url}/@@download/${file_field}`;
      }

      if (
        !token &&
        config.settings.viewableInBrowserObjects.includes(item['@type'])
      ) {
        url = `${url}/@@display-file/${file_field}`;
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

  openLinkInNewTab =
    typeof openLinkInNewTab !== 'undefined'
      ? openLinkInNewTab
      : checkedURL.isMail || checkedURL.isTelephone || isExternal;

  // All downloadable files to be opened in a new tab
  if (checkedURL?.url?.includes('/@@download/')) {
    openLinkInNewTab = true;
  }

  // console.log({ openLinkInNewTab, isExternal, checkedURL });

  let tag = (
    <Link
      to={flattenToAppURL(url)}
      target={openLinkInNewTab ? '_blank' : undefined}
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
        target={openLinkInNewTab ? '_blank' : undefined}
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
        target={openLinkInNewTab ? '_blank' : undefined}
        rel={openLinkInNewTab ? 'noopener noreferrer' : undefined}
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
