import React, { useEffect } from 'react';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion } from 'semantic-ui-react';

import { getVocabulary } from '@plone/volto/actions';
import { Icon } from '@plone/volto/components';
import config from '@plone/volto/registry';

import { CLMSRelatedItems } from '../CLMSRelatedItems';
// import { getVocabulary } from '@plone/volto/actions';

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

  const dispatch = useDispatch();
  const TOPICS_VOCABULARY_NAME = 'clms.types.TopicsVocabulary';
  useEffect(() => {
    if (content?.topics.length > 0) {
      dispatch(getVocabulary({ vocabNameOrURL: TOPICS_VOCABULARY_NAME }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, dispatch]);

  const vocabItems = useSelector((state) =>
    state.vocabularies[TOPICS_VOCABULARY_NAME]?.loaded
      ? state.vocabularies[TOPICS_VOCABULARY_NAME].items
      : [],
  );

  const topicValues = vocabItems
    .map((item) => {
      return content.topics.includes(item.value) ? item.label : null;
    })
    .filter((item) => {
      return item !== null;
    })
    .sort();

  const titleIcons = config.blocks?.blocksConfig?.accordion?.titleIcons;

  function iconName(iconData, iTitleIcons) {
    return iconData?.right_arrows
      ? iTitleIcons.rightPosition
      : iTitleIcons.leftPosition;
  }
  // console.log(getVocabulary({ vocabNameOrURL: content.topics }));
  return (
    <div className="ccl-container">
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
          {topicValues.length > 0 && (
            <>
              <strong>{'Use case topics: '}</strong>
              <ul>
                {topicValues.map((topic, key) => (
                  <li key={key}>
                    <strong>{topic}</strong>
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
          {content?.taxonomy_use_case_spatial_coverage.length > 0 && (
            <>
              <strong>{'Geographic coverage: '}</strong>
              <ul>
                {content?.taxonomy_use_case_spatial_coverage.map(
                  (taxonomy_use_case_spatial_coverage, key) => (
                    <li key={key}>
                      <strong>
                        {taxonomy_use_case_spatial_coverage.title}
                      </strong>
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
    </div>
  );
};

export default CLMSUseCaseView;
