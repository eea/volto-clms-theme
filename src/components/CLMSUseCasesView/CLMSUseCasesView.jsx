import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Grid, List } from 'semantic-ui-react';

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

  return (
    <div className="ccl-container">
      {content?.external_url ? (
        <UniversalLink href={content.external_url}>
          <h1 className="page-title">{content.title}</h1>
        </UniversalLink>
      ) : (
        <h1 className="page-title">{content.title}</h1>
      )}
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={3}>
            {content?.image?.scales?.mini?.download ? (
              <figure>
                <Image
                  src={content?.image?.scales?.mini?.download}
                  alt={
                    content?.image ? content?.image?.filename : 'Placeholder'
                  }
                />
              </figure>
            ) : (
              <Image
                src={PlaceHolder}
                alt={content?.image?.alt || 'Placeholder'}
              />
            )}
          </Grid.Column>
          <Grid.Column width={9}>
            {topicValues.length > 0 && (
              <List celled horizontal className="usecase-topic-values-list">
                {topicValues.map((topic, key) => (
                  <List.Item key={key}>
                    <strong>{topic}</strong>
                  </List.Item>
                ))}
              </List>
            )}
            <p>
              <List celled horizontal className="usecase-other-values-list">
                <List.Item>
                  {content?.submittingProducionYear && (
                    <span className="usecase-year">
                      {content?.submittingProducionYear}
                    </span>
                  )}
                </List.Item>
                <List.Item>
                  {content?.taxonomy_use_case_spatial_coverage
                    .map(
                      (taxonomy_use_case_spatial_coverage) =>
                        taxonomy_use_case_spatial_coverage.title,
                    )
                    .sort()
                    .join(', ')}
                </List.Item>
                <List.Item>
                  {content?.responsibleOrganization && (
                    <span className="usecase-detail-item">
                      {content?.responsibleOrganization}
                    </span>
                  )}
                </List.Item>
              </List>
            </p>
            <div className="usecase-body-text">
              {content?.text && <StringToHTML string={content?.text?.data} />}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default CLMSUseCaseView;
