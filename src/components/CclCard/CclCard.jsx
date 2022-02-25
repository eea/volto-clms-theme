import './cards.less';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { When } from '@plone/volto/components/theme/View/EventDatesInfo';
import { Label } from 'semantic-ui-react';
import { portal_types_labels } from '../Blocks/CustomTemplates/VoltoSearchBlock';
import penSVG from '@plone/volto/icons/pen.svg';
import { Icon } from '@plone/volto/components';

const CardImage = ({ card, size = 'preview' }) => {
  return card?.image_field ? (
    <img
      src={`${card.getURL}/@@images/${card?.image_field}/${size}`}
      alt={card?.image?.alt || 'Placeholder'}
    />
  ) : (
    <img
      src={
        'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
      }
      alt={card?.image?.alt || 'Placeholder'}
    />
  );
};

const DocCard = ({ card, url, showEditor, children }) => {
  return (
    <>
      <div className="card-doc-title">
        {card?.Type === 'TechnicalLibrary' ? (
          <a href={`${card['@id']}/@@download/file`}>{card?.title}</a>
        ) : (
          <Link to={url}>{card?.title}</Link>
        )}
        {card?.Type === 'TechnicalLibrary' && showEditor && (
          <Link to={`${url}/edit`}>
            <Icon
              name={penSVG}
              size="15px"
              className="circled"
              title={'Edit'}
            />
          </Link>
        )}
      </div>
      <div className="card-doc-text">
        <div className="doc-description">{card?.description}</div>
        {card?.Type === 'TechnicalLibrary' && (
          <div className="card-doc-size">{card.getObjSize || ''}</div>
        )}
        {children}
      </div>
    </>
  );
};
function CclCard(props) {
  const { type, children, card, showEditor = false } = props;
  let url = '/';
  let content_type = '';
  if (card) {
    url = card['@id'] || card.hrerf || '/';
    content_type = portal_types_labels[card['@type']] || card['@type'];
  }
  const conditional_types = [
    'doc',
    'news',
    'event',
    'block',
    'threeColumns',
    'globalSearch',
  ];
  return (
    <div
      className={'card-' + (type === 'globalSearch' ? 'doc' : type || 'line')}
    >
      {conditional_types.includes(type) ? (
        <>
          {type === 'doc' && (
            <>
              <DocCard card={card} url={url} showEditor={showEditor}>
                {children}
              </DocCard>
            </>
          )}
          {type === 'globalSearch' && (
            <>
              <Label ribbon="right" color="olive">
                {content_type}
              </Label>
              <DocCard card={card} url={url} showEditor={showEditor}>
                {children}
              </DocCard>
            </>
          )}
          {(type === 'block' || type === 'threeColumns') && (
            <>
              <div className={`card-${type}-image`}>
                <CardImage card={card} size={'preview'} />
              </div>
              <div className="card-text">
                <div className="card-title">
                  <Link to={url}>{card?.title || 'Card default title'}</Link>
                </div>
                <div className="card-description">{card?.description}</div>
                {children}
              </div>
            </>
          )}
          {type === 'news' && (
            <>
              <div className="card-news-image">
                <CardImage card={card} size={'mini'} />
              </div>
              <div className="card-news-text">
                <div className="card-news-title">
                  <Link to={url}>{card?.title || 'Card default title'}</Link>
                </div>
                <div className="card-news-date">
                  {new Date(card?.effective).toLocaleString()}
                </div>
                <p className="card-news-description">{card?.description}</p>
              </div>
            </>
          )}
          {type === 'event' && (
            <>
              <div className={'card-event-text'}>
                <div className="card-event-title">
                  <Link to={url}>{card?.title || 'Event default title'}</Link>
                </div>
                <div className="card-event-when">
                  <FontAwesomeIcon icon={['far', 'calendar-alt']} />
                  <div className="card-event-when-text">
                    <When
                      start={card.start}
                      end={card.whole_day ? card.start : card.end}
                      whole_day={card.whole_day}
                    />
                  </div>
                </div>
                {card?.location ? (
                  <div className="card-event-where">
                    <>
                      <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
                      <div className="card-event-where-text">
                        {card?.location}
                      </div>
                    </>
                  </div>
                ) : (
                  ''
                )}
                <p className="card-event-description">{card?.description}</p>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="card-image">
            <CardImage card={card} size={'mini'} />
          </div>
          <div className={'card-text'}>
            <div className="card-title">
              <Link to={url}>{card?.title || 'Card default title'}</Link>
            </div>
            <div className="card-description">{card?.description}</div>
            {children}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
CclCard.propTypes = {
  type: PropTypes.string,
  card: PropTypes.shape({
    '@id': PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    docInfo: PropTypes.string,
    image: PropTypes.shape({
      scales: PropTypes.shape({
        icon: PropTypes.shape({
          download: PropTypes.string,
        }),
        large: PropTypes.shape({
          download: PropTypes.string,
        }),
        listing: PropTypes.shape({
          download: PropTypes.string,
        }),
        mini: PropTypes.shape({
          download: PropTypes.string,
        }),
        preview: PropTypes.shape({
          download: PropTypes.string,
        }),
        thumb: PropTypes.shape({
          download: PropTypes.string,
        }),
        tile: PropTypes.shape({
          download: PropTypes.string,
        }),
      }),
    }),
    start: PropTypes.string,
    end: PropTypes.string,
  }),
  children: PropTypes.node,
};

export default CclCard;
