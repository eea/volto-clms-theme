import React from 'react';
import { Link } from 'react-router-dom';
import './cards.less';
import PropTypes from 'prop-types';

function CclCard(props) {
  const { type, children, card } = props;
  let url = card ? card['@id'] || card.url || '/' : '/';
  return (
    <div className={'card-' + (type || 'line')}>
      {type === 'doc' || type === 'news' ? (
        <>
          {type === 'doc' && (
            <>
              <div className="card-doc-title">
                {card?.title || 'Card default title'}
              </div>
              <div className="card-doc-text">
                <div className="doc-description">
                  {card?.description || 'Card default description text'}
                </div>
                <div className="card-doc-size">{card?.docInfo || 'DOC'}</div>
                {children}
              </div>
            </>
          )}
          {type === 'news' && (
            <>
              <div className="card-news-image">
                <img
                  src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
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
        </>
      ) : (
        <>
          <div className="card-image">
            {card?.image?.scales ? (
              <img
                src={card.image.scales.preview.download}
                alt={card.image.alt}
              />
            ) : (
              <img
                src={
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
                }
                alt={'placeholder'}
              />
            )}
          </div>
          <div className={'card-text'}>
            <div className="card-title">
              <Link to={url}>{card?.title || 'Card default title'}</Link>
            </div>
            <div className="card-description">
              {card?.description || 'Card default description text'}
            </div>
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
  }),
  children: PropTypes.node,
};

export default CclCard;
