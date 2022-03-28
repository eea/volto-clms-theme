import React from 'react';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import { hasBlocksData } from '@plone/volto/helpers';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { cclDateTimeFormat } from '@eeacms/volto-clms-theme/components/CclUtils';
const CLMSNewsItemView = (props) => {
  const { content } = props;
  return (
    <div className="ccl-container">
      {hasBlocksData(content) && content.blocks_layout?.items?.length > 1 ? (
        <RenderBlocks {...props} />
      ) : (
        <>
          <h1 className="page-title">{content.title}</h1>
          <div className="news-detail">
            <div className="news-detail-date">
              {cclDateTimeFormat(content?.effective)}
            </div>
            {content?.image && (
              <figure className="news-detail-image">
                <img
                  src={
                    content?.image
                      ? content?.image?.download
                      : 'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
                  }
                  alt={
                    content?.image ? content?.image?.filename : 'Placeholder'
                  }
                />
                <figcaption>{content?.image_caption}</figcaption>
              </figure>
            )}
            <div className="news-detail-content">
              <StringToHTML string={content.text?.data || ''} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CLMSNewsItemView;
