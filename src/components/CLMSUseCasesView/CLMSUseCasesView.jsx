import React from 'react';
import config from '@plone/volto/registry';
import { Icon } from '@plone/volto/components';
import AnimateHeight from 'react-animate-height';
import { Accordion } from 'semantic-ui-react';
import { CLMSRelatedItems } from '../CLMSRelatedItems';

const CLMSUseCaseView = (props) => {
  const { content } = props;

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
      <>
        <h1 className="page-title">{content.title}</h1>
        <div className="news-detail">
          {content?.image && (
            <figure className="news-detail-image">
              <img
                src={
                  content?.image
                    ? content?.image?.download
                    : 'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
                }
                alt={content?.image ? content?.image?.filename : 'Placeholder'}
              />
              <figcaption>{content?.image_caption}</figcaption>
            </figure>
          )}
          <div className="news-detail-content">
            {content?.submittingProducionYear && (
              <p>
                <strong>{'Submitting production year: '}</strong>
                {content?.submittingProducionYear}
              </p>
            )}
            {content?.responsibleOrganization && (
              <p>
                <strong>{'Responsable organization: '}</strong>
                {content?.responsibleOrganization}
              </p>
            )}
            {content?.contactName && (
              <p>
                <strong>{'Contact name: '}</strong>
                {content?.contactName}
              </p>
            )}
            {content?.contactEmail && (
              <p>
                <strong>{'Contact email: '}</strong>
                {content?.contactEmail}
              </p>
            )}
            {content?.topics.length > 0 && (
              <>
                <strong>{'Use case topics: '}</strong>
                <ul>
                  {content?.topics.map((topic, key) => (
                    <li key={key}>
                      <strong>{topic.title}</strong>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {content?.outcome && (
              <p>
                <strong>{'Use case outcome: '}</strong>
                {content?.outcome}
              </p>
            )}
            {content?.geographicCoverage.length > 0 && (
              <>
                <strong>{'Geographic coverage: '}</strong>
                <ul>
                  {content?.geographicCoverage.map(
                    (geographicCoverage, key) => (
                      <li key={key}>
                        <strong>{geographicCoverage.title}</strong>
                      </li>
                    ),
                  )}
                </ul>
              </>
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
        </div>
      </>
    </div>
  );
};

export default CLMSUseCaseView;
