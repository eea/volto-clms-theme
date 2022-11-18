import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getVocabulary } from '@plone/volto/actions';
import { UniversalLink } from '@plone/volto/components';
import PlaceHolder from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-thumbnail-placeholder.jpg';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';

import './usecases.less';

const CLMSUseCaseView = (props) => {
  const { content } = props;

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

  const detailClasses = 'news-detail usecase-detail';
  const detailClassesContent = 'news-detail-content usecase-detail-content';

  return (
    <div className="ccl-container">
      {content?.external_url ? (
        <UniversalLink href={content.external_url}>
          <h1 className="page-title">{content.title}</h1>
        </UniversalLink>
      ) : (
        <h1 className="page-title">{content.title}</h1>
      )}
      <div className={detailClasses}>
        {content?.image?.scales?.mini?.download ? (
          <figure>
            <img
              src={
                content?.image?.scales?.mini?.download ||
                'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
              }
              alt={content?.image ? content?.image?.filename : 'Placeholder'}
            />
          </figure>
        ) : (
          <figure>
            <img src={PlaceHolder} alt={content?.image?.alt || 'Placeholder'} />
          </figure>
        )}

        <div className={detailClassesContent}>
          {topicValues.length > 0 && (
            <>
              {topicValues.map((topic, key) => (
                <strong key={key}>{topic}</strong>
              ))}
            </>
          )}
          <p>
            {content?.submittingProducionYear && (
              <span className="usecase-detail-item">
                {content?.submittingProducionYear + ' | '}
              </span>
            )}
            {content?.taxonomy_use_case_spatial_coverage.map(
              (taxonomy_use_case_spatial_coverage, key) => (
                <span className="usecase-detail-item" key={key}>
                  {taxonomy_use_case_spatial_coverage.title}
                </span>
              ),
            )}{' '}
            {content?.taxonomy_use_case_spatial_coverage && ' | '}
            {content?.responsibleOrganization && (
              <span className="usecase-detail-item">
                {content?.responsibleOrganization}
              </span>
            )}
          </p>
          {content?.text && <StringToHTML string={content?.text?.data} />}
        </div>
      </div>
    </div>
  );
};

export default CLMSUseCaseView;
