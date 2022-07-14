import React from 'react';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import { hasBlocksData } from '@plone/volto/helpers';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { cclDateTimeFormat } from '@eeacms/volto-clms-theme/components/CclUtils';
import { LightGalleryListing } from '@eeacms/volto-clms-theme/components/CLMSMeetingView/CclLightGallery';
import CclListingCards from '@eeacms/volto-clms-theme/components/Blocks/CustomTemplates/VoltoListingBlock/CclListingCards';
import config from '@plone/volto/registry';
import { Icon } from '@plone/volto/components';
import AnimateHeight from 'react-animate-height';
import { Accordion, Grid } from 'semantic-ui-react';

const CLMSNewsItemView = (props) => {
  const { content } = props;
  const files = content.items
    ? content.items.filter((item) => item['@type'] === 'File')
    : [];
  const [activeIndex, setActiveIndex] = React.useState([99]);

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
    <div className="ccl-container">
      {hasBlocksData(content) && content.blocks_layout?.items?.length > 4 ? (
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
            <LightGalleryListing />
            {files.length > 0 && (
              <CclListingCards
                variation="file"
                items={files}
                linkHref={`${files['@id']}/@@download/file`}
              />
            )}
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
                    <ul>
                      {content.products.map((product, key) => (
                        <li key={key}>
                          <Grid columns={2}>
                            <Grid.Column width={2}>
                              {product.image_field && (
                                <img
                                  src={
                                    product.image_field
                                      ? `${product['@id']}/@@images/image`
                                      : 'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
                                  }
                                  alt={
                                    product.image_field
                                      ? product.image?.filename
                                      : 'Placeholder'
                                  }
                                />
                              )}
                            </Grid.Column>
                            <Grid.Column width={10}>
                              <a href={product['@id']}>
                                <strong>{product.title}</strong>
                              </a>
                              <p>{product.description}</p>
                            </Grid.Column>
                          </Grid>
                        </li>
                      ))}
                    </ul>
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
                    <ul>
                      {content.datasets.map((dataset, key) => (
                        <li key={key}>
                          <Grid columns={2}>
                            <Grid.Column width={2}>
                              {dataset.image_field && (
                                <img
                                  src={
                                    dataset.image_field
                                      ? `${dataset['@id']}/@@images/image`
                                      : 'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
                                  }
                                  alt={
                                    dataset.image_field
                                      ? dataset.image?.filename
                                      : 'Placeholder'
                                  }
                                />
                              )}
                            </Grid.Column>
                            <Grid.Column width={10}>
                              <a href={dataset['@id']}>
                                <strong>{dataset.title}</strong>
                              </a>
                              <p>{dataset.description}</p>
                            </Grid.Column>
                          </Grid>
                        </li>
                      ))}
                    </ul>
                  </AnimateHeight>
                </Accordion.Content>
              </Accordion>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CLMSNewsItemView;
