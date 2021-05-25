import React from 'react';
import { Link } from 'react-router-dom';
import './cards.less';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CclCard(props) {
  const { type, children, card } = props;
  let url = card ? card['@id'] || card.url || '/' : '/';
  let start = new Date(card?.start);
  let end = new Date(card?.end);
  return (
    <div className={'card-' + (type || 'line')}>
      {type === 'doc' || type === 'news' || type === 'event' ? (
        <>
          {type === 'doc' && (
            <>
              <div className="card-doc-title">
                {card?.title || 'Card default title'}
              </div>
              <div className="card-doc-text">
                <div className="doc-description">{card?.description}</div>
                <div className="card-doc-size">{card?.docInfo || 'DOC'}</div>
                {children}
              </div>
            </>
          )}
          {type === 'news' && (
            <>
              <div className="card-news-image">
                <img
                  src={
                    card?.image?.download ||
                    'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
                  }
                  alt="Placeholder"
                />
              </div>
              <div className="card-news-text">
                <div className="card-news-title">
                  <Link to={url}>{card?.title || 'Card default title'}</Link>
                </div>
                <div className="card-news-date">
                  {new Date(card?.effective).toLocaleDateString()}
                </div>
                <p className="card-news-description">{card?.description}</p>
              </div>
            </>
          )}
          {type === 'event' && (
            <>
              <div className="card-event-image">
                <img
                  src={
                    card?.image?.download ||
                    'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
                  }
                  alt={'placeholder'}
                />
              </div>
              <div className={'card-event-text'}>
                <div className="card-event-title">
                  <Link to={url}>{card?.title || 'Event default title'}</Link>
                </div>
                <div className="card-event-when">
                  <FontAwesomeIcon icon={['far', 'calendar-alt']} />
                  <div className="card-event-when-text">
                    {start.toLocaleDateString() === end.toLocaleDateString()
                      ? start.toLocaleDateString()
                      : start.toLocaleDateString() +
                        ' - ' +
                        end.toLocaleDateString()}
                  </div>
                </div>
                <div className="card-event-where">
                  <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
                  <div className="card-event-where-text">{card?.location}</div>
                </div>
                <p className="card-description">{card?.description}</p>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="card-image">
            <img
              src={
                'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
              }
              alt={'placeholder'}
            />
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
