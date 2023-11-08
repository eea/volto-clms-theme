import React from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclHomeImageEditor from './CclHomeImageEditor';
import { toPublicURL } from '@plone/volto/helpers';
import { HomeBgImg } from './HomeBgImg';

const CclWhiteBgView = (props) => {
  const { data, isEditMode } = props;
  const image_url = data?.image?.url ? toPublicURL(data.image.url) : '';

  return (
    <div className="home-map-container">
      {image_url && <HomeBgImg url={image_url} alt={data?.image?.alt} />}
      {isEditMode && <CclHomeImageEditor {...props} />}
      <div className="ccl-container">
        <div className="home-map-banner">
          {data.title && <h1>{data?.title}</h1>}
          {data.subtitle && <h2>{data?.subtitle}</h2>}
          {data.description && <h3>{data?.description} </h3>}
          {data?.hasButton === true && (
            <CclButton
              url={
                data?.download && data?.href?.[0]?.['@type'] === 'File'
                  ? data?.href?.[0]?.['@id'] + '/@@download/file'
                  : data?.href?.[0]?.['@id']
              }
              disabled={data?.disabled}
              download={data?.download || data?.href?.[0]?.['@type'] === 'File'}
              target={
                data?.target ||
                (data?.download &&
                  data?.href[0]['@type'] === 'File' &&
                  '_blank')
              }
              mode={data?.style}
            >
              {data?.buttonTitle}
            </CclButton>
          )}
        </div>
        {data?.dataset_title ||
          data?.dataset_subtitle ||
          (data?.dataset_description && (
            <div className="home-dataset-banner">
              {data.dataset_title && <h1>{data?.dataset_title}</h1>}
              {data.dataset_subtitle && <h2>{data?.dataset_subtitle}</h2>}
              {data.dataset_description && (
                <h3>{data?.dataset_description} </h3>
              )}
              {data?.hasDatasetButton === true && (
                <CclButton
                  url={
                    data?.download &&
                    data?.dataset_href?.[0]?.['@type'] === 'File'
                      ? data?.dataset_href?.[0]?.['@id'] + '/@@download/file'
                      : data?.dataset_href?.[0]?.['@id']
                  }
                  disabled={data?.dataset_disabled}
                  download={
                    data?.download ||
                    data?.dataset_href?.[0]?.['@type'] === 'File'
                  }
                  target={
                    data?.target ||
                    (data?.download &&
                      data?.dataset_href[0]['@type'] === 'File' &&
                      '_blank')
                  }
                  mode={data?.dataset_style}
                >
                  {data?.dataset_buttonTitle}
                </CclButton>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CclWhiteBgView;
