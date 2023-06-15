import React from 'react';
import { Link } from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

import { Icon as VoltoIcon } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';
import penSVG from '@plone/volto/icons/pen.svg';
import PlaceHolder from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-thumbnail-placeholder.jpg';
import { cclDateFormat } from '@eeacms/volto-clms-theme/components/CclUtils';
// import { When } from '@plone/volto/components/theme/View/EventDatesInfo';
import { When } from '@eeacms/volto-clms-theme/components/CclWhen/CclWhen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { portal_types_labels } from '../Blocks/CustomTemplates/VoltoSearchBlock';
import './cards.less';

import PropTypes from 'prop-types';

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
  const RenderElement = hasProtocol(url) ? UniversalLink : Link;
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
      <div className="card-doc-header">
        <div className="card-doc-title">
          {card?.['@type'] === 'TechnicalLibrary' ? (
            <a href={`${card['@id']}/@@download/file`}>{card?.title}</a>
          ) : (
            <Link to={url}>{card?.title}</Link>
          )}
          {card?.['@type'] === 'TechnicalLibrary' && showEditor && (
            <Link to={`${url}/edit`} className="technical-library-edit-link">
              <VoltoIcon
                name={penSVG}
                size="12px"
                className="circled"
                title={'Edit'}
              />
            </Link>
          )}
        </div>
        {card?.['@type'] === 'TechnicalLibrary' && (
          <div className="card-doc-size">{card.getObjSize || ''}</div>
        )}
      </div>
      {card?.['@type'] === 'TechnicalLibrary' &&
        (card.publication_date || card.version) && (
          <div className="card-doc-extrametadata">
            {card?.['@type'] === 'TechnicalLibrary' &&
              card.publication_date && (
                <>
                  <strong>Publication date: </strong>
                  <span>{cclDateFormat(card.publication_date)}</span>
                </>
              )}{' '}
            &nbsp;
            {card?.['@type'] === 'TechnicalLibrary' && card.version && (
              <>
                <strong>Version: </strong> <span>{card.version}</span>
              </>
            )}
          </div>
        )}
      <div className="card-doc-description">{card?.description}</div>
      {children}
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
    showDates = true,
    onClickImage = () => {
      return '';
    },
    isCustomCard = false,
  } = props;
  let url = '/';
  let content_type = '';
  if (card?.getRemoteUrl) {
    url = card.getRemoteUrl || '/';
  } else if (card && !isCustomCard) {
    url = card['@id'] || '/';
    content_type = portal_types_labels[card['@type']] || card['@type'];
  } else if (card?.url?.length > 0 && !card?.getRemoteUrl) {
    url = card.url[0]['@id'] || '/';
  }
  const conditional_types = [
    'doc',
    'news',
    'event',
    'block',
    'threeColumns',
    'globalSearch',
    'file',
    'downloadFile',
    'fileWithoutDates',
  ];
  const wrapperClass =
    'card-' +
    (type === 'globalSearch'
      ? 'doc'
      : type === 'downloadFile'
      ? 'file'
      : type === 'fileWithoutDates'
      ? 'file card-file-aligned'
      : type === 'line-no-description'
      ? 'line card-line-no-description'
      : type || 'line');

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
            {type === 'file' && (
              <>
                <div className="card-icon">
                  <Icon name="file alternate outline" />
                </div>
                <div className="card-text">
                  <div className="card-file-title">
                    <CardLink url={url}>{card?.title}</CardLink>
                  </div>
                  {showDates && (
                    <div className="card-file-date">
                      {card?.effective
                        ? cclDateFormat(card?.effective)
                        : cclDateFormat(card?.created)}
                    </div>
                  )}
                  {children}
                </div>
              </>
            )}
            {type === 'downloadFile' && (
              <>
                <div className="card-icon">
                  <Icon name="file alternate outline" />
                </div>
                <div className="card-text">
                  <div className="card-file-title">
                    <CardLink url={url + '/@@download/file'}>
                      {card?.title}
                    </CardLink>
                  </div>
                  {showDates && (
                    <div className="card-file-date">
                      {card?.effective
                        ? cclDateFormat(card?.effective)
                        : cclDateFormat(card?.created)}
                    </div>
                  )}
                  {children}
                </div>
              </>
            )}
            {type === 'fileWithoutDates' && (
              <>
                <div className="card-icon">
                  <Icon name="file alternate outline" />
                </div>
                <div className="card-text">
                  <div className="card-file-title">
                    <CardLink url={url}>{card?.title}</CardLink>
                  </div>
                  {children}
                </div>
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
                      size={'preview'}
                    />
                  )}
                </div>
                <div className="card-news-text">
                  <div className="card-news-title">
                    <CardLink url={url}>{card?.title}</CardLink>
                    {/* <CardLink url={url} title={card?.title} /> */}
                  </div>
                  <div className="card-news-date">
                    {cclDateFormat(card?.effective)}
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
                  size={'preview'}
                />
              )}
            </div>
            <div className={'card-text'}>
              <div className="card-title">
                <CardLink url={url}>{card?.title}</CardLink>
                {/* <CardLink url={url} title={card?.title} /> */}
              </div>
              {type !== 'line-no-description' && (
                <div className="card-description">{card?.description}</div>
              )}
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
