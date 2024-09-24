import React from 'react';
import { UniversalLink } from '@plone/volto/components';
import '@plone/volto-slate/editor/plugins/AdvancedLink/styles.less';

export const LinkElement = ({ attributes, children, element, mode }) => {
  // TODO: handle title on internal links
  let url = element.url;
  const { link } = element.data || {};

  const internal_link = link?.internal?.internal_link?.[0]?.['@id'];
  const isDownload = link?.internal?.internal_link?.[0]?.['download'];
  const external_link = link?.external?.external_link;
  const email = link?.email;

  const href = email
    ? `mailto:${email.email_address}${
        email.email_subject ? `?subject=${email.email_subject}` : ''
      }`
    : external_link || internal_link || url;

  const { title } = element?.data || {};

  return mode === 'view' ? (
    <>
      <UniversalLink
        href={href || '#'}
        openLinkInNewTab={isDownload || link?.external?.target === '_blank'}
        title={title}
        download={isDownload}
      >
        {children}
      </UniversalLink>
    </>
  ) : (
    <span {...attributes} className="slate-editor-link">
      {children}
    </span>
  );
};
