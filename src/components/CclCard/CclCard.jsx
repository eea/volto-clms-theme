import './cards.less';

import * as mime from 'react-native-mime-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { When } from '@plone/volto/components/theme/View/EventDatesInfo';
import { Label } from 'semantic-ui-react';
import { portal_types_labels } from '../Blocks/CustomTemplates/VoltoSearchBlock';
import penSVG from '@plone/volto/icons/pen.svg';
import { Icon } from '@plone/volto/components';

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
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
              <div className="card-doc-title">
                <a href={card?.file?.download || url}>
                  {card?.title || 'Card default title'}
                </a>
              </div>
              <div className="card-doc-text">
                <div className="doc-description">{card?.description}</div>
                {card?.file && (
                  <div className="card-doc-size">
                    {mime.extension(card?.file?.['content-type']).toUpperCase()}{' '}
                    {bytesToSize(card?.file?.size) || ''}
                  </div>
                )}
                {children}
              </div>
            </>
          )}
          {type === 'globalSearch' && (
            <>
              <Label ribbon="right" color="olive">
                {content_type}
              </Label>
              <div className="card-doc-title">
                {card?.file?.download ? (
                  <a href={card.file.download}>{card?.title}</a>
                ) : (
                  <Link to={url}>{card?.title}</Link>
                )}
                {card?.file?.download && showEditor && (
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
                {card?.file && (
                  <div className="card-doc-size">
                    {mime.extension(card?.file?.['content-type']).toUpperCase()}{' '}
                    {bytesToSize(card?.file?.size) || ''}
                  </div>
                )}
                {children}
              </div>
            </>
          )}
          {(type === 'block' || type === 'threeColumns') && (
            <>
              <div className={`card-${type}-image`}>
                <img
                  src={
                    card?.image?.scales?.preview?.download ||
                    card?.image?.download ||
                    'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
                  }
                  alt={card?.image?.alt || 'Placeholder'}
                />
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
                <img
                  src={
                    card?.image?.scales?.mini?.download ||
                    card?.image?.download ||
                    'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
                  }
                  alt={card?.image?.alt || 'Placeholder'}
                />
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
                    {card.whole_day ? (
                      <When
                        start={card.start}
                        end={card.start}
                        whole_day={card.whole_day}
                      />
                    ) : (
                      <When
                        start={card.start}
                        end={card.end}
                        whole_day={card.whole_day}
                      />
                    )}
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
            <img
              src={
                card?.image?.scales?.mini?.download ||
                card?.image?.download ||
                'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
              }
              alt={card?.image?.alt || 'Placeholder'}
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
