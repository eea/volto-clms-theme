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

import PlaceHolder from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-thumbnail-placeholder.jpg';
import { cclDateTimeFormat } from '@eeacms/volto-clms-theme/components/CclUtils';

const CardImage = ({ card, size = 'preview', isCustomCard }) => {
  return card?.image_field ? (
    <img
      src={`${card.getURL}/@@images/${card?.image_field}/${size}`}
      alt={card?.image?.alt || 'Placeholder'}
    />
  ) : isCustomCard && card?.image?.url ? (
    <img src={`${card.image.url}/@@images/image`} alt={card.image.alt} />
  ) : (
    <img src={PlaceHolder} alt={card?.image?.alt || 'Placeholder'} />
  );
};

const CardLink = ({ url, children, className, condition = true }) => {
  function hasProtocol(protocolUrl) {
    return (
      protocolUrl.startsWith('https://') || protocolUrl.startsWith('http://')
    );
  }
  const RenderElement = hasProtocol(url) ? 'a' : Link;
  return !condition ? (
    children
  ) : hasProtocol(url) ? (
    <RenderElement className={className} href={url}>
      {children}
    </RenderElement>
  ) : (
    <RenderElement className={className} to={url}>
      {children}
    </RenderElement>
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
  const {
    type,
    children,
    card,
    showEditor = false,
    CclImageEditor = null,
    onClickImage = () => {
      return '';
    },
    isCustomCard = false,
  } = props;
  let url = '/';
  let content_type = '';
  if (card && !isCustomCard) {
    url = card['@id'] || '/';
    content_type = portal_types_labels[card['@type']] || card['@type'];
  } else {
    if (card?.url?.length > 0) {
      url = card.url[0]['@id'] || '/';
    }
  }
  const conditional_types = [
    'doc',
    'news',
    'event',
    'block',
    'threeColumns',
    'globalSearch',
  ];
  const wrapperClass =
    'card-' + (type === 'globalSearch' ? 'doc' : type || 'line');
  return (
    <CardLink
      url={url}
      className={wrapperClass}
      condition={type === 'block' || type === 'threeColumns'}
    >
      <div
        tabIndex="0"
        role="button"
        onClick={() => onClickImage()}
        onKeyDown={() => onClickImage()}
        className={
          !(type === 'block' || type === 'threeColumns') && wrapperClass
        }
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
                  {isCustomCard && CclImageEditor ? (
                    CclImageEditor
                  ) : (
                    <CardImage
                      isCustomCard={isCustomCard}
                      card={card}
                      size={'preview'}
                    />
                  )}
                </div>
                <div className="card-text">
                  <div className="card-title">{card?.title}</div>
                  <div className="card-description">{card?.description}</div>
                  {children}
                </div>
              </>
            )}
            {type === 'news' && (
              <>
                <div className="card-news-image">
                  {isCustomCard && CclImageEditor ? (
                    CclImageEditor
                  ) : (
                    <CardImage
                      isCustomCard={isCustomCard}
                      card={card}
                      size={'mini'}
                    />
                  )}
                </div>
                <div className="card-news-text">
                  <div className="card-news-title">
                    <CardLink url={url}>{card?.title}</CardLink>
                    {/* <CardLink url={url} title={card?.title} /> */}
                  </div>
                  <div className="card-news-date">
                    {cclDateTimeFormat(card?.effective)}
                  </div>
                  <p className="card-news-description">{card?.description}</p>
                </div>
              </>
            )}
            {type === 'event' && (
              <>
                <div className={'card-event-text'}>
                  <div className="card-event-title">
                    <CardLink url={url}>{card?.title}</CardLink>
                    {/* <CardLink url={url} title={card?.title} /> */}
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
              {isCustomCard && CclImageEditor ? (
                CclImageEditor
              ) : (
                <CardImage
                  isCustomCard={isCustomCard}
                  card={card}
                  size={'mini'}
                />
              )}
            </div>
            <div className={'card-text'}>
              <div className="card-title">
                <CardLink url={url}>{card?.title}</CardLink>
                {/* <CardLink url={url} title={card?.title} /> */}
              </div>
              <div className="card-description">{card?.description}</div>
              {children}
            </div>
          </>
        )}
      </div>
    </CardLink>
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
