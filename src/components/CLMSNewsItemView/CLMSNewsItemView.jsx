import React from 'react';
import AnimateHeight from 'react-animate-height';
import { Accordion } from 'semantic-ui-react';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { hasBlocksData } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import CclListingCards from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoListingBlock/CclListingCards';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import { cclDateFormat } from '@eeacms/volto-clms-theme/components/CclUtils';
import { LightGalleryListing } from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CclLightGallery';

import { CLMSRelatedItems } from '../CLMSRelatedItems';
import { useSelector } from 'react-redux';

const CLMSNewsItemView = (props) => {
  const { content } = props;
  const files = content.items
    ? content.items.filter((item) => item['@type'] === 'File')
    : [];
  const [activeIndex, setActiveIndex] = React.useState([99]);

  const user = useSelector((state) => state.users.user);
  const is_manager = user?.roles?.includes('Manager');

  const handleClick = ({ index }) => {
    const newIndex =
      activeIndex.indexOf(index) === -1
        ? [...activeIndex, index]
        : activeIndex.filter((item) => item !== index);

    setActiveIndex(newIndex);
  };

  const [activeDatasetIndex, setActiveDatasetIndex] = React.useState([99]);

  const handleDatasetClick = ({ datasetindex }) => {
    const newDatasetIndex =
      activeDatasetIndex.indexOf(datasetindex) === -1
        ? [...activeDatasetIndex, datasetindex]
        : activeDatasetIndex.filter((item) => item !== datasetindex);

    setActiveDatasetIndex(newDatasetIndex);
  };

  const titleIcons = config.blocks?.blocksConfig?.accordion?.titleIcons;

  function iconName(iconData, iTitleIcons) {
    return iconData?.right_arrows
      ? iTitleIcons.rightPosition
      : iTitleIcons.leftPosition;
  }

  return (
    <div className="ccl-container news-item-margins">
      {hasBlocksData(content) && content.blocks_layout?.items?.length > 4 ? (
        <RenderBlocks {...props} />
      ) : (
        <>
          <h1 className="page-title">{content.title}</h1>
          <div className="news-detail">
            <div className="news-detail-date">
              {cclDateFormat(content?.effective)}
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
            <LightGalleryListing />
          </div>
        </>
      )}
      {files.length > 0 && (
        <CclListingCards
          variation="downloadFile"
          items={files}
          showDates={false}
          linkHref={`${files['@id']}/@@download/file`}
        />
      )}
      {is_manager && (
        <div className="dataset-info-documents dropdown card-container">
          <div className="accordion-block"></div>
          {content?.products?.length > 0 && (
            <Accordion fluid styled>
              <Accordion.Title
                as={'h2'}
                onClick={() => handleClick({ index: 0 })}
                className={'accordion-title align-arrow-right'}
              >
                {activeIndex.includes(0) ? (
                  <Icon
                    name={iconName(content, titleIcons.opened)}
                    size="24px"
                  />
                ) : (
                  <Icon
                    name={iconName(content, titleIcons.closed)}
                    size="24px"
                  />
                )}
                <span>Related products</span>
              </Accordion.Title>
              <Accordion.Content active={activeIndex.includes(0)}>
                <AnimateHeight animateOpacity duration={500} height={'auto'}>
                  <CLMSRelatedItems items={content.products} />
                </AnimateHeight>
              </Accordion.Content>
            </Accordion>
          )}
          {content?.datasets?.length > 0 && (
            <Accordion fluid styled>
              <Accordion.Title
                as={'h2'}
                onClick={() => handleDatasetClick({ datasetindex: 0 })}
                className={'accordion-title align-arrow-right'}
              >
                {activeDatasetIndex.includes(0) ? (
                  <Icon
                    name={iconName(content, titleIcons.opened)}
                    size="24px"
                  />
                ) : (
                  <Icon
                    name={iconName(content, titleIcons.closed)}
                    size="24px"
                  />
                )}
                <span>Related datasets</span>
              </Accordion.Title>
              <Accordion.Content active={activeDatasetIndex.includes(0)}>
                <AnimateHeight animateOpacity duration={500} height={'auto'}>
                  <CLMSRelatedItems items={content.datasets} />
                </AnimateHeight>
              </Accordion.Content>
            </Accordion>
          )}
        </div>
      )}
    </div>
  );
};

export default CLMSNewsItemView;
